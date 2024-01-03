import React from 'react';
import { Box, TableContainer, Table, TableHead, TableRow, TableCell, tableCellClasses, Paper, styled, TableBody } from '@mui/material';

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

export default function GroupInvitationTable({ qmsg_track }) {
  return (
    <Box sx={{ mt: 3 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">SL</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">Phone</StyledTableCell>
              <StyledTableCell align="left">Department</StyledTableCell>
              <StyledTableCell align="left">Designation</StyledTableCell>
              <StyledTableCell align="left">Company</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {qmsg_track.map((person, index) => (
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {person.name}
                </StyledTableCell>
                {person.email ? (
                  <StyledTableCell component="th" scope="row">
                    {person.email}
                  </StyledTableCell>
                ) : (
                  <StyledTableCell component="th" scope="row">
                    -
                  </StyledTableCell>
                )}
                {person.phone ? (
                  <StyledTableCell component="th" scope="row">
                    {person.phone}
                  </StyledTableCell>
                ) : (
                  <StyledTableCell component="th" scope="row">
                    -
                  </StyledTableCell>
                )}
                {person.department ? (
                  <StyledTableCell component="th" scope="row">
                    {person.department}
                  </StyledTableCell>
                ) : (
                  <StyledTableCell component="th" scope="row">
                    -
                  </StyledTableCell>
                )}
                {person.designation ? (
                  <StyledTableCell component="th" scope="row">
                    {person.designation}
                  </StyledTableCell>
                ) : (
                  <StyledTableCell component="th" scope="row">
                    -
                  </StyledTableCell>
                )}
                {person.company ? (
                  <StyledTableCell component="th" scope="row">
                    {person.company}
                  </StyledTableCell>
                ) : (
                  <StyledTableCell component="th" scope="row">
                    -
                  </StyledTableCell>
                )}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
