import React from 'react';
import { TableCell, TableHead, TableRow, tableCellClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import Uppercase from 'components/Uppercase/Uppercase';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#12A9B2',
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

export default function TableRows({ cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8 }) {
  return (
    <TableHead>
      <TableRow>
        <StyledTableCell align="left">{cell1}</StyledTableCell>
        <StyledTableCell align="left">{cell2}</StyledTableCell>
        {cell3 === 'Payment Type' ? (
          <StyledTableCell align="left" sx={{ width: '120px' }}>
            {cell3}
          </StyledTableCell>
        ) : (
          <StyledTableCell align="left">{cell3}</StyledTableCell>
        )}

        {cell4 && <StyledTableCell align="left">{cell4}</StyledTableCell>}
        {cell5 && <StyledTableCell align="left">{cell5}</StyledTableCell>}

        {cell6 === '' ? (
          <StyledTableCell align="left">{cell6}</StyledTableCell>
        ) : Uppercase(cell6) === 'Net Amount' ? (
          <StyledTableCell sx={{ width: '120px' }} align="left">
            {cell6}
          </StyledTableCell>
        ) : (
          cell6 && <StyledTableCell align="left">{cell6}</StyledTableCell>
        )}
        {cell7 === 'Details' && <StyledTableCell align="left">{cell7}</StyledTableCell>}
        {cell7 === 'Status' && <StyledTableCell align="left">{cell7}</StyledTableCell>}

        {cell7 === 'Action' && <StyledTableCell align="left">{cell7}</StyledTableCell>}
        {cell8 === '' && <StyledTableCell align="left"></StyledTableCell>}
      </TableRow>
    </TableHead>
  );
}
