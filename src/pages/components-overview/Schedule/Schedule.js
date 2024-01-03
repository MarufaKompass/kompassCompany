import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { makeStyles } from '@mui/styles';
import axiosInstance from 'utils/axios.config';
import ScheduleList from './ScheduleList';
import '../../../assets/third-party/styles.css';

const useStyles = makeStyles({
  hideButtons: {
    '& .css-knqc4i-MuiDialogActions-root': {
      display: 'none'
    }
  }
});

export default function Schedule() {
  const classes = useStyles();
  const [useDate, setUseDate] = useState();
  const [scheduleData, setScheduleData] = useState([]);

  const handleDateChange = (newDate) => {
    const inputDateString = newDate;
    const inputDate = new Date(inputDateString);

    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    const day = inputDate.getDate().toString().padStart(2, '0');

    const outputDateString = `${year}-${month}-${day}`;
    setUseDate(outputDateString);
    axiosInstance
      .get(`https://api.hellokompass.com/calender/schedule-date?date=${outputDateString}`)
      .then((res) => {
        setScheduleData(res.data.data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <Box>
      <MainCard sx={{ mt: 3 }}>
        <Box sx={{ overflow: { xs: 'scroll', md: 'auto' }, height: '100%' }}>
          <Grid container>
            <Grid xs={12} sm={12} md={6} sx={{ height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Box
                sx={{
                  minWidth: '320px',
                  pl: { xs: -1, sm: 0 },
                  borderRadius: 1,
                  border: 2,
                  borderBottom: 2,
                  borderColor: '#12A9B2',
                  boxShadow: '2px 4px 6px rgba(18, 169, 178, 0.4)',
                  '&:hover': {
                    boxShadow: '2px 4px 6px rgba(18, 169, 178, 0.4)',
                    border: 2,
                    borderBottom: 2,
                    borderColor: '#12A9B2'
                  }
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Box className={classes.hideButtons}>
                    <StaticDatePicker onChange={handleDateChange} />
                  </Box>
                </LocalizationProvider>
              </Box>
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <ScheduleList useDate={useDate} scheduleData={scheduleData} />
            </Grid>
          </Grid>
        </Box>
      </MainCard>
    </Box>
  );
}
