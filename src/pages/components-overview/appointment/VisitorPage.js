import React, { useState } from 'react';
import {
  Box,
  Toolbar,
  Typography,
  Divider,
  Grid,
  FormHelperText,
  Input,
  FormControl,
  TextField,
  Button,
  Select,
  MenuItem
} from '@mui/material';
import MainCard from 'components/MainCard';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from 'AppContextProvider';
import { yupResolver } from '@hookform/resolvers/yup';
import { visitorPage } from 'components/validation/Validation';
import axiosInstance from 'utils/axios.config';
import { toast } from 'react-toastify';
import 'react-datepicker/dist/react-datepicker.css';

export default function VisitorPage() {
  const { country, setCheckPerson } = useAppContext();
  const ariaLabel = { 'aria-label': 'description' };
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(visitorPage)
  });

  const [gender, setGender] = useState('');

  const handleChange = (event) => {
    setGender(event.target.value);
  };
  const onSubmit = (data) => {
    axiosInstance
      .post('https://api.hellokompass.com/person/add', data)
      .then((res) => {
        if (res.data.code === 200) {
          toast.success(res.data.message);
          setCheckPerson(res.data.data);
          navigate('/appointment/addForm');
        } else if (res.data.code === 400) {
          navigate('/appointment/checkPhone');
        } else {
          <></>;
        }
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  };

  const navigate = useNavigate();

  const handleCancelButton = () => {
    navigate('/appointment/checkPhone');
  };

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar sx={{ my: 1, mx: -2 }} align="center">
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
            Visitor Information
          </Typography>
        </Toolbar>
      </Box>
      <Divider variant="middle" />
      <Box>
        <MainCard>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Typography sx={{ color: '#ff0000' }} variant="p">
                Visitor profile will be create and will notify to visitor
              </Typography>
              <Grid container>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ pr: 3 }}>
                  <Box>
                    <FormHelperText>
                      <Typography variant="h6" component="h2" color="#4e4d4e">
                        First Name
                      </Typography>
                    </FormHelperText>

                    <TextField
                      {...register('first_name', { required: true })}
                      fullWidth
                      id="standard-basic"
                      sx={{ mt: '9px' }}
                      name="first_name"
                      variant="standard"
                    />
                    <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.first_name?.message}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ pr: 3 }}>
                  <Box>
                    <FormHelperText>
                      <Typography variant="h6" component="h2" color="#4e4d4e">
                        Last Name
                      </Typography>
                    </FormHelperText>

                    <TextField
                      {...register('last_name', { required: true })}
                      fullWidth
                      id="standard-basic"
                      sx={{ mt: '9px' }}
                      name="last_name"
                      variant="standard"
                    />
                    <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.last_name?.message}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ pr: 3, mt: 3 }}>
                  <Box>
                    <FormHelperText>
                      <Typography variant="h6" component="h2" color="#4e4d4e">
                        Country
                      </Typography>
                    </FormHelperText>
                    <TextField
                      {...register('country_code', { required: true })}
                      name="country_code"
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      size="small"
                      id="country_code"
                      value="88"
                      select
                      variant="standard"
                      sx={{ mt: 1.3, width: '100%' }}
                    >
                      {country.map((c) => (
                        <MenuItem key={c.id} sx={{ color: '#a7a7a7' }} value={c.pcode}>
                          {c.name}({c.pcode})
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ pr: 3, mt: 3 }}>
                  <Box sx={{ mt: { xs: 2, sm: 0 } }}>
                    <FormHelperText>
                      <Typography variant="h6" component="h2" color="#4e4d4e">
                        Phone
                      </Typography>
                    </FormHelperText>

                    <TextField
                      {...register('phone', { required: true })}
                      id="standard-basic"
                      variant="standard"
                      name="phone"
                      fullWidth
                      sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                      inputProps={ariaLabel}
                      type="number"
                    />
                    <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.phone?.message}</Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ pr: 3, mt: 3 }}>
                  <Box sx={{ mt: { xs: 2, sm: 0 } }}>
                    <FormHelperText>
                      <Typography variant="h6" component="h2" color="#4e4d4e">
                        Gender
                      </Typography>
                    </FormHelperText>
                    <FormControl fullWidth variant="standard">
                      <Select
                        {...register('gender', { required: true })}
                        labelId="demo-simple-select-standard-label"
                        id="standard-basic"
                        value={gender}
                        onChange={handleChange}
                        label="gender"
                        name="gender"
                      >
                        <MenuItem value="Gender">
                          <Typography sx={{ color: '#a7a7a7' }}>Gender</Typography>
                        </MenuItem>
                        <MenuItem sx={{ color: '#a7a7a7' }} value="Male">
                          Male
                        </MenuItem>
                        <MenuItem sx={{ color: '#a7a7a7' }} value="Female">
                          Female
                        </MenuItem>
                        <MenuItem sx={{ color: '#a7a7a7' }} value="Other">
                          Other
                        </MenuItem>
                      </Select>
                    </FormControl>
                    <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.gender?.message}</Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ pr: 3, mt: 2 }}>
                  <Box sx={{ mt: { xs: 2, sm: 0 } }}>
                    <FormHelperText>
                      <Typography variant="h6" component="h2" color="#4e4d4e">
                        Email
                      </Typography>
                    </FormHelperText>

                    <TextField
                      {...register('email', { required: true })}
                      id="standard-basic"
                      variant="standard"
                      name="email"
                      fullWidth
                      sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                      inputProps={ariaLabel}
                      type="email"
                    />
                    <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.email?.message}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ pr: 3 }}>
                  <Box>
                    <FormHelperText sx={{ mt: 2 }}>
                      <Typography variant="h6" component="h2" color="#4e4d4e">
                        Company Name
                      </Typography>
                    </FormHelperText>
                    <Input
                      {...register('company', { required: false })}
                      name="company"
                      sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                      fullWidth
                      inputProps={ariaLabel}
                      type="text"
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button
                onClick={handleCancelButton}
                variant="contained"
                size="small"
                sx={{ backgroundColor: '#12A9B2', width: 100, mr: 2, '&:hover': { backgroundColor: '#12A9B2' } }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                size="small"
                sx={{ backgroundColor: '#12A9B2', width: 100, '&:hover': { backgroundColor: '#12A9B2' } }}
              >
                Next
              </Button>
            </Box>
          </form>
        </MainCard>
      </Box>
    </Box>
  );
}
