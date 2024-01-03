// material-ui
import { Box, Grid, Stack, Typography } from '@mui/material';
// project import
import AuthLogin from './auth-forms/AuthLogin';
import AuthWrapper from './AuthWrapper';
import loginImage from '../../assets/images/image/login_img.png';
// ================================|| LOGIN ||================================ //

const Login = () => (
  <AuthWrapper>
    <Grid container spacing={4}>
      {/* <Grid item xs={12}></Grid> */}

      <Grid item xs={12} sm={12} md={12} lg={6} xl={6} sx={{ display: {xs:"none", md: 'none', lg: 'block' } }}>
        <Stack md={{ width: '100%' }}>
          <Box sx={{p:"25px"}}>
          <img src={loginImage} alt="login" rel="Preload"></img>
          </Box>
          
        </Stack>
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
        <Stack textAlign="center" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
          <Typography variant="h2">Sign in</Typography>
          <Typography variant="p" sx={{ mt: 1 }}>
            Login to stay connected.
          </Typography>
        </Stack>
        <AuthLogin />
      </Grid>
    </Grid>
  </AuthWrapper>
);

export default Login;