import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, FormControl, MenuItem, Select, Typography, Divider, InputLabel, TextField, Grid, Button } from '@mui/material';
import MainCard from 'components/MainCard';
import 'react-datepicker/dist/react-datepicker.css';
import LeaveItem from './LeaveItem';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useAppContext } from 'AppContextProvider';
import axiosInstance from 'utils/axios.config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { leavePage } from 'components/validation/Validation';
import { debounce } from 'lodash';
import leaveImage from '../../../assets/images/image/leave.png';
import '../../../assets/third-party/styles.css';

export default function LeaveApply() {
  const navigate = useNavigate();
  const currentDate = new Date();
  const originalDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: '2-digit'
  });

  const parts = originalDate.split('/');
  const formattedDate = `${parts[2]}-${parts[0]}-${parts[1]}`;

  const { leave, setLeave } = useAppContext();

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(leavePage)
  });

  const [leaveData, setLeaveData] = useState('');
  const handleLeave = (leaveName) => {
    setLeaveData(leaveName);
  };

  const calculateTotalDays = (fromDate, toDate) => {
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);
    const timeDifference = toDateObj - fromDateObj;
    const totalDays = timeDifference / (1000 * 3600 * 24);
    return totalDays;
  };
  const fromdate = watch('fromdate');
  const todate = watch('todate');
  const totalDays = calculateTotalDays(fromdate, todate);

  const onSubmit = (data) => {
    const { fromdate, todate } = data;
    const total_days = calculateTotalDays(fromdate, todate);
    data.total_days = total_days + 1;
    const leaveObject = leave.find((l) => l.name === leaveData);
    const threshold = parseInt(leaveObject.avail_leave);
    if (fromdate) {
      const currentDate = new Date();
      const currentSelectedDate = new Date(currentDate);
      const today = currentSelectedDate.setHours(0, 0, 0, 0);
      const inputDateString = fromdate;
      const inputDate = new Date(inputDateString);
      const selectedDate = new Date(inputDate);
      const selectedDateTime = selectedDate.setHours(0, 0, 0, 0);

      if (selectedDateTime < today) {
        toast.error("You can't select a date from the past");
      } else {
        if (total_days + 1 <= threshold) {
          const fromDate = new Date(fromdate);
          const toDate = new Date(todate);

          if (!isNaN(fromDate) && !isNaN(toDate)) {
            const formattedFromDate = formatDate(fromDate);
            const formattedToDate = formatDate(toDate);

            data.fromdate = formattedFromDate;
            data.todate = formattedToDate;

            axiosInstance.post('https://api.hellokompass.com/payroll/leaveapply', data).then((res) => {
              if (res.data.code === 200) {
                toast.success(res.data.message);
                reset();
                navigate('/leave/list');
              } else {
                <></>;
              }
            });
          } else {
            console.error('Invalid date format');
          }
        } else {
          toast.error(`Your can take ${threshold} ${threshold === 0 ? 'day' : 'days'} for ${leaveObject.full_name}`);
        }
      }
    }
  };

  function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    const fetchData = debounce(() => {
      axiosInstance
        .get('https://api.hellokompass.com/payroll/leavetype')
        .then((res) => {
          setLeave(res.data.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, 100);

    fetchData();

    return () => {
      if (fetchData.cancel) {
        fetchData.cancel();
      }
    };
  }, []);

  return (
    <Box>
      <Box sx={{ mb: 1 }}>
        <LeaveItem />
      </Box>
      <Box>
        <MainCard>
          <Box id="modal-modal-title" sx={{ width: '100%' }}>
            <Typography variant="h5" component="h2">
              Leave Application Form
            </Typography>
          </Box>
          <Divider variant="middle" sx={{ my: 3 }} />
          <Grid xs={12}>
            <Grid container spacing={3}>
              <Grid items xs={12} sm={12} md={6} lg={6} xl={6}>
                <Box sx={{ my: 4, px: { xs: 2, md: 6, lg: 6, xl: 8 } }}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Box>
                          <Grid container>
                            <Grid item xs={12} sm={12} md={12} lg={2}>
                              <Typography variant="p" component="div" sx={{ mb: 1 }}>
                                Leave Type
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={10}>
                              <FormControl fullWidth sx={{ mb: 2 }}>
                                <Select
                                  {...register('leave_category', { required: true })}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                  size="medium"
                                >
                                  <MenuItem>
                                    <InputLabel selected htmlFor="outlined-adornment">
                                      Select Leave Type
                                    </InputLabel>
                                  </MenuItem>
                                  {leave.map((causeType) => (
                                    <MenuItem value={causeType.name} key={causeType.name} onClick={() => handleLeave(causeType.name)}>
                                      {causeType.full_name}
                                    </MenuItem>
                                  ))}
                                </Select>
                                <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.leave_category?.message}</Typography>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>

                    <Grid container spacing={2} mb="12px">
                      <Grid item xs={12} sm={12} md={12} lg={2}>
                        <Typography variant="p" component="div">
                          From
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={10}>
                        <Box>
                          <FormControl className="maxWidth">
                            <Controller
                              control={control}
                              name="fromdate"
                              render={({ field }) => (
                                <Box>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                      {...field}
                                      sx={{
                                        overflow: 'hidden',
                                        width: '100%',
                                        display: 'flex',
                                        alignItem: 'spaceBetween'
                                      }}
                                    />
                                  </LocalizationProvider>
                                </Box>
                              )}
                            />
                          </FormControl>
                        </Box>
                        <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.fromdate?.message}</Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={12} lg={2}>
                        <Typography variant="p" component="div">
                          To
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={10}>
                        <Box>
                          <FormControl className="maxWidth">
                            <Controller
                              control={control}
                              name="todate"
                              render={({ field }) => (
                                <Box>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                      {...field}
                                      sx={{
                                        overflow: 'hidden',
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'spaceBetween'
                                      }}
                                    />
                                  </LocalizationProvider>
                                </Box>
                              )}
                            />
                          </FormControl>
                        </Box>
                        <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.todate?.message}</Typography>
                      </Grid>
                    </Grid>
                    <TextField
                      name="date"
                      {...register('date', { required: true })}
                      label="Current Date"
                      value={formattedDate}
                      sx={{ display: 'none' }}
                    />
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Box
                          component="form"
                          sx={{
                            '& .MuiTextField-root': { mb: 2 },
                            maxWidth: '100%'
                          }}
                          noValidate
                          autoComplete="off"
                        >
                          <Grid container>
                            <Grid item xs={12} sm={12} md={12} lg={2}>
                              <Typography variant="p" component="div" sx={{ mt: 2 }}>
                                Total days
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={10}>
                              <Box border="1px solid #C8C8C6" borderRadius="5px" sx={{ mb: 2, mt: 2, py: 1 }}>
                                <Typography variant="p" component="div" sx={{ pl: 1.1 }}>
                                  {isNaN(totalDays) ? '0' : totalDays + 1}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Box
                          component="form"
                          sx={{
                            '& .MuiTextField-root': { mb: 2 },
                            maxWidth: '100%'
                          }}
                          noValidate
                          autoComplete="off"
                        >
                          <Grid container>
                            <Grid item xs={12} sm={12} md={12} lg={2}>
                              <Typography variant="p" component="div" sx={{ mb: 1, mt: 1 }}>
                                Reason
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={10}>
                              <TextField
                                minRows={3}
                                maxRows={6}
                                name="leave_note"
                                multiline
                                placeholder="Enter your text here"
                                style={{ width: '100%' }}
                                {...register('leave_note', { required: false })}
                              />
                              <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.leave_note?.message}</Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                      <Button
                        variant="contained"
                        type="submit"
                        sx={{ px: 5, backgroundColor: '#12A9B2', color: '#FFF', '&:hover': { backgroundColor: '#0e8087', color: '#FFF' } }}
                      >
                        Apply
                      </Button>
                    </Box>
                  </form>
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <img src={leaveImage} alt="leave" height="100%" width="100%" />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </MainCard>
      </Box>
    </Box>
  );
}
