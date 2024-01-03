import React from 'react';
import { Box, Card, CardHeader, IconButton, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import View from 'components/svg/View';
import Location from 'components/svg/Location';
import Mail from 'components/svg/Mail';
import Phone from 'components/svg/Phone';
import TruncatedSubheader from 'components/TruncatedSubheader';

export default function AppointmentCard({ meeting, setMeetingModal, setMeetingDetails }) {
  const { meeting_id, date, name, email, phone, location, time } = meeting;

  const onClick = (person_id) => {
    setMeetingModal(true);
    setMeetingDetails(person_id);
  };

  return (
    <Card
      sx={{
        mx: {
          xs: -1,
          sm: 0,
          md: 0,
          lg: 0
        },
        pb: {
          xs: 2,
          sm: 0,
          md: 0,
          lg: 0
        },
        border: 'none',
        boxShadow: 'none'
      }}
    >
      <Box
        sx={{
          display: {
            xs: 'block',
            sm: 'flex',
            md: 'flex'
          },
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ mx: 3, mt: 3 }}>
          <Typography sx={{ mb: -2 }} variant="h5" component="div">
            {date}
          </Typography>
          <CardHeader sx={{ my: -1, mx: -1 }} avatar={<AccessTimeIcon sx={{ fontSize: 15, mx: -1 }} />} title={time} />
        </Box>
        <Box
          sx={{
            mt: {
              xs: -1,
              sm: 3
            },
            mx: {
              xs: 3,
              sm: 0
            }
          }}
        >
          <IconButton
            onClick={() => onClick(meeting_id)}
            sx={{
              backgroundColor: '#F5F6FA',
              borderRadius: '15%',
              fontSize: 20,
              mr: {
                xs: 2,
                sm: 2
              }
            }}
          >
            <View />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ mx: 3, mb: 3 }} style={{ color: '#7e8790' }}>
        <Typography
          sx={{
            mt: {
              xs: 2,
              sm: 0,
              md: 0
            },
            color: '#333'
          }}
          variant="h5"
          component="div"
        >
          {name}
        </Typography>
        <CardHeader sx={{ my: -1, mx: -2 }} avatar={<Phone sx={{ mx: -1 }} />} subheader={phone} />
        <CardHeader sx={{ my: -3, mx: -2 }} avatar={<Mail sx={{ mx: -1 }} />} subheader={email} />
        <CardHeader
          sx={{ my: -3, mx: -2 }}
          avatar={<Location sx={{ mx: -1 }} />}
          subheader={<TruncatedSubheader subheader={location} maxChars={25} />}
        />
      </Box>
    </Card>
  );
}
