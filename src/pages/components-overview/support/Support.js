import React from 'react';
import { Box, Grid } from '@mui/material';
import construction from '../../../assets/images/image/construction.png';
import MainCard from 'components/MainCard';
export default function Support() {
  return (
    <Box>
      <MainCard>
        <Grid container justifyContent="center" alignItems="center" height="84vh">
          <Grid item>
            <img src={construction} alt="construction" />
          </Grid>
        </Grid>
      </MainCard>
    </Box>
  );
}
