import React, { useEffect, useState } from 'react';
import { Button, Modal, Box, Divider, Typography, Grid, ListItem } from '@mui/material';
import Slide from '@mui/material/Slide';
import axiosInstance from 'utils/axios.config';

const style = {
  backgroundColor: 'rgba(0,0,0,0.5)',
  position: 'absolute',
  minWidth: '320px',
  maxWidth: '776px',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #12A9B2',
  borderRadius: 3,
  boxShadow: '2px 4px 6px rgba(18, 169, 178,24)',
  pt: 2,
  px: 4,
  pb: 3
};

export default function EventModal({ eventId, openEventModal, handleClose }) {
  const [eventModal, setEventModal] = useState('');

  useEffect(() => {
    const fetchData = () => {
      if (eventId) {
        axiosInstance
          .get(`https://api.hellokompass.com/event/${eventId}`)
          .then((res) => {
            setEventModal(res.data.data);
          })
          .catch((error) => console.error(error));
      }
    };

    fetchData();
  }, [eventId]);

  const { date, starttime, address, details, endtime, evntname, evnttype } = eventModal;

  return (
    <Modal
      open={Boolean(openEventModal)}
      onClose={handleClose}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', mt: 6 }}
    >
      <Slide in={Boolean(openEventModal)}>
        <Box sx={{ ...style, width: '100%' }}>
          <Box id="modal-modal-title" sx={{ px: 1, py: 1, color: '#7e8790' }}>
            <Typography variant="h4" component="h2" sx={{ color: 'black' }}>
              Event Details
            </Typography>
          </Box>
          <Divider sx={{ color: '#12A9B2', border: 1, opacity: 0.3 }} />
          <Box
            sx={{
              mt: 2,
              pb: 1,
              width: '100%',
              ml: {
                xs: 2,
                sm: 2,
                md: 0,
                lg: 0
              }
            }}
          >
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
                <Box sx={{ display: 'inline', mx: 1 }}>{endtime}</Box>
              </Box>
            </Box>
          </Box>
          <Grid container spacing={3} sx={{ mb: 2 }}>
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
                  <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                    <Typography sx={{ color: '#000', ml: 1 }} align="justify" variant="h6" component="div">
                      {address}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: -4 }}>
              <ListItem>
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
                  <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                    <Typography sx={{ color: '#000', ml: 1 }} align="justify" variant="h6" component="div">
                      {evnttype}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: -4 }}>
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
                  <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
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
          <Divider sx={{ color: '#12A9B2', border: 1, opacity: 0.3 }} />
          <Box sx={{ display: { xs: 'block', sm: 'flex' }, justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" color="#ff0000">
              To close this screen press
            </Typography>
            <Button
              onClick={handleClose}
              variant="contained"
              size="large"
              sx={{ mt: 1, p: 0, backgroundColor: '#12A9B2', '&:hover': { backgroundColor: '#0e8087' } }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Slide>
    </Modal>
  );
}
