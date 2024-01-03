// material-ui
// import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import loginBackground from '../image/login_background.png';
// ==============================|| AUTH BLUR BACK SVG ||============================== //
const AuthBackground = () => {
  return (
    <Box sx={{ position: 'absolute', filter: 'blur(3px)', zIndex: -1, bottom: 0, width: '100%' }}>
      <Box width={'100%'} height={'100%'}>
        <img src={loginBackground} alt="backgroundLogin" width={'100%'} height={'100%'} />
      </Box>
    </Box>
  );
};

export default AuthBackground;
