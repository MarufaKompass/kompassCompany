import React, { useState } from 'react';
import { Box, Divider, Grid, ListItem, Typography, Button, TextField, FormControl, Select, MenuItem } from '@mui/material';
import MainCard from 'components/MainCard';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppContext } from 'AppContextProvider';
import axiosInstance from 'utils/axios.config';
import { toast } from 'react-toastify';

export default function EditProfileInfo() {
  const [gender, setGender] = useState('');
  const { profile } = useAppContext();
  const navigate = useNavigate();
  const {
    person_first_name,
    person_last_name,
    module_list = {},
    person_phone,
    person_email,
    person_pre_address,
    person_per_address,
    person_company,
    nid,
    tin
  } = profile;

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    axiosInstance
      .post('https://api.hellokompass.com/profile/update', data)
      .then((res) => {
        if ((res.data.code = 200)) {
          console.log(res.data);
          toast.success(res.data.message);
          navigate('/profile/viewProfile');
        } else {
        }
      })
      .catch((err) => console.error(err));
  };

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const handleButtonViewProfile = () => {
    navigate('/profile/viewProfile');
  };

  return (
    <Box>
      <MainCard>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography align="left" variant="h5" component="h2">
            Edit Profile
          </Typography>
          <Box>
            {module_list.payroll && (
              <Button
                onClick={handleButtonViewProfile}
                variant="contained"
                sx={{ backgroundColor: '#12A9B2', width: 130, fontSize: 13, '&:hover': { backgroundColor: '#12A9B2' } }}
              >
                Details Profile
              </Button>
            )}
          </Box>
        </Box>
        <Divider variant="middle" sx={{ my: 3, mx: 0 }} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <ListItem sx={{ p: 0 }} >
              <Grid container spacing={0} display='none'>
                <Grid item xs={12} sm={4} md={3} lg={3} xl={3} display="flex" alignItems="center">
                  <Typography sx={{ fontSize: 15 }}>First Name</Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={6} lg={6} xl={6} sx={{ mt: { xs: 1, sm: 0 } }}>
                  <TextField
                    {...register('name', { required: false })}
                    fullWidth
                    name="name"
                    id="filled"
                    defaultValue={`${person_first_name} ${person_last_name}`}
                    type="text"
                    size="small"
                  />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem sx={{ p: 0 }}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} lg={3} xl={3} display="flex" alignItems="center">
                  <Typography sx={{ fontSize: 15 }}>First Name</Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={6} lg={6} xl={6} sx={{ mt: { xs: 1, sm: 0 } }}>
                  <TextField
                    {...register('first_name', { required: false })}
                    fullWidth
                    name="first_name"
                    id="filled"
                    defaultValue={person_first_name}
                    type="text"
                    size="small"
                  />
                </Grid>
              </Grid>
            </ListItem>

            <ListItem sx={{ p: 0, mt: 2 }}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} lg={3} xl={3} display="flex" alignItems="center">
                  <Typography sx={{ fontSize: 15 }}>Last Name</Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={6} lg={6} xl={6} sx={{ mt: { xs: 1, sm: 0 } }}>
                  <TextField
                    {...register('last_name', { required: false })}
                    fullWidth
                    type="text"
                    name="last_name"
                    id="filled"
                    defaultValue={person_last_name}
                    size="small"
                  />
                </Grid>
              </Grid>
            </ListItem>

            <ListItem sx={{ p: 0, mt: 2 }}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} lg={3} xl={3} display="flex" alignItems="center">
                  <Typography sx={{ fontSize: 15 }}>Phone</Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={6} lg={6} xl={6} sx={{ mt: { xs: 1, sm: 0 } }}>
                  <TextField
                    {...register('phone', { required: false })}
                    fullWidth
                    type="number"
                    name="phone"
                    id="filled"
                    value={person_phone}
                    size="small"
                    readOnly
                  />
                </Grid>
              </Grid>
            </ListItem>

            <ListItem sx={{ p: 0, mt: 2 }}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} lg={3} xl={3} display="flex" alignItems="center">
                  <Typography sx={{ fontSize: 15 }}>Email</Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={6} lg={6} xl={6} sx={{ mt: { xs: 1, sm: 0 } }}>
                  <TextField
                    {...register('email', { required: false })}
                    fullWidth
                    type="email"
                    name="email"
                    id="filled"
                    defaultValue={person_email}
                    size="small"
                  />
                </Grid>
              </Grid>
            </ListItem>

            <ListItem sx={{ p: 0, mt: 2 }}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} lg={3} xl={3}>
                  <Typography sx={{ fontSize: 15 }}>Gender</Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={6} lg={6} xl={6} sx={{ mt: { xs: 1, sm: 0 } }}>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <Select
                      {...register('gender', { required: false })}
                      value={gender}
                      name="gender"
                      onChange={handleChange}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      size="small"
                    >
                      <MenuItem value="">
                        <Typography sx={{ color: '#a7a7a7' }}>None</Typography>
                      </MenuItem>
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
                  </FormControl>
                </Grid>
              </Grid>
            </ListItem>

            <ListItem sx={{ p: 0 }}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} lg={3} xl={3} display="flex" alignItems="center">
                  <Typography sx={{ fontSize: 15 }}>Present Address</Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={6} lg={6} xl={6} sx={{ mt: { xs: 1, sm: 0 } }}>
                  <TextField
                    {...register('present_address', { required: false })}
                    type="text"
                    fullWidth
                    name="present_address"
                    defaultValue={person_pre_address}
                    id="filled"
                    size="small"
                  />
                </Grid>
              </Grid>
            </ListItem>

            <ListItem sx={{ p: 0, mt: 2 }}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} lg={3} xl={3} display="flex" alignItems="center">
                  <Typography sx={{ fontSize: 15 }}>Permanent Address</Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={6} lg={6} xl={6} sx={{ mt: { xs: 1, sm: 0 } }}>
                  <TextField
                    {...register('permanent_address', { required: false })}
                    fullWidth
                    type="text"
                    name="permanent_address"
                    id="filled"
                    defaultValue={person_per_address}
                    size="small"
                  />
                </Grid>
              </Grid>
            </ListItem>

            <ListItem sx={{ p: 0, mt: 2 }}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} lg={3} xl={3} display="flex" alignItems="center">
                  <Typography sx={{ fontSize: 15 }}>Company</Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={6} lg={6} xl={6} sx={{ mt: { xs: 1, sm: 0 } }}>
                  <TextField
                    {...register('company_name', { required: false })}
                    type="text"
                    fullWidth
                    name="company_name"
                    id="filled"
                    defaultValue={person_company}
                    size="small"
                  />
                </Grid>
              </Grid>
            </ListItem>

            <ListItem sx={{ p: 0, mt: 2 }}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} lg={3} xl={3} display="flex" alignItems="center">
                  <Typography sx={{ fontSize: 15 }}>TIN</Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={6} lg={6} xl={6} sx={{ mt: { xs: 1, sm: 0 } }}>
                  <TextField fullWidth type="number" name="tin" id="filled" defaultValue={tin} size="small" readOnly />
                </Grid>
              </Grid>
            </ListItem>

            <ListItem sx={{ p: 0, mt: 2 }}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} lg={3} xl={3} display="flex" alignItems="center">
                  <Typography sx={{ fontSize: 15 }}>Nid</Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={6} lg={6} xl={6} sx={{ mt: { xs: 1, sm: 0 } }}>
                  <TextField fullWidth type="number" name="nid" id="filled" defaultValue={nid} size="small" readOnly />
                </Grid>
              </Grid>
            </ListItem>
            <Divider variant="middle" sx={{ my: 3, mx: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Box>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ backgroundColor: '#12A9B2', mr: 2, width: 100, fontSize: 13, '&:hover': { backgroundColor: '#12A9B2' } }}
                >
                  Submit
                </Button>
              </Box>
              <Box>
                <Button
                  onClick={handleButtonViewProfile}
                  variant="contained"
                  sx={{ backgroundColor: '#FF0000', width: 100, fontSize: 13, '&:hover': { backgroundColor: '#FF0000' } }}
                >
                  Back
                </Button>
              </Box>
            </Box>
          </Box>
        </form>
      </MainCard>
    </Box>
  );
}
