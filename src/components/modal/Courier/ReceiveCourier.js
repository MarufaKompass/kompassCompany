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

export default function ReceiveCourier(props) {
  const { courierId, receiveCourier, handleClose, closeNotice } = props;

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    axiosInstance
      .post('https://api.hellokompass.com/courier/receive', data)
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
        open={Boolean(receiveCourier)}
        onClose={handleClose}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', mt: 6 }}
      >
        <Slide in={Boolean(receiveCourier)}>
          <Box sx={{ ...style, width: '100%' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box id="modal-modal-title" sx={{ px: 1, py: 1, color: '#7e8790' }}>
                <Typography variant="h5" component="h2">
                  Cancel the parcel
                </Typography>
              </Box>
              <Divider variant="middle" />
              <Box display="flex" justifyContent="center">
                <Typography variant="h5" sx={{ mt: ['1.2rem'], ml: 1, color: '#12A9B2' }} fontSize="15px" color="red">
                  Are you sure, you want{' '}
                  <Typography variant="h4" display="inline">
                    Receive
                  </Typography>
                  this parcel?
                </Typography>
              </Box>
              <ListItem>
                <TextField
                  {...register('courier_id', { required: true })}
                  name="courier_id"
                  sx={{
                    display: 'none'
                  }}
                  value={courierId}
                />
              </ListItem>
              <Box sx={{ px: 1 }} display="flex" justifyContent="center">
                <Box>
                  <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    sx={{ mt: 2, backgroundColor: '#008000', '&:hover': { backgroundColor: '#008000' } }}
                  >
                    <span>Receive</span>
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        </Slide>
      </Modal>
    </Box>
  );
}
