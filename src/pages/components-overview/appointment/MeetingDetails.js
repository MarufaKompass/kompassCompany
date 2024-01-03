import React from 'react';
import { Box, Toolbar, Typography, Avatar, Button, Divider, FormControl, Grid, MenuItem, TextField } from '@mui/material';
import MainCard from 'components/MainCard';
import meetingImg from '../../../assets/images/images/meeting.png';
import { addMeetings } from 'components/validation/Validation';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppContext } from 'AppContextProvider';
import { yupResolver } from '@hookform/resolvers/yup';
import axiosInstance from 'utils/axios.config';

export default function MeetingDetails() {
  const { country, setCheckPerson } = useAppContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(addMeetings)
  });

  const onSubmit = (data) => {
    axiosInstance
      .post('https://api.hellokompass.com/person/checkphone', data)
      .then((res) => {
        if (res.data.code === 200) {
          navigate('/appointment/addForm');
          sessionStorage.setItem('guest', JSON.stringify(res.data.data));
          setCheckPerson(res.data.data);
        } else {
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          navigate('/appointment/visitorPage');
        } else {
          console.error(error);
        }
      });
  };

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar sx={{ my: 1, mx: -2 }} align="center">
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
            Meeting Details
          </Typography>
        </Toolbar>
      </Box>
      <Divider variant="middle" />
      <MainCard
        sx={{
          mt: 3
        }}
      >
        <Box sx={{ width: '100%', hight: '100%', typography: 'body1' }}>
          <Grid container spacing={3}>
            <Grid item sx={12} sm={6} md={6} lg={6} xl={6}>
              <Box
                sx={{
                  py: {
                    xs: 0,
                    sm: 5,
                    md: 7,
                    lg: 8,
                    xl: 9
                  },
                  px: {
                    xs: 1,
                    sm: 1,
                    md: 6,
                    lg: 6,
                    xl: 6
                  }
                }}
              >
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                  <Box>
                    <Toolbar>
                      <Typography variant="h5" component="div" sx={{ flexGrow: 1, ml: { xs: -2, sm: -3, md: -3, lg: -3, xl: -3 } }}>
                        Create Meeting With Guest/Host
                      </Typography>
                    </Toolbar>
                    <Box>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={4}>
                          <Grid item xs={6} width="300px">
                            <Box>
                              <FormControl fullWidth sx={{ mt: 1 }}>
                                <TextField
                                  name="pcode"
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                  size="small"
                                  id="country"
                                  value="88"
                                  select
                                  variant="standard"
                                  sx={{ mt: 1.3 }}
                                >
                                  {country.map((c) => (
                                    <MenuItem key={c.id} sx={{ color: '#a7a7a7' }} value={c.pcode}>
                                      {c.name}({c.pcode})
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </FormControl>
                            </Box>
                          </Grid>
                          <Grid item xs={6} width="300px">
                            <Box
                              component="form"
                              sx={{
                                '& .MuiTextField-root': { mt: '3px' },
                                maxWidth: '100%'
                              }}
                              noValidate
                              autoComplete="off"
                            >
                              <TextField
                                {...register('phone', { required: true })}
                                fullWidth
                                type="number"
                                name="phone"
                                label="Search Number"
                                id="outlined"
                                placeholder="Search Number"
                                size="small"
                                variant="standard"
                              />
                              <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.phone?.message}</Typography>
                            </Box>
                          </Grid>
                        </Grid>

                        <Box sx={{ mt: 4 }}>
                          <Button
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
                            Search
                          </Button>
                        </Box>
                      </form>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item sx={12} sm={6} md={6} lg={6} xl={6} align="center">
              <Box sx={{ width: '90%' }}>
                <Avatar
                  variant={'rounded'}
                  alt="The image"
                  src={meetingImg}
                  style={{
                    width: '70%',
                    height: '70%'
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </MainCard>
    </Box>
  );
}
