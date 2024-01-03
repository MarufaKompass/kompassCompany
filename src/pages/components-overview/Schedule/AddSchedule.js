import React, { useState } from 'react';
import { Grid, FormHelperText, Select, MenuItem, FormControl, Box, Button, Typography, InputLabel } from '@mui/material';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import { styled } from '@mui/material/styles';
import { useForm, Controller } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import MainCard from 'components/MainCard';
import { useNavigate } from 'react-router-dom';
import axiosInstance from 'utils/axios.config';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { toast } from 'react-toastify';
import { scheduleValidation } from 'components/validation/Validation';
import { yupResolver } from '@hookform/resolvers/yup';

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

export default function AddSchedule() {
  const defaultTime = moment();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(scheduleValidation)
  });
  const navigate = useNavigate();
  const [selectedStartTime, setSelectedStartTime] = useState(defaultTime);
  const [selectedEndTime, setSelectedEndTime] = useState(defaultTime);

  const convertTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const handleNavigate = () => {
    navigate('/schedule');
  };

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

        if (data.start_time && data.end_time) {
          const intimeInMinutes = convertTimeToMinutes(data.start_time);
          const outtimeInMinutes = convertTimeToMinutes(data.end_time);

          if (intimeInMinutes > outtimeInMinutes) {
            toast.error('In time should be before out time');
            return;
          } else {
            axiosInstance
              .post('https://api.hellokompass.com/calender/scheduleinsert', data)
              .then((res) => {
                if (res.status === 200) {
                  toast.success(res.data.message);
                  navigate('/schedule');
                  reset();
                } else {
                  toast.error(res.data.message);
                  reset();
                }
              })
              .catch((error) => console.error(error));
          }
        }
      }
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <MainCard>
        <Box sx={{ py: 1, color: '#000000' }}>
          <Typography variant="h5" component="h2">
            Insert Schedule
          </Typography>
        </Box>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
              <Grid item xs={12}>
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
                                  pr: 1,
                                  mt: 1
                                }}
                                slotProps={{ textField: { variant: 'standard' } }}
                              />
                            </LocalizationProvider>
                          </Box>
                        )}
                      />
                    </FormControl>
                    <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.date?.message}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <FormHelperText sx={{ mt: 2 }}>
                  <Typography variant="h6" component="h2" color="#4e4d4e">
                    Start Time
                  </Typography>
                </FormHelperText>
                <FormControl sx={{ mt: 1, width: '100%' }} fullWidth>
                  <Box className="maxWidth">
                    <Controller
                      name="start_time"
                      control={control}
                      defaultValue={selectedStartTime}
                      render={({ field }) => (
                        <StyledTimePicker
                          className="stop-propagation"
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
                  <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.start_time?.message}</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormHelperText sx={{ mt: 2 }}>
                  <Typography variant="h6" component="h2" color="#4e4d4e">
                    End Time
                  </Typography>
                </FormHelperText>
                <FormControl sx={{ mt: 1, width: '100%' }} fullWidth>
                  <Box className="maxWidth">
                    <Controller
                      name="end_time"
                      control={control}
                      defaultValue={selectedEndTime}
                      render={({ field }) => (
                        <StyledTimePicker
                          className="stop-propagation"
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
                  <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.end_time?.message}</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormHelperText sx={{ mt: 2 }}>
                  <Typography variant="h6" component="h2" color="#4e4d4e">
                    Type
                  </Typography>
                </FormHelperText>
                <FormControl variant="standard" fullWidth>
                  <Select {...register('type', { required: true })} name="type" displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                    <MenuItem>
                      <InputLabel selected htmlFor="outlined-adornment">
                        Select Schedule Type
                      </InputLabel>
                    </MenuItem>
                    <MenuItem value="Public">Public</MenuItem>
                    <MenuItem value="Private">Private</MenuItem>
                  </Select>
                  <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.type?.message}</Typography>
                </FormControl>
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button onClick={handleNavigate} variant="outlined" size="medium" sx={{ mt: 4, p: 0, color: '#12A9B2' }}>
                Cancel
              </Button>
              <Button
                variant="contained"
                type="submit"
                size="medium"
                sx={{
                  mt: 4,
                  p: 0,
                  color: '#FFF',
                  backgroundColor: '#12A9B2',
                  ml: 2,
                  '&:hover': { backgroundColor: '#0e8087', color: '#FFF' }
                }}
              >
                Send
              </Button>
            </Box>
          </form>
        </Box>
      </MainCard>
    </Box>
  );
}
