// material-ui
import { Button, Grid, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

import { useNavigate } from 'react-router-dom';

// assets
import MeetingTable from './MeetingTable';
import DashboardNotificationTable from './DashboardNotificationTable';
import DashboardNumbering from 'components/cards/statistics/DashboardNumbering';
import DashboardAppoint from 'components/dashboardSvg/DashboardAppoint';
import DashBoardEvent from 'components/dashboardSvg/DashBoardEvent';
import DashBoardEarnWage from 'components/dashboardSvg/DashBoardEarnWage';
import DashboardIou from 'components/dashboardSvg/DashboardIou';
import DashboardLoan from 'components/dashboardSvg/DashboardLoan';
import DashboardLeave from 'components/dashboardSvg/DashboardLeave';
import { useAppContext } from 'AppContextProvider';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate('/notification');
  };
  const { profile } = useAppContext();
  const { module_list = {} ,greeting_msg} = profile;

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
        <Typography variant="p">{greeting_msg}</Typography>
        {/* <Typography variant="p">{profile.Dashboard}</Typography> */}
      </Grid>
      {module_list.payroll === true ? (
        <>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
            <DashboardNumbering
              title="Total Appointment"
              count="20"
              icons={<DashboardAppoint></DashboardAppoint>}
              color="rgba(18, 169, 178, 0.7)"
              borderColor="#12a9b2"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
            <DashboardNumbering title="Total Event" count="04" icons={<DashBoardEvent></DashBoardEvent>} color="rgba(71, 110, 244, 0.7)" />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
            <DashboardNumbering title="Total Leave" count="10" icons={<DashboardLeave></DashboardLeave>} color="rgba(0, 123, 255, 0.7)" />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
            <DashboardNumbering
              title="Total Earn Wage"
              count="03"
              icons={<DashBoardEarnWage></DashBoardEarnWage>}
              color="rgba(142, 68, 173, 0.5)"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
            <DashboardNumbering title="Total IOU" count="50" icons={<DashboardIou></DashboardIou>} color="rgba(75, 73, 172, 0.7)"  />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
            <DashboardNumbering title="Total Loan" count="02" icons={<DashboardLoan></DashboardLoan>} color="rgba(55, 210, 69, 0.7)" />
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
            <DashboardNumbering
              title="Total Appointment"
              count="20"
              icons={<DashboardAppoint></DashboardAppoint>}
              color="rgba(18, 169, 178, 0.7)"
              borderColor="#12a9b2"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
            <DashboardNumbering title="Total Event" count="04" icons={<DashBoardEvent></DashBoardEvent>} color="rgba(71, 110, 244, 0.7)" />
          </Grid>
        </>
      )}

      {/* <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} /> */}

      {/* row 2 */}
      {/* <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Unique Visitor</Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={0}>
              <Button
                size="small"
                onClick={() => setSlot('month')}
                color={slot === 'month' ? 'primary' : 'secondary'}
                variant={slot === 'month' ? 'outlined' : 'text'}
              >
                Month
              </Button>
              <Button
                size="small"
                onClick={() => setSlot('week')}
                color={slot === 'week' ? 'primary' : 'secondary'}
                variant={slot === 'week' ? 'outlined' : 'text'}
              >
                Week
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <IncomeAreaChart slot={slot} />
          </Box>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Income Overview</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="textSecondary">
                This Week Statistics
              </Typography>
              <Typography variant="h3">$7,650</Typography>
            </Stack>
          </Box>
          <MonthlyBarChart />
        </MainCard>
      </Grid> */}

      {/* row 3 */}
      <Grid item xs={12} md={7} lg={8} spacing={3}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Upcoming Activity</Typography>
          </Grid>
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <MeetingTable />
        </MainCard>
      </Grid>

      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Notifications</Typography>
          </Grid>
          <Grid item sx={{ mr: 2 }}>
            <Button variant="outlined" size="small" onClick={handleViewAll} sx={{ color: '#12A9B2', '&:hover': { color: '#12A9B2' } }}>
              View All
            </Button>
          </Grid>
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <DashboardNotificationTable />
        </MainCard>
      </Grid>

      {/* <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Analytics Report</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
            <ListItemButton divider>
              <ListItemText primary="Company Finance Growth" />
              <Typography variant="h5">+45.14%</Typography>
            </ListItemButton>
            <ListItemButton divider>
              <ListItemText primary="Company Expenses Ratio" />
              <Typography variant="h5">0.58%</Typography>
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Business Risk Cases" />
              <Typography variant="h5">Low</Typography>
            </ListItemButton>
          </List>
          <ReportAreaChart />
        </MainCard>
      </Grid> */}

      {/* row 4 */}
      {/* <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Sales Report</Typography>
          </Grid>
          <Grid item>
            <TextField
              id="standard-select-currency"
              size="small"
              select
              value={value}
              onChange={(e) => setValue(e.target.value)}
              sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' } }}
            >
              {status.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <MainCard sx={{ mt: 1.75 }}>
          <Stack spacing={1.5} sx={{ mb: -12 }}>
            <Typography variant="h6" color="secondary">
              Net Profit
            </Typography>
            <Typography variant="h4">$1560</Typography>
          </Stack>
          <SalesColumnChart />
        </MainCard>
      </Grid> */}
    </Grid>
  );
};

export default DashboardDefault;

// {
//   /* <MainCard sx={{ mt: 2 }}>
//           <Stack spacing={3}>
//            <Grid container justifyContent="space-between" alignItems="center">
//               <Grid item>
//                 <Stack>
//                   <Typography variant="h5" noWrap>
//                     Help & Support Chat
//                   </Typography>
//                   <Typography variant="caption" color="secondary" noWrap>
//                     Typical replay within 5 min
//                   </Typography>
//                 </Stack>
//               </Grid>
//               <Grid item>
//                 <AvatarGroup sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
//                   <Avatar alt="Remy Sharp" src={avatar1} />
//                   <Avatar alt="Travis Howard" src={avatar2} />
//                   <Avatar alt="Cindy Baker" src={avatar3} />
//                   <Avatar alt="Agnes Walker" src={avatar4} />
//                 </AvatarGroup>
//               </Grid>
//             </Grid>
//            <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }}>
//               Need Help?
//             </Button>
//           </Stack>
//         </MainCard> */
// }
