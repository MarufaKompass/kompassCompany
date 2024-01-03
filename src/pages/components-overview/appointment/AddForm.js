import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Toolbar,
  Typography,
  Divider,
  Grid,
  FormHelperText,
  Input,
  FormControl,
  TextField,
  Button,
  Select,
  MenuItem,
  Avatar,
  InputLabel
} from '@mui/material';
import MainCard from 'components/MainCard';
import { toast } from 'react-toastify';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import { styled } from '@mui/material/styles';

import { useForm, Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Webcam from 'react-webcam';
import { addForm } from 'components/validation/Validation';
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-dom';
import axiosInstance from 'utils/axios.config';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppContext } from 'AppContextProvider';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../assets/third-party/styles.css';
import '../../../styles.css';
const StyledTimePicker = styled(TimePicker)({
  '& .rc-time-picker-input': {
    width: '100%',
    height: '34px',
    borderTop: 1,
    borderRight: 1,
    borderLeft: 1,
    borderRadius: 0,
    borderColor: '#b2b2b2',
    fontSize: '15px',
    '&:hover': {
      borderColor: '#000'
    },
    '&:focus': {
      borderColor: '#12A9B2'
    }
  }
});

const videoConstraints = {
  width: 150,
  height: 150,
  facingMode: 'user'
};

function formatDate(inputDateString) {
  const inputDate = new Date(inputDateString);
  const year = inputDate.getFullYear();
  const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
  const day = inputDate.getDate().toString().padStart(2, '0');
  const outputDateString = `${year}-${month}-${day}`;
  return outputDateString;
}

