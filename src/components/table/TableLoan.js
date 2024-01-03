import React from 'react';
import { Chip, TableBody, TableCell, tableCellClasses, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppContext } from 'AppContextProvider';
import { useNavigate } from 'react-router-dom';
import CustomChip from 'components/Chip/CustomChip';
import Uppercase from 'components/Uppercase/Uppercase';

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

export default function TableLoan(rows) {
  const { arrRow } = rows;

  const { setEmiId } = useAppContext();
  const navigate = useNavigate();

  const handleButtonClickEmi = (plnsl) => {
    setEmiId(plnsl);
    navigate('/loan/list/emiDetails');
  };

  return (
    <TableBody>
      {arrRow.map((row, index) => (
        <StyledTableRow key={row.id}>
          <StyledTableCell component="th" scope="row">
            {index + 1}
          </StyledTableCell>
          <StyledTableCell align="left">{row.lon_amt}</StyledTableCell>
          <StyledTableCell align="left">{row.lon_tot_amt}</StyledTableCell>
          <StyledTableCell align="left">{row.emi_length}</StyledTableCell>
          <StyledTableCell align="left">{row.emi_amount}</StyledTableCell>
          <StyledTableCell align="left">
            <CustomChip>{row.lon_status}</CustomChip>
          </StyledTableCell>
          {Uppercase(row.lon_status) === 'Approved' ? (
            <StyledTableCell align="left">
              <Chip
                label="Emi Details"
                component="a"
                sx={{ borderRadius: 1, backgroundColor: '#7858d7', color: '#fff' }}
                size="small"
                onClick={() => handleButtonClickEmi(row.plnsl)}
                clickable
              />
            </StyledTableCell>
          ) : (
            <StyledTableCell align="left">-</StyledTableCell>
          )}
        </StyledTableRow>
      ))}
    </TableBody>
  );
}
