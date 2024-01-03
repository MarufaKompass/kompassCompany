import React, { useState } from 'react';
import { TableBody, TableCell, tableCellClasses, TableRow, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import View from 'components/svg/View';
import LeaveModal from 'components/modal/TableModal/LeaveModal';
import CustomChip from 'components/Chip/CustomChip';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#12A92B',
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

export default function TableLeave(rows) {
  const { arrRow } = rows;
  const [leaveId, setLeaveId] = useState('');
  const [openLeaveModal, setOpenLeaveModal] = useState(false);

  const onClickLeave = (lrsl) => {
    setOpenLeaveModal(true);
    setLeaveId(lrsl);
  };

  return (
    <TableBody>
      {arrRow.map((row, index) => (
        <StyledTableRow key={row.id}>
          <StyledTableCell component="th" scope="row">
            {index + 1}
          </StyledTableCell>
          <StyledTableCell align="left">{row.lev_type}</StyledTableCell>
          <StyledTableCell align="left">{row.lev_from}</StyledTableCell>
          <StyledTableCell align="left">{row.lev_to}</StyledTableCell>
          <StyledTableCell align="left">{row.lev_duration}</StyledTableCell>
          <StyledTableCell align="left">
            <CustomChip>{row.lev_approval}</CustomChip>
          </StyledTableCell>
          <StyledTableCell align="left">
            <IconButton aria-label="delete" size="small" onClick={() => onClickLeave(row.lrsl)}>
              <View fontSize="inherit" />
            </IconButton>
          </StyledTableCell>
        </StyledTableRow>
      ))}
      <LeaveModal leaveId={leaveId} openLeaveModal={openLeaveModal} handleClose={() => setOpenLeaveModal(false)} />
    </TableBody>
  );
}
