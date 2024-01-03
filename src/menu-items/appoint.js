// assets
import appoints from "../../src/components/svg/Appoint";
import event from "../../src/components/svg/Event";
import schedule from "../../src/components/svg/Schedule";
// icons
const icons = {
  appoints,
  event,
  schedule

};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const appoint = {
  id: 'appoint',
  title: 'My Kompass Connect',
  type: 'group',
  children: [
    {
      id: 'appoint-appointment',
      title: 'Appointment',
      type: 'item',
      url: '/appointment',
      icon: icons.appoints
    },
    {
      id: 'appoint-schedule',
      title: 'Schedule',
      type: 'item',
      url: '/schedule',
      icon: icons.schedule
    },
    {
      id: 'appoint-event',
      title: 'Event Book',
      type: 'item',
      url: '/event',
      icon: icons.event
    }
  ]
};

export default appoint;
