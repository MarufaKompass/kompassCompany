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
        },

        {
          id: 'doubleSubmenu',
          title: 'Grade Setup',
          type: 'collapse',
          icon: icons.attendance,
          // url: '/attendanceHistory', // Add the URL for the Attendance History page
          // breadcrumbs: false,
          children: [
            {
              id: 'add_grade',
              title: 'Add Grade',
              type: 'item',
              url: '/submenuItem1',
              breadcrumbs: false
            },
            {
              id: 'add_sub_grade',
              title: 'Add Sub Grade',
              type: 'item',
              url: '/submenuItem2',
              breadcrumbs: false
            }
          ]
        },

        {
          id: 'doubleSubmenu',
          title: 'Grade Setup',
          type: 'collapse',
          icon: icons.attendance,
          // url: '/attendanceHistory', // Add the URL for the Attendance History page
          // breadcrumbs: false,
          children: [
            {
              id: 'add_bank',
              title: 'Add Bank',
              type: 'item',
              url: '/submenuItem1',
              breadcrumbs: false
            }
          ]
        },
        {
          id: 'doubleSubmenu',
          title: 'Payroll Employee',
          type: 'collapse',
          icon: icons.attendance,
          // url: '/attendanceHistory', // Add the URL for the Attendance History page
          // breadcrumbs: false,
          children: [
            {
              id: 'add_employee',
              title: 'Add Employee',
              type: 'item',
              url: '/submenuItem1',
              breadcrumbs: false
            },
            {
              id: 'employee_list',
              title: 'Employee List',
              type: 'item',
              url: '/submenuItem2',
              breadcrumbs: false
            }
          ]
        },

        {
          id: 'doubleSubmenu',
          title: 'Meal',
          type: 'collapse',
          icon: icons.attendance,
          // url: '/attendanceHistory', // Add the URL for the Attendance History page
          // breadcrumbs: false,
          children: [
            {
              id: 'add_meal',
              title: 'Add Meal',
              type: 'item',
              url: '/submenuItem1',
              breadcrumbs: false
            }
          ]
        },

        {
          id: 'doubleSubmenu',
          title: 'Earned Wage',
          type: 'collapse',
          icon: icons.attendance,
          // url: '/attendanceHistory', // Add the URL for the Attendance History page
          // breadcrumbs: false,
          children: [
            {
              id: 'list',
              title: 'List',
              type: 'item',
              url: '/submenuItem1',
              breadcrumbs: false
            }
          ]
        },

        {
          id: 'doubleSubmenu',
          title: 'IOU',
          type: 'collapse',
          icon: icons.attendance,
          // url: '/attendanceHistory', // Add the URL for the Attendance History page
          // breadcrumbs: false,
          children: [
            {
              id: 'apply_list',
              title: 'Apply List',
              type: 'item',
              url: '/submenuItem1',
              breadcrumbs: false
            },
            {
              id: 'settlement_list',
              title: 'Settlement List',
              type: 'item',
              url: '/submenuItem1',
              breadcrumbs: false
            }
          ]
        },

        {
          id: 'doubleSubmenu',
          title: 'Loan',
          type: 'collapse',
          icon: icons.attendance,
          // url: '/attendanceHistory', // Add the URL for the Attendance History page
          // breadcrumbs: false,
          children: [
            {
              id: 'list',
              title: 'List',
              type: 'item',
              url: '/submenuItem1',
              breadcrumbs: false
            }
          ]
        },
        {
          id: 'doubleSubmenu',
          title: 'Leave',
          type: 'collapse',
          icon: icons.attendance,
          // url: '/attendanceHistory', // Add the URL for the Attendance History page
          // breadcrumbs: false,
          children: [
            {
              id: 'requests',
              title: 'Requests',
              type: 'item',
              url: '/submenuItem1',
              breadcrumbs: false
            },
            {
              id: 'approved',
              title: 'Approved',
              type: 'item',
              url: '/submenuItem1',
              breadcrumbs: false
            },
            {
              id: 'decline',
              title: 'Decline',
              type: 'item',
              url: '/submenuItem1',
              breadcrumbs: false
            }
          ]
        },
        {
          id: 'doubleSubmenu',
          title: 'Provident Fund',
          type: 'collapse',
          icon: icons.attendance,
          // url: '/attendanceHistory', // Add the URL for the Attendance History page
          // breadcrumbs: false,
          children: [
            {
              id: 'add_meal',
              title: 'List',
              type: 'item',
              url: '/submenuItem1',
              breadcrumbs: false
            }
          ]
        },

        {
            id: 'doubleSubmenu',
            title: 'Attendance',
            type: 'collapse',
            icon: icons.attendance,
            // url: '/attendanceHistory', // Add the URL for the Attendance History page
            // breadcrumbs: false,
            children: [
              {
                id: 'daily_attendance',
                title: 'Daily Attendance',
                type: 'item',
                url: '/submenuItem1',
                breadcrumbs: false
              },
              {
                id: 'claim_attendance',
                title: 'Claim Attendance',
                type: 'item',
                url: '/submenuItem1',
                breadcrumbs: false
              },
              {
                id: 'monthly_attendance',
                title: 'Monthly Attendance',
                type: 'item',
                url: '/submenuItem1',
                breadcrumbs: false
              },
              {
                id: 'employee_attendance',
                title: 'Employee Attendance',
                type: 'item',
                url: '/submenuItem1',
                breadcrumbs: false
              }
            ]
          }
      ]
    }
  ]
};

export default kompassPayroll;
