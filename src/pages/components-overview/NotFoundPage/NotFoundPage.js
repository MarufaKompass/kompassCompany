import React from 'react';
import { Box, Button, Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import { useNavigate } from 'react-router-dom';
import notfound from '../../../assets/images/images/notFoundPage.png';

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleButtonBackHome = () => {
    navigate('/');
  };

  return (
    <MainCard>
      <Box>
        <Grid container justifyContent="center" alignItems="center" height="84vh">
          <Grid item>
            <img src={notfound} alt="notFound" />
            <Box textAlign="center">
              <Button
                onClick={handleButtonBackHome}
                sx={{
                  backgroundColor: '#12a9b2',
                  width: '200px',
                  height: '40px',
                  fontSize: 13,
                  color: '#fff',
                  marginTop: '20px',
                  '&:hover': { backgroundColor: '#129e9e' }
                }}
              >
                Go to Homepage
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
}
