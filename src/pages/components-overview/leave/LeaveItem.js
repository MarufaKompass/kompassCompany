import React from 'react';
import { Grid, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import { useAppContext } from 'AppContextProvider';

export default function LeaveItem() {
  const { leave } = useAppContext();

  return (
    <Grid container rowSpacing={1} columnSpacing={1}>
      {leave.map((leaveType) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <MainCard
            contentSX={{
              p: 1,
              pt: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItem: 'center',
              bgcolor: 'background.paper',
              border: '2px solid #12A9B2',
              borderRadius: 3,
              boxShadow: '2px 4px 6px rgba(18, 169, 178,50)'
            }}
          >
            <Typography variant="h5" color="#12A9B2" sx={{ fontWeight: 'bold' }}>
              {leaveType.full_name} ({leaveType.avail_leave})
            </Typography>
          </MainCard>
        </Grid>
      ))}
    </Grid>
  );
}
