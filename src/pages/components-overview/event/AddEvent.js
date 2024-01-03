import React, { useEffect, useState } from 'react';
import {
  Box,
  Toolbar,
  Typography,
  Divider,
  MenuItem,
  Select,
  Grid,
  FormHelperText,
  Input,
  FormControl,
  Button,
  InputLabel
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import MainCard from 'components/MainCard';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ReactQuill from 'react-quill';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import { editAdd } from 'components/validation/Validation';

import axiosInstance from 'utils/axios.config';
import { useAppContext } from 'AppContextProvider';
import { yupResolver } from '@hookform/resolvers/yup';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import { styled } from '@mui/material/styles';
import '../../../assets/third-party/styles.css';
import 'react-datepicker/dist/react-datepicker.css';

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

const AddEvent = () => {
  const ariaLabel = { 'aria-label': 'description' };
  const { profile } = useAppContext();
  const personId = profile.person_id;
  const navigate = useNavigate();
  const defaultTime = moment();
  const [selectedStartTime, setSelectedStartTime] = useState(defaultTime);
  const [selectedEndTime, setSelectedEndTime] = useState(defaultTime);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(editAdd)
  });
  const onSubmit = (data) => {
    data.start_time = selectedStartTime.format('HH:mm');
    data.end_time = selectedEndTime.format('HH:mm');
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
        const inputDateString = date;
        const inputDate = new Date(inputDateString);

        const year = inputDate.getFullYear();
        const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
        const day = inputDate.getDate().toString().padStart(2, '0');

        const outputDateString = `${year}-${month}-${day}`;
        data.date = outputDateString;

        axiosInstance.post('https://api.hellokompass.com/event/add', data).then((res) => {
          if (res.data.code === 200) {
            toast.success(res.data.message);
            navigate('/event');
            reset();
          } else if (res.data.code === 400) {
            toast.failed(res.data.message);
            reset();
          } else {
            <></>;
          }
        });
      }
    }
  };

  const [eventType, setEventType] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get('https://api.hellokompass.com/evnttype')
        .then((res) => setEventType(res.data.data))
        .catch((err) => console.error(err));
    };
    fetchData();
  }, []);

  const handleEventType = (e) => {};

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar sx={{ my: 1, mx: -2 }} align="center">
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
            Add Event
          </Typography>
        </Toolbar>
      </Box>
      <Divider variant="middle" sx={{ mb: 3 }} />
      <Box>
        <MainCard>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Grid container>
                <Grid items={true} xs={12} sm={6} md={6} lg={6} xl={6} sx={{ pr: 3 }}>
                  <Box>
                    <FormHelperText>
                      <Typography variant="h6" component="h2" color="#4e4d4e">
                        Title
                      </Typography>
                    </FormHelperText>
                    <Input
                      {...register('title', { required: true })}
                      sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                      fullWidth
                      inputProps={ariaLabel}
                      type="text"
                      displayEmpty
                      placeholder="Event Name"
                    />
                    <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.title?.message}</Typography>
                    {personId && (
                      <Input
                        {...register('person_id', { required: true })}
                        sx={{ mt: 1, color: '#4e4d4e', pr: 1, display: 'none' }}
                        value={personId}
                        fullWidth
                        type="text"
                        name="person_id"
                      />
                    )}
                  </Box>
                </Grid>
                <Grid items={true} xs={12} sm={6} md={6} lg={6} xl={6} sx={{ pr: 3 }}>
                  <Box>
                    <FormHelperText sx={{ mb: 1.5 }}>
                      <Typography variant="h6" component="h2" color="#4e4d4e">
                        Event Type
                      </Typography>
                    </FormHelperText>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <Select
                        {...register('evnt_type_id', { required: true })}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        size="small"
                        onChange={handleEventType}
                        variant="standard"
                      >
                        <MenuItem>
                          <InputLabel selected htmlFor="outlined-adornment">
                            Select Event Type
                          </InputLabel>
                        </MenuItem>
                        {eventType.map((type) => (
                          <MenuItem value={type.evtp_id} key={type.evtp_id}>
                            {type.evtp_name}
                          </MenuItem>
                        ))}
                      </Select>
                      <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.evnt_type_id?.message}</Typography>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid items={true} xs={12} sm={6} md={6} lg={6} xl={6}>
                  <Box sx={{ mt: { xs: 2, sm: 0 } }}>
                    <FormHelperText>
                      <Typography variant="h6" component="h2" color="#4e4d4e">
                        Date
                      </Typography>
                    </FormHelperText>
                    <Box>
                      <FormControl className="maxWidth">
                        <Controller
                          control={control}
                          name="date"
                          render={({ field }) => (
                            <Box>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  {...field}
                                  sx={{
                                    overflow: 'hidden',
                                    width: '100%',
                                    display: 'flex',
                                    alignItem: 'spaceBetween',
                                    pr: 3,
                                    mt: 1
                                  }}
                                  slotProps={{ textField: { variant: 'standard' } }}
                                />
                              </LocalizationProvider>
                            </Box>
                          )}
                        />
                      </FormControl>
                    </Box>

                    <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.date?.message}</Typography>
                  </Box>
                </Grid>
                <Grid items={true} xs={12} sm={6} md={6} lg={6} xl={6} sx={{ pr: 3 }}>
                  <Box>
                    <FormHelperText>
                      <Typography variant="h6" component="h2" color="#4e4d4e">
                        Location
                      </Typography>
                    </FormHelperText>
                    <Input
                      {...register('location', { required: true })}
                      fullWidth
                      inputProps={ariaLabel}
                      type="text"
                      displayEmpty
                      sx={{ mt: 1, color: '#4e4d4e' }}
                      placeholder="Meeting Address"
                    />
                    <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.location?.message}</Typography>
                  </Box>
                </Grid>
                <Grid items={true} xs={12} sm={6} md={6} lg={6} xl={6} sx={{ pr: 3 }}>
                  <FormHelperText sx={{ mt: 2 }}>
                    <Typography variant="h6" component="h2" color="#4e4d4e">
                      Start Time
                    </Typography>
                  </FormHelperText>

                  <FormControl sx={{ mt: 0 }} fullWidth className="maxWidth">
                    <Box className="maxWidth">
                      <Controller
                        name="start_time"
                        control={control}
                        defaultValue={selectedStartTime}
                        render={({ field }) => (
                          <StyledTimePicker
                            showSecond={false}
                            onChange={(value) => {
                              field.onChange(value);
                              setSelectedStartTime(value);
                            }}
                            format="h:mm a"
                            use12Hours
                            name="start_time"
                            defaultValue={defaultTime}
                            style={{
                              width: '100%'
                            }}
                          />
                        )}
                      />
                    </Box>
                  </FormControl>
                  <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.start_time?.message}</Typography>
                </Grid>
                <Grid items={true} xs={12} sm={6} md={6} lg={6} xl={6} sx={{ pr: 3 }}>
                  <FormHelperText sx={{ mt: 2 }}>
                    <Typography variant="h6" component="h2" color="#4e4d4e">
                      End Time
                    </Typography>
                  </FormHelperText>

                  <FormControl sx={{ mt: 0 }} fullWidth className="maxWidth">
                    <Box className="maxWidth">
                      <Controller
                        name="end_time"
                        control={control}
                        defaultValue={selectedEndTime}
                        render={({ field }) => (
                          <StyledTimePicker
                            showSecond={false}
                            onChange={(value) => {
                              field.onChange(value);
                              setSelectedEndTime(value);
                            }}
                            format="h:mm a"
                            use12Hours
                            name="end_time"
                            defaultValue={defaultTime}
                            style={{
                              width: '100%'
                            }}
                          />
                        )}
                      />
                    </Box>
                  </FormControl>
                  <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.start_time?.message}</Typography>
                </Grid>
              </Grid>
            </Box>
            <Grid container>
              <Grid items={true} xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pr: 3 }}>
                <Box sx={{ mt: { xs: 2, sm: 0 } }}>
                  <FormHelperText sx={{ my: 2 }}>
                    <Typography variant="h6" component="h2" color="#4e4d4e">
                      Event Details
                    </Typography>
                  </FormHelperText>
                  <FormControl className="maxWidth">
                    <Controller
                      name="details"
                      control={control}
                      render={({ field }) => (
                        <ReactQuill
                          placeholder="Enter a short note"
                          {...field}
                          theme="snow"
                          modules={{
                            toolbar: [
                              [{ header: [1, 2, false] }],
                              ['bold', 'italic', 'underline', 'blockquote'],
                              [{ list: 'ordered' }, { list: 'bullet' }]
                            ]
                          }}
                          formats={['header', 'bold', 'italic', 'underline', 'blockquote', 'list', 'bullet']}
                        />
                      )}
                    />
                  </FormControl>
                  <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.details?.message}</Typography>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="outlined" type="submit" size="medium" sx={{ mt: 4, p: 0, color: '#12A9B2' }}>
                Send
              </Button>
            </Box>
          </form>
        </MainCard>
      </Box>
    </Box>
  );
};

export default AddEvent;
