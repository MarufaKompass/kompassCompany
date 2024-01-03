// material-ui
import { Box, Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const DashboardNumbering = ({ title, count, icons,color ,borderColor}) => (
  <MainCard contentSX={{ p: 3,backgroundColor:color }} >
    <Box sx={{ display: 'flex' }}>
      <Box width="100%">
        <Stack spacing={0.5}>
          <Grid container alignItems="center">
            <Grid item>
              <Typography variant="h4" color="#fff">
                {count}
              </Typography>
            </Grid>
          </Grid>
        </Stack>
        <Box>
          <Typography variant="h6" fontSize=".9rem" color="#fff">
            {title}
          </Typography>
        </Box>
      </Box>
      <Box display="flex"  alignItems="center" >
        <Box  border="1px solid #fff" width="40px" height="40px" display="flex" justifyContent="center" alignItems="center" borderRadius="50%">{icons}</Box>
      </Box>
    </Box>
  </MainCard>
);

export default DashboardNumbering;
