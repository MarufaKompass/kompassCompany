import React, { useEffect, useState } from 'react';
import ComponentSkeleton from './ComponentSkeleton';
import { CardHeader, Grid, Box, Typography, List, ListItemButton, Avatar, Divider, ListItemSecondaryAction, Button } from '@mui/material';
import MainCard from 'components/MainCard';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useAppContext } from 'AppContextProvider';
import axiosInstance from 'utils/axios.config';
import NotificationModal from 'components/modal/NotificationModal';
import MeetingModal from 'components/modal/Notification/MeetingModal';
import EventModal from 'components/modal/Notification/EventModal';

export default function Notification() {
  const { notifications, setNotifications, setReadAllData, setCount } = useAppContext();
  const [openEventModal, setOpenEventModal] = useState(false);
  const [openNotificationModal, setOpenNotificationModal] = useState(false);

  function getTimeAgo(createdAt) {
    const createdTime = new Date(createdAt);
    const currentTime = new Date();
    const timeDifference = Math.floor((currentTime - createdTime) / 1000);

    if (timeDifference < 60) {
      return `${timeDifference} second${timeDifference !== 1 ? 's' : ''} ago`;
    } else if (timeDifference < 3600) {
      const minutes = Math.floor(timeDifference / 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (timeDifference < 86400) {
      const hours = Math.floor(timeDifference / 3600);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else if (timeDifference < 2592000) {
      const days = Math.floor(timeDifference / 86400);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    } else if (timeDifference < 31536000) {
      const months = Math.floor(timeDifference / 2592000);
      return `${months} month${months !== 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(timeDifference / 31536000);
      return `${years} year${years !== 1 ? 's' : ''} ago`;
    }
  }

  useEffect(() => {
    axiosInstance
      .get('https://api.hellokompass.com/notification?limit=30&offset=0')
      .then((res) => {
        const data = res.data;
        setNotifications(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const readAll = () => {
    axiosInstance
      .get('https://api.hellokompass.com/notification/readall')
      .then((res) => {
        if (res.data.code === 200) {
          setReadAllData(res.data);
          setCount(0);
        } else if (res.data.code === 400) {
          <></>;
        } else {
          <></>;
        }
      })
      .catch((error) => {
        console.error(error); // Handle error properly
      });
  };

  const [meetingModal, setMeetingModal] = useState();
  const [openMeetingModal, setOpenMeetingModal] = useState(false);

  const handleMeetingNotification = (notify) => {
    setOpenMeetingModal(true);
    setMeetingModal(notify);
  };

  const [invitation, setInvitation] = useState();

  const handleEventNotification = (notify) => {
    setOpenEventModal(true);
    setInvitation(notify);
  };

  const [courierModal, setCourierModal] = useState('');

  const handleNotification = (notify) => {
    setOpenNotificationModal(true);
    setCourierModal(notify);
  };

  return (
    <Box>
      <ComponentSkeleton>
        <Box display="flex">
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, m: 1 }}>
            All Notifications
          </Typography>
          <Button>
            <Typography
              onClick={readAll}
              sx={{ px: '10px', py: '2px', bgcolor: '#12a9b2', color: '#fff', fontSize: '11px', borderRadius: '4px' }}
            >
              Mark all as read
            </Typography>
          </Button>
        </Box>
        <Box sx={{ mt: 3 }}>
          <MainCard>
            {notifications.map((notify) => (
              <Box>
                {notify.is_read === 'yes' ? (
                  <>
                    <List key={notify.id} sx={{ boxShadow: '2px 4px 6px rgba(18, 169, 178, 0.4)', py: 0, mt: 2 }}>
                      <ListItemButton
                        onClick={
                          notify.module_type === 'meeting'
                            ? () => handleMeetingNotification(notify)
                            : notify.module_type === 'evntsnt'
                            ? () => handleEventNotification(notify)
                            : () => handleNotification(notify)
                        }
                        sx={{ pb: 0 }}
                      >
                        <Grid container spacing={3} sx={{ mb: -1 }}>
                          <Grid item xs={2} sm={1} md={1} lg={1} xl={1}>
                            <Avatar
                              alt="pic"
                              src={notify.image}
                              sx={{
                                color: 'success.main',
                                bgcolor: 'success.lighter'
                              }}
                            ></Avatar>
                          </Grid>
                          <Divider
                            orientation="vertical"
                            flexItem
                            sx={{
                              mt: 3,
                              position: 'static',
                              borderRight: 1,
                              borderRightColor: '#12A9B2',
                              ml: { xs: 0, sm: 2 },
                              visibility: { xs: 'hidden', sm: 'visible' }
                            }}
                          />

                          <Grid item xs={9} sm={9} md={9} lg={9} xl={9} sx={{ ml: { xs: 1 } }}>
                            <Typography variant="h5" sx={{ mb: 3 }} fontSize="15px">
                              {notify.text}
                            </Typography>
                            <Grid container spacing={3}>
                              <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
                                <Typography variant="caption">
                                  <CardHeader
                                    sx={{ p: 0, mr: -5 }}
                                    subheader={
                                      <Box display="flex">
                                        <CalendarMonthOutlinedIcon sx={{ fontSize: 18 }} />
                                        <Typography sx={{ fontSize: 12, ml: 1 }}>{notify.M_DATE}</Typography>
                                      </Box>
                                    }
                                  />
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                                <Typography variant="caption">
                                  <CardHeader
                                    sx={{ p: 0, mt: { xs: -2, sm: -2, md: 0 } }}
                                    subheader={
                                      <Box display="flex">
                                        <AccessTimeIcon sx={{ fontSize: 18 }} />
                                        <Typography sx={{ fontSize: 12, ml: 1 }}>{notify.M_TIME}</Typography>
                                      </Box>
                                    }
                                  />
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={12} md={7} lg={8} xl={8}>
                                <Typography variant="caption">
                                  <CardHeader
                                    sx={{ p: 0, ml: { lg: -3 }, mt: { xs: -2, sm: -2, md: 0 }, display: 'block' }}
                                    subheader={
                                      <Box display="flex">
                                        <LocationOnOutlinedIcon sx={{ fontSize: 18 }} />
                                        <Typography sx={{ fontSize: 12, ml: 1 }}>{notify.M_LOCTION}</Typography>
                                      </Box>
                                    }
                                  />
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={2}
                            md={2}
                            lg={2}
                            xl={2}
                            sx={{
                              position: { xs: 'relative', sm: 'static' },
                              bottom: { xs: 0, sm: 0 },
                              right: { xs: 0, sm: 0 },
                              mt: { xs: 3, sm: 0 }
                            }}
                          >
                            <ListItemSecondaryAction>
                              <Typography variant="caption">
                                <CardHeader
                                  sx={{ p: 0, mb: 2 }}
                                  subheader={
                                    <Box display="flex">
                                      <Typography sx={{ fontSize: 12, mr: 1 }}>{getTimeAgo(notify.created_at)}</Typography>
                                      <AccessTimeIcon sx={{ fontSize: 15, mt: 0.2 }} />
                                    </Box>
                                  }
                                />
                              </Typography>
                            </ListItemSecondaryAction>
                          </Grid>
                        </Grid>
                      </ListItemButton>
                    </List>
                  </>
                ) : (
                  <>
                    <List
                      key={notify.id}
                      sx={{ py: 0, mt: 2, background: 'rgba(18, 169, 178, 0.1)', boxShadow: '2px 4px 6px rgba(18, 169, 178, 0.4)' }}
                    >
                      <ListItemButton
                        onClick={
                          notify.module_type === 'meeting'
                            ? () => handleMeetingNotification(notify)
                            : notify.module_type === 'evntsnt'
                            ? () => handleEventNotification(notify)
                            : () => handleNotification(notify)
                        }
                        sx={{ pb: 0 }}
                      >
                        <Grid container spacing={3} sx={{ mb: -1 }}>
                          <Grid item xs={2} sm={1} md={1} lg={1} xl={1}>
                            <Avatar
                              alt="pic"
                              src={notify.image}
                              sx={{
                                color: 'success.main',
                                bgcolor: 'success.lighter'
                              }}
                            ></Avatar>
                          </Grid>
                          <Divider
                            orientation="vertical"
                            flexItem
                            sx={{
                              mt: 3,
                              position: 'static',
                              borderRight: 1,
                              borderRightColor: '#12A9B2',
                              ml: { xs: 0, sm: 2 },
                              visibility: { xs: 'hidden', sm: 'visible' }
                            }}
                          />

                          <Grid item xs={9} sm={9} md={9} lg={9} xl={9} sx={{ ml: { xs: 1 } }}>
                            <Typography variant="h5" sx={{ mb: 3 }} fontSize="15px">
                              {notify.text}
                            </Typography>
                            <Grid container spacing={3}>
                              <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
                                <Typography variant="caption">
                                  <CardHeader
                                    sx={{ p: 0, mr: -5 }}
                                    subheader={
                                      <Box display="flex">
                                        <CalendarMonthOutlinedIcon sx={{ fontSize: 18 }} />
                                        <Typography sx={{ fontSize: 12, ml: 1 }}>{notify.M_DATE}</Typography>
                                      </Box>
                                    }
                                  />
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                                <Typography variant="caption">
                                  <CardHeader
                                    sx={{ p: 0, mt: { xs: -2, sm: -2, md: 0 } }}
                                    subheader={
                                      <Box display="flex">
                                        <AccessTimeIcon sx={{ fontSize: 18 }} />
                                        <Typography sx={{ fontSize: 12, ml: 1 }}>{notify.M_TIME}</Typography>
                                      </Box>
                                    }
                                  />
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={12} md={7} lg={8} xl={8}>
                                <Typography variant="caption">
                                  <CardHeader
                                    sx={{ p: 0, ml: { lg: -3 }, mt: { xs: -2, sm: -2, md: 0 }, display: 'block' }}
                                    subheader={
                                      <Box display="flex">
                                        <LocationOnOutlinedIcon sx={{ fontSize: 18 }} />
                                        <Typography sx={{ fontSize: 12, ml: 1 }}>{notify.M_LOCTION}</Typography>
                                      </Box>
                                    }
                                  />
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={2}
                            md={2}
                            lg={2}
                            xl={2}
                            sx={{
                              position: { xs: 'relative', sm: 'static' },
                              bottom: { xs: 0, sm: 0 },
                              right: { xs: 0, sm: 0 },
                              mt: { xs: 3, sm: 0 }
                            }}
                          >
                            <ListItemSecondaryAction>
                              <Typography variant="caption">
                                <CardHeader
                                  sx={{ p: 0, mb: 2 }}
                                  subheader={
                                    <Box display="flex">
                                      <Typography sx={{ fontSize: 12, mr: 1 }}>{getTimeAgo(notify.created_at)}</Typography>
                                      <AccessTimeIcon sx={{ fontSize: 15, mt: 0.2 }} />
                                    </Box>
                                  }
                                />
                              </Typography>
                            </ListItemSecondaryAction>
                          </Grid>
                        </Grid>
                      </ListItemButton>
                    </List>
                  </>
                )}
              </Box>
            ))}
          </MainCard>
          <MeetingModal meetingModal={meetingModal} openMeetingModal={openMeetingModal} handleClose={() => setOpenMeetingModal(false)} />
          <EventModal invitation={invitation} openEventModal={openEventModal} handleClose={() => setOpenEventModal(false)} />
          <NotificationModal
            courierModal={courierModal}
            openNotificationModal={openNotificationModal}
            handleClose={() => setOpenNotificationModal(false)}
          />
        </Box>
      </ComponentSkeleton>
    </Box>
  );
}
