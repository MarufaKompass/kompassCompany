import React, { useEffect, useState } from 'react';
import { Button, Modal, Box, Divider, Typography, Avatar, Grid, ListItem } from '@mui/material';
import Slide from '@mui/material/Slide';
import axiosInstance from 'utils/axios.config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Uppercase from 'components/Uppercase/Uppercase';
import CustomChip from 'components/Chip/CustomChip';

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

export default function InvitationModal({ invitationId, openInvitationModal, handleClose }) {
  const [imgOpen, setImgOpen] = useState(false);
  const [invitationModal, setInvitationModal] = useState('');
  const navigate = useNavigate();
  const handleImgOpen = () => setImgOpen(true);
  const handleImgClose = () => setImgOpen(false);

  const { evnt_invt_id, evnt_date, start_time, qr, code, status, evnt_location, evnt_details, end_time, evnt_name, evnt_type } =
    invitationModal;

  const onClick = (status) => {
    const data = { invt_id: evnt_invt_id, status: status };
    axiosInstance
      .put('https://api.hellokompass.com/event/statusupdate', data)
      .then((res) => {
        if (res.data.code === 200) {
          toast.success(res.data.message);
          handleClose();
          navigate('/event');
        } else if (res.data.code === 400) {
          handleClose();
          toast.failed(res.data.message);
          navigate('/event');
        } else if (res.data.code === 404) {
          toast.warning('Resource not found. Please check the request.');
        } else {
          toast.failed(res.data.message);
        }
      })
      .catch((error) => {
        console.error('Error occurred:', error);
        toast.error('An unexpected error occurred. Please try again.');
      });
  };

  useEffect(() => {
    const fetchData = () => {
      if (invitationId) {
        axiosInstance
          .get(`https://api.hellokompass.com/event/viewinvt/${invitationId}`)
          .then((res) => {
            setInvitationModal(res.data.data);
          })
          .catch((error) => console.error(error));
      }
    };

    fetchData();
  }, [invitationId]);

  return (
    <Modal
      open={Boolean(openInvitationModal)}
      onClose={handleClose}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', mt: 6 }}
    >
      <Slide in={Boolean(openInvitationModal)}>
        <Box
          sx={{
            ...style,
            width: '100%',
            minHeight: 300,
            maxHeight: { xs: 500, sm: 500, md: 500, lg: 500, xl: 600 },
            overflow: 'scroll'
          }}
        >
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
            <Typography align="center" variant="h4" component="h2">
              <Box sx={{ display: 'inline', color: '#12a9b2' }}>Event Title: </Box>
              {evnt_name}
            </Typography>

            <Box sx={{ display: { sm: 'flex' }, justifyContent: 'center' }} align="center">
              <Box justifyContent="center">
                <Box sx={{ display: 'inline', color: '#12a9b2' }}>Date:</Box>
                <Box sx={{ display: 'inline', mx: 1 }}> {evnt_date}</Box>
              </Box>
              <Box>
                <Box sx={{ display: 'inline', color: '#12a9b2' }}>Start Time:</Box>
                <Box sx={{ display: 'inline', mx: 1 }}>{start_time} </Box>
              </Box>
              <Box>
                <Box sx={{ display: 'inline', color: '#12a9b2' }}>End Time:</Box>
                <Box sx={{ display: 'inline', mx: 1 }}>{end_time}</Box>
              </Box>
            </Box>
          </Box>
          <Grid container>
            <Grid item xs={12} sm={9} md={9} lg={9} xl={9}>
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
                          {evnt_location}
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
                          {evnt_type}
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
                          Code
                        </Typography>
                      </Grid>
                      <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                        <Typography variant="h6" component="div">
                          <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                        </Typography>
                      </Grid>
                      <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                        <Typography sx={{ color: '#000', ml: 1 }} align="justify" variant="h6" component="div">
                          {code}
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
                          dangerouslySetInnerHTML={{ __html: evnt_details }}
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                </Grid>

                {Uppercase(status) === 'Pending' && (
                  <>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: -4 }}>
                      <ListItem>
                        <Typography color="#f00" variant="h6" component="div">
                          Are you want to attend this event?
                        </Typography>
                      </ListItem>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: -4 }}>
                      <ListItem display="flex">
                        <Button
                          onClick={() => onClick('yes')}
                          variant="contained"
                          size="small"
                          sx={{ mr: 1, p: 0, backgroundColor: '#6AA84F', '&:hover': { backgroundColor: '#66a949' } }}
                        >
                          Yes
                        </Button>
                        <Button
                          onClick={() => onClick('no')}
                          variant="contained"
                          size="small"
                          sx={{ mr: 1, p: 0, backgroundColor: '#ED5E68', '&:hover': { backgroundColor: '#FF0000' } }}
                        >
                          No
                        </Button>
                        <Button
                          onClick={() => onClick('maybe')}
                          variant="contained"
                          size="small"
                          sx={{ p: 0, backgroundColor: '#f4a965', '&:hover': { backgroundColor: '#f19644' } }}
                        >
                          Maybe
                        </Button>
                      </ListItem>
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sm={3}
              md={3}
              lg={3}
              xl={3}
              align="left"
              sx={{
                mt: {
                  xs: -1,
                  sm: 3,
                  md: 3,
                  lg: 3,
                  xl: 3
                },
                ml: {
                  xs: -2,
                  sm: -1,
                  md: -1,
                  lg: -1,
                  xl: -1
                }
              }}
            >
              <Box display="flex" justifyContent="center">
                <Box>
                  <Typography color="#12A9B2" sx={{ mr: 1 }}>
                    Status:
                    <CustomChip>{status}</CustomChip>
                  </Typography>

                  <Button onClick={handleImgOpen}>
                    <Avatar
                      open={imgOpen}
                      onClose={handleImgClose}
                      variant={'rounded'}
                      alt="The image"
                      src={qr}
                      style={{
                        width: 100,
                        height: 100
                      }}
                    />
                  </Button>
                </Box>
              </Box>
              <Modal open={imgOpen} onClose={handleImgClose}>
                <Avatar
                  variant={'rounded'}
                  alt="The image"
                  src={qr}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: {
                      xs: 300,
                      sm: 300,
                      md: 500,
                      lg: 300,
                      xl: 300
                    },
                    height: {
                      xs: 300,
                      sm: 300,
                      md: 500,
                      lg: 300,
                      xl: 300
                    },
                    borderRadius: 2,
                    backgroundColor: 'background.paper',
                    boxShadow: 24
                  }}
                />
              </Modal>
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
