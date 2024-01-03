import { useEffect, useState } from 'react';

import MainCard from 'components/MainCard';
import ComponentSkeleton from '../ComponentSkeleton';
import { Box, Toolbar, Typography, Button, Grid, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import DefaultCard from './DefaultCard';
import AppointmentCard from './AppointmentCard';
import AppointmentModal from 'components/modal/AppointmentModal';
import { useNavigate } from 'react-router-dom';
import axiosInstance from 'utils/axios.config';
import { debounce } from 'lodash';
import Loader from 'components/loader/Loader';

const Appointment = () => {
  const [value, setValue] = useState('1');
  const [meetings, setMeetings] = useState([]);
  const [meetingModal, setMeetingModal] = useState(false);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meetingDetails, setMeetingDetails] = useState('');

  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleButtonClick = () => {
    navigate('/appointment/checkPhone');
  };
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(36);
  // const fetchData = async () => {
  //   try {
  //     const response = await axiosInstance.get('https://api.hellokompass.com/meetinglist');
  //     setMeetings(response.data.data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error(error);
  //     setLoading(false);
  //   }
  // };

  
  // const debouncedFetchData = debounce(fetchData, 100);

  // useEffect(() => {
  //   setLoading(true);
  //   debouncedFetchData();
  // }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`https://api.hellokompass.com/meetinglist?page=${page}&limit=${limit}`);
      // Assuming response.data contains meetings data and pagination details
      setMeetings(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [page, limit]); // Fetch data whenever page or limit changes
  
  // Render meetings based on the fetched data
  
  // Pagination controls
  // const handleNextPage = () => {
  //   setPage(page + 1);
  //   console.log("Next page: ", page + 1); // Check if this value updates correctly
  // };
  
  // const handlePrevPage = () => {
  //   setPage(page - 1 > 0 ? page - 1 : 1);
  //   console.log("Previous page: ", page - 1); // Check if this value updates correctly
  // };


  useEffect(() => {
    const fetchData = () => {
      setLoading(true);

      axiosInstance
        .get('https://api.hellokompass.com/meeting/meetingUpcoming')
        .then((res) => {
          setUpcoming(res.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    };

    fetchData();
  }, []);

  return (
    <Box>
      <ComponentSkeleton>
        <Box sx={{ flexGrow: 1 }}>
          <Toolbar sx={{ my: 1, mx: -2 }}>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Appointment
            </Typography>
            <Button
              onClick={handleButtonClick}
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
              New Meeting
            </Button>
          </Toolbar>
        </Box>

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
                    <Tab label="Pending" value="3" />
                    <Tab label="Canceled" value="4" />
                  </TabList>
                </Box>

                {loading ? (
                  <Box width="150px" height="150px">
                    <Loader loading={loading} display="flex" justifyContent="center" alignItems="center" />
                  </Box>
                ) : (
                  <Box>
                    <TabPanel value="1">
                      <Grid container spacing={3}>
                        {meetings.map((meeting) => (
                          <Grid item sx={12} sm={12} md={12} lg={12} xl={6} alignItems="center">
                            <DefaultCard
                              meeting={meeting}
                              setMeetingModal={setMeetingModal}
                              setMeetingDetails={setMeetingDetails}
                              key={meeting.meeting_id}
                            />
                          </Grid>
                        ))}
                       {/* <button onClick={handlePrevPage}>Previous</button>
                      <button onClick={handleNextPage}>Next</button> */}
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
                        {upcoming.map((meeting) => (
                          <Grid item sx={12} sm={6} md={6} lg={4} xl={3} alignItems="center">
                            <Box
                              sx={{
                                px: {
                                  xs: 2,
                                  sm: 0,
                                  md: 0
                                },
                                width: '100%',
                                borderRadius: '2%',
                                boxShadow: '2px 4px 6px rgba(0,0,0, 0.2)',
                                borderBottom: 8,
                                borderColor: 'rgb(91, 170, 115)',
                                '&:hover': {
                                  boxShadow: '2px 4px 6px rgba(91, 170, 115, 0.5)',
                                  border: 2,
                                  borderBottom: 8,
                                  borderColor: 'rgb(91, 170, 115)'
                                }
                              }}
                            >
                              <AppointmentCard
                                meeting={meeting}
                                setMeetingModal={setMeetingModal}
                                setMeetingDetails={setMeetingDetails}
                              ></AppointmentCard>
                            </Box>
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
                        {meetings
                          .filter((pendingMeeting) => pendingMeeting.status === 'pending' || pendingMeeting.status === 'Pending')
                          .map((meeting) => (
                            <Grid item sx={12} sm={6} md={6} lg={4} xl={3} alignItems="center">
                              <Box
                                sx={{
                                  px: {
                                    xs: 2,
                                    sm: 0,
                                    md: 0
                                  },
                                  width: '100%',
                                  borderRadius: '2%',
                                  boxShadow: '2px 4px 6px rgba(0,0,0, 0.2)',
                                  borderBottom: 8,
                                  borderColor: 'rgb(243, 171, 100)',
                                  '&:hover': {
                                    boxShadow: '2px 4px 6px rgba(243, 171, 100, 0.5)',
                                    border: 2,
                                    borderBottom: 8,
                                    borderColor: 'rgb(243, 171, 100)'
                                  }
                                }}
                              >
                                <AppointmentCard
                                  meeting={meeting}
                                  setMeetingModal={setMeetingModal}
                                  setMeetingDetails={setMeetingDetails}
                                ></AppointmentCard>
                              </Box>
                            </Grid>
                          ))}
                      </Grid>
                    </TabPanel>
                    <TabPanel value="4">
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
                        {meetings
                          .filter((cancelMeeting) => cancelMeeting.status === 'cancel' || cancelMeeting.status === 'Cancel')
                          .map((meeting) => (
                            <Grid item sx={12} sm={6} md={6} lg={4} xl={3} alignItems="center">
                              <Box
                                sx={{
                                  px: {
                                    xs: 2,
                                    sm: 0,
                                    md: 0
                                  },
                                  width: '100%',
                                  borderRadius: '2%',
                                  boxShadow: '2px 4px 6px rgba(0,0,0, 0.2)',
                                  borderBottom: 8,
                                  borderColor: 'rgb(234, 100, 63)',
                                  '&:hover': {
                                    boxShadow: '2px 4px 6px rgba(234, 100, 63, 0.5)',
                                    border: 2,
                                    borderBottom: 8,
                                    borderColor: 'rgb(234, 100, 63)'
                                  }
                                }}
                              >
                                <AppointmentCard
                                  meeting={meeting}
                                  setMeetingModal={setMeetingModal}
                                  setMeetingDetails={setMeetingDetails}
                                ></AppointmentCard>
                              </Box>
                            </Grid>
                          ))}
                      </Grid>
                    </TabPanel>
                  </Box>
                )}
              </TabContext>
            </Box>
          </MainCard>
        </Grid>
        <AppointmentModal meetingModal={meetingModal} handleClose={() => setMeetingModal(false)} meetingDetails={meetingDetails} />
      </ComponentSkeleton>
    </Box>
  );
};

export default Appointment;
