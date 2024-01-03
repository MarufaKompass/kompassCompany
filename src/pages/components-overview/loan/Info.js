import React, { useEffect, useState } from 'react';
import { Box, Grid, ListItem, Typography } from '@mui/material';
import axiosInstance from 'utils/axios.config';
import { useAppContext } from 'AppContextProvider';

export default function Info() {
  const { emiId } = useAppContext();
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const data = { loan_id: emiId };

    axiosInstance
      .post('https://api.hellokompass.com/payroll/emi', data)
      .then((res) => {
        setInfo(res.data.data.loanData);
      })
      .catch((error) => console.error(error));
  }, []);

  const { type_interest, designation, department, first_name, last_name, emi_length, lon_amt } = info;

  return (
    <Grid container>
      <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
        <ListItem sx={{ p: 0 }}>
          <Grid container spacing={0}>
            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
              <Typography variant="h6" component="h3">
                Name
              </Typography>
            </Grid>
            <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
              <Typography variant="h6" component="h3">
                <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
              </Typography>
            </Grid>
            <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
              <Typography sx={{ color: '#000' }} variant="h6" component="div">
                {first_name} {last_name}
              </Typography>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem sx={{ p: 0 }}>
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
                {designation}
              </Typography>
            </Grid>
          </Grid>
        </ListItem>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
        <ListItem sx={{ p: 0 }}>
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
        <ListItem sx={{ p: 0 }}>
          <Grid container spacing={0}>
            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
              <Typography variant="h6" component="h3">
                Loan Amount
              </Typography>
            </Grid>
            <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
              <Typography variant="h6" component="h3">
                <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
              </Typography>
            </Grid>
            <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
              <Typography sx={{ color: '#000' }} variant="h6" component="div">
                {lon_amt}
              </Typography>
            </Grid>
          </Grid>
        </ListItem>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
        <Grid container>
          <Grid item xs={12} sm={6} md={6} lg={12} xl={12}>
            <ListItem sx={{ p: 0 }}>
              <Grid container spacing={0}>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                  <Typography variant="h6" component="h3">
                    Interest
                  </Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                  <Typography variant="h6" component="h3">
                    <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                  </Typography>
                </Grid>
                <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                  <Typography sx={{ color: '#000' }} variant="h6" component="div">
                    {type_interest}%
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={12} xl={12}>
            <ListItem sx={{ p: 0 }}>
              <Grid container spacing={0}>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                  <Typography variant="h6" component="h3">
                    Emi Length
                  </Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                  <Typography variant="h6" component="h3">
                    <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                  </Typography>
                </Grid>
                <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                  <Typography sx={{ color: '#000' }} variant="h6" component="div">
                    {emi_length} Months
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
