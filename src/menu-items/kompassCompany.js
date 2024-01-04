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

const kompassCompany = {
  id: 'company',
  // title: 'kompass Company',
  type: 'group',
  children: [
    {
      id: 'organization',
      title: 'Organization Setup',
      type: 'collapse',
      icon: icons.leave,
      children: [
        {
          id: 'department',
          title: 'Department',
          type: 'item',
          url: '/department',
          breadcrumbs: false
        },
        {
          id: 'designation',
          title: 'Designation',
          type: 'item',
          url: '/designation',

          breadcrumbs: false
        },
        {
          id: 'employee',
          title: 'Employee',
          type: 'item',
          url: '/employee',
          breadcrumbs: false
        }
      ]
    },

    // {
    //   id: 'wage',
    //   title: 'Earn Wage ',
    //   type: 'collapse',
    //   icon: icons.earnWage,
    //   children: [
    //     {
    //       id: 'earnWage',
    //       title: 'Apply',
    //       type: 'item',
    //       url: '/earnWage',
    //       breadcrumbs: false
    //     },
    //     {
    //       id: 'earnWageList',
    //       title: 'Earn Wage Book',
    //       type: 'item',
    //       url: '/earnWage/list',
    //       breadcrumbs: false
    //     }
    //   ]
    // },
    // {
    //   id: 'IOU',
    //   title: 'IOU ',
    //   type: 'collapse',
    //   icon: icons.iou,
    //   children: [
    //     {
    //       id: 'iouApply',
    //       title: 'Apply',
    //       type: 'item',
    //       url: '/apply',
    //       breadcrumbs: false
    //     },
    //     {
    //       id: 'iou',
    //       title: 'IOU Book',
    //       type: 'item',
    //       url: '/iou',
    //       breadcrumbs: false
    //     },
    //     {
    //       id: 'iouSettlement',
    //       title: 'Settlement List',
    //       type: 'item',
    //       url: 'iou/settlement',
    //       breadcrumbs: false
    //     }
    //   ]
    // },
    // {
    //   id: 'loan',
    //   title: 'Loan',
    //   type: 'collapse',
    //   icon: icons.loan,
    //   children: [
    //     {
    //       id: 'loan',
    //       title: 'Apply',
    //       type: 'item',
    //       url: '/loan',
    //       breadcrumbs: false
    //     },
    //     {
    //       id: 'leaveList',
    //       title: 'Loan Book',
    //       type: 'item',
    //       url: '/loan/list',
    //       breadcrumbs: false
    //     }
    //   ]
    // },

    // {
    //   id: 'salary',
    //   title: 'Salary',
    //   type: 'collapse',
    //   icon: icons.salary,
    //   children: [
    //     {
    //       id: 'salarySlip',
    //       title: 'Pay Slip',
    //       type: 'item',
    //       url: '/salary/salaryList',
    //       breadcrumbs: false
    //     },
    //     {
    //       id: 'salaryCertificate',
    //       title: 'Salary Certificate',
    //       type: 'item',
    //       url: '/salary/salaryCertificate',
    //       breadcrumbs: false
    //     }
    //   ]
    // },
    // {
    //   id: 'providentFund',
    //   title: 'Provident Fund',
    //   type: 'collapse',
    //   icon: icons.providentFund,
    //   children: [
    //     {
    //       id: 'doubleSubmenu',
    //       title: 'Provident Fund List',
    //       type: 'collapse',
    //       // url: '/providentFund/list',
    //       // breadcrumbs: false
    //       children: [
    //         {
    //           id: 'submenuItem1',
    //           title: 'Submenu Item 1',
    //           type: 'item',
    //           url: '/submenuItem1',
    //           breadcrumbs: false
    //         },
    //         {
    //           id: 'submenuItem2',
    //           title: 'Submenu Item 2',
    //           type: 'item',
    //           url: '/submenuItem2',
    //           breadcrumbs: false
    //         }
    //       ]
    //     }
    //   ]
    // },
    {
      id: 'kompassConnect',
      title: 'Kompass Connect',
      type: 'collapse',
      icon: icons.attendance,
      children: [
        {
          id: 'meeting_purpose',
          title: 'Meeting Purpose',
          type: 'item',
          url: '/attendanceClaim',
          breadcrumbs: false
        },
        {
          id: 'eventtype',
          title: 'Event Type',
          type: 'item',
          url: '/attendanceClaim',
          breadcrumbs: false
        },
        {
          id: 'event',
          title: 'Event',
          type: 'item',
          url: '/attendanceClaim',
          breadcrumbs: false
        },

        {
          id: 'doubleSubmenu',
          title: 'Meeting Reports',
          type: 'collapse',
          icon: icons.attendance,
          // url: '/attendanceHistory', // Add the URL for the Attendance History page
          // breadcrumbs: false,
          children: [
            {
              id: 'meeting received',
              title: 'Meeting Received',
              type: 'item',
              url: '/submenuItem1',
              breadcrumbs: false
            },
            {
              id: 'meeting_sent',
              title: 'Meeting Sent',
              type: 'item',
              url: '/submenuItem2',
              breadcrumbs: false
            },
            {
              id: 'successful_Meetings',
              title: 'Successful Meetings',
              type: 'item',
              url: '/submenuItem2',
              breadcrumbs: false
            },
            {
              id: 'decline_meetings',
              title: 'Decline Meetings',
              type: 'item',
              url: '/submenuItem2',
              breadcrumbs: false
            },
            {
              id: 'pending_meetings',
              title: 'Pending Meetings',
              type: 'item',
              url: '/submenuItem2',
              breadcrumbs: false
            },
            {
              id: 'visitor',
              title: 'Visitor',
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

export default kompassCompany;
