import React, { useState } from 'react';
import { Box, Toolbar, Typography, Divider, Grid, Button, FormHelperText, Input } from '@mui/material';
import MainCard from 'components/MainCard';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axiosInstance from 'utils/axios.config';
import { toast } from 'react-toastify';
import AnimateButton from 'components/@extended/AnimateButton';
import Captcha from 'components/Captcha/Captcha';

export default function ChangePassword() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [valid, setValid] = useState(false);

  const handleCaptchaChange = (captchaValue, inputValue) => {
    setText(inputValue);

    if (inputValue === captchaValue) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const onSubmit = (data) => {
    axiosInstance.post('https://api.hellokompass.com/user/changepassword', data).then((res) => {
      if (res.data.code === 200) {
        toast.success(res.data.message);
        reset();
      } else if (res.data.code === 400) {
        toast.failed(res.data.message);
        reset();
      } else {
        <></>;
      }
    });
  };

  const handleButtonViewProfile = () => {
    navigate('/profile/viewProfile');
  };

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar sx={{ mt: 1, mx: -2 }} align="center">
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
            Change Password
          </Typography>
        </Toolbar>
      </Box>
      <Divider variant="middle" sx={{ my: 3 }} />
      <Box>
        <MainCard sx={{ p: { xs: 0, sm: 3 } }}>
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container>
                <Grid item xs={12} sm={6} sx={{ pr: { xs: 0, sm: 3 } }}>
                  <Box>
                    <FormHelperText>
                      <Typography variant="h6" component="h2" color="#4e4d4e">
                        Old Password
                      </Typography>
                    </FormHelperText>
                    <Input
                      sx={{ mt: 1, '&:focus': { borderBottomColor: '#12A92B' } }}
                      fullWidth
                      type="password"
                      name="old_password"
                      displayEmpty
                      {...register('old_password', { required: true })}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ mt: { xs: 2, sm: 0 }, pr: { xs: 0, sm: 3 } }}>
                  <Box>
                    <FormHelperText>
                      <Typography variant="h6" component="h2" color="#4e4d4e">
                        New Password
                      </Typography>
                    </FormHelperText>
                    <Input
                      sx={{ mt: 1, '&:focus': { borderBottomColor: '#12A92B' } }}
                      name="new_password"
                      fullWidth
                      type="password"
                      displayEmpty
                      {...register('new_password', { required: true })}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                  <Box>
                    <Captcha onCaptchaChange={handleCaptchaChange} />
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Box>
                  <Button
                    onClick={handleButtonViewProfile}
                    variant="contained"
                    size="small"
                    sx={{ backgroundColor: '#12A9B2', width: 100, fontSize: 11, '&:hover': { backgroundColor: '#FF0000' } }}
                  >
                    Cancel
                  </Button>
                </Box>
                <Box>
                  <AnimateButton>
                    {valid ? (
                      <Button
                        type="submit"
                        variant="contained"
                        size="small"
                        sx={{ backgroundColor: '#12A9B2', ml: 2, width: 100, fontSize: 11, '&:hover': { backgroundColor: '#12A9B2' } }}
                      >
                        Update
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled
                        variant="contained"
                        size="small"
                        sx={{ backgroundColor: '#12A9B2', ml: 2, width: 100, fontSize: 11, '&:hover': { backgroundColor: '#12A9B2' } }}
                      >
                        Update
                      </Button>
                    )}
                  </AnimateButton>
                </Box>
              </Box>
            </form>
          </Box>
        </MainCard>
      </Box>
    </Box>
  );
}
