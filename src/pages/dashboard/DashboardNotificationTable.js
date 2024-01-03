import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import "../../styles.css";

// material-ui
import { Avatar, Box, Divider, List, ListItemButton, ListItemAvatar, ListItemText, TableBody, Table, Typography } from '@mui/material';
import { GiftOutlined } from '@ant-design/icons';

// project import
import axiosInstance from 'utils/axios.config';
import Loader from 'components/loader/Loader';

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

// ==============================|| ORDER TABLE ||============================== //

export default function DashboardNotificationTable() {
  const [loading, setLoading] = useState(true);
  const [dashboardNotifications, setDashboardNotifications] = useState([]);

  function getTimeAgo(createdAt) {
    const createdTime = new Date(createdAt);
    const currentTime = new Date();
    const timeDifference = Math.floor((currentTime - createdTime) / 1000); // Time difference in seconds

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

  const fetchData = () => {
    setLoading(true);
    axiosInstance
      .get('https://api.hellokompass.com/notification?limit=8&offset=0')
      .then((res) => {
        const data = res.data;
        setDashboardNotifications(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        <></>;
      });
  };
  const debouncedFetchData = debounce(fetchData, 100);

  useEffect(() => {
    setLoading(true); // Set loading to true before fetching data
    debouncedFetchData();
  }, []);

  return (
    <Box>
      <Box sx={{ height: 500 }}>
        <Table aria-label="customized table">
          <TableBody>
            {loading ? (
            <Box   width="150px" height="150px">
            <Loader loading={loading} display="flex" justifyContent="center" alignItems="center" />
           </Box>
            ) : (
              dashboardNotifications.map((notify) => (
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
                  <ListItemButton>
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

                    <ListItemText primary={<Typography variant="h6">{notify.text}</Typography>} secondary={getTimeAgo(notify.created_at)} />
                    {/* <ListItemSecondaryAction>
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
                    </ListItemSecondaryAction> */}
                  </ListItemButton>
                  <Divider />
                </List>
              ))
            )}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}
