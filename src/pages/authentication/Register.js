import { Box, Grid, Stack, Typography } from '@mui/material';
import regImage from '../../assets/images/image/registration_img.png';
// project import
import FirebaseRegister from './auth-forms/AuthRegister';
import AuthWrapper from './AuthWrapper';

// ================================|| REGISTER ||================================ //

const Register = () => (
  <AuthWrapper>
    <Grid container spacing={3}>

    <Grid item xs={6} sm={6} md={12} lg={6} xl={6} sx={{ display: { xs: 'none', md:"none",lg: 'block' } }}>
        <Stack md={{ width: '950%' }} >
          <Box sx={{p:"25px"}}>
          <img src={regImage} alt="reg" rel="Preload" ></img>
          </Box>
        </Stack>
      </Grid>


      <Grid item xs={12} sm={12} md={12} lg={6} xl={6} >
        <Stack  textAlign="center"  sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
          <Typography variant="h3">Sign up</Typography>
          <Typography variant="p" sx={{mt:1}} color="#848482">Create your KOMPASS Connect account.</Typography>
         
        </Stack>
        <FirebaseRegister />
      </Grid>
    </Grid>


  </AuthWrapper>
);

export default Register;