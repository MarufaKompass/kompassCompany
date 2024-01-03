import React, { useEffect } from 'react';
import { Box, Toolbar, Typography, Divider, Grid, ListItem } from '@mui/material';
import MainCard from 'components/MainCard';
import RadioButton from 'components/radioButton/RadioButton';
import { useAppContext } from 'AppContextProvider';
import axiosInstance from 'utils/axios.config';

export default function EventDetails() {
  const { eventDetails, inviteGuest, setInviteGuest } = useAppContext();

  useEffect(() => {
    const fetchData = () => {
      if (eventDetails) {
        axiosInstance
          .get(`https://api.hellokompass.com/event/${eventDetails}`)
          .then((res) => {
            if (res.data.code === 200) {
              sessionStorage.setItem('eventDetails', eventDetails);
              setInviteGuest(res.data.data);
            } else {
              <></>;
            }
          })
          .catch((error) => console.error(error));
      }
    };

    fetchData();
  }, [eventDetails]);

  const { evntname, date, starttime, endtime, address, details, evnttype } = inviteGuest;

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar sx={{ my: 1, mx: -2 }} align="center">
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
            Event Details
          </Typography>
        </Toolbar>
      </Box>
      <Divider variant="middle" sx={{ mb: 3 }} />
      <Box>
        <MainCard>
          <Typography align="center" variant="h5" component="h2">
            <Box sx={{ display: 'inline', color: '#12a9b2' }}> Event Title: </Box>
            {evntname}
          </Typography>
          <Box sx={{ display: { sm: 'flex' }, justifyContent: 'center', mb: 1 }} align="center">
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
              <Box sx={{ display: 'inline', mx: 1 }}>{endtime}</Box>
            </Box>
          </Box>
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <ListItem sx={{ mx: 0 }}>
                  <Grid container spacing={0}>
                    <Grid item xs={4} sm={4} md={2} lg={2} xl={2}>
                      <Typography color="#65af7b" variant="h6" component="div">
                        Address
                      </Typography>
                    </Grid>
                    <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                      <Typography variant="h6" component="div">
                        <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={7} sm={7} md={9} lg={9} xl={9}>
                      <Typography sx={{ color: '#000', ml: 1 }} align="justify" variant="h6" component="div">
                        {address}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: -2 }}>
                <ListItem sx={{ mx: 0 }}>
                  <Grid container spacing={0}>
                    <Grid item xs={4} sm={4} md={2} lg={2} xl={2}>
                      <Typography color="#65af7b" variant="h6" component="div">
                        Event Type
                      </Typography>
                    </Grid>
                    <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                      <Typography variant="h6" component="div">
                        <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={7} sm={7} md={9} lg={9} xl={9}>
                      <Typography sx={{ color: '#000', ml: 1 }} align="justify" variant="h6" component="div">
                        {evnttype}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: -2 }}>
                <ListItem>
                  <Grid container spacing={0}>
                    <Grid item xs={4} sm={4} md={2} lg={2} xl={2}>
                      <Typography color="#65af7b" variant="h6" component="div">
                        Details
                      </Typography>
                    </Grid>
                    <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                      <Typography variant="h6" component="div">
                        <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={7} sm={7} md={9} lg={9} xl={9}>
                      <Typography
                        sx={{ color: '#000', ml: 1, mt: -1.5 }}
                        align="justify"
                        variant="h6"
                        component="div"
                        dangerouslySetInnerHTML={{ __html: details }}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
              </Grid>
            </Grid>
          </Box>
          <Divider variant="middle" sx={{ mb: 3 }} />
          <RadioButton eventDetails={eventDetails} />
        </MainCard>
      </Box>
    </Box>
  );
}
