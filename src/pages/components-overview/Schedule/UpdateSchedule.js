import React, { useEffect, useState } from 'react';
import { Grid, FormHelperText, Select, MenuItem, FormControl, Box, Button, Typography, Input } from '@mui/material';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import { styled } from '@mui/material/styles';
import { useForm, Controller } from 'react-hook-form';
import MainCard from 'components/MainCard';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axiosInstance from 'utils/axios.config';
import { toast } from 'react-toastify';

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

export default function UpdateSchedule() {
  const { id } = useParams();
  const { register, handleSubmit, control, reset } = useForm();
  const navigate = useNavigate();
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');

  const convertTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const handleNavigate = () => {
    navigate('/schedule');
  };

  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get(`https://api.hellokompass.com/calender/schedule/${id}`)
        .then((res) => {
          const startTime = moment(res.data.data.sc_starttime, 'h:mm a', false);
          const endTime = moment(res.data.data.sc_endtime, 'h:mm a', false);

          setSelectedStartTime(startTime.isValid() ? startTime : moment().startOf('day'));
          setSelectedEndTime(endTime.isValid() ? endTime : moment().endOf('day'));

          setSelectedType(res.data.data.sc_type);
          setSelectedStatus(res.data.data.sc_status);
        })
        .catch((err) => console.error(err));
    };

    fetchData();
  }, [id]);

  const [selectedType, setSelectedType] = useState();
  const handleTypeChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedType(selectedValue);
  };

  const [selectedStatus, setSelectedStatus] = useState();
  const handleStatusChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedStatus(selectedValue);
  };

  const onSubmit = (data) => {
    data.start_time = selectedStartTime.format('HH:mm');
    data.end_time = selectedEndTime.format('HH:mm');
    data.type = selectedType;
    data.status = selectedStatus;

    if (data.start_time && data.end_time) {
      const intimeInMinutes = convertTimeToMinutes(data.start_time);
      const outtimeInMinutes = convertTimeToMinutes(data.end_time);

      if (intimeInMinutes > outtimeInMinutes) {
        toast.error('In time should be before out time');
        return;
      } else {
        axiosInstance
          .put('https://api.hellokompass.com/calender/schedule/update', data)
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
  };
  return (
    <Box sx={{ mt: 2 }}>
      <MainCard>
        <Box sx={{ py: 1, color: '#000000' }}>
          <Typography variant="h5" component="h2">
            Update Schedule
          </Typography>
        </Box>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
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
                      render={({ field }) => (
                        <StyledTimePicker
                          value={selectedStartTime}
                          showSecond={false}
                          onChange={(value) => {
                            field.onChange(value);
                            setSelectedStartTime(value);
                          }}
                          format="h:mm a"
                          use12Hours
                          name="start_time"
                          style={{
                            width: '100%'
                          }}
                        />
                      )}
                    />
                  </Box>
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
                      render={({ field }) => (
                        <StyledTimePicker
                          value={selectedEndTime}
                          showSecond={false}
                          onChange={(value) => {
                            field.onChange(value);
                            setSelectedEndTime(value);
                          }}
                          format="h:mm a"
                          use12Hours
                          name="end_time"
                          style={{
                            width: '100%'
                          }}
                        />
                      )}
                    />
                  </Box>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormHelperText sx={{ mt: 2 }}>
                  <Typography variant="h6" component="h2" color="#4e4d4e">
                    Type
                  </Typography>
                </FormHelperText>
                <FormControl variant="standard" fullWidth>
                  <Select {...register('type', { required: false })} value={selectedType || ''} onChange={handleTypeChange}>
                    <MenuItem value="Public">Public</MenuItem>
                    <MenuItem value="Private">Private</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormHelperText sx={{ mt: 2 }}>
                  <Typography variant="h6" component="h2" color="#4e4d4e">
                    Status
                  </Typography>
                </FormHelperText>
                <FormControl variant="standard" fullWidth>
                  <Select {...register('status', { required: false })} value={selectedStatus || ''} onChange={handleStatusChange}>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Deactive">Deactive</MenuItem>
                  </Select>

                  <Input
                    {...register('sid', { required: false })}
                    sx={{ mt: 1, color: '#4e4d4e', pr: 1, display: 'none' }}
                    value={id}
                    fullWidth
                    type="text"
                    name="sid"
                  />
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
