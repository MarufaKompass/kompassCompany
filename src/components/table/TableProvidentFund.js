import React from 'react';
import { TableBody, TableCell, tableCellClasses, TableRow } from '@mui/material';
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

export default function TableProvidentFund(rows) {
  const { arrRow } = rows;

  return (
    <TableBody>
      {arrRow.map((row, index) => (
        <StyledTableRow key={row.id}>
          <StyledTableCell component="th" scope="row">
            {index + 1}
          </StyledTableCell>
          <StyledTableCell align="left">{row.month}</StyledTableCell>
          <StyledTableCell align="left">{row.empfund}</StyledTableCell>
        </StyledTableRow>
      ))}
    </TableBody>
  );
}
