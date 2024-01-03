import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemText, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// assets
import { EditOutlined, ProfileOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import Edit from 'components/svg/Edit';
import User from 'components/svg/User';
import Cpassword from 'components/svg/Cpassword';
import Logout from 'components/svg/Logout';
import { useAppContext } from 'AppContextProvider';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

const ProfileTab = ({ handleLogout }) => {
  const theme = useTheme();
  const { profile } = useAppContext();

  const { module_list = {} } = profile;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const navigate = useNavigate();
  const handleButtonViewProfile = () => {
    navigate('/profile/viewProfile');
  };
  const handleButtonEditProfile = () => {
    navigate('/profile/editProfile');
  };
  const handleButtonChangePassword = () => {
    navigate('profile/changePassword');
  };

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
      <Box onClick={handleButtonEditProfile}>
        <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
          <Edit>
            <EditOutlined />
          </Edit>
          <ListItemText primary="Edit Profile" sx={{ml:2}}/>
        </ListItemButton>
      </Box>
      {
        module_list.payroll === true ? (
<Box onClick={handleButtonViewProfile}>
        <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
          <User>
            <UserOutlined />
          </User>
          <ListItemText primary="View Profile" sx={{ml:2}}/>
        </ListItemButton>
      </Box>
        ) :
        <></>
      }
      
   <Box onClick={handleButtonChangePassword}>
      <ListItemButton selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3)}>
        <Cpassword>
          <ProfileOutlined />
        </Cpassword>
        <ListItemText primary="Change Password"  sx={{ml:2}}/>
      </ListItemButton>
      </Box>
    
      <ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
        <Logout>
          <LogoutOutlined />
        </Logout>
        <ListItemText primary="Logout" sx={{ml:2}}/>
      </ListItemButton>
    </List>
  );
};

ProfileTab.propTypes = {
  handleLogout: PropTypes.func
};

export default ProfileTab;
