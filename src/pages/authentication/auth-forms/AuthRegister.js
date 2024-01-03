import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  List,
  ListItem
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import AnimateButton from 'components/@extended/AnimateButton';
import axios from 'axios';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useAppContext } from '../../../AppContextProvider';
import { registration } from 'components/validation/Validation';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { yupResolver } from '@hookform/resolvers/yup';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import Captcha from 'components/Captcha/Captcha';
import QuestionReg from 'components/svg/QuestionReg';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../assets/third-party/styles.css';

const AuthRegister = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(registration)
  });
  const { country } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (data) => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    axios
      .post('https://api.hellokompass.com/user/signup', data)
      .then((res) => {
        if (res.data.code === 200) {
          sessionStorage.setItem('usersInfo', JSON.stringify(res.data.data.token));
          navigate('/');
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const { palette } = createTheme();
  const { augmentColor } = palette;
  const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
  const theme = createTheme({
    palette: {
      anger: createColor('#1198a0')
    }
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={6} xl={6} marginTop="20px">
              <Stack spacing={1}>
                <Typography variant="p" component="div" sx={{ mb: 1, color: '#a7a7a7' }}>
                  First Name*
                </Typography>
                <TextField
                  {...register('first_name', { required: true })}
                  id="firstName"
                  type="text"
                  name="first_name"
                  placeholder="Enter Full Name"
                  size="small"
                  fullWidth
                />
                <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.first_name?.message}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={12} lg={6} xl={6} marginTop="20px">
              <Stack spacing={1}>
                <Typography variant="p" component="div" sx={{ mb: 1, color: '#a7a7a7' }}>
                  First Name*
                </Typography>
                <TextField
                  {...register('last_name', { required: true })}
                  id="lastName"
                  type="text"
                  name="last_name"
                  placeholder="Enter Full Name"
                  size="small"
                  fullWidth
                />
                <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.last_name?.message}</Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <Stack spacing={1}>
                <Box>
                  <FormControl fullWidth sx={{ mb: 1 }}>
                    <Typography variant="p" component="div" sx={{ mb: 1, color: '#a7a7a7' }}>
                      Select Country
                    </Typography>
                    <Select
                      {...register('pcode', { required: true })}
                      name="pcode"
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      size="small"
                      id="country"
                      value="88"
                    >
                      {country.map((c) => (
                        <MenuItem key={c.id} sx={{ color: '#a7a7a7' }} value={c.pcode}>
                          {c.name}({c.pcode})
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6} display="none">
              <Box>
                <FormControl fullWidth sx={{ mb: 1 }}>
                  <Typography variant="p" component="div" sx={{ mb: 1, color: '#a7a7a7' }}>
                    Country ID
                  </Typography>
                  <Select
                    {...register('country_id', { required: true })}
                    name="country_id"
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    size="small"
                    id="country"
                    value="18"
                  >
                    {country.map((c) => (
                      <MenuItem key={c.id} sx={{ color: '#a7a7a7' }} value={c.id}>
                        {c.id}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <Stack spacing={1}>
                <Typography variant="p" component="div" sx={{ mb: 1, color: '#a7a7a7' }}>
                  Phone Number*
                </Typography>
                <TextField
                  {...register('phone', { required: true })}
                  type="number"
                  fullWidth
                  id="phone"
                  name="phone"
                  placeholder="Phone Number"
                  size="small"
                />
                <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.phone?.message}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <Stack spacing={1}>
                <Typography variant="p" component="div" sx={{ mb: 1, color: '#a7a7a7' }}>
                  Email Address*
                </Typography>
                <TextField
                  {...register('email', { required: true })}
                  fullWidth
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  size="small"
                />
                <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.email?.message}</Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <Box>
                <FormControl fullWidth sx={{ mb: 1 }}>
                  <Typography variant="p" component="div" sx={{ mb: 1, color: '#a7a7a7' }}>
                    Select Gender
                  </Typography>
                  <Select
                    {...register('gender', { required: true })}
                    name="gender"
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    size="small"
                  >
                    <MenuItem sx={{ color: '#a7a7a7' }}>Gender</MenuItem>

                    <MenuItem sx={{ color: '#a7a7a7' }} value="Male">
                      Male
                    </MenuItem>
                    <MenuItem sx={{ color: '#a7a7a7' }} value="Female">
                      Female
                    </MenuItem>
                    <MenuItem sx={{ color: '#a7a7a7' }} value="Others">
                      Others
                    </MenuItem>
                  </Select>
                  <Typography sx={{ color: '#FF0000', fontSize: '12px', mt: '7px' }}>{errors.gender?.message}</Typography>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <Stack>
                <Typography variant="p" component="div" sx={{ color: '#a7a7a7' }}>
                  Date Of Birth
                </Typography>
                <FormControl>
                  <Controller
                    control={control}
                    name="dob"
                    defaultValue={new Date()}
                    renderInput={(params) => <TextField {...params} />}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <Box>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DesktopDatePicker']}>
                              <DemoItem>
                                <DatePicker
                                  {...register('dob', { required: true })}
                                  className="applyDatepicker"
                                  onChange={(date) => {
                                    const midnightDate = dayjs(date).startOf('day');
                                    setSelectedDate(midnightDate);
                                    onChange(midnightDate.format());
                                  }}
                                  selected={selectedDate}
                                  sx={{ height: '40px', overflow: 'hidden' }}
                                />
                              </DemoItem>
                            </DemoContainer>
                          </LocalizationProvider>
                        </Box>
                      );
                    }}
                  />
                </FormControl>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <Stack spacing={1}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Typography variant="p" component="div" sx={{ color: '#a7a7a7' }}>
                    Password*
                  </Typography>
                  <Box
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{ display: 'inline-block', position: 'relative' }}
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Box sx={{ mb: '-2px' }}>
                      <QuestionReg></QuestionReg>
                    </Box>

                    {isHovered && (
                      <Box className="hover-paragraph" sx={{ position: 'absolute', bottom: 5, right: 5 }}>
                        <Box sx={{ height: '100%', width: '320px', backgroundColor: '#12A9B2', color: '#FFF', borderRadius: 2 }}>
                          <List>
                            <Typography variant="p" sx={{ fontWeight: 'bold', px: 2 }}>
                              Make your password strong:
                            </Typography>
                            <ListItem>
                              <Typography variant="p" sx={{ pb: 0, mb: -1 }}>
                                1. Include a combination of uppercase and lowercase letters
                              </Typography>
                            </ListItem>
                            <ListItem>
                              <Typography variant="p" sx={{ pb: 0, mb: -1 }}>
                                2. Include numbers (1-9)
                              </Typography>
                            </ListItem>
                            <ListItem>
                              <Typography variant="p" sx={{ pb: 0, mb: -1 }}>
                                3. Include special characters like !, @, #, $, %, etc
                              </Typography>
                            </ListItem>
                            <ListItem>
                              <Typography variant="p" sx={{ pb: 0, mb: -1 }}>
                                4. Longer passwords are generally stronger. Aim for a minimum of 12 characters or more
                              </Typography>
                            </ListItem>
                            <ListItem>
                              <Typography variant="p">
                                5. Don't include easily obtainable personal information like your name, birth date
                              </Typography>
                            </ListItem>
                          </List>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Box>

                <Box sx={{ position: 'relative' }}>
                  <TextField
                    {...register('password', { required: true })}
                    fullWidth
                    id="password"
                    name="password"
                    size="small"
                    placeholder="password"
                    type={showPassword ? 'text' : 'password'}
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
                </Box>
                <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.password?.message}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} align="center" sx={{ mt: 1 }}>
              <Box alignItems="center">
                <Captcha onCaptchaChange={handleCaptchaChange} />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <AnimateButton>
                  {valid ? (
                    <Button fullWidth size="large" type="submit" variant="contained" color="anger">
                      Sign Up
                    </Button>
                  ) : (
                    <Button disabled fullWidth size="large" type="submit" variant="contained" color="anger">
                      Sign Up
                    </Button>
                  )}
                </AnimateButton>
              </Grid>
            </Grid>
            <Typography component={Link} to="/login" variant="body1" sx={{ textDecoration: 'none', ml: 3, mt: 1 }}>
              Already have an account?
            </Typography>
          </Grid>
        </form>
      </ThemeProvider>
    </>
  );
};

export default AuthRegister;
