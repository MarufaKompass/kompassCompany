import React, { useEffect, useState } from 'react';
import { Avatar, Divider, Grid, Box, Button, Typography, Modal, List, ListItem } from '@mui/material';
import axiosInstance from 'utils/axios.config';
import { toast } from 'react-toastify';
import ActiveModal from '../StatusModal/ActiveModal';
import ActiveModalState from '../StatusModal/ActiveModalState';
import CancelModal from '../StatusModal/CancelModal';
import CompleteModal from '../StatusModal/CompleteModal';
import CustomChip from 'components/Chip/CustomChip';

export default function MeetingModal({ meetingModal, openMeetingModal, handleClose }) {
  const [imgOpen, setImgOpen] = useState(false);
  const [viewMeeting, setViewMeeting] = useState([]);
  const [openActivity, setOpenActivity] = useState(false);
  const [openActivityStatus, setOpenActivityStatus] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const [openComplete, setOpenComplete] = useState(false);

  const handleCloseModal = () => {
    handleClose();
    if (meetingModal.is_read === 'no') {
      const data = { id: meetingModal?.id, is_read: 'yes' };
      console.log(data);
      axiosInstance.post('https://api.hellokompass.com/notification/update', data).then((res) => {
        console.log(res);
      });
    } else {
    }
  };

  const handleImgOpen = () => setImgOpen(true);
  const handleImgClose = () => setImgOpen(false);

  useEffect(() => {
    const fetchData = () => {
      if (meetingModal) {
        axiosInstance
          .get(`https://api.hellokompass.com/meeting/${meetingModal.module_id}`)
          .then((res) => {
            setViewMeeting(res.data.data);
          })
          .catch((error) => console.error(error));
      }
    };

    fetchData();
  }, [meetingModal]);

  const handleAcceptMeeting = (id) => {
    const data = { meeting_id: id };
    axiosInstance
      .post('https://api.hellokompass.com/meeting/accept', data)
      .then((res) => {
        toast.success(res.data.message);
        handleClose();
      })
      .catch((error) => console.error(error));
  };

  const [activityId, setActivityId] = useState();
  const handleActiveMeeting = (id) => {
    setOpenActivity(true);
    setActivityId(id);
  };

  const handleCancelMeeting = (id) => {
    setOpenCancel(true);
    setActivityId(id);
  };

  const [completeId, setCompleteId] = useState('');

  const handleCompleteMeeting = (id) => {
    setCompleteId(id);
    setOpenComplete(true);
  };

  return (
    <Box>
      <Modal open={Boolean(openMeetingModal)} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: {
              xs: '95%',
              sm: 700,
              md: 800,
              lg: 800,
              xl: 800
            },
            borderRadius: 2,
            backgroundColor: 'background.paper',
            boxShadow: 24,
            height: { xs: '630px', sm: 'auto' },
            overflow: 'auto',
            display: 'block'
          }}
        >
          <Box
            id="modal-modal-title"
            sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', px: 3, py: 1, color: '#7e8790' }}
          >
            <Typography variant="h4" component="h2" sx={{ color: 'black' }}>
              Meeting Details
            </Typography>
          </Box>
          <Divider variant="middle" sx={{ color: '#12A9B2', border: 1, opacity: 0.3 }} />
          <Box
            id="modal-modal-description"
            sx={{
              mt: 1,
              pl: {
                xs: 0,
                sm: 6,
                md: 6,
                lg: 6
              },
              pr: 4,
              py: 1,
              mr: { xs: -10 },
              mx: {
                xs: 3,
                sm: 3,
                md: 0,
                lg: 0
              }
            }}
          >
            <Box
              sx={{
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
                Meeting Overview
              </Typography>
              <Typography align="center" variant="h6" component="h2">
                <Box sx={{ display: 'inline', color: '#12a9b2' }}>Date:</Box>
                <Box sx={{ display: 'inline' }}> {viewMeeting.date}</Box> <Box sx={{ display: 'inline', color: '#12a9b2' }}>Time:</Box>
                <Box sx={{ display: 'inline' }}> {viewMeeting.time}</Box>
              </Typography>
            </Box>
            <Box>
              <Grid
                item
                sx={{
                  pb: 2,
                  px: 2,
                  flexDirection: {
                    xs: 'column-reverse',
                    sm: 'row',
                    md: 'row',
                    lg: 'row',
                    xl: 'row'
                  }
                }}
                container
                spacing={2}
              >
                <Grid
                  item
                  sm={9}
                  md={9}
                  lg={9}
                  xl={9}
                  sx={{
                    ml: {
                      xs: -3,
                      sm: -3,
                      md: 0,
                      lg: 0
                    }
                  }}
                >
                  <List>
                    <Typography sx={{ pl: 2, color: '#12a9b2' }} variant="h5" component="div">
                      Meeting with :
                    </Typography>
                    <ListItem sx={{ mb: -1 }}>
                      <Grid container>
                        <Grid xs={4} sm={2} lg={2}>
                          <Typography variant="h6" component="h3">
                            Name
                          </Typography>
                        </Grid>
                        <Grid xs={1} sm={1} lg={1}>
                          <Typography variant="h6" component="div">
                            :
                          </Typography>
                        </Grid>
                        <Grid xs={7} sm={9} lg={9}>
                          <Typography sx={{ color: '#000' }} variant="h6" component="div">
                            {viewMeeting.name}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem sx={{ mb: -1 }}>
                      <Grid container>
                        <Grid xs={4} sm={2} lg={2}>
                          <Typography variant="h6" component="div">
                            Phone
                          </Typography>
                        </Grid>
                        <Grid xs={1} sm={1} lg={1}>
                          <Typography variant="h6" component="div">
                            :
                          </Typography>
                        </Grid>
                        <Grid xs={7} sm={9} lg={9}>
                          <Typography sx={{ color: '#000' }} variant="h6" component="div">
                            {viewMeeting.phone}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem sx={{ mb: -1 }}>
                      <Grid container>
                        <Grid xs={4} sm={2} lg={2}>
                          <Typography variant="h6" component="div">
                            Email
                          </Typography>
                        </Grid>
                        <Grid xs={1} sm={1} lg={1}>
                          <Typography variant="h6" component="div">
                            :
                          </Typography>
                        </Grid>
                        <Grid xs={7} sm={9} lg={9}>
                          <Typography sx={{ color: '#000' }} variant="h6" component="div">
                            {viewMeeting.email}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem sx={{ mb: -1 }}>
                      <Grid container>
                        <Grid xs={4} sm={2} lg={2}>
                          <Typography variant="h6" component="div">
                            Company
                          </Typography>
                        </Grid>
                        <Grid xs={1} sm={1} lg={1}>
                          <Typography variant="h6" component="div">
                            :
                          </Typography>
                        </Grid>
                        <Grid xs={7} sm={9} lg={9}>
                          <Typography sx={{ color: '#000' }} variant="h6" component="div">
                            {viewMeeting.company_name}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                  </List>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={3}
                  md={3}
                  lg={3}
                  xl={3}
                  sx={{ alignItems: 'center', justifyContent: 'center', ml: { xs: -1, sm: 0, md: 0 } }}
                >
                  <Typography sx={{ py: 1 }} variant="h6" component="div">
                    Status :{viewMeeting && viewMeeting.status ? <CustomChip>{viewMeeting.status}</CustomChip> : null}
                  </Typography>

                  <Avatar
                    variant={'rounded'}
                    alt="The image"
                    src={viewMeeting.profile_image}
                    style={{
                      width: 100,
                      height: 100
                    }}
                  />
                </Grid>
              </Grid>
              <Divider sx={{ borderTop: 2, borderTopStyle: 'dashed', borderTopColor: '#a2a2a2' }} />
              <Grid
                item
                sx={{
                  py: 1,
                  px: 2
                }}
                container
                spacing={2}
              >
                <Grid
                  item
                  xs={12}
                  sm={9}
                  md={9}
                  lg={9}
                  xl={9}
                  sx={{
                    ml: {
                      xs: -3,
                      sm: -3,
                      md: 0,
                      lg: 0
                    }
                  }}
                >
                  <List>
                    <Typography sx={{ pl: 2, color: '#12a9b2' }} variant="h5" component="div">
                      Meeting Details :
                    </Typography>
                    <ListItem sx={{ mb: -1 }}>
                      <Grid container>
                        <Grid xs={4} sm={2} lg={2}>
                          <Typography variant="h6" component="div">
                            Type
                          </Typography>
                        </Grid>
                        <Grid xs={1} sm={1} lg={1}>
                          <Typography variant="h6" component="div">
                            :
                          </Typography>
                        </Grid>
                        <Grid xs={7} sm={9} lg={9}>
                          <Typography sx={{ color: '#000' }} variant="h6" component="div">
                            {viewMeeting.type}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem sx={{ mb: -1 }}>
                      <Grid container>
                        <Grid xs={4} sm={2} lg={2}>
                          <Typography variant="h6" component="div">
                            Purpose
                          </Typography>
                        </Grid>
                        <Grid xs={1} sm={1} lg={1}>
                          <Typography variant="h6" component="div">
                            :
                          </Typography>
                        </Grid>
                        <Grid xs={7} sm={9} lg={9}>
                          <Typography sx={{ color: '#000' }} variant="h6" component="div">
                            {viewMeeting.purpose}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem sx={{ mb: -1 }}>
                      <Grid container>
                        <Grid xs={4} sm={2} lg={2}>
                          <Typography variant="h6" component="div">
                            Location
                          </Typography>
                        </Grid>
                        <Grid xs={1} sm={1} lg={1}>
                          <Typography variant="h6" component="div">
                            :
                          </Typography>
                        </Grid>
                        <Grid xs={7} sm={9} lg={9}>
                          <Typography sx={{ color: '#000' }} variant="h6" component="div">
                            {viewMeeting.location}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    {viewMeeting.status === 'Pending' ? (
                      <></>
                    ) : (
                      <ListItem sx={{ mb: -1 }}>
                        <Grid container>
                          <Grid xs={4} sm={2} lg={2}>
                            <Typography variant="h6" component="div">
                              Code
                            </Typography>
                          </Grid>
                          <Grid xs={1} sm={1} lg={1}>
                            <Typography variant="h6" component="div">
                              :
                            </Typography>
                          </Grid>
                          <Grid xs={7} sm={9} lg={9}>
                            <Typography sx={{ color: '#000' }} variant="h6" component="div">
                              {viewMeeting.code}
                            </Typography>
                          </Grid>
                        </Grid>
                      </ListItem>
                    )}
                  </List>
                </Grid>
                {viewMeeting.status === 'Pending' ? (
                  <></>
                ) : (
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
                    <Button onClick={handleImgOpen}>
                      <Avatar
                        open={imgOpen}
                        onClose={handleImgClose}
                        variant={'rounded'}
                        alt="The image"
                        src={viewMeeting.qr}
                        style={{
                          width: 100,
                          height: 100
                        }}
                      />
                    </Button>
                    <Modal open={imgOpen} onClose={handleImgClose}>
                      <Avatar
                        variant={'rounded'}
                        alt="The image"
                        src={viewMeeting.qr}
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
                )}
              </Grid>
              {viewMeeting.status === 'Cancel' && (
                <>
                  <Divider sx={{ borderTop: 2, borderTopStyle: 'dashed', borderTopColor: '#a2a2a2' }} />
                  <Grid sx={{ pb: 3, px: 2 }} container spacing={2}>
                    <Grid
                      item
                      xs={12}
                      md={12}
                      lg={12}
                      sx={{
                        ml: {
                          xs: -3,
                          sm: -3,
                          md: 0,
                          lg: 0
                        },
                        px: 2,
                        width: '100%'
                      }}
                    >
                      <List>
                        <Typography sx={{ pl: 2, mt: 1, color: '#FF0000' }} variant="h5" component="div">
                          Cancel Note :
                        </Typography>
                        <ListItem sx={{ mb: -1 }}>
                          <Grid container>
                            <Grid xs={4} sm={2} lg={2}>
                              <Typography sx={{ color: '#FF0000' }} variant="h6" component="div">
                                Text
                              </Typography>
                            </Grid>
                            <Grid xs={1} sm={1} lg={1}>
                              <Typography sx={{ color: '#FF0000' }} variant="h6" component="div">
                                :
                              </Typography>
                            </Grid>
                            <Grid xs={7} sm={9} lg={9}>
                              <Typography sx={{ color: '#FF0000' }} variant="h6" component="div">
                                {viewMeeting.note}
                              </Typography>
                            </Grid>
                          </Grid>
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                </>
              )}
              <Box
                sx={{
                  display: { xs: 'block', sm: 'flex' },
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mr: {
                    md: 10,
                    lg: 10,
                    xl: 10
                  }
                }}
              >
                {viewMeeting.buttonList?.btun_accept ||
                viewMeeting.buttonList?.btun_active ||
                viewMeeting.buttonList?.btun_cancel ||
                viewMeeting.buttonList?.btun_complete === true ? (
                  <Typography variant="h6" sx={{ fontSize: 14 }}>
                    To
                    {viewMeeting.buttonList.btun_accept && <span style={{ fontWeight: 'bold', mx: 1, color: '#12A9B2' }}> Accept </span>}
                    {viewMeeting.buttonList.btun_accept &&
                    (viewMeeting.buttonList.btun_active || viewMeeting.buttonList.btun_cancel || viewMeeting.buttonList.btun_complete)
                      ? 'or'
                      : null}
                    {viewMeeting.buttonList.btun_active && <span style={{ fontWeight: 'bold', mx: 1, color: '#12A9B2' }}> Active </span>}
                    {viewMeeting.buttonList.btun_active && (viewMeeting.buttonList.btun_cancel || viewMeeting.buttonList.btun_complete)
                      ? 'or'
                      : null}
                    {viewMeeting.buttonList.btun_cancel && <span style={{ fontWeight: 'bold', mx: 1, color: '#12A9B2' }}> Cancel </span>}
                    {viewMeeting.buttonList.btun_cancel && viewMeeting.buttonList.btun_complete ? 'or' : null}
                    {viewMeeting.buttonList.btun_complete && (
                      <span style={{ fontWeight: 'bold', mx: 1, color: '#12A9B2' }}> Complete </span>
                    )}
                    this meeting
                  </Typography>
                ) : null}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: { xs: 'start', sm: 'space-between' }
                  }}
                >
                  {viewMeeting.buttonList?.btun_accept === true && (
                    <Box>
                      <Button
                        onClick={() => handleAcceptMeeting(viewMeeting.id)}
                        variant="outlined"
                        size="large"
                        sx={{
                          mt: 1,
                          ml: { xs: 1, sm: 2 },
                          p: 0,
                          color: '#22bb33',
                          borderColor: '#22bb33',
                          '&:hover': { borderColor: '#22bb33' }
                        }}
                      >
                        Accept
                      </Button>
                    </Box>
                  )}
                  {viewMeeting.buttonList?.btun_active === true && (
                    <Box>
                      <Button
                        onClick={() => handleActiveMeeting(viewMeeting.id)}
                        variant="outlined"
                        size="large"
                        sx={{
                          mt: 1,
                          ml: { xs: 1, sm: 2 },
                          p: 0,
                          color: '#50ebaa',
                          borderColor: '#50ebaa',
                          '&:hover': { borderColor: '#50ebaa' }
                        }}
                      >
                        Active
                      </Button>
                    </Box>
                  )}
                  {viewMeeting.buttonList?.btun_cancel === true && (
                    <Box>
                      <ActiveModal activityId={activityId} />
                      <Box>
                        <Button
                          onClick={() => handleCancelMeeting(viewMeeting.id)}
                          variant="outlined"
                          size="large"
                          sx={{
                            mt: 1,
                            ml: { xs: 1, sm: 2 },
                            p: 0,
                            color: '#ff0000',
                            borderColor: '#ff0000',
                            '&:hover': { borderColor: '#ff0000' }
                          }}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Box>
                  )}
                  {viewMeeting.buttonList?.btun_complete === true && (
                    <Box>
                      <Button
                        onClick={() => handleCompleteMeeting(viewMeeting.id)}
                        variant="outlined"
                        size="large"
                        sx={{ mt: 1, ml: { xs: 1, sm: 2 }, px: 2, color: '#12A9B2' }}
                      >
                        Complete
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Divider sx={{ mt: 2, color: '#12A9B2', border: 1, opacity: 0.5, width: '100%', px: 3, mr: 2 }} />
              </Box>

              <Box sx={{ display: { xs: 'block', sm: 'flex' }, justifyContent: 'space-between', alignItems: 'center', pr: 5 }}>
                <Typography variant="h5" color="#ff0000">
                  To close this screen press
                </Typography>

                <Button
                  onClick={handleCloseModal}
                  variant="contained"
                  size="large"
                  type="submit"
                  sx={{ mt: 1, p: 0, backgroundColor: '#12A9B2', '&:hover': { backgroundColor: '#0e8087' } }}
                >
                  Close
                </Button>
              </Box>
              <ActiveModal
                activityId={activityId}
                openActivity={openActivity}
                handleCloseActivity={() => setOpenActivity(false)}
                handleClose={handleClose}
                setOpenActivityStatus={setOpenActivityStatus}
                setOpenCancel={setOpenCancel}
              />
              <ActiveModalState
                activityId={activityId}
                handleClose={handleClose}
                handleCloseActivity={() => setOpenActivity(false)}
                openActivityStatus={openActivityStatus}
                handleCloseActivityStatus={() => setOpenActivityStatus(false)}
              />
              <CancelModal
                activityId={activityId}
                openCancel={openCancel}
                handleCancelModal={() => setOpenCancel(false)}
                handleClose={handleClose}
              />
              <CompleteModal
                completeId={completeId}
                openComplete={openComplete}
                handleCompletedClose={() => setOpenComplete(false)}
                handleClose={handleClose}
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
