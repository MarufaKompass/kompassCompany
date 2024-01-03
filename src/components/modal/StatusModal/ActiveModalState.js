import React from 'react';
import { Button, Modal, Box, Divider, Typography, ListItem, TextField } from '@mui/material';
import Slide from '@mui/material/Slide';
import { useForm } from 'react-hook-form';
import axiosInstance from 'utils/axios.config';
import { toast } from 'react-toastify';
import '../../../assets/third-party/styles.css';

const style = {
  position: 'absolute',
  minWidth: '320px',
  maxWidth: '776px',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #12A9B2',
  borderRadius: 3,
  boxShadow: '2px 4px 6px rgba(18, 169, 178,24)',
  pt: 2,
  px: 4,
  pb: 3
};

export default function ActiveModalState({ activityId, openActivityStatus, handleClose, handleCloseActivityStatus, handleCloseActivity }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const activityData = { meeting_id: activityId, text: data.text };
    axiosInstance
      .post('https://api.hellokompass.com/meeting/active', activityData)
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          handleCloseActivity();
          handleClose();
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <Modal
      open={Boolean(openActivityStatus)}
      onClose={handleCloseActivityStatus}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', mt: 6 }}
    >
      <Slide in={Boolean(openActivityStatus)}>
        <Box sx={{ ...style, width: '100%' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box id="modal-modal-title" sx={{ px: 1, py: 1, color: '#7e8790' }}>
              <Typography variant="h5" component="h2">
                Your Activity
              </Typography>
            </Box>
            <Divider variant="middle" />
            <ListItem>
              <TextField
                {...register('text', { required: false })}
                name="text"
                id="outlined"
                sx={{
                  color: '#12A9B2',
                  px: 4,
                  width: '100%'
                }}
                placeholder="Other Messages"
                className="maxWidth"
              />
            </ListItem>
            <Divider variant="middle" />
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
              <Button type="submit" variant="contained" size="small" sx={{ mt: 1, mr: 2, p: 0, backgroundColor: '#12A9B2' }}>
                Submit
              </Button>
              <Button onClick={handleCloseActivityStatus} variant="outlined" size="small" sx={{ mt: 1, p: 0, color: '#12A9B2' }}>
                Close
              </Button>
            </Box>
          </form>
        </Box>
      </Slide>
    </Modal>
  );
}
