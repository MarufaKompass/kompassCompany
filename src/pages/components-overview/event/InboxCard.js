import React from 'react';
import { Box, Card, CardContent, Typography, IconButton, CardHeader, Chip } from '@mui/material';

import { useAppContext } from 'AppContextProvider';
import View from 'components/svg/View';
import Location from 'components/svg/Location';
import Time from 'components/svg/Time';
import CustomChip from 'components/Chip/CustomChip';

const InboxCard = ({ event, setOpenInvitationModal }) => {
  const { setInvitationId } = useAppContext();

  const { evnt_invt_id, end_time, start_time, status, evnt_name, evnt_location, evnt_date } = event;

  const handleInvitation = (id) => {
    setOpenInvitationModal(true);
    setInvitationId(id);
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mb: {
            xs: -4,
            sm: 0
          }
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
                  xs: -1,
                  sm: 0,
                  md: 0
                }
              }}
              subheader={evnt_date}
            />
            <Box sx={{ ml: { xs: 2, sm: 0 } }}>
              <CustomChip>{status}</CustomChip>
            </Box>
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
              {evnt_name}
            </Typography>
          </Box>
          <CardHeader
            sx={{ my: -1, mx: -2 }}
            avatar={<Time sx={{ mx: -1, color: 'rgb(126,135,144)' }} />}
            subheader={`${start_time} To ${end_time}`}
          />
          <CardHeader sx={{ mt: -3, mx: -2 }} avatar={<Location sx={{ mx: -1, color: 'rgb(126,135,144)' }} />} subheader={evnt_location} />
        </CardContent>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          fontSize: 20,
          mx: {
            xs: 2,
            sm: 0
          }
        }}
      >
        <IconButton
          onClick={() => handleInvitation(evnt_invt_id)}
          sx={{
            backgroundColor: '#F5F6FA',
            borderRadius: '10%',
            fontSize: 20,
            mr: {
              xs: 2,
              sm: 2
            }
          }}
        >
          <View sx={{ fontSize: 20 }} />
        </IconButton>
      </Box>
    </Card>
  );
};

export default InboxCard;
