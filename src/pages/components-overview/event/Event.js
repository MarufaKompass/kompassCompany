import { Grid, Box, Tab, Toolbar, Typography, Button } from '@mui/material';

import MainCard from 'components/MainCard';
import ComponentSkeleton from '../ComponentSkeleton';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import { useEffect, useState } from 'react';
import EventDefaultCard from './EventDefaultCard';
import InboxCard from './InboxCard';
import { useNavigate } from 'react-router-dom';
import axiosInstance from 'utils/axios.config';
import EventModal from 'components/modal/EventModal';
import { useAppContext } from 'AppContextProvider';
import InvitationModal from 'components/modal/InvitationModal';
import DeleteModal from 'components/modal/DeleteModal';
import Loader from 'components/loader/Loader';

const Event = () => {
  const { eventId, invitationId, allEvent, setAllEvent, profile } = useAppContext();
  const { type } = profile;

  const [value, setValue] = useState('1');
  const [loading, setLoading] = useState(true);
  const [upcomingEvent, setUpcomingEvent] = useState([]);
  const [invitedEvent, setInvitedEvent] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEventModal, setOpenEventModal] = useState(false);
  const [openInvitationModal, setOpenInvitationModal] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();

  const handleButtonForm = () => {
    navigate('/event/addForm');
  };

  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get('https://api.hellokompass.com/event/person')
        .then((res) => {
          setAllEvent(res.data.data);
          setLoading(false);
        })
        .catch((error) => console.error(error));
    };

    fetchData();

    const refreshInterval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(refreshInterval);
  }, []);

  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get('https://api.hellokompass.com/upcomingevent')
        .then((res) => {
          setUpcomingEvent(res.data.data);
        })
        .catch((error) => console.error(error));
    };

    fetchData();
    const refreshInterval = setInterval(() => {
      fetchData();
    }, 5000);
    return () => clearInterval(refreshInterval);
  }, []);

  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get('https://api.hellokompass.com/event/invitedevnt')
        .then((res) => {
          setInvitedEvent(res.data.data);
        })
        .catch((error) => console.error(error));
    };

    fetchData();
  }, []);

  return (
    <Box>
      <ComponentSkeleton>
        <Box sx={{ flexGrow: 1 }}>
          <Toolbar sx={{ my: 1, mx: -2 }}>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Event
            </Typography>
            <Button
              onClick={handleButtonForm}
              style={{
                color: '#12A9B2',
                borderColor: '#12A9B2',
                '&:hover': {
                  color: '#12A9B2',
                  borderColor: '#12A9B2'
                }
              }}
              variant="outlined"
            >
              <Box fontSize="20px" sx={{ pr: '4px' }}>
                +
              </Box>
              New Event
            </Button>
          </Toolbar>
        </Box>
        <EventModal eventId={eventId} openEventModal={openEventModal} handleClose={() => setOpenEventModal(false)} />
        <InvitationModal
          invitationId={invitationId}
          openInvitationModal={openInvitationModal}
          handleClose={() => setOpenInvitationModal(false)}
        />
        <DeleteModal deleteId={deleteId} openDeleteModal={openDeleteModal} handleClose={() => setOpenDeleteModal(false)} />
        <Grid>
          <MainCard
            sx={{
              mx: {
                xs: -2,
                sm: 0,
                md: 0,
                lg: 0
              }
            }}
          >
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  {type === 'employee' ? (
                    <TabList
                      onChange={handleChange}
                      TabIndicatorProps={{
                        style: { background: '#12a9b2' }
                      }}
                      sx={{
                        '& button:focus': { color: '#12a9b2' },
                        '& button.Mui-selected': { color: '#12a9b2' }
                      }}
                    >
                      <Tab label="All" value="1" />
                      <Tab label="Upcoming" value="2" />
                      <Tab label="Inbox" value="3" />
                    </TabList>
                  ) : (
                    <TabList
                      onChange={handleChange}
                      TabIndicatorProps={{
                        style: { background: '#12a9b2' }
                      }}
                      sx={{
                        '& button:focus': { color: '#12a9b2' },
                        '& button.Mui-selected': { color: '#12a9b2' }
                      }}
                    >
                      <Tab label="Inbox" value="1" />
                    </TabList>
                  )}
                </Box>

                {loading ? (
                  <Box width="150px" height="150px">
                    <Loader loading={loading} display="flex" justifyContent="center" alignItems="center" />
                  </Box>
                ) : (
                  <Box>
                    {type === 'employee' ? (
                      <Box>
                        <TabPanel value="1">
                          <Grid container spacing={3}>
                            {allEvent.map((event) => (
                              <Grid item sx={12} sm={12} md={12} lg={12} xl={6} alignItems="center" width="100%">
                                <EventDefaultCard
                                  event={event}
                                  setOpenDeleteModal={setOpenDeleteModal}
                                  setDeleteId={setDeleteId}
                                  setOpenEventModal={setOpenEventModal}
                                ></EventDefaultCard>
                              </Grid>
                            ))}
                          </Grid>
                        </TabPanel>
                        <TabPanel value="2">
                          <Grid
                            container
                            spacing={3}
                            sx={{
                              alignItems: {
                                xs: 'center'
                              },
                              justifyContent: {
                                xs: 'center',
                                sm: 'center',
                                md: 'left'
                              }
                            }}
                          >
                            {upcomingEvent.map((event) => (
                              <Grid item sx={12} sm={12} md={12} lg={12} xl={6} alignItems="center" width="100%">
                                <EventDefaultCard
                                  event={event}
                                  setOpenDeleteModal={setOpenDeleteModal}
                                  setDeleteId={setDeleteId}
                                  setOpenEventModal={setOpenEventModal}
                                ></EventDefaultCard>
                              </Grid>
                            ))}
                          </Grid>
                        </TabPanel>
                        <TabPanel value="3">
                          <Grid
                            container
                            spacing={3}
                            sx={{
                              alignItems: {
                                xs: 'center'
                              },
                              justifyContent: {
                                xs: 'center',
                                sm: 'center',
                                md: 'left'
                              }
                            }}
                          >
                            {invitedEvent.map((event) => (
                              <Grid item sx={12} sm={12} md={12} lg={12} xl={6} alignItems="center" width="100%">
                                <InboxCard event={event} setOpenInvitationModal={setOpenInvitationModal} />
                              </Grid>
                            ))}
                          </Grid>
                        </TabPanel>
                      </Box>
                    ) : (
                      <TabPanel value="1">
                        <Grid
                          container
                          spacing={3}
                          sx={{
                            alignItems: {
                              xs: 'center'
                            },
                            justifyContent: {
                              xs: 'center',
                              sm: 'center',
                              md: 'left'
                            }
                          }}
                        >
                          {invitedEvent.map((event) => (
                            <Grid item sx={12} sm={12} md={12} lg={12} xl={6} alignItems="center" width="100%">
                              <InboxCard event={event} setOpenInvitationModal={setOpenInvitationModal} />
                            </Grid>
                          ))}
                        </Grid>
                      </TabPanel>
                    )}
                  </Box>
                )}
              </TabContext>
            </Box>
          </MainCard>
        </Grid>
      </ComponentSkeleton>
    </Box>
  );
};

export default Event;
