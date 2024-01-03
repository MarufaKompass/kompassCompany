import React, { useState } from 'react';
import { Box, Divider, Modal, Typography, Button, ListItem, Grid, styled } from '@mui/material';
import { useForm } from 'react-hook-form';
import axiosInstance from 'utils/axios.config';
import { toast } from 'react-toastify';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
});

const style = {
  position: 'absolute',
  minWidth: '320px',
  maxWidth: '420px',
  transform: 'translate(-50%, -50%)',
  top: '50%',
  left: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #12A9B2',
  borderRadius: 3,
  boxShadow: '2px 4px 6px rgba(18, 169, 178,24)',
  pt: 2,
  px: 4,
  pb: 3
};

export default function ProfileImage(props) {
  const { updateImage, handleClose } = props;
  const [selectedFile, setSelectedFile] = useState(null);
  const { register, handleSubmit } = useForm();
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onSubmit = async () => {
    const requestData = new FormData();
    requestData.append('module_name', 'images');
    requestData.append('file', selectedFile);

    try {
      const res = await axiosInstance.post('https://api.hellokompass.com/upload/image', requestData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.data.code === 200) {
        const imageData = { image: res.data.data.files.file.image };

        try {
          const postData = await axiosInstance.post('https://api.hellokompass.com/profile/updatephoto', imageData);
          handleClose();
          toast.success(postData.data.message);
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        <></>;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Modal open={Boolean(updateImage)} onClose={handleClose}>
      <Box sx={{ ...style, width: '100%' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography align="left" variant="h5" component="h2">
              Upload Photo
            </Typography>
          </Box>
          <Divider variant="middle" sx={{ my: 3, mx: 0 }} />
          <ListItem sx={{ p: 0 }}>
            <Grid container spacing={0}>
              <Grid item xs={12} sx={{ mt: { xs: 1, sm: 0 } }}>
                <Button
                  name="photo"
                  type="file"
                  {...register('photo')}
                  onChange={handleFileChange}
                  component="label"
                  variant="contained"
                  size="large"
                  startIcon={<CloudUploadIcon />}
                  sx={{ backgroundColor: '#12A9B2', width: '100%' }}
                >
                  Upload Photo
                  <VisuallyHiddenInput type="file" />
                </Button>
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
                onClick={handleClose}
                variant="contained"
                sx={{ backgroundColor: '#FF0000', width: 100, fontSize: 13, '&:hover': { backgroundColor: '#FF0000' } }}
              >
                Back
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
