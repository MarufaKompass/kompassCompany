import React, { useState } from 'react';
import { Box, Typography, Divider, Grid, FormControl, FormHelperText, Button } from '@mui/material';
import MainCard from 'components/MainCard';
import { useForm, Controller } from 'react-hook-form';
import axiosInstance from 'utils/axios.config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { yupResolver } from '@hookform/resolvers/yup';
import { attendanceClaim } from 'components/validation/Validation';
import TimePicker from 'rc-time-picker';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import '../../../assets/third-party/styles.css';
import 'rc-time-picker/assets/index.css';

const StyledTimePicker = styled(TimePicker)({
  '& .rc-time-picker-input': {
    width: '100%',
    height: '38px',
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

export default function AttendanceClaim() {
  const [selectedStartTime, setSelectedStartTime] = useState();
  const [selectedEndTime, setSelectedEndTime] = useState();
  const defaultTime = moment();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({ resolver: yupResolver(attendanceClaim) });

  const convertTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const onSubmit = (data) => {
    const { date } = data;
    data.intime = selectedStartTime.format('HH:mm');
    data.outtime = selectedEndTime.format('HH:mm');

    if (date) {
      const currentDate = new Date();
      const currentSelectedDate = new Date(currentDate);
      const monthNumber = currentSelectedDate.getMonth() + 1;

      const inputDateString = date;

      const inputDate = new Date(inputDateString);
      const selectedDate = new Date(inputDate);
      const selectedMonthNumber = selectedDate.getMonth() + 1;

      const isPastDate = selectedMonthNumber < monthNumber;

      if (isPastDate) {
        toast.error("You can't select a date from the past months");
      } else if (inputDate > currentDate) {
        toast.error("You can't select a future date");
      } else {
        if (data.intime && data.outtime) {
          const intimeInMinutes = convertTimeToMinutes(data.intime);
          const outtimeInMinutes = convertTimeToMinutes(data.outtime);

          if (intimeInMinutes > outtimeInMinutes) {
            toast.error('In time should be before out time');
            return;
          } else {
            const year = inputDate.getFullYear();
            const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
            const day = inputDate.getDate().toString().padStart(2, '0');

            const outputDateString = `${year}-${month}-${day}`;
            data.date = outputDateString;

            axiosInstance.put('https://api.hellokompass.com/payroll/attendanceupdate', data).then((res) => {
              if (res.data.code === 200) {
                toast.success(res.data.message);
                navigate('/attendanceHistory');
                reset();
              } else if (res.data.code === 400) {
                toast.failed(res.data.message);
                reset();
              } else {
              }
            });
          }
        }
      }
    } else {
    }
  };

  return (
    <Box>
      <MainCard>
        <Box id="modal-modal-title" sx={{ width: '100%' }}>
          <Typography variant="h5" component="h2">
            Attendance Claim
          </Typography>
        </Box>
        <Divider variant="middle" sx={{ my: 3 }} />
        <Box sx={{ my: 4, px: { xs: 0, md: 6, lg: 6, xl: 8 } }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Grid container>
                <Grid xs={12} sm={2} md={2}>
                  <FormHelperText sx={{ mt: 2 }}>
                    <Typography variant="h6" component="h2" color="#4e4d4e" sx={{ mb: 0.5 }}>
                      Date
                    </Typography>
                  </FormHelperText>
                </Grid>
                <Grid xs={12} sm={10} md={10}>
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
                                pr: 3,
                                display: 'flex',
                                alignItem: 'spaceBetween'
                              }}
                            />
                          </LocalizationProvider>
                        </Box>
                      )}
                    />
                  </FormControl>
                  <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.date?.message}</Typography>
                </Grid>
              </Grid>
              <Grid container sx={{ pr: 3 }}>
                <Grid xs={12} sm={2} md={2}>
                  <FormHelperText sx={{ mt: 2 }}>
                    <Typography variant="h6" component="h2" color="#4e4d4e">
                      In Time
                    </Typography>
                  </FormHelperText>
                </Grid>
                <Grid xs={12} sm={10} md={10} sx={{ mt: 1, pl: 1 }}>
                  <FormControl sx={{ mt: 0 }} fullWidth className="maxWidth">
                    <Box className="maxWidth">
                      <Controller
                        name="intime"
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
                            name="intime"
                            defaultValue={defaultTime}
                            style={{
                              width: '100%'
                            }}
                          />
                        )}
                      />
                    </Box>
                  </FormControl>
                  <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.intime?.message}</Typography>
                </Grid>
              </Grid>
              <Grid container sx={{ pr: 3 }}>
                <Grid xs={12} sm={2} md={2}>
                  <FormHelperText sx={{ mt: 2 }}>
                    <Typography variant="h6" component="h2" color="#4e4d4e">
                      Out Time
                    </Typography>
                  </FormHelperText>
                </Grid>
                <Grid xs={12} sm={10} md={10} sx={{ mt: 1, pl: 1 }}>
                  <FormControl sx={{ mt: 0 }} fullWidth className="maxWidth">
                    <Box className="maxWidth">
                      <Controller
                        name="outtime"
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
                            name="outtime"
                            defaultValue={defaultTime}
                            style={{
                              width: '100%'
                            }}
                          />
                        )}
                      />
                    </Box>
                  </FormControl>
                  <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.outtime?.message}</Typography>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'right', mt: 2, mr: 3 }}>
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
      </MainCard>
    </Box>
  );
}
