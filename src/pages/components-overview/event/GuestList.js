import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, ListItem } from '@mui/material';
import MainCard from 'components/MainCard';
import EventGuestList from './EventGuestList';
import axiosInstance from 'utils/axios.config';
import { useAppContext } from 'AppContextProvider';

export default function GuestList() {
  const { eventDetails, eventGuest, setEventGuest, guestLists, setGuestLists } = useAppContext();
  const [present, setPresent] = useState('');

  useEffect(() => {
    const fetchData = () => {
      if (eventDetails) {
        axiosInstance
          .get(`https://api.hellokompass.com/event/invlist/${eventDetails}`)
          .then((res) => {
            sessionStorage.setItem('eventDetails', eventDetails);
            setGuestLists(res.data.data.guestlist);
            setPresent(res.data.data);
          })
          .catch((error) => console.error(error));
      }
    };

    fetchData();
  }, [eventDetails]);

  useEffect(() => {
    const fetchData = () => {
      if (eventDetails) {
        axiosInstance
          .get(`https://api.hellokompass.com/event/${eventDetails}`)
          .then((res) => {
            sessionStorage.setItem('eventDetails', eventDetails);
            setEventGuest(res.data.data);
          })
          .catch((error) => console.error(error));
      }
    };

    fetchData();
  }, [eventDetails]);

  const { date, starttime, endtime, evntname } = eventGuest;
  const { attendstatus, totalGuest } = present;

  return (
    <Box>
      <MainCard>
        <Typography align="center" variant="h5" component="h2">
          <Box sx={{ display: 'inline', color: '#12a9b2' }}> Event Title:</Box> {evntname}
        </Typography>
        <Box sx={{ display: { sm: 'flex' }, justifyContent: 'center' }} align="center">
          <Box justifyContent="center">
            <Box sx={{ display: 'inline', color: '#12a9b2' }}>Date:</Box>
            <Box sx={{ display: 'inline', mx: 1 }}> {date}</Box>
          </Box>
          <Box>
            <Box sx={{ display: 'inline', color: '#12a9b2' }}>Start Time:</Box>
            <Box sx={{ display: 'inline', mx: 1 }}>{starttime} </Box>
          </Box>
          <Box>
            <Box sx={{ display: 'inline', color: '#12a9b2' }}>End Time:</Box>
            <Box sx={{ display: 'inline', mx: 1 }}>{endtime} </Box>
          </Box>
        </Box>
        <Box sx={{ mt: 3, mb: -2 }}>
          <Grid container spacing={3}>
            <Grid items={true} xs={12} sm={4} md={4} lg={4} xl={4}>
              <ListItem sx={{ m: 0 }}>
                <Typography color="#12a9b2" variant="h6" component="div">
                  Total Invitee :
                </Typography>
                <Typography sx={{ ml: 1 }} variant="h6" component="div">
                  {totalGuest || 0}
                </Typography>
              </ListItem>
            </Grid>
            <Grid items={true} xs={12} sm={4} md={4} lg={4} xl={4}>
              <ListItem sx={{ mt: { xs: -2, sm: 0 } }}>
                <Typography color="#12a9b2" variant="p" component="div">
                  Total Present :
                </Typography>
                <Typography sx={{ ml: 1 }} variant="h6" component="div">
                  {attendstatus?.Present || 0}
                </Typography>
              </ListItem>
            </Grid>
            <Grid items={true} xs={12} sm={4} md={4} lg={4} xl={4}>
              <ListItem sx={{ mt: { xs: -2, sm: 0 } }}>
                <Typography color="#12a9b2" variant="h6" component="div">
                  Total Absent :
                </Typography>
                <Typography sx={{ ml: 1 }} variant="h6" component="div">
                  {attendstatus?.Absent || 0}
                </Typography>
              </ListItem>
            </Grid>
          </Grid>
        </Box>
      </MainCard>
      <EventGuestList guestLists={guestLists} />
    </Box>
  );
}
