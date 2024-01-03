import React from 'react';
import { Box, Grid } from '@mui/material';
import ProfileInfo from './ProfileInfo';
import PersonalInfo from './PersonalInfo';
import MainCard from 'components/MainCard';

export default function ViewProfile() {
  return (
    <MainCard>
      <Box sx={{ py: { xl: 10 }, px: { xl: 7 } }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={3}>
            <Box>
              <PersonalInfo></PersonalInfo>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={7} lg={7} xl={9}>
            <Box>
              <ProfileInfo></ProfileInfo>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
}
