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

export default function IouModal({ iouView, iouViewModal, handleClose }) {
  const { iou_appdate, iou_amount, iou_reference, iou_status, iou_reason } = iouView;

  return (
    <Modal
      open={Boolean(iouViewModal)}
      onClose={handleClose}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', mt: 6 }}
    >
      <Slide in={Boolean(iouViewModal)}>
        <Box sx={{ ...style, width: '100%' }}>
          <Box sx={{ px: 1, py: 1, color: '#000000' }}>
            <Typography variant="h5" component="h2">
              IOU Details
            </Typography>
          </Box>
          <Divider sx={{ color: '#12A9B2', border: 1, opacity: 0.3 }} />
          <Box>
            <Box>
              <Typography sx={{ px: 2, py: 1 }} variant="h6" component="div">
                <Typography color="#12A9B2" display="inline" sx={{ mr: 2 }}>
                  Status
                </Typography>
                :
                <Typography color="#fff" display="inline" sx={{ ml: 2 }}>
                  <CustomChip>{iou_status}</CustomChip>
                </Typography>
              </Typography>
            </Box>
          </Box>
          <Grid container spacing={3} sx={{ mt: -1 }}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <ListItem sx={{ mx: 0 }}>
                <Grid container spacing={0}>
                  <Grid item xs={4} sm={4} md={4} lg={4} xl={3}>
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
                      {iou_appdate?.substring(0, 10)}
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
                      Amount
                    </Typography>
                  </Grid>
                  <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                    <Typography variant="h6" component="h3">
                      <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                    <Typography sx={{ color: '#000' }} variant="h6" component="div">
                      {iou_amount}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ mt: -4 }}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <ListItem sx={{ mx: 0 }}>
                <Grid container spacing={0}>
                  <Grid item xs={4} sm={4} md={4} lg={4} xl={3}>
                    <Typography color="#65af7b" variant="h6" component="h3">
                      Reference
                    </Typography>
                  </Grid>
                  <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                    <Typography variant="h6" component="h3">
                      <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                    <Typography sx={{ color: '#000' }} variant="h6" component="div">
                      {iou_reference}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ mt: -1 }}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <ListItem sx={{ mx: 0 }}>
                <Grid container spacing={0}>
                  <Grid item xs={4} sm={4} md={4} lg={4} xl={3}>
                    <Typography color="#000" variant="h6" component="h3">
                      Purpose:
                    </Typography>
                  </Grid>
                  <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                    <Typography variant="h6" component="h3">
                      <Box sx={{ display: 'inline', mx: 2 }}>:</Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                    <Typography sx={{ color: '#000' }} variant="h6" component="div">
                      {iou_reason}
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
              Close
            </Button>
          </Box>
        </Box>
      </Slide>
    </Modal>
  );
}
