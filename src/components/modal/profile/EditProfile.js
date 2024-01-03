import React from 'react';
import { Box, Grid } from '@mui/material';
import PersonalInfo from './PersonalInfo';
import MainCard from 'components/MainCard';
import EditProfileInfo from './EditProfileInfo';
import ProfileImage from './ProfileImage';

export default function EditProfile() {
  return (
    <MainCard>
      <Box sx={{ py: { xl: 10 }, px: { xl: 7 } }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={3}>
            <Box>
              <PersonalInfo />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={7} lg={7} xl={9}>
            <Box>
              <EditProfileInfo />
            </Box>
            <Box sx={{ mt: 2 }}>
              <ProfileImage />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
}
