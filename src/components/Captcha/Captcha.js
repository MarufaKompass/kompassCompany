// Captcha.js
import React, { useState } from 'react';
import { IconButton, Typography, TextField, Grid, Box } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import img1 from '../../assets/Captcha/img1.jpg';
import img3 from '../../assets/Captcha/img3.jpg';

const Captcha = ({ onCaptchaChange }) => {
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [backgroundImage, setBackgroundImage] = useState(getRandomImage());

  function generateCaptcha() {
    return Math.random().toString(36).slice(8);
  }

  function getRandomImage() {
    const imageUrls = [img1, img3];

    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[randomIndex];
  }

  const refreshCaptcha = () => {
    const newCaptcha = generateCaptcha();
    setCaptcha(newCaptcha);
    setBackgroundImage(getRandomImage());
    onCaptchaChange(newCaptcha, ''); // Reset the text input when refreshing captcha
  };

  const matchCaptcha = (e) => {
    onCaptchaChange(captcha, e.target.value);
  };

  return (
    <Box display="flex" alignItems="center">
      <Grid container>
        <Grid items={true} xs={6} spacing={2}>
          <Box
            sx={{
              width: '100%',
              backgroundImage: `url(${backgroundImage})`,
              borderRadius: '2px',
              fontFamily: 'Cutive Mono',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              color: '#000',
              px: 1,
              height: '100%',
              display: 'flex',
              alignItem: 'center',
              justifyContent: 'center',
              mr: 1
            }}
          >
            <Typography variant="h5" sx={{ textDecoration: 'line-through', userSelect: 'none' }}>
              {captcha}
            </Typography>
            <IconButton onClick={refreshCaptcha}>
              <RefreshIcon sx={{ color: '#000' }} />
            </IconButton>
          </Box>
        </Grid>
        <Grid items={true} xs={6}>
          <Box sx={{ ml: 1 }}>
            <TextField placeholder="Enter Captcha" fullWidth size="small" onChange={matchCaptcha} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Captcha;
