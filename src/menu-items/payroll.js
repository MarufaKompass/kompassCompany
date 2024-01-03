import leave from '../../src/components/svg/Leave';
import earnWage from '../../src/components/svg/EarnWage';
import loan from '../../src/components/svg/Loan';
import iou from '../../src/components/svg/Iou';
import salary from '../../src/components/svg/Salary';
import providentFund from '../../src/components/svg/Provident';
import attendance from '../../src/components/svg/Attendance';

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

const payroll = {
  id: 'payroll',
  title: 'My Payroll',
  type: 'group',
  children: [
    {
      id: 'leave',
      title: 'Leave ',
      type: 'collapse',
      icon: icons.leave,
      children: [
        {
          id: 'leaveApply',
          title: 'Apply',
          type: 'item',
          url: '/leaveApply',
          breadcrumbs: false
          
        },
        {
          id: 'leaveList',
          title: 'My Leave Book',
          type: 'item',
          url: '/leave/list',
       
          breadcrumbs: false
        }
      ]
    },

    {
      id: 'wage',
      title: 'Earn Wage ',
      type: 'collapse',
      icon: icons.earnWage,
      children: [
        {
          id: 'earnWage',
          title: 'Apply',
          type: 'item',
          url: '/earnWage',
          breadcrumbs: false
        },
        {
          id: 'earnWageList',
          title: 'Earn Wage Book',
          type: 'item',
          url: '/earnWage/list',
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'IOU',
      title: 'IOU ',
      type: 'collapse',
      icon: icons.iou,
      children: [
        {
          id: 'iouApply',
          title: 'Apply',
          type: 'item',
          url: '/apply',
          breadcrumbs: false
        },
        {
          id: 'iou',
          title: 'IOU Book',
          type: 'item',
          url: '/iou',
          breadcrumbs: false
        },
        {
          id: 'iouSettlement',
          title: 'Settlement List',
          type: 'item',
          url: 'iou/settlement',
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'loan',
      title: 'Loan',
      type: 'collapse',
      icon: icons.loan,
      children: [
        {
          id: 'loan',
          title: 'Apply',
          type: 'item',
          url: '/loan',
          breadcrumbs: false
        },
        {
          id: 'leaveList',
          title: 'Loan Book',
          type: 'item',
          url: '/loan/list',
          breadcrumbs: false
        }
      ]
    },

    {
      id: 'salary',
      title: 'Salary',
      type: 'collapse',
      icon: icons.salary,
      children: [
        {
          id: 'salarySlip',
          title: 'Pay Slip',
          type: 'item',
          url: '/salary/salaryList',
          breadcrumbs: false
        },
        {
          id: 'salaryCertificate',
          title: 'Salary Certificate',
          type: 'item',
          url: '/salary/salaryCertificate',
          breadcrumbs: false
        },
       

      ]
    },
    {
      id: 'providentFund',
      title: 'Provident Fund',
      type: 'collapse',
      icon: icons.providentFund,
      children: [
        {
          id: 'doubleSubmenu',
          title: 'Provident Fund List',
          type: 'collapse',
          // url: '/providentFund/list',
          // breadcrumbs: false
          children: [
            {
              id: 'submenuItem1',
              title: 'Submenu Item 1',
              type: 'item',
              url: '/submenuItem1',
              breadcrumbs: false
            },
            {
              id: 'submenuItem2',
              title: 'Submenu Item 2',
              type: 'item',
              url: '/submenuItem2',
              breadcrumbs: false
            },
          ]
        },
      ]
    },
    {
      id: 'attendance',
      title: 'Attendance',
      type: 'collapse',
      icon: icons.attendance,
      children: [
        {
          id: 'attendanceClaim',
          title: 'Attendance Claim',
          type: 'item',
          url: '/attendanceClaim',
          breadcrumbs: false
        },

        {
          id: 'doubleSubmenu',
          title: 'Attendance History',
          type: 'collapse',
          icon: icons.attendance,
          // url: '/attendanceHistory', // Add the URL for the Attendance History page
          // breadcrumbs: false,
          children: [
            {
              id: 'submenuItem1',
              title: 'Submenu Item 1',
              type: 'item',
              url: '/submenuItem1',
              breadcrumbs: false
            },
            {
              id: 'submenuItem2',
              title: 'Submenu Item 2',
              type: 'item',
              url: '/submenuItem2',
              breadcrumbs: false
            },
          ]
        },
      ]
    }

    
  ]
};

export default payroll;
