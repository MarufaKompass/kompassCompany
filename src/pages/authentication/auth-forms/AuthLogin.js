import React, { useState } from 'react';
import { Button, InputAdornment, IconButton, Grid, Stack, Typography, TextField } from '@mui/material';
import axios from 'axios';
import AnimateButton from 'components/@extended/AnimateButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppContext } from 'AppContextProvider';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ForgetModal from 'components/modal/ForgetModal';

const AuthLogin = () => {
  const { palette } = createTheme();
  const { register, handleSubmit } = useForm();
  const [phone, setPhoneNumber] = useState('');
  const [data, setData] = useState('');
  const { setUser } = useAppContext();
  const navigate = useNavigate();
  const [forgetModal, setForgetModal] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleToggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const { augmentColor } = palette;
  const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });

  const theme = createTheme({
    palette: {
      anger: createColor('#1198a0')
    }
  });

  const handleButtonClick = () => {
    navigate('/register');
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const onSubmit = async (data) => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post('https://api.hellokompass.com/user/login', data);

      if (response.data.code === 200) {
        sessionStorage.setItem('usersInfo', JSON.stringify(response.data.data.token));
        setUser(response.data.data.token);
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchData = async (phone) => {
    if (isFetching) {
      return;
    }

    setIsFetching(true);

    try {
      const res = await fetch('https://api.hellokompass.com/user/userTypecheck', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phone })
      });

      if (res.status === 200) {
        const data = await res.json();
        setData(data);
      } else {
        console.error('Error checking phone number');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setIsFetching(false);
    }
  };
  const handlePhoneNumberChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length === 11) {
      fetchData(inputValue);
    }
    setPhoneNumber(inputValue);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            {data.code === 200 ? (
              <>
                <Grid item xs={12}>
                  <Grid item xs={12}>
                    <Typography variant="p" component="div" sx={{ mb: 0, mt: 1 }}>
                      Phone Number
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="number"
                      name="phone"
                      label="Phone"
                      id="outlined"
                      size="small"
                      sx={{ mt: 2 }}
                      value={phone}
                      {...register('phone')}
                    />
                  </Grid>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12}>
                  <Grid item xs={12}>
                    <Typography variant="p" component="div" sx={{ mb: 0, mt: 1 }}>
                      Phone Number
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="number"
                      name="phone"
                      label="Phone"
                      id="outlined"
                      placeholder="01*********"
                      size="small"
                      sx={{ mt: 2 }}
                      value={phone}
                      onChange={handlePhoneNumberChange}
                    />
                  </Grid>
                </Grid>
              </>
            )}

            {data.code === 200 ? (
              <>
                <Grid item xs={12}>
                  <Grid item xs={12}>
                    <Typography variant="p" component="div" sx={{ mb: 0, mt: 0 }}>
                      Password
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="password"
                      label="password"
                      id="outlined"
                      placeholder="password"
                      size="small"
                      sx={{ mt: 2 }}
                      type={showPassword ? 'text' : 'password'}
                      {...register('password', { required: true })}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleTogglePassword} edge="end">
                              {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                </Grid>
              </>
            ) : data.code === 207 ? (
              <>
                <Grid item xs={12}>
                  <Grid item xs={12}>
                    <Typography variant="p" component="div" sx={{ mb: 0, mt: 0 }}>
                      Password
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      label="set password"
                      id="outlined"
                      placeholder="set password"
                      size="small"
                      sx={{ mt: 2 }}
                      {...register('password', { required: true })}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleTogglePassword} edge="end">
                              {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid item xs={12}>
                    <Typography variant="p" component="div" sx={{ mb: 0, mt: 0 }}>
                      Password
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type={showNewPassword ? 'text' : 'password'}
                      name="newpass"
                      label="New Password"
                      id="outlined"
                      placeholder="New password"
                      size="small"
                      sx={{ mt: 2 }}
                      {...register('newpass', { required: true })}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleToggleNewPassword} edge="end">
                              {showNewPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                </Grid>
              </>
            ) : data.code === 112 ? (
              <>
                <Typography sx={{ pl: '12px', pt: '5px', fontSize: '12px', color: '#FF0000' }}>{data.message}</Typography>
              </>
            ) : (
              <></>
            )}

            <Grid item xs={12} sx={{ mt: '-5px' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Typography variant="h6" fontSize=".9rem"></Typography>
                <Button variant="h6" onClick={() => setForgetModal(true)} color="text.primary">
                  Forgot Password?
                </Button>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <AnimateButton>
                <Button fullWidth size="large" type="submit" variant="contained" color="anger">
                  Login
                </Button>
              </AnimateButton>
            </Grid>

            <Typography variant="body1" sx={{ textDecoration: 'none', ml: 3, mt: '5px' }}>
              Don't have an account?
              <Button color="primary" onClick={handleButtonClick}>
                Sign Up
              </Button>
            </Typography>
          </Grid>
        </form>
        <ForgetModal forgetModal={forgetModal} handleClose={() => setForgetModal(false)} />
      </ThemeProvider>
    </>
  );
};

export default AuthLogin;
