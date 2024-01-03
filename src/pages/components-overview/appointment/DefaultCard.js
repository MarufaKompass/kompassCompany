import React from 'react';
import { Box, Card, CardContent, Typography, IconButton, CardHeader } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import View from 'components/svg/View';
import Location from 'components/svg/Location';
import Time from 'components/svg/Time';
import CustomChip from 'components/Chip/CustomChip';
import TruncatedSubheader from 'components/TruncatedSubheader';

const DefaultCard = ({ meeting, setMeetingModal, setMeetingDetails }) => {
  const theme = createTheme();

  const { meeting_id, date, type, status, name, location, time } = meeting;

  const onClick = (person_id) => {
    setMeetingModal(true);
    setMeetingDetails(person_id);
  };

  return (
    <ThemeProvider theme={theme}>
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
                subheader={date}
              />
              {
                <Box sx={{ ml: { xs: 2, sm: 1 } }}>
                  <CustomChip>{type}</CustomChip>
                </Box>
              }
              {status ? (
                <Box sx={{ ml: { xs: 2, sm: 1 }, mt: { xs: 0.5, sm: 0 } }}>
                  <CustomChip>{status}</CustomChip>
                </Box>
              ) : null}
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
                {name}
              </Typography>
            </Box>
            <CardHeader
              sx={{
                my: -1,
                mx: -1,
                '& .MuiCardHeader-subheader': {
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'wrap',
                  maxWidth: '100%'
                }
              }}
              avatar={<Location sx={{ fontSize: 16, mx: -1, color: 'rgb(126,135,144)' }} />}
              subheader={<TruncatedSubheader subheader={location} maxChars={36} />}
            />
            <CardHeader
              sx={{ mt: -3, mx: -1 }}
              avatar={<Time sx={{ fontSize: 15, mx: -1, color: 'rgb(126,135,144)' }} />}
              subheader={time}
            />
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
            onClick={() => onClick(meeting_id)}
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
            <View />
          </IconButton>
        </Box>
      </Card>
    </ThemeProvider>
  );
};

export default DefaultCard;
