import React, { useEffect, useState } from 'react';
import { Button, Modal, Box, Divider, Typography, Avatar, Grid, ListItem } from '@mui/material';
import Slide from '@mui/material/Slide';
import axiosInstance from 'utils/axios.config';
import AcceptCourier from './Courier/AcceptCourier';
import ReceiveCourier from './Courier/ReceiveCourier';
import CancelCourier from './Courier/CancelCourier';
import percel from '../../assets/images/images/percel.png';
import CustomChip from 'components/Chip/CustomChip';
import Uppercase from 'components/Uppercase/Uppercase';

const style = {
  backgroundColor: 'rgba(0,0,0,0.5)',
  position: 'absolute',
  minWidth: '320px',
  maxWidth: '776px',
  bgcolor: 'background.paper',
  border: '2px solid #12A9B2',
  borderRadius: 3,
  boxShadow: '2px 4px 6px rgba(18, 169, 178,24)',
  pt: 2,
  px: 4,
  pb: 3
};

export default function NotificationModal({ courierModal, openNotificationModal, handleClose }) {
  const [courier, setCourier] = useState([]);
  const [acceptCourier, setAcceptCourier] = useState(false);
  const [cancelCourier, setCancelCourier] = useState(false);
  const [receiveCourier, setReceiveCourier] = useState(false);

  const dataModal = courierModal;
  const courierId = dataModal?.module_id;

  const handleCloseModal = () => {
    handleClose();
    if (dataModal.is_read === 'no') {
      const data = { id: dataModal?.id, is_read: 'yes' };
      axiosInstance.post('https://api.hellokompass.com/notification/update', data).then((res) => {
        console.log(res);
      });
    } else {
    }
  };

  useEffect(() => {
    const fetchData = () => {
      if (courierId) {
        axiosInstance
          .get(`https://api.hellokompass.com/courier/${courierId}`)
          .then((res) => {
            setCourier(res.data.data);
          })
          .catch((error) => console.error(error));
      }
    };
    fetchData();
  }, [courierId]);

  return (
    <Modal
      open={Boolean(openNotificationModal)}
      onClose={handleCloseModal}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', mt: 6 }}
    >
      <Slide in={Boolean(openNotificationModal)}>
        <Box
          sx={{
            ...style,
            width: '100%',
            minHeight: 300,
            maxHeight: { xs: 500, sm: 500, md: 500, lg: 500, xl: 600 },
            overflow: 'scroll'
          }}
        >
          <Box
            id="modal-modal-title"
            sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', px: 1, py: 1, color: '#7e8790' }}
          >
            <Typography variant="h4" component="h2" sx={{ color: 'black' }}>
              Courier Details
            </Typography>
          </Box>
          <Divider variant="middle" sx={{ color: '#12A9B2', border: 1, opacity: 0.3 }} />
          <Box
            sx={{
              mt: 2,
              pb: 1,
              width: '100%',
              ml: {
                xs: 2,
                sm: 2,
                md: 0,
                lg: 0
              }
            }}
          >
            <Typography align="center" variant="h4" component="h2">
              Courier Overview
            </Typography>

            <Box sx={{ display: { sm: 'flex' }, justifyContent: 'center' }} align="center">
              <Box justifyContent="center">
                <Box sx={{ display: 'inline', color: '#12a9b2' }}>Date:</Box>
                <Box sx={{ display: 'inline', mx: 1 }}> {courier.date}</Box>
              </Box>
            </Box>
          </Box>
          <Grid container>
            <Grid item xs={12} sm={9} md={9} lg={9} xl={9}>
              <Grid container spacing={3} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <ListItem sx={{ mx: 0 }}>
                    <Grid container spacing={0}>
                      <Grid item xs={4} sm={4} md={2} lg={2} xl={2}>
                        <Typography color="#65af7b" variant="h6" component="div">
                          Name
                        </Typography>
                      </Grid>
                      <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                        <Typography variant="h6" component="div">
                          <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                        </Typography>
                      </Grid>
                      <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                        <Typography sx={{ color: '#000', ml: 1 }} align="justify" variant="h6" component="div">
                          {courier.name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: -4 }}>
                  <ListItem>
                    <Grid container spacing={0}>
                      <Grid item xs={4} sm={4} md={2} lg={2} xl={2}>
                        <Typography color="#65af7b" variant="h6" component="div">
                          Phone
                        </Typography>
                      </Grid>
                      <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                        <Typography variant="h6" component="div">
                          <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                        </Typography>
                      </Grid>
                      <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                        <Typography sx={{ color: '#000', ml: 1 }} align="justify" variant="h6" component="div">
                          {courier.phone}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: -4 }}>
                  <ListItem>
                    <Grid container spacing={0}>
                      <Grid item xs={4} sm={4} md={2} lg={2} xl={2}>
                        <Typography color="#65af7b" variant="h6" component="div">
                          Company
                        </Typography>
                      </Grid>
                      <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                        <Typography variant="h6" component="div">
                          <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                        </Typography>
                      </Grid>
                      <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                        <Typography sx={{ color: '#000', ml: 1 }} align="justify" variant="h6" component="div">
                          {courier.company}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: -4 }}>
                  <ListItem>
                    <Grid container spacing={0}>
                      <Grid item xs={4} sm={4} md={2} lg={2} xl={2}>
                        <Typography color="#65af7b" variant="h6" component="div">
                          Parcel Type
                        </Typography>
                      </Grid>
                      <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                        <Typography variant="h6" component="div">
                          <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                        </Typography>
                      </Grid>
                      <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                        <Typography sx={{ color: '#000', ml: 1 }} align="justify" variant="h6" component="div">
                          {courier.parcel_type}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sm={3}
              md={3}
              lg={3}
              xl={3}
              align="left"
              sx={{
                ml: {
                  xs: -2,
                  sm: -1,
                  md: -1,
                  lg: -1,
                  xl: -1
                }
              }}
            >
              <Box display="flex" justifyContent="center">
                <Box>
                  <Typography color="#12A9B2">
                    Status : <CustomChip>{courier.status}</CustomChip>
                  </Typography>
                  <Button>
                    <Avatar
                      variant={'rounded'}
                      alt="The image"
                      src={percel}
                      style={{
                        width: 100,
                        height: 100
                      }}
                    />
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid container xs={12} sx={{ mb: 2 }}>
              {Uppercase(courier.status) === 'Pending' && (
                <>
                  <Grid items xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', pl: 2 }}>
                    <Box>To Accept this parcel</Box>
                  </Grid>
                  <Grid items xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'end', pl: 3 }}>
                    <Button
                      onClick={() => setAcceptCourier(true)}
                      variant="outlined"
                      size="large"
                      sx={{
                        mt: 1,
                        ml: { xs: 1, sm: 2 },
                        p: 0,
                        color: '#22bb33',
                        borderColor: '#22bb33',
                        '&:hover': { borderColor: '#22bb33' }
                      }}
                    >
                      Accept
                    </Button>
                    <Button
                      onClick={() => setCancelCourier(true)}
                      variant="outlined"
                      size="large"
                      sx={{
                        mt: 1,
                        ml: { xs: 1, sm: 2 },
                        p: 0,
                        color: '#22bb33',
                        borderColor: '#22bb33',
                        '&:hover': { borderColor: '#22bb33' }
                      }}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </>
              )}
              {Uppercase(courier.status) === 'Waiting' && (
                <>
                  <Grid items xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', pl: 2 }}>
                    <Box>To Accept this parcel</Box>
                  </Grid>
                  <Grid items xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'end', pl: 3 }}>
                    <Button
                      onClick={() => setReceiveCourier(true)}
                      variant="outlined"
                      size="large"
                      sx={{
                        mt: 1,
                        ml: { xs: 1, sm: 2 },
                        p: 0,
                        color: '#22bb33',
                        borderColor: '#22bb33',
                        '&:hover': { borderColor: '#22bb33' }
                      }}
                    >
                      Receive
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
          <Divider variant="middle" sx={{ color: '#12A9B2', border: 1, opacity: 0.3 }} />
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button onClick={handleCloseModal} variant="contained" size="small" sx={{ mt: 1, p: 0, backgroundColor: '#12A9B2' }}>
              Close
            </Button>
          </Box>
          <AcceptCourier
            acceptCourier={acceptCourier}
            handleClose={() => setAcceptCourier(false)}
            courierId={courierId}
            closeNotice={handleClose}
          />
          <CancelCourier
            cancelCourier={cancelCourier}
            handleClose={() => setCancelCourier(false)}
            courierId={courierId}
            closeNotice={handleClose}
          />
          <ReceiveCourier
            receiveCourier={receiveCourier}
            handleClose={() => setReceiveCourier(false)}
            courierId={courierId}
            closeNotice={handleClose}
          />
        </Box>
      </Slide>
    </Modal>
  );
}