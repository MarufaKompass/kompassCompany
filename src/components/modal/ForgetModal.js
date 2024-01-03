import React, { useState } from 'react';
import { Modal, Box, Button, Grid, Stack, Typography, TextField } from '@mui/material';
import { forget } from 'components/validation/Validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import axiosInstance from 'utils/axios.config';
import AnimateButton from 'components/@extended/AnimateButton';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  minWidth: '320px',
  maxWidth: '776px',
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

export default function ForgetModal(props) {
  const { forgetModal, handleClose } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(forget)
  });

  const onSubmit = (data) => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    axiosInstance
      .post('https://api.hellokompass.com/user/forgotpassword', data)
      .then((res) => {
        if (res.data.code === 200) {
          toast.success(res.data.message);
          handleClose();
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Modal open={Boolean(forgetModal)} onClose={handleClose}>
      <Box sx={{ ...style, width: '100%' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid item xs={12} md={12} lg={12} xl={12} marginTop="20px">
            <Stack spacing={2}>
              <Typography variant="p" component="div" sx={{ mb: 1, color: '#a7a7a7' }}>
                Phone Number
              </Typography>
              <TextField
                id="phone"
                type="number"
                name="phone"
                placeholder="Enter Phone Number"
                size="small"
                fullWidth
                {...register('phone', { required: true })}
              />
              <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.phone?.message}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Grid item xs={12}>
              <AnimateButton>
                <Button fullWidth size="large" type="submit" variant="contained" color="anger">
                  Confirm
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
}
