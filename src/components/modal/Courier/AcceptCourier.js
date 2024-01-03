import React from 'react';
import { Button, Modal, Box, Divider, Typography, ListItem, TextField } from '@mui/material';
import Slide from '@mui/material/Slide';
import { useForm } from 'react-hook-form';
import axiosInstance from 'utils/axios.config';
import { toast } from 'react-toastify';
import '../../../assets/third-party/styles.css';

const style = {
  backgroundColor: 'rgba(0,0,0,0.5)',
  position: 'absolute',
  minWidth: '320px',
  maxWidth: '776px',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #12A9B2',
  borderRadius: 3,
  boxShadow: '2px 4px 6px #12A9B2',
  pt: 2,
  px: 4,
  pb: 3
};

export default function AcceptCourier(props) {
  const { courierId, acceptCourier, handleClose, closeNotice } = props;

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    axiosInstance
      .post('https://api.hellokompass.com/courier/waiting', data)
      .then((res) => {
        if ((res.status = 200)) {
          toast.success(res.data.message);
          handleClose();
          closeNotice();
          reset();
        } else if ((res.status = 400)) {
          toast.error(res.data.message);
        } else {
          <></>;
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <Box>
      <Modal
        open={Boolean(acceptCourier)}
        onClose={handleClose}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', mt: 6 }}
      >
        <Slide in={Boolean(acceptCourier)}>
          <Box sx={{ ...style, width: '100%' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box id="modal-modal-title" sx={{ px: 1, py: 1, color: '#7e8790' }}>
                <Typography variant="h5" component="h2">
                  Accept the parcel
                </Typography>
              </Box>
              <Divider variant="middle" />
              <ListItem>
                <TextField
                  {...register('text', { required: true })}
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
                <TextField
                  {...register('courier_id', { required: true })}
                  name="courier_id"
                  sx={{
                    display: 'none'
                  }}
                  value={courierId}
                />
              </ListItem>
              <Divider variant="middle" />
              <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button type="submit" variant="contained" size="small" sx={{ mt: 1, mr: 2, p: 0, backgroundColor: '#12A9B2' }}>
                  Submit
                </Button>
                <Button onClick={handleClose} variant="outlined" size="small" sx={{ mt: 1, p: 0, color: '#12A9B2' }}>
                  Close
                </Button>
              </Box>
            </form>
          </Box>
        </Slide>
      </Modal>
    </Box>
  );
}
