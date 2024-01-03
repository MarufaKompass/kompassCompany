import leave from '../components/svg/Leave';
import earnWage from '../components/svg/EarnWage';
import loan from '../components/svg/Loan';
import iou from '../components/svg/Iou';
import salary from '../components/svg/Salary';
import providentFund from '../components/svg/Provident';
import attendance from '../components/svg/Attendance';

// icons

const icons = {
  leave,
  earnWage,
  loan,
  iou,
  salary,
  providentFund,
  attendance
};
// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const kompassPayroll = {
  id: 'company',
  //   title: 'kompass Company',
  type: 'group',
  children: [
    {
      id: 'kompassPayroll',
      title: 'Kompass Payroll',
      type: 'collapse',
      icon: icons.attendance,
      children: [
        {
          id: 'doubleSubmenu',
          title: 'Settings',
          type: 'collapse',
          icon: icons.attendance,
          // url: '/attendanceHistory', // Add the URL for the Attendance History page
          // breadcrumbs: false,
          children: [
            {
              id: 'salarySetup',
              title: 'Salary Setup',
              type: 'item',
              url: '/submenuItem1',
              breadcrumbs: false
            },
            {
              id: 'bonusSetup',
              title: 'Bonus Setup',
              type: 'item',
              url: '/submenuItem2',
              breadcrumbs: false
            },
            {
              id: 'allowancesSetup',
              title: 'Allowances Setup',
              type: 'item',
              url: '/submenuItem2',
              breadcrumbs: false
            },
            {
              id: 'tax_setup',
              title: 'Tax Setup',
              type: 'item',
              url: '/submenuItem2',
              breadcrumbs: false
            },
            {
              id: 'pick & drop_setup',
              title: 'Pick & Drop Setup',
              type: 'item',
              url: '/submenuItem2',
              breadcrumbs: false
            },
            {
              id: 'pfSetup',
              title: 'PF Setup',
              type: 'item',
              url: '/submenuItem2',
              breadcrumbs: false
            },
            {
              id: 'loanType',
              title: 'Loan Type Setup',
              type: 'item',
              url: '/submenuItem2',
              breadcrumbs: false
            },
            {
              id: 'mfstype',
              title: 'MFS Type Setup',
              type: 'item',
              url: '/submenuItem2',
              breadcrumbs: false
            },
            {
              id: 'working_days',
              title: 'Working Days Setup',
              type: 'item',
              url: '/submenuItem2',
              breadcrumbs: false
            }
          ]
        }
      ]
    }
  ]
};

export default kompassPayroll;
