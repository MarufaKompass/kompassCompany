import React from 'react';
import { Button, TableBody, TableCell, tableCellClasses, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';

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

export default function IouAdjustmentTable(rows) {
  const { arrRow } = rows;
  const handleOpenFile = (fileURL) => {
    window.open(fileURL, '_blank');
  };
  const handleOpenModal = (file) => {
    handleOpenFile(file);
  };
  return (
    <TableBody>
      {arrRow.map((row, index) => (
        <StyledTableRow key={row.id}>
          <StyledTableCell component="th" scope="row">
            {index + 1}
          </StyledTableCell>
          <StyledTableCell align="left">{row.iou_date?.substring(0, 10)}</StyledTableCell>
          <StyledTableCell align="left">{row.iou_adjust_amt}</StyledTableCell>
          {row.iou_ref_docs[0] ? (
            <StyledTableCell align="left">
              <Button size="small" variant="text" onClick={() => handleOpenModal(row.iou_ref_docs[0])}>
                Click
              </Button>
            </StyledTableCell>
          ) : (
            <StyledTableCell align="left">-</StyledTableCell>
          )}
        </StyledTableRow>
      ))}
    </TableBody>
  );
}
