import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider, Grid, Select, MenuItem, FormControl, TextField, Button, InputLabel } from '@mui/material';
import MainCard from 'components/MainCard';
import { useForm } from 'react-hook-form';
import axiosInstance from 'utils/axios.config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { earnWagePage } from 'components/validation/Validation';
import earnWage from '../../../assets/images/image/earnWage.png';
import '../../../assets/third-party/styles.css';

export default function EarnWage() {
  const [salary, setSalary] = useState([]);

  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  let calculatedValue = selectedCategory * salary;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(earnWagePage)
  });

  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get('https://api.hellokompass.com/payroll/salperday')
        .then((res) => {
          setSalary(res.data.data.amount);
        })
        .catch((error) => console.error(error));
    };

    fetchData();
  }, []);

  const onSubmit = (data) => {
    if (data.apply_amount <= calculatedValue) {
      axiosInstance.post('https://api.hellokompass.com/payroll/wageadd', data).then((res) => {
        if (res.data.code === 200) {
          toast.success(res.data.message);
          reset();
          navigate('/earnWage/list');
        } else if (res.data.code === 400) {
          toast.failed(res.data.message);
          reset();
        } else {
          <></>;
        }
      });
    } else {
      toast.error("Apply amount can't be greater than earn wage");
    }
  };

  const buttonStyle = {
    backgroundColor: '#12a9b2',
    color: 'white'
  };

  const [days, setDays] = useState([]);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    function getDaysInMonth(month, year) {
      return new Date(year, month + 1, 0).getDate();
    }

    const numberOfDays = getDaysInMonth(currentMonth, currentYear);
    const daysArray = Array.from({ length: numberOfDays }, (_, i) => i + 1);
    setDays(daysArray);
  }, []);

  return (
    <Box>
      <MainCard>
        <Box id="modal-modal-title" sx={{ width: '100%' }}>
          <Typography variant="h5" component="h2">
            Earn Wage Application
          </Typography>
        </Box>
        <Divider variant="middle" sx={{ my: 3 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} sx={{ mt: 5 }}>
            <Box sx={{ my: 4, px: { xs: 0, md: 6, lg: 6, xl: 8 } }} alignItems="center">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ mt: 2 }}>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Typography variant="h6" component="h4" sx={{ pb: { xs: 1 } }}>
                        Expected Days
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <FormControl fullWidth>
                        <Select
                          name="leave_category"
                          {...register('leave_category', { required: true })}
                          displayEmpty
                          inputProps={{ 'aria-label': 'Without label' }}
                          size="small"
                          onChange={handleChange}
                        >
                          <MenuItem>
                            <InputLabel selected htmlFor="outlined-adornment-email-login">
                              Select Days
                            </InputLabel>
                          </MenuItem>
                          {days
                            .filter((day) => day <= new Date().getDate())
                            .map((day) => (
                              <MenuItem key={day} value={day}>
                                {day}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                      <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.leave_category?.message}</Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box sx={{ mt: 2 }} hidden>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Typography variant="h6" component="h4" sx={{ pb: { xs: 2 } }}>
                        Earn Wage
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <TextField
                        {...register('earnWage', { required: true })}
                        fullWidth
                        name="earnWage"
                        id="outlined"
                        size="small"
                        value={calculatedValue}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Typography variant="h6" component="div" sx={{ pb: { xs: 1 } }}>
                        Earn Wage
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Box border="1px solid #C8C8C6" borderRadius="5px" sx={{ mb: 2, mt: 0, py: 1 }}>
                        <Typography variant="p" component="div" sx={{ pl: 1.1 }}>
                          {calculatedValue}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                <Box>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Typography variant="h6" component="h4" sx={{ pb: { xs: 1 } }}>
                        Apply Amount
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <TextField
                        {...register('apply_amount', { required: true })}
                        fullWidth
                        name="apply_amount"
                        id="outlined"
                        size="small"
                        placeholder="Apply Amount"
                      />
                      <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.apply_amount?.message}</Typography>
                    </Grid>
                  </Grid>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'right', mt: 2 }}>
                  <Button variant="contained" type="submit" sx={{ px: 5 }} style={buttonStyle}>
                    Apply
                  </Button>
                </Box>
              </form>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <img src={earnWage} alt="earnWage" height="100%" width="100%" />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </MainCard>
    </Box>
  );
}
