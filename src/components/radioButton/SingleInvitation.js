import React from 'react';
import { Box, Input, FormHelperText, Typography, Grid, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import axiosInstance from 'utils/axios.config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { singleInvite } from 'components/validation/Validation';
import { yupResolver } from '@hookform/resolvers/yup';

export default function SingleInvitation({ eventDetails }) {
  const ariaLabel = { 'aria-label': 'description' };
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(singleInvite)
  });

  const onSubmit = (data) => {
    axiosInstance.post('https://api.hellokompass.com/event/singleinv', data).then((res) => {
      if (res.data.code === 200) {
        toast.success(res.data.message);
        navigate('/event');

        reset();
      } else if (res.data.code === 400) {
        toast.failed(res.data.message);
        reset();
      } else {
        <></>;
      }
    });
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid items={true} xs={12} sm={6} md={6} lg={6} xl={6} sx={{ pr: 3 }}>
            <Box>
              <FormHelperText>
                <Typography variant="h5" component="h2" color="#4e4d4e">
                  Name
                </Typography>
              </FormHelperText>
              <Input
                {...register('name', { required: true })}
                placeholder="Guest Name"
                name="name"
                sx={{ mt: 1 }}
                fullWidth
                inputProps={ariaLabel}
              />
              <Input
                {...register('event_id', { required: true })}
                sx={{ mt: 1, color: '#4e4d4e', pr: 1, display: 'none' }}
                value={eventDetails}
                fullWidth
                type="text"
                name="persevent_idon_id"
              />
            </Box>
          </Grid>
          <Grid items={true} xs={12} sm={6} md={6} lg={6} xl={6} sx={{ pr: 3, mt: { xs: 2, sm: 0 } }}>
            <Box>
              <FormHelperText>
                <Typography variant="h5" component="h2" color="#4e4d4e">
                  Phone
                </Typography>
              </FormHelperText>
              <Input
                {...register('phone', { required: true })}
                placeholder="Phone Number"
                sx={{ mt: 1 }}
                fullWidth
                name="phone"
                inputProps={ariaLabel}
              />
              <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.phone?.message}</Typography>
            </Box>
          </Grid>
          <Grid items={true} xs={12} sm={6} md={6} lg={6} xl={6} sx={{ pr: 3, mt: 2 }}>
            <Box>
              <FormHelperText>
                <Typography variant="h5" component="h2" color="#4e4d4e">
                  Email
                </Typography>
              </FormHelperText>
              <Input
                {...register('email', { required: true })}
                placeholder="Guest Email"
                sx={{ mt: 1 }}
                fullWidth
                name="email"
                inputProps={ariaLabel}
              />
            </Box>
          </Grid>
          <Grid items={true} xs={12} sm={6} md={6} lg={6} xl={6} sx={{ pr: 3, mt: 2 }}>
            <Box>
              <FormHelperText>
                <Typography variant="h5" component="h2" color="#4e4d4e">
                  Company
                </Typography>
              </FormHelperText>
              <Input
                {...register('company_name', { required: true })}
                placeholder="Guest Company"
                sx={{ mt: 1 }}
                fullWidth
                name="company_name"
                inputProps={ariaLabel}
              />
            </Box>
          </Grid>
          <Grid items={true} xs={12} sm={6} md={6} lg={6} xl={6} sx={{ pr: 3, mt: 2 }}>
            <Box>
              <FormHelperText>
                <Typography variant="h5" component="h2" color="#4e4d4e">
                  Department
                </Typography>
              </FormHelperText>
              <Input
                {...register('dept_name', { required: true })}
                placeholder="Guest Department"
                sx={{ mt: 1 }}
                fullWidth
                name="dept_name"
                inputProps={ariaLabel}
              />
            </Box>
          </Grid>
          <Grid items={true} xs={12} sm={6} md={6} lg={6} xl={6} sx={{ pr: 3, mt: 2 }}>
            <Box>
              <FormHelperText>
                <Typography variant="h5" component="h2" color="#4e4d4e">
                  Designation
                </Typography>
              </FormHelperText>
              <Input
                {...register('desg_name', { required: true })}
                placeholder="Guest Designation"
                sx={{ mt: 1 }}
                fullWidth
                name="desg_name"
                inputProps={ariaLabel}
              />
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="outlined" type="submit" size="medium" sx={{ mt: 4, p: 0, color: '#12A9B2' }}>
            Send
          </Button>
        </Box>
      </form>
    </Box>
  );
}
