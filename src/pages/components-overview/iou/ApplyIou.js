import React from 'react';
import { Box, Typography, Divider, Grid, FormControl, TextField, Button } from '@mui/material';
import MainCard from 'components/MainCard';
import { useForm, Controller } from 'react-hook-form';
import axiosInstance from 'utils/axios.config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useAppContext } from 'AppContextProvider';
import { yupResolver } from '@hookform/resolvers/yup';
import { iouApplicationPage } from 'components/validation/Validation';
import Iou from '../../../assets/images/image/Iou.png';

export default function ApplyIou() {
  const navigate = useNavigate();

  const { profile } = useAppContext();
  const { company_id, employee_id } = profile;
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(iouApplicationPage)
  });

  const onSubmit = (data) => {
    const date = data.date;
    if (date) {
      const inputDateString = date;
      const inputDate = new Date(inputDateString);

      const year = inputDate.getFullYear();
      const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
      const day = inputDate.getDate().toString().padStart(2, '0');

      const outputDateString = `${year}-${month}-${day}`;
      data.date = outputDateString;
      axiosInstance.post('https://api.hellokompass.com/payroll/iouapply', data).then((res) => {
        if (res.data.code === 200) {
          toast.success(res.data.message);
          reset();
          navigate('/iou');
        } else {
          <></>;
        }
      });
    } else {
    }
  };

  return (
    <Box>
      <MainCard>
        <Box id="modal-modal-title" sx={{ width: '100%' }}>
          <Typography variant="h5" component="h2">
            IOU Application
          </Typography>
        </Box>
        <Divider variant="middle" sx={{ my: 3 }} />
        <Grid container spacing={3}>
          <Grid xs={12} sm={12} md={6}>
            <Box sx={{ my: 4, px: { xs: 2, md: 6, lg: 6, xl: 8 } }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ mt: 2 }} display="none">
                  <Grid container>
                    {company_id && (
                      <Grid item xs={12} sm={10} md={10} lg={10}>
                        <TextField
                          {...register('com_id', { required: false })}
                          fullWidth
                          name="com_id"
                          id="outlined"
                          size="small"
                          value={company_id}
                        />
                      </Grid>
                    )}
                  </Grid>
                </Box>
                <Box sx={{ mt: 2 }} display="none">
                  <Grid container>
                    {employee_id && (
                      <Grid item xs={12} sm={10} md={10} lg={10}>
                        <TextField
                          {...register('emp_id', { required: false })}
                          fullWidth
                          name="emp_id"
                          id="outlined"
                          size="small"
                          value={employee_id}
                        />
                      </Grid>
                    )}
                  </Grid>
                </Box>
                <Box>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Typography variant="h6" component="h4">
                        Date
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Box>
                        <FormControl className="maxWidth">
                          <Controller
                            control={control}
                            name="date"
                            render={({ field }) => (
                              <Box>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DatePicker
                                    {...field}
                                    sx={{
                                      overflow: 'hidden',
                                      width: '100%',
                                      display: 'flex',
                                      alignItem: 'spaceBetween'
                                    }}
                                  />
                                </LocalizationProvider>
                              </Box>
                            )}
                          />
                        </FormControl>
                      </Box>
                      <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.date?.message}</Typography>
                    </Grid>
                  </Grid>
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Typography variant="h6" component="h4" sx={{ pb: { xs: 1 } }}>
                        Amount
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <TextField
                        {...register('amount', {
                          required: true
                        })}
                        fullWidth
                        name="amount"
                        id="outlined"
                        size="small"
                        placeholder="Amount"
                      />
                      <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.amount?.message}</Typography>
                    </Grid>
                  </Grid>
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Typography variant="h6" component="h4" sx={{ pb: { xs: 1 } }}>
                        Reference
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <TextField
                        {...register('ref', { required: true })}
                        fullWidth
                        name="ref"
                        id="outlined"
                        size="small"
                        placeholder="Reference"
                      />
                      <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.ref?.message}</Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Typography variant="h6" component="h4" sx={{ pb: { xs: 1 } }}>
                        Purpose
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <TextField
                        minRows={3}
                        maxRows={6}
                        name="purpose"
                        multiline
                        placeholder="Enter your text here"
                        style={{ width: '100%' }}
                        {...register('purpose', { required: false })}
                      />
                      <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.purpose?.message}</Typography>
                    </Grid>
                  </Grid>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'right', mt: 2 }}>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ px: 5, backgroundColor: '#12A9B2', color: '#FFF', '&:hover': { backgroundColor: '#0e8087', color: '#FFF' } }}
                  >
                    Apply
                  </Button>
                </Box>
              </form>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <img src={Iou} alt="earnWage" height="100%" width="100%" />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </MainCard>
    </Box>
  );
}
