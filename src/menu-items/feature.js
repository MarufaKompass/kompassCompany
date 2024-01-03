// assets
import appoints from "../components/svg/Appoint";
import event from "../components/svg/Event";
import schedule from "../components/svg/Schedule";
// icons
const icons = {
  appoints,
  event,
  schedule

};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const feature = {
  id: 'appoint',
  // title: 'My Kompass Connect',
  type: 'group',
  children: [
    {
      id: 'daily_attendance',
      title: 'Daily Attendance',
      type: 'item',
      url: '/appointment',
      icon: icons.appoints
    },
    {
      id: 'panels',
      title: 'Panels',
      type: 'item',
      url: '/schedule',
      icon: icons.schedule
    },
    {
      id: 'profile',
      title: 'Profile',
      type: 'item',
      url: '/event',
      icon: icons.event
    },
    {
      id: 'resetpassword',
      title: 'Reset password',
      type: 'item',
      url: '/event',
      icon: icons.event
    },
    {
      id: 'logout',
      title: 'Logout',
      type: 'item',
      url: '/event',
      icon: icons.event
    }
  ]
};

export default feature;
