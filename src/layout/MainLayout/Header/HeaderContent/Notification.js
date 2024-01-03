import { useEffect, useRef, useState } from 'react';

import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Badge,
  Box,
  ClickAwayListener,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Popper,
  Typography,
  useMediaQuery,
  CardHeader
} from '@mui/material';
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// assets
import { CloseOutlined, GiftOutlined } from '@ant-design/icons';
import { useAppContext } from 'AppContextProvider';
import NotificationModal from 'components/modal/NotificationModal';
import { useNavigate } from 'react-router-dom';
import Notify from 'components/svg/Notify';
import axiosInstance from 'utils/axios.config';
import MeetingModal from 'components/modal/Notification/MeetingModal';
import EventModal from 'components/modal/Notification/EventModal';

// sx styles
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

const actionSX = {
  mt: '6px',
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',

  transform: 'none'
};

const Notification = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
  const { shortNotifications, setShortNotifications, count, setCount } = useAppContext();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [openEventModal, setOpenEventModal] = useState(false);
  const [openNotificationModal, setOpenNotificationModal] = useState(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

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

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const iconBackColorOpen = 'grey.300';
  const iconBackColor = 'grey.100';

  const navigate = useNavigate();

  const handleButtonNotification = () => {
    navigate('/notification');
  };

  // count API

  useEffect(() => {
    axiosInstance
      .get('https://api.hellokompass.com/notification/count')
      .then((res) => {
        const data = res.data;
        setCount(data.data.count || 0);
      })
      .catch((error) => {
        <></>;
      });
  }, []);

  //notification API
  useEffect(() => {
    axiosInstance
      .get('https://api.hellokompass.com/notification?limit=3&offset=0')
      .then((res) => {
        const data = res.data;
        setShortNotifications(data.data);
      })
      .catch((error) => {
        <></>;
      });
  }, []);

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
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <IconButton
        disableRipple
        color="secondary"
        sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        {count !== null ? (
          <Badge badgeContent={count} color="error">
            <Notify />
          </Badge>
        ) : (
          <Badge badgeContent={0} color="error">
            <Notify />
          </Badge>
        )}
      </IconButton>

      <Popper
        placement={matchesXs ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [matchesXs ? -5 : 0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                width: '100%',
                minWidth: 285,
                maxWidth: 600
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  title="Notification"
                  elevation={0}
                  border={false}
                  content={false}
                  secondary={
                    <IconButton size="small" onClick={handleToggle}>
                      <CloseOutlined />
                    </IconButton>
                  }
                >
                  {shortNotifications.map((notify) => (
                    <List
                      key={notify.id}
                      component="nav"
                      sx={{
                        p: 0,
                        '& .MuiListItemButton-root': {
                          py: 0.5,
                          '& .MuiAvatar-root': avatarSX,
                          '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                        }
                      }}
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
                        <ListItemAvatar>
                          <Avatar
                            alt="pic"
                            src={notify.image}
                            sx={{
                              color: 'success.main',
                              bgcolor: 'success.lighter'
                            }}
                          >
                            <GiftOutlined />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={<Typography variant="h6">{notify.text}</Typography>} secondary={notify.M_DATE} />
                        <ListItemSecondaryAction>
                          <Typography variant="caption" noWrap>
                            <CardHeader
                              subheader={
                                <Box display="flex">
                                  <Typography sx={{ mt: -1, fontSize: 10 }}>{getTimeAgo(notify.created_at)}</Typography>
                                  <AccessTimeIcon sx={{ fontSize: 15, ml: 1, mt: -1 }} />
                                </Box>
                              }
                            />
                          </Typography>
                        </ListItemSecondaryAction>
                      </ListItemButton>
                      <NotificationModal></NotificationModal>
                      <Divider />
                    </List>
                  ))}

                  <MeetingModal
                    meetingModal={meetingModal}
                    openMeetingModal={openMeetingModal}
                    handleClose={() => setOpenMeetingModal(false)}
                  />
                  <EventModal invitation={invitation} openEventModal={openEventModal} handleClose={() => setOpenEventModal(false)} />
                  <NotificationModal
                    courierModal={courierModal}
                    openNotificationModal={openNotificationModal}
                    handleClose={() => setOpenNotificationModal(false)}
                  />
                  <ListItemButton onClick={handleButtonNotification} sx={{ textAlign: 'center', py: `${12}px !important` }}>
                    <ListItemText
                      primary={
                        <Typography variant="h6" color="primary">
                          View All
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Notification;
