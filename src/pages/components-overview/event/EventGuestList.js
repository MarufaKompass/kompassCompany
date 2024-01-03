import React, { useState } from 'react';
import {
  Box,
  Avatar,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  tableCellClasses,
  Paper,
  styled,
  TableBody,
  Modal,
  Button
} from '@mui/material';
import { useAppContext } from 'AppContextProvider';

export default function EventGuestList() {
  const { guestLists } = useAppContext();
  const [imgOpen, setImgOpen] = useState(false);
  const handleImgOpen = () => setImgOpen(true);
  const handleImgClose = () => setImgOpen(false);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#12A9B2',
      color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14
    }
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    },
    '&:last-child td, &:last-child th': {
      border: 0
    }
  }));

  return (
    <Box sx={{ mt: 1 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">Phone</StyledTableCell>
              <StyledTableCell align="center">Code</StyledTableCell>
              <StyledTableCell align="center">QR</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="left">Attendance</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {guestLists.map((guest, index) => (
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {guest.guest_name}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {guest.guest_email}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {guest.guest_phone}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {guest.code}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <Button onClick={handleImgOpen}>
                    <Avatar
                      open={imgOpen}
                      onClose={handleImgClose}
                      variant={'rounded'}
                      alt="The image"
                      src={guest.qr}
                      style={{
                        width: 30,
                        height: 30
                      }}
                    />
                  </Button>
                </StyledTableCell>

                <StyledTableCell component="th" scope="row">
                  {guest.status}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {guest.attendance}
                </StyledTableCell>
                <Modal open={imgOpen} onClose={handleImgClose}>
                  <Avatar
                    variant={'rounded'}
                    alt="The image"
                    src={guest.qr}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: {
                        xs: 300,
                        sm: 300,
                        md: 500,
                        lg: 300,
                        xl: 300
                      },
                      height: {
                        xs: 300,
                        sm: 300,
                        md: 500,
                        lg: 300,
                        xl: 300
                      },
                      borderRadius: 2,
                      backgroundColor: 'background.paper',
                      boxShadow: 24
                    }}
                  />
                </Modal>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
