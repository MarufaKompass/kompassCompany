import React, { useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import profileBg from '../../../assets/images/images/profileBg.png';
import ProfileMail from 'components/svg/ProfileMail';
import ProfilePhone from 'components/svg/ProfilePhone';
import { useAppContext } from 'AppContextProvider';
import ProfileCalender from 'components/svg/ProfileCalender';
import ProfileLocation from 'components/svg/ProfileLocation';
import AddIcon from '@mui/icons-material/Add';
import ProfileImage from './ProfileImage';

export default function PersonalInfo() {
  const { empPayroll, profile } = useAppContext();
  const [updateImage, setUpdateImage] = useState(false);

  const { join_date } = empPayroll;
  const { module_list = {}, designation, person_email, person_image, person_name, person_phone, person_pre_address } = profile;

  return (
    <Box>
      <MainCard>
        <Box
          align="center"
          sx={{
            backgroundImage: `url(${profileBg})`,
            borderRadius: 2,
            height: '300px',
            width: '100%',
            p: 5
          }}
        >
          <Box
            sx={{
              position: 'relative',
              top: '8px'
            }}
          >
            <Avatar
              variant={'rounded'}
              alt="The image"
              src={person_image}
              style={{
                width: '110px',
                height: '110px'
              }}
            />
            <AddIcon
              onClick={() => setUpdateImage(true)}
              sx={{
                position: 'relative',
                bottom: '26px',
                right: '-40px',
                border: 1,
                backgroundColor: '#12A9B2',
                borderRadius: 5,
                color: '#FFF',
                borderColor: '#FFF'
              }}
            />
            <Typography
              sx={{
                color: '#fff'
              }}
              variant="h5"
              component="div"
            >
              {person_name}
            </Typography>
            <Typography
              sx={{
                color: '#fff'
              }}
              variant="h6"
              component="div"
            >
              {designation}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ bgcolor: '#f1f2f7', borderRadius: 2, height: '220px', px: '15px' }}>
          <MainCard align="center" sx={{ position: 'relative', top: '-35px' }}>
            <Box>
              <Box sx={{ display: 'flex', gap: '20px' }}>
                <Box
                  sx={{
                    width: '30px',
                    height: '30px',
                    bgcolor: '#12a9b2',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '10px'
                  }}
                >
                  <ProfileMail></ProfileMail>
                </Box>

                <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '13px' }}>
                  {' '}
                  {person_email}{' '}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: '20px', mt: '10px' }}>
                <Box
                  sx={{
                    width: '30px',
                    height: '30px',
                    bgcolor: '#12a9b2',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '10px'
                  }}
                >
                  <ProfilePhone></ProfilePhone>
                </Box>

                <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '13px' }}>
                  {' '}
                  +{person_phone}{' '}
                </Typography>
              </Box>

              {module_list.payroll === true ? (
                <Box sx={{ display: 'flex', gap: '20px', mt: '10px' }}>
                  <Box
                    sx={{
                      width: '30px',
                      height: '30px',
                      bgcolor: '#12a9b2',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '10px'
                    }}
                  >
                    <ProfileCalender></ProfileCalender>
                  </Box>
                  <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '13px' }}>
                    {join_date}
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', gap: '20px', mt: '10px' }}>
                  <Box
                    sx={{
                      width: '30px',
                      height: '30px',
                      bgcolor: '#12a9b2',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '10px'
                    }}
                  >
                    <ProfileLocation></ProfileLocation>
                  </Box>
                  <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '13px' }}>
                    {person_pre_address}
                  </Typography>
                </Box>
              )}
            </Box>
            <ProfileImage updateImage={updateImage} handleClose={() => setUpdateImage(false)} />
          </MainCard>
        </Box>
      </MainCard>
    </Box>
  );
}
