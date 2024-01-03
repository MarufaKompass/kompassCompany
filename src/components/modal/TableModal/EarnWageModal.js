import React from 'react';
import { Button, Modal, Box, Divider, Typography, Grid, ListItem } from '@mui/material';
import Slide from '@mui/material/Slide';
import CustomChip from 'components/Chip/CustomChip';

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

export default function EarnWageModal({ earnWageModal, earnWageViewModal, handleClose }) {
  const { approval_status, first_name, last_name, designation, phone, email, draw_amount, wage_appdate } = earnWageModal;

  return (
    <Modal
      open={Boolean(earnWageViewModal)}
      onClose={handleClose}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', mt: 6 }}
    >
      <Slide in={Boolean(earnWageViewModal)}>
        <Box sx={{ ...style, width: '100%' }}>
          <Box id="modal-modal-title" sx={{ px: 1, py: 1, color: '#000000' }}>
            <Typography variant="h5" component="h2">
              Earn Wage Details
            </Typography>
          </Box>
          <Divider sx={{ color: '#12A9B2', border: 1, opacity: 0.3 }} />
          <Box>
            <Box>
              <Typography sx={{ px: 1, py: 2 }} variant="h6" component="div">
                <Typography color="#12A9B2" display="inline" sx={{ mr: 2 }}>
                  Status
                </Typography>
                :
                <Typography color="#ef8b70" display="inline" sx={{ ml: 2 }}>
                  <CustomChip>{approval_status}</CustomChip>
                </Typography>
              </Typography>
            </Box>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <ListItem sx={{ mx: 0 }}>
                <Grid container spacing={0}>
                  <Grid item xs={4} sm={4} md={2} lg={2} xl={2}>
                    <Typography color="#65af7b" variant="h6" component="h3">
                      Name
                    </Typography>
                  </Grid>
                  <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                    <Typography variant="h6" component="h3">
                      <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                    <Typography sx={{ color: '#000' }} variant="h6" component="div">
                      {first_name} {last_name}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ mt: { xs: -4, sm: -4, md: 0 } }}>
              <ListItem>
                <Grid container spacing={0}>
                  <Grid item xs={4} sm={4} md={3} lg={3} xl={3}>
                    <Typography color="#65af7b" variant="h6" component="h3">
                      Designation
                    </Typography>
                  </Grid>
                  <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                    <Typography variant="h6" component="h3">
                      <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                    <Typography sx={{ color: '#000' }} variant="h6" component="div">
                      {designation}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <ListItem sx={{ mx: 0 }}>
                <Grid container spacing={0}>
                  <Grid item xs={4} sm={4} md={2} lg={2} xl={2}>
                    <Typography color="#65af7b" variant="h6" component="h3">
                      Phone
                    </Typography>
                  </Grid>
                  <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                    <Typography variant="h6" component="h3">
                      <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                    <Typography sx={{ color: '#000' }} variant="h6" component="div">
                      {phone}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ mt: { xs: -4, sm: -4, md: 0 } }}>
              <ListItem>
                <Grid container spacing={0}>
                  <Grid item xs={4} sm={4} md={3} lg={3} xl={3}>
                    <Typography color="#65af7b" variant="h6" component="h3">
                      Email
                    </Typography>
                  </Grid>
                  <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                    <Typography variant="h6" component="h3">
                      <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                    <Typography sx={{ color: '#000' }} variant="h6" component="div">
                      {email}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </Grid>
          </Grid>
          <Typography sx={{ px: 1, py: 1, color: '#000' }} variant="h5" component="h2">
            Details :
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <ListItem sx={{ mx: 0 }}>
                <Grid container spacing={0}>
                  <Grid item xs={4} sm={4} md={2} lg={2} xl={2}>
                    <Typography color="#65af7b" variant="h6" component="h3">
                      Amount:
                    </Typography>
                  </Grid>
                  <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                    <Typography variant="h6" component="h3">
                      <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                    <Typography sx={{ color: '#000' }} variant="h6" component="div">
                      BDT {draw_amount}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ mt: { xs: -4, sm: -4, md: 0 } }}>
              <ListItem>
                <Grid container spacing={0}>
                  <Grid item xs={4} sm={4} md={3} lg={3} xl={3}>
                    <Typography color="#65af7b" variant="h6" component="h3">
                      Apply Date
                    </Typography>
                  </Grid>
                  <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                    <Typography variant="h6" component="h3">
                      <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                    <Typography sx={{ color: '#000' }} variant="h6" component="div">
                      {wage_appdate}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </Grid>
          </Grid>
          <Divider sx={{ color: '#12A9B2', border: 1, opacity: 0.3 }} />
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button
              onClick={handleClose}
              variant="contained"
              size="large"
              sx={{ mt: 1, p: 0, backgroundColor: '#12A9B2', '&:hover': { backgroundColor: '#0e8087' } }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Slide>
    </Modal>
  );
}
