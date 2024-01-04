import Loadable from 'components/Loadable';
import DeclineMeetings from 'pages/components/kompassConnect/meetingReports/DeclineMeetings';
import MeetingReceived from 'pages/components/kompassConnect/meetingReports/MeetingReceived';
import MeetingSent from 'pages/components/kompassConnect/meetingReports/MeetingSent';
import PendingMeetings from 'pages/components/kompassConnect/meetingReports/PendingMeetings';
import SuccessfulMeetings from 'pages/components/kompassConnect/meetingReports/SuccessfulMeetings';
import Visitor from 'pages/components/kompassConnect/meetingReports/Visitor';

import { Suspense, lazy } from 'react';
import Typography from 'themes/overrides/Typography';

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
// const Appointment = Loadable(lazy(() => import('pages/components-overview/appointment/Appointment')));
// const Event = Loadable(lazy(() => import('pages/components-overview/event/Event')));
// const MeetingDetails = Loadable(lazy(() => import('pages/components-overview/appointment/MeetingDetails')));
// const ViewProfile = Loadable(lazy(() => import('components/modal/profile/ViewProfile')));
// const EditProfile = Loadable(lazy(() => import('components/modal/profile/EditProfile')));
// const ChangePassword = Loadable(lazy(() => import('components/modal/profile/ChangePassword')));
const MainLayout = Loadable(lazy(() => import('layout/MainLayout')));
// const NotFoundPage = Loadable(lazy(() => import('pages/components-overview/NotFoundPage/NotFoundPage')));
// const LeaveList = Loadable(lazy(() => import('pages/components-overview/leave/LeaveList')));
// const EarnWage = Loadable(lazy(() => import('pages/components-overview/earnwage/EarnWage')));
// const EarnWageList = Loadable(lazy(() => import('pages/components-overview/earnwage/EarnWageList')));
// const Loan = Loadable(lazy(() => import('pages/components-overview/loan/Loan')));
// const LoanList = Loadable(lazy(() => import('pages/components-overview/loan/LoanList')));
// const GuestList = Loadable(lazy(() => import('pages/components-overview/event/GuestList')));
// const EventDetails = Loadable(lazy(() => import('pages/components-overview/event/EventDetails')));
// const AddEvent = Loadable(lazy(() => import('pages/components-overview/event/AddEvent')));
// const EditEvent = Loadable(lazy(() => import('pages/components-overview/event/EditEvent')));
// const Notification = Loadable(lazy(() => import('pages/components-overview/Notification')));
// const LeaveApply = Loadable(lazy(() => import('pages/components-overview/leave/LeaveApply')));
// const SettlementList = Loadable(lazy(() => import('pages/components-overview/iou/SettlementList')));
// const Iou = Loadable(lazy(() => import('pages/components-overview/iou/Iou')));
// const EmiDetails = Loadable(lazy(() => import('pages/components-overview/loan/EmiDetails')));
// const SalaryCertificate = Loadable(lazy(() => import('pages/components-overview/salary/SalaryCertificate')));
// const Salary = Loadable(lazy(() => import('pages/components-overview/salary/Salary')));
// const AddForm = Loadable(lazy(() => import('pages/components-overview/appointment/AddForm')));
// const VisitorPage = Loadable(lazy(() => import('pages/components-overview/appointment/VisitorPage')));
const PrivateRoutes = Loadable(lazy(() => import('components/privateRoute/PrivateRoutes')));
// const ProvidentFund = Loadable(lazy(() => import('pages/components-overview/providentfund/ProvidentFund')));
//  const Support = Loadable(lazy(() => import('pages/components-overview/support/Support')));
// const Schedule = Loadable(lazy(() => import('pages/components-overview/Schedule/Schedule')));
// const AddSchedule = Loadable(lazy(() => import('pages/components-overview/Schedule/AddSchedule')));
// const UpdateSchedule = Loadable(lazy(() => import('pages/components-overview/Schedule/UpdateSchedule')));
// const AttendanceClaim = Loadable(lazy(() => import('pages/components-overview/attendance/AttendanceClaim')));
// const AttendanceHistory = Loadable(lazy(() => import('pages/components-overview/attendance/AttendanceHistory')));
// const ApplyIou = Loadable(lazy(() => import('pages/components-overview/iou/ApplyIou')));
// const IouList = Loadable(lazy(() => import('pages/components-overview/iou/IouList')));
// const Document = Loadable(lazy(() => import('pages/components-overview/Document')));
// ==============================|| MAIN ROUTING ||============================== //
const Department = Loadable(lazy(() => import('pages/components/organization/Department')));

