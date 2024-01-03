import React from 'react';
import { Box, Divider, Grid, ListItem, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import { useAppContext } from 'AppContextProvider';
import Uppercase from 'components/Uppercase/Uppercase';

export default function ProfileInfo() {
  const { empPayroll } = useAppContext();
  console.log(empPayroll);
  const {
    fname_emp,
    lname_emp,
    email_emp,
    mobal,
    gender_emp,
    grade,
    department,
    dname,
    emp_status,
    empz_idsl,
    nid_ssn,
    tinx,
    per_addx,
    pre_addx,
    paymode,
    iou_sts,
    bank_branch,
    bank_name,
    acc_name,
    acc_no,
    mfs_operator_name,
    mfs_acc,
    bonus_sts,
    bonus_details,
    allown_sts,
    allown_details,
    earnwage_sts,
    providentfund_sts,
    pickdrop_sts,
    vehicle,
    vehicle_rate
  } = empPayroll;
  const [bonusDetail1, bonusDetail2, bonusDetail3] = bonus_details && bonus_details.length >= 3 ? bonus_details : [null, null, null];
  const [allownDetail1, allownDetail2, allownDetail3] = allown_details && allown_details.length >= 3 ? allown_details : [null, null, null];

  return (
    <Box>
      <MainCard>
        <Typography align="left" variant="h5" component="h2">
          Details Profile
        </Typography>
        <Divider variant="middle" sx={{ my: 3, mx: 0 }} />
        <Grid container spacing={3} sx={{ mb: 1 }}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <ListItem sx={{ p: 0 }}>
              <Grid container spacing={0}>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                  <Typography variant="h6" component="h3">
                    First Name
                  </Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                  <Typography variant="h6" component="h3">
                    <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                  </Typography>
                </Grid>
                <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                  <Typography sx={{ color: '#000' }} variant="h6" component="div">
                    {fname_emp}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <ListItem sx={{ p: 0 }}>
              <Grid container spacing={0}>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                  <Typography variant="h6" component="h3">
                    Last Name
                  </Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                  <Typography variant="h6" component="h3">
                    <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                  </Typography>
                </Grid>
                <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                  <Typography sx={{ color: '#000' }} variant="h6" component="div">
                    {lname_emp}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ mb: 1 }}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <ListItem sx={{ p: 0 }}>
              <Grid container spacing={0}>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                  <Typography variant="h6" component="h3">
                    Email
                  </Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                  <Typography variant="h6" component="h3">
                    <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                  </Typography>
                </Grid>
                <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                  <Typography sx={{ color: '#000' }} variant="h6" component="div">
                    {email_emp}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <ListItem sx={{ p: 0 }}>
              <Grid container spacing={0}>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                  <Typography variant="h6" component="h3">
                    Phone
                  </Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                  <Typography variant="h6" component="h3">
                    <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                  </Typography>
                </Grid>
                <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                  <Typography sx={{ color: '#000' }} variant="h6" component="div">
                    {mobal}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ mb: 1 }}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <ListItem sx={{ p: 0 }}>
              <Grid container spacing={0}>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                  <Typography variant="h6" component="h3">
                    Gender
                  </Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                  <Typography variant="h6" component="h3">
                    <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                  </Typography>
                </Grid>
                <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                  <Typography sx={{ color: '#000' }} variant="h6" component="div">
                    {gender_emp}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <ListItem sx={{ p: 0, mb: 1 }}>
              <Grid container spacing={0}>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                  <Typography variant="h6" component="h3">
                    Grade
                  </Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                  <Typography variant="h6" component="h3">
                    <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                  </Typography>
                </Grid>
                <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                  <Typography sx={{ color: '#000' }} variant="h6" component="div">
                    {grade}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ mb: 1 }}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <ListItem sx={{ p: 0, mb: 1 }}>
              <Grid container spacing={0}>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                  <Typography variant="h6" component="h3">
                    Department
                  </Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                  <Typography variant="h6" component="h3">
                    <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                  </Typography>
                </Grid>
                <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                  <Typography sx={{ color: '#000' }} variant="h6" component="div">
                    {department}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <ListItem sx={{ p: 0, mb: 1 }}>
              <Grid container spacing={0}>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                  <Typography variant="h6" component="h3">
                    Designation
                  </Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                  <Typography variant="h6" component="h3">
                    <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                  </Typography>
                </Grid>
                <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                  <Typography sx={{ color: '#000' }} variant="h6" component="div">
                    {dname}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ mb: 1 }}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <ListItem sx={{ p: 0, mb: 1 }}>
              <Grid container spacing={0}>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                  <Typography variant="h6" component="h3">
                    Type
                  </Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                  <Typography variant="h6" component="h3">
                    <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                  </Typography>
                </Grid>
                <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                  <Typography sx={{ color: '#000' }} variant="h6" component="div">
                    {emp_status}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <ListItem sx={{ p: 0, mb: 1 }}>
              <Grid container spacing={0}>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                  <Typography variant="h6" component="h3">
                    Emp Id
                  </Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                  <Typography variant="h6" component="h3">
                    <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                  </Typography>
                </Grid>
                <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                  <Typography sx={{ color: '#000' }} variant="h6" component="div">
                    {empz_idsl}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ mb: 1 }}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <ListItem sx={{ p: 0 }}>
              <Grid container spacing={0}>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                  <Typography variant="h6" component="h3">
                    Nid
                  </Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                  <Typography variant="h6" component="h3">
                    <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                  </Typography>
                </Grid>
                <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                  <Typography sx={{ color: '#000' }} variant="h6" component="div">
                    {nid_ssn}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <ListItem sx={{ p: 0 }}>
              <Grid container spacing={0}>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                  <Typography variant="h6" component="h3">
                    Tin
                  </Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                  <Typography variant="h6" component="h3">
                    <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                  </Typography>
                </Grid>
                <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                  <Typography sx={{ color: '#000' }} variant="h6" component="div">
                    {tinx}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mb: 1 }}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <ListItem sx={{ p: 0, mb: 1 }}>
              <Grid container spacing={0}>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                  <Typography variant="h6" component="h3">
                    Present Address
                  </Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                  <Typography variant="h6" component="h3">
                    <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                  </Typography>
                </Grid>
                <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                  <Typography sx={{ color: '#000' }} variant="h6" component="div">
                    {pre_addx}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <ListItem sx={{ p: 0, mb: 1 }}>
              <Grid container spacing={0}>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                  <Typography variant="h6" component="h3">
                    Permanent Address
                  </Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                  <Typography variant="h6" component="h3">
                    <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                  </Typography>
                </Grid>
                <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                  <Typography sx={{ color: '#000' }} variant="h6" component="div">
                    {per_addx}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          </Grid>
        </Grid>

        <Divider variant="middle" sx={{ my: 3, mx: 0 }} />
        <Grid container spacing={3} sx={{ mb: 1 }}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <ListItem sx={{ p: 0 }}>
              <Grid container spacing={0}>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                  <Typography variant="h6" component="h3">
                    Salary Mode
                  </Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                  <Typography variant="h6" component="h3">
                    <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                  </Typography>
                </Grid>
                <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                  <Typography sx={{ color: '#000' }} variant="h6" component="div">
                    {paymode}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <ListItem sx={{ p: 0 }}>
              <Grid container spacing={0}>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                  <Typography variant="h6" component="h3">
                    IOU
                  </Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                  <Typography variant="h6" component="h3">
                    <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                  </Typography>
                </Grid>
                <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                  <Typography sx={{ color: '#000' }} variant="h6" component="div">
                    {iou_sts}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ mb: 1 }}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <ListItem sx={{ p: 0 }}>
              <Grid container spacing={0}>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                  <Typography variant="h6" component="h3">
                    Earned Wage
                  </Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                  <Typography variant="h6" component="h3">
                    <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                  </Typography>
                </Grid>
                <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                  <Typography sx={{ color: '#000' }} variant="h6" component="div">
                    {earnwage_sts}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <ListItem sx={{ p: 0 }}>
              <Grid container spacing={0}>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                  <Typography variant="h6" component="h3">
                    Provident fund
                  </Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                  <Typography variant="h6" component="h3">
                    <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                  </Typography>
                </Grid>
                <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                  <Typography sx={{ color: '#000' }} variant="h6" component="div">
                    {providentfund_sts}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ mb: 1 }}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <ListItem sx={{ p: 0 }}>
              <Grid container spacing={0}>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                  <Typography variant="h6" component="h3">
                    Allowance
                  </Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                  <Typography variant="h6" component="h3">
                    <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                  </Typography>
                </Grid>
                <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                  <Typography sx={{ color: '#000' }} variant="h6" component="div">
                    {allown_sts}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <ListItem sx={{ p: 0, mb: 1 }}>
              <Grid container spacing={0}>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                  <Typography variant="h6" component="h3">
                    Pick & Drop
                  </Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                  <Typography variant="h6" component="h3">
                    <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                  </Typography>
                </Grid>
                <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                  <Typography sx={{ color: '#000' }} variant="h6" component="div">
                    {pickdrop_sts === 'Yes' ? (
                      <>
                        {' '}
                        <Typography sx={{ color: '#000' }} variant="h6" component="div">
                          {vehicle}({vehicle_rate}tk)
                        </Typography>
                      </>
                    ) : (
                      <>
                        {' '}
                        <Typography sx={{ color: '#000' }} variant="h6" component="div">
                          {pickdrop_sts}
                        </Typography>
                      </>
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ mb: 1 }}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <ListItem sx={{ p: 0, mb: 1 }}>
              <Grid container spacing={0}>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                  <Typography variant="h6" component="h3">
                    Bonus List
                  </Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                  <Typography variant="h6" component="h3">
                    <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                  </Typography>
                </Grid>
                {Uppercase(bonus_sts) === 'Yes' ? (
                  <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                    <Typography sx={{ color: '#000' }} variant="h6" component="div">
                      {bonusDetail1.bonus_name}({bonusDetail1.bonpercent}%), {bonusDetail2.bonus_name}({bonusDetail2.bonpercent}%),{' '}
                      {bonusDetail3.bonus_name}({bonusDetail3.bonpercent}%)
                    </Typography>
                  </Grid>
                ) : (
                  <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                    <Typography sx={{ color: '#000' }} variant="h6" component="div">
                      {bonus_sts}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </ListItem>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <ListItem sx={{ p: 0, mb: 1 }}>
              <Grid container spacing={0}>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                  <Typography variant="h6" component="h3">
                    Allowance List
                  </Typography>
                </Grid>

                <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                  <Typography variant="h6" component="h3">
                    <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                  </Typography>
                </Grid>
                {Uppercase(allown_sts) === 'Yes' ? (
                  <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                    <Typography sx={{ color: '#000' }} variant="h6" component="div">
                      {allownDetail1.allown_name}({allownDetail1.allown_amount}tk), {allownDetail2.allown_name}(
                      {allownDetail2.allown_amount}tk), {allownDetail3.allown_name}({allownDetail3.allown_amount}tk)
                    </Typography>
                  </Grid>
                ) : (
                  <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                    <Typography sx={{ color: '#000' }} variant="h6" component="div">
                      {allown_sts}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </ListItem>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ mb: 1 }}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <ListItem sx={{ p: 0, mb: 1 }}>
              <Grid container spacing={0}>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                  <Typography variant="h6" component="h3">
                    BANK Info
                  </Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                  <Typography variant="h6" component="h3">
                    <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                  </Typography>
                </Grid>
                {Uppercase(paymode) === 'BANK' ? (
                  <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                    <Typography sx={{ color: '#000' }} variant="h6" component="div">
                      <Typography sx={{ color: '#000' }} variant="h6" component="div">
                        {bank_name}
                      </Typography>
                      <Typography sx={{ color: '#000' }} variant="h6" component="div">
                        {bank_branch}
                      </Typography>
                      <Typography sx={{ color: '#000' }} variant="h6" component="div">
                        {acc_name}
                      </Typography>
                      <Typography sx={{ color: '#000' }} variant="h6" component="div">
                        {acc_no}
                      </Typography>
                    </Typography>
                  </Grid>
                ) : Uppercase(paymode) === 'MFS' ? (
                  <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                    <Typography sx={{ color: '#000' }} variant="h6" component="div">
                      <Typography sx={{ color: '#000' }} variant="h6" component="div">
                        {mfs_operator_name}
                      </Typography>
                      <Typography sx={{ color: '#000' }} variant="h6" component="div">
                        {mfs_acc}
                      </Typography>
                    </Typography>
                  </Grid>
                ) : Uppercase(paymode) === 'BANK' ? (
                  <></>
                ) : (
                  <></>
                )}
              </Grid>
            </ListItem>
          </Grid>
        </Grid>
      </MainCard>
    </Box>
  );
}
