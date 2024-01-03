import React, { useEffect, useState } from 'react';
import { Button, Modal, Box, Divider, Typography, ListItem } from '@mui/material';
import Slide from '@mui/material/Slide';
import { useAppContext } from 'AppContextProvider';
import axiosInstance from 'utils/axios.config';
import { toast } from 'react-toastify';
import '../../../assets/third-party/styles.css';

const style = {
  position: 'absolute',
  minWidth: '320px',
  maxWidth: '520px',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #12A9B2',
  borderRadius: 3,
  boxShadow: '2px 4px 6px rgba(18, 169, 178,24)',
  pt: 2,
  px: 4,
  pb: 3
};

export default function ActiveModal({ activityId, openActivity, handleClose, setOpenActivityStatus, handleCloseActivity, setOpenCancel }) {
  const [messages, setMessages] = useState([]);

  const handleActivityModal = () => {
    setOpenActivityStatus(true);
    handleCloseActivity();
  };

  const handleCancelReason = () => {
    setOpenCancel(true);
    handleCloseActivity();
  };

  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get('https://api.hellokompass.com/message/list?type=meeting')
        .then((res) => {
          setMessages(res.data.data);
        })
        .catch((error) => console.error(error));
    };

    fetchData();
  }, []);

  const onSubmit = (text) => {
    const data = { meeting_id: activityId, text: text };

    axiosInstance
      .post('https://api.hellokompass.com/meeting/active', data)
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
      open={Boolean(openActivity)}
      onClose={handleCloseActivity}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', mt: 6 }}
    >
      <Slide in={Boolean(openActivity)}>
        <Box sx={{ ...style, width: '100%' }}>
          <Box id="modal-modal-title" sx={{ px: 1, py: 1, color: '#7e8790' }}>
            <Typography variant="h5" component="h2">
              Activity
            </Typography>
          </Box>
          <Divider variant="middle" />
          {messages.map((message) => (
            <ListItem>
              <Button
                onClick={() => onSubmit(message.text)}
                name="amount"
                id="outlined"
                sx={{
                  color: '#12A9B2',
                  px: 4,
                  width: '100%'
                }}
                className="maxWidth"
              >
                {message.text}
              </Button>
            </ListItem>
          ))}

          <ListItem>
            <Button
              onClick={handleActivityModal}
              name="amount"
              id="outlined"
              sx={{
                color: '#12A9B2',
                px: 4,
                width: '100%'
              }}
              className="maxWidth"
            >
              Other Messages
            </Button>
          </ListItem>

          <ListItem>
            <Button
              onClick={handleCancelReason}
              name="amount"
              id="outlined"
              sx={{
                color: '#ff0000',
                px: 4,
                width: '100%'
              }}
              className="maxWidth"
            >
              Cancel This Meeting
            </Button>
          </ListItem>
          <Divider variant="middle" />
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button onClick={handleCloseActivity} variant="contained" size="small" sx={{ mt: 1, p: 0, backgroundColor: '#12A9B2' }}>
              Close
            </Button>
          </Box>
        </Box>
      </Slide>
    </Modal>
  );
}
