import { useAppContext } from 'AppContextProvider';
import React from 'react';
import { Modal } from '@mui/material';
import Image from 'mui-image';
import '../../assets/third-party/styles.css';

export default function ImageModal({ image }) {
  const { openModal, handleCloseModal } = useAppContext();

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        top: '90%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90vw',
        height: '70vh',
        border: 1,
        borderColor: '#12A9B2'
      }}
    >
      <Image onClick={handleCloseModal} src={image} alt="The image" sx={{ border: 1, borderColor: '#12A9B2' }} />
    </Modal>
  );
}
