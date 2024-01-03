import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Modal, Slide, Divider, Grid } from '@mui/material/index';
import axiosInstance from 'utils/axios.config';

const style = {
  backgroundColor: 'rgba(0,0,0,0.5)',
  position: 'absolute',
  minWidth: '300px',
  maxWidth: '776px',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #12A9B2',
  borderRadius: 3,
  boxShadow: '2px 4px 6px #12A9B2',
  pt: 2,
  px: 4,
  pb: 3
};

export default function ViewScheduleModal({ deleteScheduleId, viewScheduleModal, handleClose }) {
  const [data, setData] = useState('');
  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get(`https://api.hellokompass.com/calender/schedule/${deleteScheduleId}`)
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err) => console.error(err));
    };

    fetchData();
  }, [deleteScheduleId]);
  return (
    <Box>
      <Modal
        open={Boolean(viewScheduleModal)}
        onClose={handleClose}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Slide in={Boolean(viewScheduleModal)}>
          <Box sx={{ ...style, width: '100%' }}>
            <Box id="modal-modal-title" sx={{ px: 1, py: 1, color: '#000000' }}>
              <Typography variant="h5" component="h2">
                Schedule Details
              </Typography>
            </Box>
            <Divider sx={{ color: '#12A9B2', border: 1, opacity: 0.3 }} />
            <Box sx={{ px: { xs: 0, sm: 8 }, py: { xs: 2, sm: 5 } }}>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Grid container>
                      <Grid item xs={4} sm={3}>
                        Date
                      </Grid>
                      <Grid item xs={1} sm={1}>
                        :
                      </Grid>
                      <Grid item xs={7} sm={8}>
                        {data.sc_date}
                      </Grid>
                    </Grid>
                    <Grid container sx={{ mt: 2 }}>
                      <Grid item xs={4} sm={3}>
                        Start Time
                      </Grid>
                      <Grid item xs={1} sm={1}>
                        :
                      </Grid>
                      <Grid item xs={7} sm={8}>
                        {data.sc_starttime}
                      </Grid>
                    </Grid>
                    <Grid container sx={{ mt: 2 }}>
                      <Grid item xs={4} sm={3}>
                        End Time
                      </Grid>
                      <Grid item xs={1} sm={1}>
                        :
                      </Grid>
                      <Grid item xs={7} sm={8}>
                        {data.sc_endtime}
                      </Grid>
                    </Grid>
                    <Grid container sx={{ mt: 2 }}>
                      <Grid item xs={4} sm={3}>
                        Status
                      </Grid>
                      <Grid item xs={1} sm={1}>
                        :
                      </Grid>
                      <Grid item xs={7} sm={8}>
                        {data.sc_status}
                      </Grid>
                    </Grid>
                    <Grid container sx={{ mt: 2 }}>
                      <Grid item xs={4} sm={3}>
                        Type
                      </Grid>
                      <Grid item xs={1} sm={1}>
                        :
                      </Grid>
                      <Grid item xs={7} sm={8}>
                        {data.sc_type}
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Divider sx={{ color: '#12A9B2', border: 1, opacity: 0.3 }} />
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
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
    </Box>
  );
}
