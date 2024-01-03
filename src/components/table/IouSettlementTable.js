import React from 'react';
import { TableBody, TableCell, tableCellClasses, Box, Typography, TableRow, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppContext } from 'AppContextProvider';
import { useNavigate } from 'react-router-dom';
import View from 'components/svg/View';

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

export default function IouSettlementTable(rows) {
  const { arrRow } = rows;

  const { setIouAdjustmentId } = useAppContext();
  const navigate = useNavigate();

  const handleButtonClick = (iou_slx) => {
    setIouAdjustmentId(iou_slx);
    navigate('/iou/settlementList');
  };

  return (
    <TableBody>
      {arrRow.map((row, index) => (
        <StyledTableRow key={row.id}>
          <StyledTableCell component="th" scope="row">
            {index + 1}
          </StyledTableCell>
          <StyledTableCell align="left">
            {row.fname_emp} {row.last_name} <br />
            <Typography variant="h6"> {row.designation}</Typography>
          </StyledTableCell>
          <StyledTableCell align="left">{row.iou_date}</StyledTableCell>
          <StyledTableCell align="left">{row.iou_amount}</StyledTableCell>
          <StyledTableCell align="left">{row.total_adj_amt}</StyledTableCell>
          <StyledTableCell align="left">
            <Box>
              <IconButton size="small" onClick={() => handleButtonClick(row.iou_app_id)}>
                <View fontSize="inherit" />
              </IconButton>
            </Box>
          </StyledTableCell>
        </StyledTableRow>
      ))}
    </TableBody>
  );
}
