import React, { useState } from 'react';
import { Button, Modal, Box, Divider, Typography, Grid, TextField, Slide, styled } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useForm } from 'react-hook-form';
import axiosInstance from 'utils/axios.config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { iouPage } from 'components/validation/Validation';

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

export default function SettlementModal({ iouViewSettlement, iouSettlementModal, handleClose }) {
  const navigate = useNavigate();
  const [doc, setDoc] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(iouPage)
  });

  const { comid, empid, iou_appdate, iou_amount, iou_reason, iou_app_sl } = iouViewSettlement;

  const handleDoc = async (e) => {
    const fileData = new FormData();
    fileData.append('module_name', 'payroll/bills');
    fileData.append('photo', e.target.files[0]);

    try {
      const res = await axiosInstance.post('https://api.hellokompass.com/upload/files', fileData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Dtaa', res.data.data.files.photo.image);
      if (res.data.code === 200) {
        setDoc(res.data.data.files.photo.image);
        console.log(res);
      } else if (res.data.code === 200) {
        toast.error(res.data.data.files.photo.error);
      } else <></>;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onSubmit = (data) => {
    const adjustmentData = { emp_id: empid, com_id: comid, iou_id: iou_app_sl, amount: data.amount, doc: doc };
    axiosInstance
      .post('https://api.hellokompass.com/payroll/iouadjust', adjustmentData)
      .then((res) => {
        toast.success(res.data.message);
        navigate('/iou/settlement');
        handleClose();
        reset();
      })
      .catch((err) => console.error(err));
  };

  return (
    <Box>
      <Modal
        open={Boolean(iouSettlementModal)}
        onClose={handleClose}
        sx={{ display: 'flex', justifyContent: 'center', alignitem: 'start', mt: 6 }}
      >
        <Slide in={Boolean(iouSettlementModal)}>
          <Box sx={{ ...style, width: '100%' }}>
            <Box id="modal-modal-title" sx={{ px: 1, py: 1, color: '#000000' }}>
              <Typography variant="h5" component="h2">
                Settlement Application
              </Typography>
            </Box>
            <Divider sx={{ color: '#12A9B2', border: 1, opacity: 0.3 }} />
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ px: { xs: 0, sm: 8 }, py: { xs: 2, sm: 5 } }}>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <Grid container>
                        <Grid item xs={4} sm={3}>
                          <Typography variant="h6" component="h2">
                            Date
                          </Typography>
                        </Grid>
                        <Grid item xs={1} sm={1}>
                          <Typography variant="h6" component="h2">
                            :
                          </Typography>
                        </Grid>
                        <Grid item xs={7} sm={8}>
                          <Typography variant="h6" component="h2" color="#000" name="date">
                            {iou_appdate?.substring(0, 10)}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container sx={{ mt: 2 }}>
                        <Grid item xs={4} sm={3}>
                          <Typography variant="h6" component="h2">
                            Amount
                          </Typography>
                        </Grid>
                        <Grid item xs={1} sm={1}>
                          <Typography variant="h6" component="h2">
                            :
                          </Typography>
                        </Grid>
                        <Grid item xs={7} sm={8}>
                          <Typography variant="h6" type="input" component="h2" color="#000" value="2000">
                            {iou_amount}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container sx={{ mt: 2 }}>
                        <Grid item xs={4} sm={3}>
                          <Typography variant="h6" component="h2">
                            Purpose
                          </Typography>
                        </Grid>
                        <Grid item xs={1} sm={1}>
                          <Typography variant="h6" component="h2">
                            :
                          </Typography>
                        </Grid>
                        <Grid item xs={7} sm={8}>
                          <Typography
                            // {...register('purpose', { required: true })}
                            variant="h6"
                            component="h2"
                            color="#000"
                            name="purpose"
                            value="For pc parts"
                          >
                            {iou_reason}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ mt: { xs: 2, sm: 0 } }}>
                    <Box>
                      <Grid container>
                        <Grid item xs={4} sm={4}>
                          <Typography variant="h6" component="h2" sx={{ display: 'flex', alignItems: 'center' }}>
                            Amount
                          </Typography>
                        </Grid>
                        <Grid item xs={8} sm={8}>
                          <TextField
                            {...register('amount', { required: true })}
                            fullWidth
                            name="amount"
                            id="outlined"
                            size="small"
                            type="number"
                            placeholder="BDT 0.00"
                          />
                          <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.amount?.message}</Typography>
                        </Grid>
                      </Grid>
                      <Grid container sx={{ mt: 2 }}>
                        <Grid item xs={12} sm={12}>
                          <Button
                            component="label"
                            fullWidth
                            type="files"
                            variant="contained"
                            size="small"
                            startIcon={<CloudUploadIcon />}
                            name="doc"
                            onChange={handleDoc}
                            sx={{ backgroundColor: '#12A9B2', '&:hover': { backgroundColor: '#0e8087' } }}
                          >
                            Upload file
                            <VisuallyHiddenInput type="file" />
                          </Button>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <Typography
                            variant="h6"
                            component="h2"
                            style={{ textAlign: 'justify' }}
                            sx={{ display: 'flex', alignItems: 'center', color: '#FF0000', mt: 1 }}
                          >
                            *Accepted documents .docs, .DOCS, .pdf, .PDF, .jpg, .JPG, .jpeg, .JPEG, .png, .PNG
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Divider sx={{ color: '#12A9B2', border: 1, opacity: 0.3 }} />
              <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button
                  variant="contained"
                  type="submit"
                  size="large"
                  sx={{ mt: 1, p: 0, backgroundColor: '#12A9B2', '&:hover': { backgroundColor: '#0e8087' } }}
                >
                  Submit
                </Button>
                <Button
                  onClick={handleClose}
                  variant="outlined"
                  size="large"
                  sx={{
                    mt: 1,
                    ml: 2,
                    p: 0,
                    color: '#ED5E68',
                    borderColor: '#ED5E68',
                    '&:hover': { color: '#FF0000', borderColor: '#FF0000' }
                  }}
                >
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
