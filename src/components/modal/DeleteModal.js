import React from 'react';
import { Box, Button, Typography, Modal } from '@mui/material/index';
import axiosInstance from 'utils/axios.config';
import { toast } from 'react-toastify';

const style = {
  backgroundColor: 'rgba(0,0,0,0.5)',
  position: 'absolute',
  minWidth: '320px',
  maxWidth: '776px',
  transform: 'translate(-50%, -50%)',
  top: '50%',
  left: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #12A9B2',
  borderRadius: 3,
  boxShadow: '2px 4px 6px #12A9B2',
  pt: 2,
  px: 4,
  pb: 3
};

export default function DeleteModal({ deleteId, openDeleteModal, handleClose }) {
  const deleteData = (eventDelete) => {
    axiosInstance
      .delete(`https://api.hellokompass.com/event/delete/${eventDelete}`)
      .then((res) => {
        if (res.data.code === 200) {
          toast.success(res.data.message);
          handleClose();
        } else {
          <></>;
        }
      })
      .catch((error) => toast.error(error));
  };

  return (
    <Box>
      <Modal open={Boolean(openDeleteModal)} onClose={handleClose}>
        <Box sx={{ ...style, width: 320 }}>
          <Box display="flex" justifyContent="center">
            <Typography variant="h5" sx={{ mt: ['1.2rem'], ml: 1 }} fontSize="15px" color="red">
              Are you sure, you want{' '}
              <Typography variant="h4" display="inline">
                Delete
              </Typography>{' '}
              this? It will delete permanently.
            </Typography>
          </Box>
          <Box sx={{ px: 1 }} display="flex" justifyContent="center">
            <Box>
              <Button
                onClick={() => deleteData(deleteId)}
                variant="contained"
                size="small"
                sx={{ mt: 2, backgroundColor: '#ED5E68', '&:hover': { backgroundColor: '#FF0000' } }}
              >
                <span>Confirm</span>
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
