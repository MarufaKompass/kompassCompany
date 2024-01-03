import React, { useEffect, useState } from 'react';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ScheduleData from './ScheduleData';
import axiosInstance from 'utils/axios.config';
import AllSchedule from './AllSchedule';

export default function ScheduleList({ useDate, scheduleData }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const handleNavigate = () => {
    navigate(`/addSchedule`);
  };

  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get('https://api.hellokompass.com/calender/schedule-list')
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err) => console.error(err));
    };
    fetchData();
    if (data.length > 0) {
      const interval = setInterval(fetchData, 10000);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'end', mt: { xs: 2, md: 0 } }}>
        <Button onClick={handleNavigate}>+Add Schedule</Button>
      </Box>
      <Box>
        {!useDate && data?.map((data) => <AllSchedule data={data} useDate={useDate} />)}
        {useDate && scheduleData?.map((data) => <ScheduleData data={data} useDate={useDate} />)}
      </Box>
    </Box>
  );
}
