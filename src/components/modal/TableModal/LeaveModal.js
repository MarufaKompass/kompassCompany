import React, { useEffect, useState } from 'react';
import { Button, Modal, Box, Divider, Typography, Grid, ListItem } from '@mui/material';
import Slide from '@mui/material/Slide';
import axiosInstance from 'utils/axios.config';
import CustomChip from 'components/Chip/CustomChip';

const style = {
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

export default function LeaveModal({ leaveId, openLeaveModal, handleClose }) {
  const [leaveModal, setLeaveModal] = useState('');

  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get(`https://api.hellokompass.com/payroll/leaveview/${leaveId}`)
        .then((res) => {
          setLeaveModal(res.data.data);
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  }, [leaveId]);

  const { lev_from, lev_to, lev_approval, lev_type, lev_duration, lev_notz } = leaveModal;

  return (
    <Modal
      open={Boolean(openLeaveModal)}
      onClose={handleClose}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', mt: 6 }}
    >
      <Slide in={Boolean(openLeaveModal)}>
        <Box sx={{ ...style, width: '100%' }}>
          <Box id="modal-modal-title" sx={{ px: 1, py: 1, color: '#000000' }}>
            <Typography variant="h5" component="h2">
              Leave Application
            </Typography>
          </Box>
          <Divider sx={{ color: '#12A9B2', border: 1, opacity: 0.3 }} />
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <ListItem sx={{ mx: 0 }}>
                <Grid container spacing={0}>
                  <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <Typography color="#65af7b" variant="h6" component="h3">
                      Apply Date
                    </Typography>
                  </Grid>
                  <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                    <Typography variant="h6" component="h3">
                      <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                    <Typography sx={{ color: '#000' }} variant="h6" component="div">
                      {lev_from} to {lev_to}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ mt: { xs: -4, sm: -4, md: 0 } }}>
              <ListItem>
                <Grid container spacing={0}>
                  <Grid item xs={4} sm={4} md={3} lg={3} xl={3}>
                    <Typography color="#65af7b" variant="h6" component="h3">
                      Status
                    </Typography>
                  </Grid>
                  <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                    <Typography variant="h6" component="h3">
                      <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                    <Typography sx={{ color: '#000' }} variant="h6" component="div">
                      <CustomChip>{lev_approval}</CustomChip>
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ mt: -4 }}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <ListItem sx={{ mx: 0 }}>
                <Grid container spacing={0}>
                  <Grid xs={4} sm={4} md={4} lg={4} xl={4}>
                    <Typography color="#65af7b" variant="h6" component="h3">
                      Leave Type
                    </Typography>
                  </Grid>
                  <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                    <Typography variant="h6" component="h3">
                      <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                    <Typography sx={{ color: '#000' }} variant="h6" component="div">
                      {lev_type}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ mt: { xs: -4, sm: -4, md: 0 } }}>
              <ListItem>
                <Grid container spacing={0}>
                  <Grid item xs={4} sm={4} md={3} lg={3} xl={3}>
                    <Typography color="#65af7b" variant="h6" component="h3">
                      Duration
                    </Typography>
                  </Grid>
                  <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                    <Typography variant="h6" component="h3">
                      <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                    <Typography sx={{ color: '#000' }} variant="h6" component="div">
                      {lev_duration}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ mb: 1 }}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <ListItem sx={{ ml: 0 }}>
                <Grid container spacing={0}>
                  <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <Typography color="#000" variant="h6" component="h3">
                      Reason:
                    </Typography>
                  </Grid>
                  <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                    <Typography variant="h6" component="h3">
                      <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                    <Typography sx={{ color: '#000' }} variant="h6" component="div">
                      {lev_notz}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </Grid>
          </Grid>
          <Divider sx={{ color: '#12A9B2', border: 1, opacity: 0.3 }} />
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button
              onClick={handleClose}
              variant="contained"
              size="large"
              sx={{ mt: 1, p: 0, backgroundColor: '#12A9B2', '&:hover': { backgroundColor: '#0e8087' } }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Slide>
    </Modal>
  );
}
