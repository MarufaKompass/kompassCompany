import React from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import MainCard from 'components/MainCard';
import axiosInstance from 'utils/axios.config';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export default function SalaryCertificate() {
  const handleDownloadSalaryCertificate = () => {
    axiosInstance
      .get('https://api.hellokompass.com/payroll/salarycertificate')
      .then((response) => {
        const base64PdfData = response.data.data;

        const byteCharacters = atob(base64PdfData);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });

        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
      })
      .catch((error) => {
        console.err(error);
      });
  };

  return (
    <Box>
      <MainCard sx={{ p: 4 }}>
        <Grid container>
          <Grid xs={12} sm={6}>
            <Typography variant="h4">Salary Certificate</Typography>
          </Grid>
          <Grid xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              startIcon={<PictureAsPdfIcon />}
              onClick={handleDownloadSalaryCertificate}
              size="large"
              sx={{ color: '#12A9B2', '&:hover': { color: '#0e8087' } }}
            >
              Download Salary Certificate
            </Button>
          </Grid>
        </Grid>
      </MainCard>
    </Box>
  );
}
