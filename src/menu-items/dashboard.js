// assets

import board from "../components/svg/Dashboard"
// icons
const icons = {
  board
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.board,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
