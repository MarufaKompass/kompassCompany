import React from 'react';
import { Box, Card, CardContent, Typography, IconButton, CardHeader, Grid, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from 'AppContextProvider';
import View from 'components/svg/View';
import Edit from 'components/svg/Edit';
import Invite from 'components/svg/Invite';
import ShowEvent from 'components/svg/ShowEvent';
import Delete from 'components/svg/Delete';
import Location from 'components/svg/Location';
import Time from 'components/svg/Time';
import TruncatedSubheader from 'components/TruncatedSubheader';

const EventDefaultCard = ({ event, setOpenDeleteModal, setDeleteId, setOpenEventModal }) => {
  const { setEventId, setEventDetails } = useAppContext();
  const { idxe, date, address, starttime, endtime, evntname } = event;

  const navigate = useNavigate();
  const handleButtonGuestList = () => {
    navigate('/event/guestList');
  };
  const handleButtonEventDetails = () => {
    navigate('/event/eventDetails');
  };

  const handleEventView = (id) => {
    setOpenEventModal(true);
    setEventId(id);
  };
  const handleEventDelete = (id) => {
    setOpenDeleteModal(true);
    setDeleteId(id);
  };

  const handleEditEvent = (idxe) => {
    navigate(`/event/${idxe}`);
  };

  const handleEditDetails = (idxe) => {
    handleButtonEventDetails();
    setEventDetails(idxe);
  };

  const handleEventGuest = (idxe) => {
    handleButtonGuestList();
    setEventDetails(idxe);
  };

  return (
    <Card
      sx={{
        display: {
          xs: 'block',
          sm: 'flex'
        },
        justifyContent: 'space-between',
        boxShadow: '2px 4px 6px rgba(0,0,0, 0.2)',
        '&:hover': {
          boxShadow: '2px 4px 6px rgba(18, 169, 178, 0.4)',
          border: 2,
          borderBottom: 6,
          borderColor: '#12A9B2'
        },
        borderBottom: 6,
        borderBottomColor: '#12A9B2',
        mx: {
          xs: -5,
          sm: 0,
          md: 0,
          lg: 0
        },
        mb: 1,
        pb: {
          xs: 3,
          sm: 0,
          md: 0,
          lg: 0
        }
      }}
    >
      <Grid container>
        <Grid items xs={12} sm={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Box
                sx={{
                  display: {
                    xs: 'block',
                    sm: 'flex',
                    md: 'flex',
                    lg: 'flex'
                  },
                  alignItems: 'center',
                  flexDirection: 'row',
                  mx: -2,
                  my: -1
                }}
              >
                <CardHeader
                  sx={{
                    mb: {
                      xs: -2,
                      sm: 0,
                      md: 0
                    }
                  }}
                  subheader={date}
                />
              </Box>
              <Box>
                <Typography
                  sx={{
                    mt: {
                      xs: 2,
                      sm: 0,
                      md: 0
                    },
                    fontSize: 16,
                    fontWeight: 500,
                    color: '#333'
                  }}
                  variant="h5"
                  component="div"
                >
                  {evntname}
                </Typography>
              </Box>
              <CardHeader
                sx={{ my: -1, mx: -1 }}
                avatar={<Time sx={{ fontSize: 15, mx: -1, color: 'rgb(126,135,144)' }} />}
                subheader={`${starttime} To ${endtime}`}
              />
              <CardHeader
                sx={{ mt: -3, mx: -1 }}
                avatar={<Location sx={{ fontSize: 15, mx: -1, color: 'rgb(126,135,144)' }} />}
                subheader={<TruncatedSubheader subheader={address} maxChars={36} />}
              />
            </CardContent>
          </Box>
        </Grid>
        <Grid items xs={12} sm={6} display="flex" alignItems="center" justifyContent="center" sx={{ mt: -1 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontSize: 20
            }}
          >
            <Tooltip title="View">
              <IconButton
                onClick={() => handleEventView(idxe)}
                sx={{
                  backgroundColor: '#F5F6FA',
                  borderRadius: '10%',

                  mr: {
                    xs: 2,
                    sm: 2
                  }
                }}
              >
                <View />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton
                onClick={() => handleEditEvent(idxe)}
                sx={{
                  backgroundColor: '#F5F6FA',
                  borderRadius: '10%',

                  mr: {
                    xs: 2,
                    sm: 2
                  }
                }}
              >
                <Edit />
              </IconButton>
            </Tooltip>

            <Tooltip title=" Sent Invitation">
              <IconButton
                onClick={() => handleEditDetails(idxe)}
                sx={{
                  backgroundColor: '#F5F6FA',
                  borderRadius: '10%',

                  mr: {
                    xs: 2,
                    sm: 2
                  }
                }}
              >
                <Invite color="#34b1ba" sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>

            <Tooltip title="GuestList">
              <IconButton
                onClick={() => handleEventGuest(idxe)}
                sx={{
                  backgroundColor: '#F5F6FA',
                  borderRadius: '10%',

                  mr: {
                    xs: 2,
                    sm: 2
                  }
                }}
              >
                <ShowEvent />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                onClick={() => handleEventDelete(idxe)}
                sx={{
                  backgroundColor: '#F5F6FA',
                  borderRadius: '10%',

                  mr: {
                    xs: 2,
                    sm: 2
                  }
                }}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default EventDefaultCard;