const Event = Loadable(lazy(() => import('pages/components/kompassConnect/Event')));
const EventType = Loadable(lazy(() => import('pages/components/kompassConnect/EventType')));
const MeetingPurpose = Loadable(lazy(() => import('pages/components/kompassConnect/MeetingPurpose')));
const Designation = Loadable(lazy(() => import('pages/components/organization/Designation')));
const Employee = Loadable(lazy(() => import('pages/components/organization/Employee')));
const MainRoutes = {
  path: '/',
  element: (
    <Suspense fallback={<Typography>Loading...</Typography>}>
      <PrivateRoutes>
        <MainLayout />
      </PrivateRoutes>
    </Suspense>
  ),
  children: [
    {
      path: '/',
      element: (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          <DashboardDefault />
        </Suspense>
      )
    },
    {
      path: 'dashboard',
      children: [
        {
          path: '',
          element: (
            <PrivateRoutes>
              <DashboardDefault />
            </PrivateRoutes>
          )
        }
      ]
    },
    // {
    //   path: 'appointment',
    //   element: (
    //     <Suspense fallback={<Typography>Loading...</Typography>}>
    //       {' '}
    //       <PrivateRoutes>
    //         <Appointment />{' '}
    //       </PrivateRoutes>
    //     </Suspense>
    //   )
    // },
    // {
    //   path: 'appointment/addForm',
    //   element: (
    //     <Suspense fallback={<Typography>Loading...</Typography>}>
    //       <PrivateRoutes>
    //         <AddForm />
    //       </PrivateRoutes>
    //     </Suspense>
    //   )
    // },
    // {
    //   path: 'appointment/visitorPage',
    //   element: (
    //     <Suspense fallback={<Typography>Loading...</Typography>}>
    //       <PrivateRoutes>
    //         <VisitorPage />
    //       </PrivateRoutes>
    //     </Suspense>
    //   )
    // },
    // {
    //   path: 'event',
    //   element: (
    //     <Suspense fallback={<Typography>Loading...</Typography>}>
    //       <PrivateRoutes>
    //         <Event />
    //       </PrivateRoutes>
    //     </Suspense>
    //   )
    // },
    // {
    //   path: 'event/guestList',
    //   element: (
    //     <Suspense fallback={<Typography>Loading...</Typography>}>
    //       <PrivateRoutes>
    //         <GuestList />
    //       </PrivateRoutes>
    //     </Suspense>
    //   )
    // },
    // {
    //   path: 'event/eventDetails',
    //   element: (
    //     <Suspense fallback={<Typography>Loading...</Typography>}>
    //       <PrivateRoutes>
    //         <EventDetails />
    //       </PrivateRoutes>
    //     </Suspense>
    //   )
    // },
    // {
    //   path: 'event/addForm',
    //   element: (
    //     <Suspense fallback={<Typography>Loading...</Typography>}>
    //       <PrivateRoutes>
    //         <AddEvent />
    //       </PrivateRoutes>
    //     </Suspense>
    //   )
    // },
    // {
    //   path: 'schedule',
    //   element: (
    //     <Suspense fallback={<Typography>Loading...</Typography>}>
    //       <PrivateRoutes>
    //         <Schedule />
    //       </PrivateRoutes>
    //     </Suspense>
    //   )
    // },
    // {
    //   path: 'event/:idxe',
    //   element: (
    //     <Suspense fallback={<Typography>Loading...</Typography>}>
    //       <PrivateRoutes>
    //         <EditEvent />
    //       </PrivateRoutes>
    //     </Suspense>
    //   )
    // },
    // {
    //   path: 'appointment/checkPhone',
    //   element: (
    //     <Suspense fallback={<Typography>Loading...</Typography>}>
    //       <PrivateRoutes>
    //         <MeetingDetails />
    //       </PrivateRoutes>
    //     </Suspense>
    //   )
    // },
    // {
    //   path: 'notification',
    //   element: (
    //     <Suspense fallback={<Typography>Loading...</Typography>}>
    //       <PrivateRoutes>
    //         <Notification />
    //       </PrivateRoutes>
    //     </Suspense>
    //   )
    // },

    // {
    //   path: 'profile/viewProfile',
    //   element: (
    //     <Suspense fallback={<Typography>Loading...</Typography>}>
    //       <PrivateRoutes>
    //         <ViewProfile />
    //       </PrivateRoutes>
    //     </Suspense>
    //   )
    // },
    // {
    //   path: 'profile/changePassword',
    //   element: (
    //     <Suspense fallback={<Typography>Loading...</Typography>}>
    //       <PrivateRoutes>
    //         <ChangePassword />
    //       </PrivateRoutes>
    //     </Suspense>
    //   )
    // },
    // {
    //   path: 'profile/editProfile',
    //   element: (
    //     <Suspense fallback={<Typography>Loading...</Typography>}>
    //       <PrivateRoutes>
    //         <EditProfile />
    //       </PrivateRoutes>{' '}
    //     </Suspense>
    //   )
    // },

    // {
    //   path: 'earnWage',
    //   element: (
    //     <Suspense fallback={<Typography>Loading...</Typography>}>
    //       <PrivateRoutes>
    //         <EarnWage />
    //       </PrivateRoutes>
    //     </Suspense>
    //   )
    // },
    // {
    //   path: 'leaveApply',
    //   element: (
    //     <Suspense fallback={<Typography>Loading...</Typography>}>
    //       <PrivateRoutes>
    //         <LeaveApply />
    //       </PrivateRoutes>
    //     </Suspense>
    //   )
    // },

    // {
    //   path: 'iou',
    //   element: (
    //     <Suspense fallback={<Typography>Loading...</Typography>}>
    //       <PrivateRoutes>
    //         <IouList />
    //       </PrivateRoutes>
    //     </Suspense>
    //   )
    // },
    // {
    //   path: 'apply',
    //   element: (
    //     <Suspense fallback={<Typography>Loading...</Typography>}>
    //       <PrivateRoutes>
    //         <ApplyIou />
    //       </PrivateRoutes>
    //     </Suspense>
    //   )
    // },
    // {
    //   path: 'iou/settlementList',
    //   element: (
    //     <Suspense fallback={<Typography>Loading...</Typography>}>
    //       <PrivateRoutes>
    //         <SettlementList />
    //       </PrivateRoutes>
    //     </Suspense>
    //   )
    // },
    // {
    //   path: 'iou/settlement',
    //   element: (
    //     <Suspense fallback={<Typography>Loading...</Typography>}>
    //       <PrivateRoutes>
    //         <Iou />
    //       </PrivateRoutes>
    //     </Suspense>
    //   )
    // },
    // {
    //   path: 'leave/list',
    //   element: (
    //     <Suspense fallback={<Typography>Loading...</Typography>}>
    //       <PrivateRoutes>
    //         <LeaveList />
    //       </PrivateRoutes>
    //     </Suspense>
    //   )
    // },

    // {
    //   path: 'earnWage/list',
    //   element: (
    //     <Suspense fallback={<Typography>Loading...</Typography>}>
    //       <PrivateRoutes>
    //         {' '}
    //         <EarnWageList />
    //       </PrivateRoutes>
    //     </Suspense>
    //   )
    // },
    // {
    //   path: 'loan',
    //   element: (
    //     <Suspense fallback={<Typography>Loading...</Typography>}>
    //       <PrivateRoutes>
    //         <Loan />
    //       </PrivateRoutes>
    //     </Suspense>
    //   )
    // },
    // {
    //   path: 'loan/list',
    //   element: (
    //     <Suspense fallback={<Typography>Loading...</Typography>}>
    //       <PrivateRoutes>
    //         <LoanList />
    //       </PrivateRoutes>
    //     </Suspense>
    //   )
    // },
    // {
    //   path: 'loan/list/emiDetails',
    //   element: (
    //     <Suspense fallback={<Typography>Loading...</Typography>}>
    //       <PrivateRoutes>
    //         <EmiDetails />
    //       </PrivateRoutes>
    //     </Suspense>
    //   )
    // },

    // {
    //   path: 'salary/salaryCertificate',
    //   element: (
    //     <Suspense fallback={<Typography>Loading...</Typography>}>
    //       <PrivateRoutes>
    //         <SalaryCertificate />
    //       </PrivateRoutes>
    //     </Suspense>
    //   )
    // },
    // {
    //   path: 'salary/salaryList',
    //   element: (
    //     <Suspense fallback={<Typography>Loading...</Typography>}>
    //       <PrivateRoutes>
    //         <Salary />
    //       </PrivateRoutes>
    //     </Suspense>
    //   )
    // },
    // {
    //   path: 'providentFund/list',
    //   element: (
    //     <Suspense fallback={<Typography>Loading...</Typography>}>
    //       <PrivateRoutes>
    //         <ProvidentFund />
    //       </PrivateRoutes>
    //     </Suspense>
    //   )
    // },
    // {
    //   path: 'attendanceClaim',
    //   element: (
    //     <Suspense fallback={<Typography>Loading...</Typography>}>
    //       <PrivateRoutes>
    //         <AttendanceClaim />
    //       </PrivateRoutes>
    //     </Suspense>
    //   )
    // },
    // {
    //   path: 'attendanceHistory',
    //   element: (
    //     <Suspense fallback={<Typography>Loading...</Typography>}>
    //       <PrivateRoutes>
    //         <AttendanceHistory />
    //       </PrivateRoutes>
    //     </Suspense>
    //   )
    // },
    // {
    //   path: '*',
    //   element: (
    //     <Suspense fallback={<Typography>Loading...</Typography>}>
    //       {' '}
    //       <PrivateRoutes>
    //         <NotFoundPage />
    //       </PrivateRoutes>
    //     </Suspense>
    //   )
    // },
    // {
    //   path: 'support',
    //   element: (
    //     <Suspense fallback={<Typography>Loading...</Typography>}>
    //       {' '}
    //       <PrivateRoutes>
    //         <Support />
    //       </PrivateRoutes>
    //     </Suspense>
    //   )
    // },
    // {
    //   path: 'addSchedule',
    //   element: (
    //     <Suspense fallback={<Typography>Loading...</Typography>}>
    //       {' '}
    //       <PrivateRoutes>
    //         <AddSchedule />
    //       </PrivateRoutes>
    //     </Suspense>
    //   )
    // },
    // {
    //   path: 'schedule/:id',
    //   element: (
    //     <Suspense fallback={<Typography>Loading...</Typography>}>
    //       {' '}
    //       <PrivateRoutes>
    //         <UpdateSchedule />
    //       </PrivateRoutes>
    //     </Suspense>
    //   )
    // },
    // {
    //   path: 'document',
    //   element: (
    //     <Suspense fallback={<Typography>Loading...</Typography>}>
    //       {' '}
    //       <PrivateRoutes>
    //         <Document />
    //       </PrivateRoutes>
    //     </Suspense>
    //   )
    // }

    {
      path: 'department',
      element: (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          {' '}
          <PrivateRoutes>
            <Department></Department>
          </PrivateRoutes>
        </Suspense>
      )
    },
    {
      path: 'designation',
      element: (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          {' '}
          <PrivateRoutes>
            <Designation></Designation>
          </PrivateRoutes>
        </Suspense>
      )
    },
    {
      path: 'employee',
      element: (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          {' '}
          <PrivateRoutes>
            <Employee></Employee>
          </PrivateRoutes>
        </Suspense>
      )
    },
    {
      path: 'meetingPurpose',
      element: (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          {' '}
          <PrivateRoutes>
            <MeetingPurpose></MeetingPurpose>
          </PrivateRoutes>
        </Suspense>
      )
    },
    {
      path: 'eventType',
      element: (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          {' '}
          <PrivateRoutes>
            <EventType></EventType>
          </PrivateRoutes>
        </Suspense>
      )
    },
    {
      path: 'event',
      element: (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          {' '}
          <PrivateRoutes>
            <Event></Event>
          </PrivateRoutes>
        </Suspense>
      )
    },

    {
      path: 'meeting/meetingReceived',
      element: (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          {' '}
          <PrivateRoutes>
            <MeetingReceived></MeetingReceived>
          </PrivateRoutes>
        </Suspense>
      )
    },
    {
      path: 'meeting/meetingSent',
      element: (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          {' '}
          <PrivateRoutes>
            <MeetingSent></MeetingSent>
          </PrivateRoutes>
        </Suspense>
      )
    },
    {
      path: 'meeting/successfulMeetings',
      element: (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          {' '}
          <PrivateRoutes>
            <SuccessfulMeetings></SuccessfulMeetings>
          </PrivateRoutes>
        </Suspense>
      )
    },
    {
      path: 'meeting/declineMeetings',
      element: (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          {' '}
          <PrivateRoutes>
            <DeclineMeetings></DeclineMeetings>
          </PrivateRoutes>
        </Suspense>
      )
    },
    {
      path: 'meeting/pendingMeetings',
      element: (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          {' '}
          <PrivateRoutes>
            <PendingMeetings></PendingMeetings>
          </PrivateRoutes>
        </Suspense>
      )
    },
    {
      path: 'meeting/visitor',
      element: (
        <Suspense fallback={<Typography>Loading...</Typography>}>
          {' '}
          <PrivateRoutes>
            <Visitor></Visitor>
          </PrivateRoutes>
        </Suspense>
      )
    }
  ]
};

export default MainRoutes;