export default function AddForm() {
  const ariaLabel = { 'aria-label': 'description' };

  const convertTo12HourFormat = (time24) => {
    const [hours, minutes] = time24.split(':');
    const parsedHours = parseInt(hours, 10);
    const suffix = parsedHours >= 12 ? 'PM' : 'AM';
    let convertedHours = parsedHours % 12;
    convertedHours = convertedHours === 0 ? 12 : convertedHours; // Handle 0 to 12 conversion
    return `${convertedHours}:${minutes} ${suffix}`;
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({ resolver: yupResolver(addForm) });
  const [selectedValue, setSelectedValue] = useState(0);
  const { checkPerson, profile } = useAppContext();
  const [location, setLocation] = useState('');
  const [selectTime, setSelectTime] = useState('');
  const { company_id } = profile;
  const [company, setCompany] = useState([]);
  const [purpose, setPurpose] = useState([]);
  const defaultTime = moment();
  const [selectedTime, setSelectedTime] = useState(defaultTime);
  const [visitor4Name, setVisitor4Name] = useState('');
  const [visitor4Phone, setVisitor4Phone] = useState('');
  const [timeDuration, setTimeDuration] = useState([]);
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchData = debounce(() => {
      axiosInstance
        .get('https://api.hellokompass.com/purpose')
        .then((res) => {
          setPurpose(res.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 500);
    fetchData();
    return () => {
      fetchData.cancel();
    };
  }, []);

  const { person_name, first_name, last_name, phone, person_phone, location_type, person_id } = checkPerson;

  useEffect(() => {
    const fetchData = debounce(() => {
      axiosInstance
        .get(`https://api.hellokompass.com/calender/time-list?date=${date}&duration=${selectTime}&person_id=${person_id}`)
        .then((res) => {
          setTimeDuration(res.data.data);
          console.log(res.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 500);

    fetchData();

    return () => {
      fetchData.cancel();
    };
  }, [date, selectTime, person_id]);

  const navigate = useNavigate();

  const handleButtonCancel = () => {
    navigate('/appointment/checkPhone');
  };

  const [days, setDays] = useState('');

  const handleChange = (event) => {
    setDays(event.target.value);
    setSelectedValue(event.target.value);
  };
  const handleChangeLocation = (event) => {
    setLocation(event.target.value);
  };
  const handleChangeTime = (event) => {
    setSelectTime(event.target.value);
  };

  const onSubmit = (data) => {
    data.image = uploadedPhoto;
    const date = data.date;

    if (date) {
      const currentDate = new Date();
      const currentSelectedDate = new Date(currentDate);
      const today = currentSelectedDate.setHours(0, 0, 0, 0);
      const inputDateString = date;
      const inputDate = new Date(inputDateString);
      const selectedDate = new Date(inputDate);
      const selectedDateTime = selectedDate.setHours(0, 0, 0, 0);

      if (selectedDateTime < today) {
        toast.error("You can't select a date from the past");
      } else {
        if (visitor5Name) {
          data.extra_visitor_name = [visitor1Name, visitor2Name, visitor3Name, visitor4Name, visitor5Name];
        } else if (visitor4Name) {
          data.extra_visitor_name = [visitor1Name, visitor2Name, visitor3Name, visitor4Name];
        } else if (visitor3Name) {
          data.extra_visitor_name = [visitor1Name, visitor2Name, visitor3Name];
        } else if (visitor2Name) {
          data.extra_visitor_name = [visitor1Name, visitor2Name];
        } else if (visitor1Name) {
          data.extra_visitor_name = [visitor1Name];
        } else {
          data.extra_visitor_name = [];
        }

        if (visitor5Name) {
          data.extra_visitor_image = [visitor1Upload, visitor2Upload, visitor3Upload, visitor4Upload, visitor5Upload];
        } else if (visitor4Name) {
          data.extra_visitor_image = [visitor1Upload, visitor2Upload, visitor3Upload, visitor4Upload];
        } else if (visitor3Name) {
          data.extra_visitor_image = [visitor1Upload, visitor2Upload, visitor3Upload];
        } else if (visitor2Name) {
          data.extra_visitor_image = [visitor1Upload, visitor2Upload];
        } else if (visitor1Name) {
          data.extra_visitor_image = [visitor1Upload];
        } else {
          data.extra_visitor_image = [];
        }

        if (visitor5Name) {
          data.extra_visitor_phone = [visitor1Phone, visitor2Phone, visitor3Phone, visitor4Phone, visitor5Phone];
        } else if (visitor4Name) {
          data.extra_visitor_phone = [visitor1Phone, visitor2Phone, visitor3Phone, visitor4Phone];
        } else if (visitor3Name) {
          data.extra_visitor_phone = [visitor1Phone, visitor2Phone, visitor3Phone];
        } else if (visitor2Name) {
          data.extra_visitor_phone = [visitor1Phone, visitor2Phone];
        } else if (visitor1Name) {
          data.extra_visitor_phone = [visitor1Phone];
        } else {
          data.extra_visitor_phone = [];
        }

        if (date) {
          // Input date string
          const inputDateString = date;

          // Parse the input date string into a Date object
          const inputDate = new Date(inputDateString);

          // Get the year, month, and day from the Date object
          const year = inputDate.getFullYear();
          const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
          const day = inputDate.getDate().toString().padStart(2, '0');

          // Create the output date string in the desired format
          const outputDateString = `${year}-${month}-${day}`;
          data.date = outputDateString;

          axiosInstance.post('https://api.hellokompass.com/meeting/add', data).then((res) => {
            if (res.data.code === 200) {
              toast.success(res.data.message);
              navigate('/appointment');
              reset();
            } else if (res.data.code === 400) {
              toast.failed(res.data.message);
              reset();
            } else {
              <></>;
            }
          });
        } else {
        }
      }
    }
  };

  useEffect(() => {
    const fetchData = () => {
      if (company_id) {
        axiosInstance
          .get(`https://api.hellokompass.com/payroll/loantype?com_id=${company_id}`)
          .then((res) => {
            setCompany(res.data.data);
          })
          .catch((error) => console.error(error));
      }
    };

    fetchData();
  }, [company_id]);

  /* The above code is a JavaScript code snippet that is using React hooks to manage state variables for
capturing photos using a webcam. */

  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/png' });
  }

  const onUserMedia = (e) => {
    // console.log(e);
  };

  const webcamRef = useRef(null);

  //For The First Person Image

  const [photo, setPhoto] = useState(null);
  const [uploadedPhoto, setUploadedPhoto] = useState('');

  const capture = () => {
    return new Promise((resolve, reject) => {
      const imageSrc = webcamRef.current.getScreenshot();
      const blob = dataURItoBlob(imageSrc);
      if (blob !== null) {
        setPhoto(blob);
        resolve(blob);
      } else {
        reject('Error capturing the image.');
      }
    });
  };

  const submitImage = async () => {
    try {
      const capturedPhoto = await capture(); // Capture the image

      const requestData = new FormData();
      requestData.append('module_name', 'images');
      requestData.append('file', capturedPhoto, 'captured_image.png');
      const response = await axiosInstance.post('https://api.hellokompass.com/upload/image', requestData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setUploadedPhoto(response.data.data.files.file.image);
    } catch (error) {
      console.error('Error capturing or uploading the image:', error);
    }
  };

  //Visitor 1 photo

  const [visitor1Upload, setVisitor1Upload] = useState('');
  const [visitor1Photo, setVisitor1Photo] = useState(null);

  const capture1 = React.useCallback(async () => {
    return new Promise((resolve, reject) => {
      const imageSrc1 = webcamRef.current.getScreenshot();
      const blob = dataURItoBlob(imageSrc1);
      if (blob !== null) {
        setVisitor1Photo(blob);
        resolve(blob);
      } else {
        reject('Error capturing the image.');
      }
    });
  }, [webcamRef]);

  const submitVisitor1Image = async () => {
    try {
      const capturedPhoto = await capture1(); // Capture the image

      const requestData = new FormData();
      requestData.append('module_name', 'images');
      requestData.append('file', capturedPhoto, 'captured_image.png');

      axiosInstance
        .post('https://api.hellokompass.com/upload/image', requestData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          setVisitor1Upload(res.data.data.files.file.image);
        })
        .catch((err) => console.error(err));
    } catch (error) {
      console.error('Error capturing or uploading the image:', error);
    }
  };

  const [visitor1Name, setVisitor1Name] = useState('');
  const [visitor1Phone, setVisitor1Phone] = useState('');

  const handleVisitor1Name = (e) => {
    const name = e.target.value;
    setVisitor1Name(name);
  };

  const handleVisitor1Phone = (e) => {
    const phone = e.target.value;
    setVisitor1Phone(phone);
  };

  /* The above code is a JavaScript code snippet that is using React hooks to capture an image from a
 webcam and submit it to an API endpoint. */
  const [visitor2Upload, setVisitor2Upload] = useState('');
  const [visitor2Photo, setVisitor2Photo] = useState(null);

  const capture2 = React.useCallback(async () => {
    return new Promise((resolve, reject) => {
      const imageSrc2 = webcamRef.current.getScreenshot();
      const blob = dataURItoBlob(imageSrc2);
      if (blob !== null) {
        setVisitor2Photo(blob);
        resolve(blob);
      } else {
        reject('Error capturing the image.');
      }
    });
  }, [webcamRef]);

  const submitVisitor2Image = async () => {
    try {
      const capturedPhoto = await capture2(); // Capture the image

      const requestData = new FormData();
      requestData.append('module_name', 'images');
      requestData.append('file', capturedPhoto, 'captured_image.png');

      axiosInstance
        .post('https://api.hellokompass.com/upload/image', requestData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          setVisitor2Upload(res.data.data.files.file.image);
        })
        .catch((err) => console.error(err));
    } catch (error) {
      console.error('Error capturing or uploading the image:', error);
    }
  };

  const [visitor2Name, setVisitor2Name] = useState('');
  const [visitor2Phone, setVisitor2Phone] = useState('');

  const handleVisitor2Name = (e) => {
    const name = e.target.value;
    setVisitor2Name(name);
  };

  const handleVisitor2Phone = (e) => {
    const phone = e.target.value;
    setVisitor2Phone(phone);
  };

  const [visitor3Upload, setVisitor3Upload] = useState('');
  const [visitor3Photo, setVisitor3Photo] = useState(null);

  const capture3 = React.useCallback(async () => {
    return new Promise((resolve, reject) => {
      const imageSrc3 = webcamRef.current.getScreenshot();
      const blob = dataURItoBlob(imageSrc3);
      if (blob !== null) {
        setVisitor3Photo(blob);
        resolve(blob);
      } else {
        reject('Error capturing the image.');
      }
    });
  }, [webcamRef]);

  const submitVisitor3Image = async () => {
    try {
      const capturedPhoto = await capture3(); // Capture the image

      const requestData = new FormData();
      requestData.append('module_name', 'images');
      requestData.append('file', capturedPhoto, 'captured_image.png');

      axiosInstance
        .post('https://api.hellokompass.com/upload/image', requestData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          setVisitor3Upload(res.data.data.files.file.image);
        })
        .catch((err) => console.error(err));
    } catch (error) {
      console.error('Error capturing or uploading the image:', error);
    }
  };

  const [visitor3Name, setVisitor3Name] = useState('');
  const [visitor3Phone, setVisitor3Phone] = useState('');

  const handleVisitor3Name = (e) => {
    const name = e.target.value;
    setVisitor3Name(name);
  };

  const handleVisitor3Phone = (e) => {
    const phone = e.target.value;
    setVisitor3Phone(phone);
  };

  const [visitor4Upload, setVisitor4Upload] = useState('');
  const [visitor4Photo, setVisitor4Photo] = useState(null);

  const capture4 = React.useCallback(async () => {
    return new Promise((resolve, reject) => {
      const imageSrc4 = webcamRef.current.getScreenshot();
      const blob = dataURItoBlob(imageSrc4);
      if (blob !== null) {
        setVisitor4Photo(blob);
        resolve(blob);
      } else {
        reject('Error capturing the image.');
      }
    });
  }, [webcamRef]);

  const submitVisitor4Image = async () => {
    try {
      const capturedPhoto = await capture4(); // Capture the image

      const requestData = new FormData();
      requestData.append('module_name', 'images');
      requestData.append('file', capturedPhoto, 'captured_image.png');

      axiosInstance
        .post('https://api.hellokompass.com/upload/image', requestData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          setVisitor4Upload(res.data.data.files.file.image);
        })
        .catch((err) => console.error(err));
    } catch (error) {
      console.error('Error capturing or uploading the image:', error);
    }
  };

  const handleVisitor4Name = (e) => {
    const name = e.target.value;
    setVisitor4Name(name);
  };

  const handleVisitor4Phone = (e) => {
    const phone = e.target.value;
    setVisitor4Phone(phone);
  };

  const [visitor5Upload, setVisitor5Upload] = useState('');
  const [visitor5Photo, setVisitor5Photo] = useState(null);

  const capture5 = React.useCallback(async () => {
    return new Promise((resolve, reject) => {
      const imageSrc5 = webcamRef.current.getScreenshot();
      const blob = dataURItoBlob(imageSrc5);
      if (blob !== null) {
        setVisitor5Photo(blob);
        resolve(blob);
      } else {
        reject('Error capturing the image.');
      }
    });
  }, [webcamRef]);

  const submitVisitor5Image = async () => {
    try {
      const capturedPhoto = await capture5(); // Capture the image

      const requestData = new FormData();
      requestData.append('module_name', 'images');
      requestData.append('file', capturedPhoto, 'captured_image.png');

      axiosInstance
        .post('https://api.hellokompass.com/upload/image', requestData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          setVisitor5Upload(res.data.data.files.file.image);
        })
        .catch((err) => console.error(err));
    } catch (error) {
      console.error('Error capturing or uploading the image:', error);
    }
  };

  const [visitor5Name, setVisitor5Name] = useState('');
  const [visitor5Phone, setVisitor5Phone] = useState('');

  const handleVisitor5Name = (e) => {
    const name = e.target.value;
    setVisitor5Name(name);
  };

  const handleVisitor5Phone = (e) => {
    const phone = e.target.value;
    setVisitor5Phone(phone);
  };

  // Function to handle date selection and update 'date' variable
  const handleDateChange = (selectedDate) => {
    const formattedDate = formatDate(selectedDate); // Call your formatting function
    setDate(formattedDate); // Update the 'date' variable with the formatted date
  };

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar sx={{ my: 1, mx: -2 }} align="center">
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
            Meeting Details
          </Typography>
        </Toolbar>
      </Box>
      <Divider variant="middle" />
      <Box>
        <MainCard>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Grid container>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ pr: 3 }}>
                  <Box>
                    <FormHelperText>
                      <Typography variant="h6" component="h2" color="#4e4d4e">
                        Title
                      </Typography>
                    </FormHelperText>

                    <TextField
                      fullWidth
                      id="standard-basic"
                      sx={{ mt: '9px' }}
                      name="title"
                      variant="standard"
                      placeholder="title"
                      value={person_name || (first_name && last_name)}
                    />
                    <TextField
                      fullWidth
                      id="standard-basic"
                      sx={{ mt: '9px', display: 'none' }}
                      name="guest_id"
                      value={person_id}
                      {...register('guest_id', { required: true })}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ pr: 3 }}>
                  <Box sx={{ mt: { xs: 2, sm: 0 } }}>
                    <FormHelperText>
                      <Typography variant="h6" component="h2" color="#4e4d4e">
                        Phone
                      </Typography>
                    </FormHelperText>

                    <TextField
                      id="standard-basic"
                      variant="standard"
                      fullWidth
                      sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                      inputProps={ariaLabel}
                      type="number"
                      value={person_phone || phone}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ mt: 1.5 }}>
                  <Box>
                    <FormHelperText>
                      <Typography variant="h6" component="h2" color="#4e4d4e" sx={{ mb: 0.5 }}>
                        Date
                      </Typography>
                    </FormHelperText>
                    <FormControl className="maxWidth">
                      <Controller
                        control={control}
                        name="date"
                        render={({ field }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              {...field}
                              sx={{
                                overflow: 'hidden',
                                width: '100%',
                                display: 'flex',
                                alignItems: 'spaceBetween',
                                paddingRight: 3,
                                marginTop: 1
                              }}
                              slotProps={{ textField: { variant: 'standard' } }}
                              onChange={(date) => {
                                field.onChange(date); // Update the form value
                                handleDateChange(date); // Additional actions
                              }}
                            />
                          </LocalizationProvider>
                        )}
                      />
                      <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.date?.message}</Typography>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ pr: 3 }}>
                  <Box>
                    <FormHelperText sx={{ mt: 2.5 }}>
                      <Typography variant="h6" component="h2" color="#4e4d4e">
                        Purpose
                      </Typography>
                    </FormHelperText>

                    <FormControl fullWidth sx={{ mb: 2, mt: 1 }}>
                      <Select
                        name="purpose_id"
                        variant="standard"
                        sx={{ mt: 0.4 }}
                        {...register('purpose_id', { required: true })}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        size="small"
                      >
                        <MenuItem>
                          <InputLabel htmlFor="outlined-adornment">Select Purpose</InputLabel>
                        </MenuItem>
                        {purpose.map((purpo) => (
                          <MenuItem key={purpo.PURPO_ID} sx={{ color: '#a7a7a7' }} value={purpo.PURPO_ID}>
                            {purpo.PURPO_NAME}
                          </MenuItem>
                        ))}
                      </Select>
                      <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.purpose_id?.message}</Typography>
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Grid container>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ pr: 3 }}>
                <Box>
                  <FormHelperText sx={{ mt: 1.5 }}>
                    <Typography variant="h6" component="h2" color="#4e4d4e">
                      Meeting Duration
                    </Typography>
                  </FormHelperText>

                  <FormControl fullWidth sx={{ mb: 2, mt: 1 }}>
                    <Select
                      name="duration"
                      variant="standard"
                      sx={{ mt: 0.8 }}
                      {...register('duration', { required: true })}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      size="small"
                      defaultValue=""
                      value={selectTime}
                      onChange={handleChangeTime}
                    >
                      <MenuItem value="" selected>
                        <InputLabel htmlFor="outlined-Location">Select Meeting Duration</InputLabel>
                      </MenuItem>
                      <MenuItem value="15">15 minutes</MenuItem>
                      <MenuItem value="30">30 minutes</MenuItem>
                      <MenuItem value="45">45 minutes</MenuItem>
                      <MenuItem value="60">60 minutes</MenuItem>
                      <MenuItem value="custom minutes"> Add Custom Time</MenuItem>
                    </Select>

                    {selectTime === 'custom minutes' ? (
                      <Box sx={{ mt: 2 }}>
                        <Grid container>
                          <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography variant="h6" component="h2" color="#4e4d4e">
                              Meeting Time
                            </Typography>
                            <Input
                              name="duration"
                              placeholder="minutes"
                              {...register('duration', { required: true })}
                              sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                              fullWidth
                              type="text"
                              size="small"
                            />
                          </Grid>

                          <Grid xs={12} sm={12} md={6} lg={6} sx={{ mt: -3 }}>
                            <FormHelperText sx={{ mt: 3 }}>
                              <Typography variant="h6" component="h2" color="#4e4d4e">
                                Time
                              </Typography>
                            </FormHelperText>
                            <FormControl sx={{ width: '100%' }} fullWidth>
                              <Box className="maxWidth">
                                <Controller
                                  name="time"
                                  control={control}
                                  defaultValue={selectedTime}
                                  render={({ field }) => (
                                    <StyledTimePicker
                                      showSecond={false}
                                      onChange={(value) => {
                                        const formattedValue = value.format('HH:mm');
                                        field.onChange(formattedValue);
                                        setSelectedTime(value);
                                      }}
                                      format="h:mm a"
                                      use12Hours
                                      name="name"
                                      defaultValue={defaultTime}
                                      style={{
                                        width: '100%'
                                      }}
                                    />
                                  )}
                                />
                              </Box>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Box>
                    ) : selectTime === '15' || selectTime === '30' || selectTime === '45' || selectTime === '60' ? (
                      <Box>
                        {timeDuration.length !== 0 ? (
                          <FormControl>
                            <Box>
                              <FormHelperText sx={{ mt: 1.5, ml: '-0px' }}>
                                <Typography variant="h6" component="h2" color="#4e4d4e">
                                  Time
                                </Typography>
                              </FormHelperText>

                              <Select
                                name="time"
                                variant="standard"
                                sx={{ mt: 0.8 }}
                                {...register('time', { required: true })}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                size="small"
                                defaultValue=""
                              >
                                <MenuItem value="" selected>
                                  <InputLabel htmlFor="outlined-Location"> Select Time</InputLabel>
                                </MenuItem>
                                {timeDuration.map((timeDu) => (
                                  <MenuItem
                                    key={timeDu.duration}
                                    value={`${timeDu.start}-${timeDu.end}`}
                                    sx={{ color: '#a7a7a7', width: '100%' }}
                                  >
                                    {convertTo12HourFormat(timeDu.start)} - {convertTo12HourFormat(timeDu.end)}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Box>
                          </FormControl>
                        ) : (
                          <>
                            <FormControl>
                              <Box>
                                <FormHelperText sx={{ mt: 3, ml: '-0px' }}>
                                  <Typography variant="h6" component="h2" color="#4e4d4e">
                                    Time
                                  </Typography>
                                </FormHelperText>
                                <FormControl sx={{ width: '100%' }} fullWidth>
                                  <Box className="maxWidth">
                                    <Controller
                                      name="time"
                                      control={control}
                                      defaultValue={selectedTime}
                                      render={({ field }) => (
                                        <StyledTimePicker
                                          showSecond={false}
                                          onChange={(value) => {
                                            const formattedValue = value.format('HH:mm');
                                            field.onChange(formattedValue);
                                            setSelectedTime(value);
                                          }}
                                          format="h:mm a"
                                          use12Hours
                                          name="name"
                                          defaultValue={defaultTime}
                                          style={{
                                            width: '100%'
                                          }}
                                        />
                                      )}
                                    />
                                  </Box>
                                </FormControl>
                              </Box>
                            </FormControl>
                          </>
                        )}
                      </Box>
                    ) : (
                      <></>
                    )}

                    <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.leave_category?.message}</Typography>
                  </FormControl>

                  {/* <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.time?.message}</Typography> */}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ pr: 3 }}>
                <Box>
                  <FormHelperText sx={{ mt: 2 }}>
                    <Typography variant="h6" component="h2" color="#4e4d4e">
                      Company
                    </Typography>
                  </FormHelperText>
                  <FormControl fullWidth sx={{ mt: 1 }}>
                    <Select
                      inputProps={{ 'aria-label': 'Without label' }}
                      name="location_type_id"
                      size="small"
                      {...register('location_type_id', { required: true })}
                      value={location}
                      onChange={handleChangeLocation}
                      variant="standard"
                      sx={{ mt: 0.4 }}
                      displayEmpty
                    >
                      <MenuItem value="" selected>
                        <InputLabel htmlFor="outlined-Location">Select Company </InputLabel>
                      </MenuItem>
                      {location_type?.map((locate) => (
                        <MenuItem key={locate.id} sx={{ color: '#a7a7a7' }} value={locate.company_id}>
                          {locate.company_name}
                        </MenuItem>
                      ))}
                    </Select>

                    {location && (
                      <Box sx={{ mt: 2 }}>
                        <Grid container>
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Typography variant="h6" component="h2" color="#4e4d4e">
                              Location
                            </Typography>
                            <Input
                              name="location"
                              defaultValue={location_type.find((locate) => locate.company_id === location)?.company_location || ''}
                              {...register('location', { required: true })}
                              sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                              fullWidth
                              type="text"
                              size="small"
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    )}
                  </FormControl>
                  <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.location?.message}</Typography>
                </Box>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ pr: 3 }}>
                <Box>
                  <FormHelperText sx={{ mt: 2, mb: 0.4 }}>
                    <Typography variant="h6" component="h2" color="#4e4d4e">
                      Short Note
                    </Typography>
                  </FormHelperText>
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    minRows={1.4}
                    name="note"
                    multiline
                    placeholder="Enter your text here"
                    style={{ width: '100%' }}
                    {...register('note', { required: false })}
                  />
                </Box>
                <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.note?.message}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ pr: 3 }}>
                <Box>
                  <FormHelperText sx={{ mt: 2, mb: 1 }}>
                    <Typography variant="h6" component="h2" color="#4e4d4e">
                      Additional Visitor No
                    </Typography>
                  </FormHelperText>
                  <FormControl variant="standard" fullWidth>
                    <Select
                      {...register('ex_visitor_no', { required: true })}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      value={days}
                      onChange={handleChange}
                      label="0"
                    >
                      <MenuItem value="">
                        <InputLabel selected htmlFor="outlined-adornment">
                          0
                        </InputLabel>
                      </MenuItem>
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>

            {/* Render elements when the selected value is 1 */}
            <Grid container>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6} style={{ order: 2 }} sx={{ order: { xs: 1, sm: 2 } }}>
                {selectedValue === 1 && (
                  <Grid container>
                    <Grid item xs={12} sx={{ pr: 3 }}>
                      <Grid container>
                        <Grid item xs={12} sm={6} sx={{ pr: { xs: 0, sm: 2 } }}>
                          <Box>
                            <FormHelperText>
                              <Typography variant="h6" component="h2" color="#4e4d4e">
                                Visitor(1) Name
                              </Typography>
                            </FormHelperText>
                            <Input
                              onChange={(e) => handleVisitor1Name(e)}
                              sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                              fullWidth
                              inputProps={ariaLabel}
                              type="text"
                              placeholder="Name"
                              value={visitor1Name}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box>
                            <FormHelperText>
                              <Typography variant="h6" component="h2" color="#4e4d4e">
                                Visitor(1) Phone
                              </Typography>
                            </FormHelperText>
                            <Input
                              onChange={(e) => handleVisitor1Phone(e)}
                              sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                              type="number"
                              fullWidth
                              inputProps={ariaLabel}
                              placeholder="01*********"
                              required
                            />
                          </Box>
                        </Grid>
                        <Grid container>
                          <Grid item xs={12} sm={6}>
                            <Button
                              onClick={() => submitVisitor1Image(visitor1Photo)}
                              variant="outlined"
                              size="medium"
                              sx={{ mt: 2, p: 1, color: '#12A9B2' }}
                            >
                              Visitor Photo 1
                            </Button>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            {visitor1Photo && (
                              <Avatar
                                alt="Captured"
                                src={URL.createObjectURL(visitor1Photo)}
                                variant="square"
                                sx={{ width: '100px', height: '100px', mt: 1 }}
                              />
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                )}

                {/* Render elements when the selected value is 2 */}

                {selectedValue === 2 && (
                  <Box>
                    <Grid container>
                      <Grid item xs={12} sx={{ pr: 3 }}>
                        <Grid container>
                          <Grid item xs={12} sm={6} sx={{ pr: { xs: 0, sm: 2 } }}>
                            <Box>
                              <FormHelperText>
                                <Typography variant="h6" component="h2" color="#4e4d4e">
                                  Visitor(1) Name
                                </Typography>
                              </FormHelperText>
                              <Input
                                onChange={(e) => handleVisitor1Name(e)}
                                sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                fullWidth
                                inputProps={ariaLabel}
                                type="text"
                                placeholder="Name"
                                value={visitor1Name}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <FormHelperText>
                                <Typography variant="h6" component="h2" color="#4e4d4e">
                                  Visitor(1) Phone
                                </Typography>
                              </FormHelperText>
                              <Input
                                onChange={(e) => handleVisitor1Phone(e)}
                                sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                type="number"
                                fullWidth
                                inputProps={ariaLabel}
                                placeholder="01*********"
                                required
                              />
                            </Box>
                          </Grid>
                          <Grid container>
                            <Grid item xs={12} sm={6}>
                              <Button
                                onClick={() => submitVisitor1Image(visitor1Photo)}
                                variant="outlined"
                                size="medium"
                                sx={{ mt: 2, p: 1, color: '#12A9B2' }}
                              >
                                Visitor Photo 1
                              </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              {visitor1Photo && (
                                <Avatar
                                  alt="Captured"
                                  src={URL.createObjectURL(visitor1Photo)}
                                  variant="square"
                                  sx={{ width: '100px', height: '100px', mt: 1 }}
                                />
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} sx={{ pr: 3 }}>
                        <Grid container>
                          <Grid item xs={12} sm={6} sx={{ pr: { xs: 0, sm: 2 } }}>
                            <Box>
                              <FormHelperText>
                                <Typography variant="h6" component="h2" color="#4e4d4e">
                                  Visitor(2) Name
                                </Typography>
                              </FormHelperText>
                              <Input
                                onChange={(e) => handleVisitor2Name(e)}
                                sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                fullWidth
                                inputProps={ariaLabel}
                                type="text"
                                placeholder="Name"
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <FormHelperText>
                                <Typography variant="h6" component="h2" color="#4e4d4e">
                                  Visitor(2) Phone
                                </Typography>
                              </FormHelperText>
                              <Input
                                onChange={(e) => handleVisitor2Phone(e)}
                                sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                type="number"
                                fullWidth
                                inputProps={ariaLabel}
                                placeholder="01*********"
                              />
                            </Box>
                          </Grid>
                          <Grid container>
                            <Grid item xs={12} sm={6}>
                              <Button
                                onClick={() => submitVisitor2Image(visitor2Photo)}
                                variant="outlined"
                                size="medium"
                                sx={{ mt: 2, p: 1, color: '#12A9B2' }}
                              >
                                Visitor Photo 2
                              </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              {visitor2Photo && (
                                <Avatar
                                  alt="Captured"
                                  src={URL.createObjectURL(visitor2Photo)}
                                  variant="square"
                                  sx={{ width: '100px', height: '100px', mt: 1 }}
                                />
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                )}

                {/* Render elements when the selected value is 3 */}

                {selectedValue === 3 && (
                  <Box>
                    <Grid container>
                      <Grid item xs={12} sx={{ pr: 3 }}>
                        <Grid container>
                          <Grid item xs={12} sm={6} sx={{ pr: { xs: 0, sm: 2 } }}>
                            <Box>
                              <FormHelperText>
                                <Typography variant="h6" component="h2" color="#4e4d4e">
                                  Visitor(1) Name
                                </Typography>
                              </FormHelperText>
                              <Input
                                onChange={(e) => handleVisitor1Name(e)}
                                sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                fullWidth
                                inputProps={ariaLabel}
                                type="text"
                                placeholder="Name"
                                value={visitor1Name}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <FormHelperText>
                                <Typography variant="h6" component="h2" color="#4e4d4e">
                                  Visitor(1) Phone
                                </Typography>
                              </FormHelperText>
                              <Input
                                onChange={(e) => handleVisitor1Phone(e)}
                                sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                type="number"
                                fullWidth
                                inputProps={ariaLabel}
                                placeholder="01*********"
                                required
                              />
                            </Box>
                          </Grid>
                          <Grid container>
                            <Grid item xs={12} sm={6}>
                              <Button
                                onClick={() => submitVisitor1Image(visitor1Photo)}
                                variant="outlined"
                                size="medium"
                                sx={{ mt: 2, p: 1, color: '#12A9B2' }}
                              >
                                Visitor Photo 1
                              </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              {visitor1Photo && (
                                <Avatar
                                  alt="Captured"
                                  src={URL.createObjectURL(visitor1Photo)}
                                  variant="square"
                                  sx={{ width: '100px', height: '100px', mt: 1 }}
                                />
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} sx={{ pr: 3 }}>
                        <Grid container>
                          <Grid item xs={12} sm={6} sx={{ pr: { xs: 0, sm: 2 } }}>
                            <Box>
                              <FormHelperText>
                                <Typography variant="h6" component="h2" color="#4e4d4e">
                                  Visitor(2) Name
                                </Typography>
                              </FormHelperText>
                              <Input
                                onChange={(e) => handleVisitor2Name(e)}
                                sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                fullWidth
                                inputProps={ariaLabel}
                                type="text"
                                placeholder="Name"
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <FormHelperText>
                                <Typography variant="h6" component="h2" color="#4e4d4e">
                                  Visitor(2) Phone
                                </Typography>
                              </FormHelperText>
                              <Input
                                onChange={(e) => handleVisitor2Phone(e)}
                                sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                type="number"
                                fullWidth
                                inputProps={ariaLabel}
                                placeholder="01*********"
                              />
                            </Box>
                          </Grid>
                          <Grid container>
                            <Grid item xs={12} sm={6}>
                              <Button
                                onClick={() => submitVisitor2Image(visitor2Photo)}
                                variant="outlined"
                                size="medium"
                                sx={{ mt: 2, p: 1, color: '#12A9B2' }}
                              >
                                Visitor Photo 2
                              </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              {visitor2Photo && (
                                <Avatar
                                  alt="Captured"
                                  src={URL.createObjectURL(visitor2Photo)}
                                  variant="square"
                                  sx={{ width: '100px', height: '100px', mt: 1 }}
                                />
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid item xs={12} sx={{ pr: 3 }}>
                        <Grid container>
                          <Grid item xs={12} sm={6} sx={{ pr: { xs: 0, sm: 2 } }}>
                            <Box>
                              <FormHelperText>
                                <Typography variant="h6" component="h2" color="#4e4d4e">
                                  Visitor(3) Name
                                </Typography>
                              </FormHelperText>
                              <Input
                                onChange={(e) => handleVisitor3Name(e)}
                                sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                fullWidth
                                inputProps={ariaLabel}
                                type="text"
                                placeholder="Name"
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <FormHelperText>
                                <Typography variant="h6" component="h2" color="#4e4d4e">
                                  Visitor(3) Phone
                                </Typography>
                              </FormHelperText>
                              <Input
                                onChange={(e) => handleVisitor3Phone(e)}
                                sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                type="number"
                                fullWidth
                                inputProps={ariaLabel}
                                placeholder="01*********"
                              />
                            </Box>
                          </Grid>
                          <Grid container>
                            <Grid item xs={12} sm={6}>
                              <Button
                                onClick={() => submitVisitor3Image(visitor3Photo)}
                                variant="outlined"
                                size="medium"
                                sx={{ mt: 2, p: 1, color: '#12A9B2' }}
                              >
                                Visitor Photo 3
                              </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              {visitor3Photo && (
                                <Avatar
                                  alt="Captured"
                                  src={URL.createObjectURL(visitor3Photo)}
                                  variant="square"
                                  sx={{ width: '100px', height: '100px', mt: 1 }}
                                />
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                )}

                {/* Render elements when the selected value is 4 */}

                {selectedValue === 4 && (
                  <Box>
                    <Grid container>
                      <Grid item xs={12} sx={{ pr: 3 }}>
                        <Grid container>
                          <Grid item xs={12} sm={6} sx={{ pr: { xs: 0, sm: 2 } }}>
                            <Box>
                              <FormHelperText>
                                <Typography variant="h6" component="h2" color="#4e4d4e">
                                  Visitor(1) Name
                                </Typography>
                              </FormHelperText>
                              <Input
                                onChange={(e) => handleVisitor1Name(e)}
                                sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                fullWidth
                                inputProps={ariaLabel}
                                type="text"
                                placeholder="Name"
                                value={visitor1Name}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <FormHelperText>
                                <Typography variant="h6" component="h2" color="#4e4d4e">
                                  Visitor(1) Phone
                                </Typography>
                              </FormHelperText>
                              <Input
                                onChange={(e) => handleVisitor1Phone(e)}
                                sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                type="number"
                                fullWidth
                                inputProps={ariaLabel}
                                placeholder="01*********"
                                required
                              />
                            </Box>
                          </Grid>
                          <Grid container>
                            <Grid item xs={12} sm={6}>
                              <Button
                                onClick={() => submitVisitor1Image(visitor1Photo)}
                                variant="outlined"
                                size="medium"
                                sx={{ mt: 2, p: 1, color: '#12A9B2' }}
                              >
                                Visitor Photo 1
                              </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              {visitor1Photo && (
                                <Avatar
                                  alt="Captured"
                                  src={URL.createObjectURL(visitor1Photo)}
                                  variant="square"
                                  sx={{ width: '100px', height: '100px', mt: 1 }}
                                />
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} sx={{ pr: 3 }}>
                        <Grid container>
                          <Grid item xs={12} sm={6} sx={{ pr: { xs: 0, sm: 2 } }}>
                            <Box>
                              <FormHelperText>
                                <Typography variant="h6" component="h2" color="#4e4d4e">
                                  Visitor(2) Name
                                </Typography>
                              </FormHelperText>
                              <Input
                                onChange={(e) => handleVisitor2Name(e)}
                                sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                fullWidth
                                inputProps={ariaLabel}
                                type="text"
                                placeholder="Name"
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <FormHelperText>
                                <Typography variant="h6" component="h2" color="#4e4d4e">
                                  Visitor(2) Phone
                                </Typography>
                              </FormHelperText>
                              <Input
                                onChange={(e) => handleVisitor2Phone(e)}
                                sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                type="number"
                                fullWidth
                                inputProps={ariaLabel}
                                placeholder="01*********"
                              />
                            </Box>
                          </Grid>
                          <Grid container>
                            <Grid item xs={12} sm={6}>
                              <Button
                                onClick={() => submitVisitor2Image(visitor2Photo)}
                                variant="outlined"
                                size="medium"
                                sx={{ mt: 2, p: 1, color: '#12A9B2' }}
                              >
                                Visitor Photo 2
                              </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              {visitor2Photo && (
                                <Avatar
                                  alt="Captured"
                                  src={URL.createObjectURL(visitor2Photo)}
                                  variant="square"
                                  sx={{ width: '100px', height: '100px', mt: 1 }}
                                />
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} sx={{ pr: 3 }}>
                        <Grid container>
                          <Grid item xs={12} sm={6} sx={{ pr: { xs: 0, sm: 2 } }}>
                            <Box>
                              <FormHelperText>
                                <Typography variant="h6" component="h2" color="#4e4d4e">
                                  Visitor(3) Name
                                </Typography>
                              </FormHelperText>
                              <Input
                                onChange={(e) => handleVisitor3Name(e)}
                                sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                fullWidth
                                inputProps={ariaLabel}
                                type="text"
                                placeholder="Name"
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <FormHelperText>
                                <Typography variant="h6" component="h2" color="#4e4d4e">
                                  Visitor(3) Phone
                                </Typography>
                              </FormHelperText>
                              <Input
                                onChange={(e) => handleVisitor3Phone(e)}
                                sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                type="number"
                                fullWidth
                                inputProps={ariaLabel}
                                placeholder="01*********"
                              />
                            </Box>
                          </Grid>
                          <Grid container>
                            <Grid item xs={12} sm={6}>
                              <Button
                                onClick={() => submitVisitor3Image(visitor3Photo)}
                                variant="outlined"
                                size="medium"
                                sx={{ mt: 2, p: 1, color: '#12A9B2' }}
                              >
                                Visitor Photo 3
                              </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              {visitor3Photo && (
                                <Avatar
                                  alt="Captured"
                                  src={URL.createObjectURL(visitor3Photo)}
                                  variant="square"
                                  sx={{ width: '100px', height: '100px', mt: 1 }}
                                />
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} sx={{ pr: 3 }}>
                        <Grid container>
                          <Grid item xs={12} sm={6} sx={{ pr: { xs: 0, sm: 2 } }}>
                            <Box>
                              <FormHelperText>
                                <Typography variant="h6" component="h2" color="#4e4d4e">
                                  Visitor(4) Name
                                </Typography>
                              </FormHelperText>
                              <Input
                                onChange={(e) => handleVisitor4Name(e)}
                                sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                fullWidth
                                inputProps={ariaLabel}
                                type="text"
                                placeholder="Name"
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <FormHelperText>
                                <Typography variant="h6" component="h2" color="#4e4d4e">
                                  Visitor(4) Phone
                                </Typography>
                              </FormHelperText>
                              <Input
                                onChange={(e) => handleVisitor4Phone(e)}
                                sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                type="number"
                                fullWidth
                                inputProps={ariaLabel}
                                placeholder="01*********"
                              />
                            </Box>
                          </Grid>
                          <Grid container>
                            <Grid item xs={12} sm={6}>
                              <Button
                                onClick={() => submitVisitor4Image(visitor4Photo)}
                                variant="outlined"
                                size="medium"
                                sx={{ mt: 2, p: 1, color: '#12A9B2' }}
                              >
                                Visitor Photo 4
                              </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              {visitor4Photo && (
                                <Avatar
                                  alt="Captured"
                                  src={URL.createObjectURL(visitor4Photo)}
                                  variant="square"
                                  sx={{ width: '100px', height: '100px', mt: 1 }}
                                />
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                )}

                {selectedValue === 5 && (
                  <Box>
                    <Grid container>
                      <Grid item xs={12} sx={{ pr: 3 }}>
                        <Grid container>
                          <Grid item xs={12} sm={6} sx={{ pr: { xs: 0, sm: 2 } }}>
                            <Box>
                              <FormHelperText>
                                <Typography variant="h6" component="h2" color="#4e4d4e">
                                  Visitor(1) Name
                                </Typography>
                              </FormHelperText>
                              <Input
                                onChange={(e) => handleVisitor1Name(e)}
                                sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                fullWidth
                                inputProps={ariaLabel}
                                type="text"
                                placeholder="Name"
                                value={visitor1Name}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <FormHelperText>
                                <Typography variant="h6" component="h2" color="#4e4d4e">
                                  Visitor(1) Phone
                                </Typography>
                              </FormHelperText>
                              <Input
                                onChange={(e) => handleVisitor1Phone(e)}
                                sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                type="number"
                                fullWidth
                                inputProps={ariaLabel}
                                placeholder="01*********"
                                required
                              />
                            </Box>
                          </Grid>
                          <Grid container>
                            <Grid item xs={12} sm={6}>
                              <Button
                                onClick={() => submitVisitor1Image(visitor1Photo)}
                                variant="outlined"
                                size="medium"
                                sx={{ mt: 2, p: 1, color: '#12A9B2' }}
                              >
                                Visitor Photo 1
                              </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              {visitor1Photo && (
                                <Avatar
                                  alt="Captured"
                                  src={URL.createObjectURL(visitor1Photo)}
                                  variant="square"
                                  sx={{ width: '100px', height: '100px', mt: 1 }}
                                />
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} sx={{ pr: 3 }}>
                        <Grid container>
                          <Grid item xs={12} sm={6} sx={{ pr: { xs: 0, sm: 2 } }}>
                            <Box>
                              <FormHelperText>
                                <Typography variant="h6" component="h2" color="#4e4d4e">
                                  Visitor(2) Name
                                </Typography>
                              </FormHelperText>
                              <Input
                                onChange={(e) => handleVisitor2Name(e)}
                                sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                fullWidth
                                inputProps={ariaLabel}
                                type="text"
                                placeholder="Name"
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <FormHelperText>
                                <Typography variant="h6" component="h2" color="#4e4d4e">
                                  Visitor(2) Phone
                                </Typography>
                              </FormHelperText>
                              <Input
                                onChange={(e) => handleVisitor2Phone(e)}
                                sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                type="number"
                                fullWidth
                                inputProps={ariaLabel}
                                placeholder="01*********"
                              />
                            </Box>
                          </Grid>
                          <Grid container>
                            <Grid item xs={12} sm={6}>
                              <Button
                                onClick={() => submitVisitor2Image(visitor2Photo)}
                                variant="outlined"
                                size="medium"
                                sx={{ mt: 2, p: 1, color: '#12A9B2' }}
                              >
                                Visitor Photo 2
                              </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              {visitor2Photo && (
                                <Avatar
                                  alt="Captured"
                                  src={URL.createObjectURL(visitor2Photo)}
                                  variant="square"
                                  sx={{ width: '100px', height: '100px', mt: 1 }}
                                />
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} sx={{ pr: 3 }}>
                        <Grid container>
                          <Grid item xs={12} sm={6} sx={{ pr: { xs: 0, sm: 2 } }}>
                            <Box>
                              <FormHelperText>
                                <Typography variant="h6" component="h2" color="#4e4d4e">
                                  Visitor(3) Name
                                </Typography>
                              </FormHelperText>
                              <Input
                                onChange={(e) => handleVisitor3Name(e)}
                                sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                fullWidth
                                inputProps={ariaLabel}
                                type="text"
                                placeholder="Name"
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <FormHelperText>
                                <Typography variant="h6" component="h2" color="#4e4d4e">
                                  Visitor(3) Phone
                                </Typography>
                              </FormHelperText>
                              <Input
                                onChange={(e) => handleVisitor3Phone(e)}
                                sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                type="number"
                                fullWidth
                                inputProps={ariaLabel}
                                placeholder="01*********"
                              />
                            </Box>
                          </Grid>
                          <Grid container>
                            <Grid item xs={12} sm={6}>
                              <Button
                                onClick={() => submitVisitor3Image(visitor3Photo)}
                                variant="outlined"
                                size="medium"
                                sx={{ mt: 2, p: 1, color: '#12A9B2' }}
                              >
                                Visitor Photo 3
                              </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              {visitor3Photo && (
                                <Avatar
                                  alt="Captured"
                                  src={URL.createObjectURL(visitor3Photo)}
                                  variant="square"
                                  sx={{ width: '100px', height: '100px', mt: 1 }}
                                />
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} sx={{ pr: 3 }}>
                        <Grid container>
                          <Grid item xs={12} sm={6} sx={{ pr: { xs: 0, sm: 2 } }}>
                            <Box>
                              <FormHelperText>
                                <Typography variant="h6" component="h2" color="#4e4d4e">
                                  Visitor(4) Name
                                </Typography>
                              </FormHelperText>
                              <Input
                                onChange={(e) => handleVisitor4Name(e)}
                                sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                fullWidth
                                inputProps={ariaLabel}
                                type="text"
                                placeholder="Name"
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <FormHelperText>
                                <Typography variant="h6" component="h2" color="#4e4d4e">
                                  Visitor(4) Phone
                                </Typography>
                              </FormHelperText>
                              <Input
                                onChange={(e) => handleVisitor4Phone(e)}
                                sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                type="number"
                                fullWidth
                                inputProps={ariaLabel}
                                placeholder="01*********"
                              />
                            </Box>
                          </Grid>
                          <Grid container>
                            <Grid item xs={12} sm={6}>
                              <Button
                                onClick={() => submitVisitor4Image(visitor4Photo)}
                                variant="outlined"
                                size="medium"
                                sx={{ mt: 2, p: 1, color: '#12A9B2' }}
                              >
                                Visitor Photo 4
                              </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              {visitor4Photo && (
                                <Avatar
                                  alt="Captured"
                                  src={URL.createObjectURL(visitor4Photo)}
                                  variant="square"
                                  sx={{ width: '100px', height: '100px', mt: 1 }}
                                />
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid item xs={12} sx={{ pr: 3 }}>
                        <Grid container>
                          <Grid item xs={12} sm={6} sx={{ pr: { xs: 0, sm: 2 } }}>
                            <Box>
                              <FormHelperText>
                                <Typography variant="h6" component="h2" color="#4e4d4e">
                                  Visitor(5) Name
                                </Typography>
                              </FormHelperText>
                              <Input
                                onChange={(e) => handleVisitor5Name(e)}
                                sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                fullWidth
                                inputProps={ariaLabel}
                                type="text"
                                placeholder="Name"
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <FormHelperText>
                                <Typography variant="h6" component="h2" color="#4e4d4e">
                                  Visitor(5) Phone
                                </Typography>
                              </FormHelperText>
                              <Input
                                onChange={(e) => handleVisitor5Phone(e)}
                                sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                type="number"
                                fullWidth
                                inputProps={ariaLabel}
                                placeholder="01*********"
                              />
                            </Box>
                          </Grid>
                          <Grid container>
                            <Grid item xs={12} sm={6}>
                              <Button
                                onClick={() => submitVisitor5Image(visitor5Photo)}
                                variant="outlined"
                                size="medium"
                                sx={{ mt: 2, p: 1, color: '#12A9B2' }}
                              >
                                Visitor Photo 5
                              </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              {visitor5Photo && (
                                <Avatar
                                  alt="Captured"
                                  src={URL.createObjectURL(visitor5Photo)}
                                  variant="square"
                                  sx={{ width: '100px', height: '100px', mt: 1 }}
                                />
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Grid>
              {/* camera */}
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6} style={{ order: { xs: 2, sm: 1 } }} sx={{ order: { xs: 2, sm: 1 }, mt: 2 }}>
                <Grid container>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ pr: 3 }}>
                    <Webcam
                      ref={webcamRef}
                      audio={false}
                      screenshotFormat="image/png"
                      videoConstraints={videoConstraints}
                      onUserMedia={onUserMedia}
                      mirrored={true}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ pr: 3 }}>
                    {photo && (
                      <Avatar alt="Captured" src={URL.createObjectURL(photo)} variant="square" sx={{ width: '150px', height: '150px' }} />
                    )}
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pr: 3 }}>
                    <Button onClick={() => submitImage(photo)} variant="outlined" size="medium" sx={{ my: 2, p: 1, color: '#12A9B2' }}>
                      Take Photo
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button
                onClick={handleButtonCancel}
                variant="contained"
                size="small"
                sx={{ backgroundColor: '#12A9B2', width: 100, mr: 2, '&:hover': { backgroundColor: '#12A9B2' } }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                size="small"
                sx={{ backgroundColor: '#12A9B2', width: 100, '&:hover': { backgroundColor: '#12A9B2' } }}
              >
                Next
              </Button>
            </Box>
          </form>
        </MainCard>
      </Box>
    </Box>
  );
}
