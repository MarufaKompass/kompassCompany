import React from 'react';
import { TableBody, TableCell, tableCellClasses, TableRow, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import axiosInstance from 'utils/axios.config';
import SalaryPayDownload from 'components/svg/SalaryPayDownload';
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

export default function TableSalary(rows) {
  const { arrRow } = rows;

  const handleSalary = (salaryId) => {
    axiosInstance
      .get(`https://api.hellokompass.com/payroll/salarydetails?sal_id=${salaryId}`)
      .then((response) => {
        const base64PdfData = response.data.data;

        const byteCharacters = atob(base64PdfData);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });

        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
      })
      .catch((error) => {
        console.error('Error downloading PDF:', error);
      });
  };

  return (
    <TableBody>
      {arrRow.map((row, index) => (
        <StyledTableRow key={row.id}>
          <StyledTableCell component="th" scope="row">
            {index + 1}
          </StyledTableCell>
          <StyledTableCell align="left">{row.monthz}</StyledTableCell>
          <StyledTableCell align="left">{row.pay_mode}</StyledTableCell>
          {Uppercase(row.pay_mode) === 'BANK' || Uppercase(row.pay_mode) === 'Bank' ? (
            <StyledTableCell align="left">
              {row.bank_info.bank_name}
              <br />
              {row.bank_info.bank_branch}
              <br />
              {row.bank_info.bank_routing}
            </StyledTableCell>
          ) : Uppercase(row.pay_mode) === 'mfs' || Uppercase(row.pay_mode) === 'MFS' ? (
            <StyledTableCell align="left">{row.mfs_info.mfs_operator}</StyledTableCell>
          ) : (
            Uppercase(row.pay_mode) === 'CASH' || (Uppercase(row.pay_mode) === 'Cash' && <StyledTableCell align="left">-</StyledTableCell>)
          )}

          {Uppercase(row.pay_mode) === 'BANK' || Uppercase(row.pay_mode) === 'Bank' ? (
            <StyledTableCell align="left">
              Acc Name: {row.bank_info.acc_name}
              <br />
              Acc No: {row.bank_info.acc_no}
            </StyledTableCell>
          ) : Uppercase(row.pay_mode) === 'mfs' || Uppercase(row.pay_mode) === 'MFS' ? (
            <StyledTableCell align="left">MFS_number: {row.mfs_info.mfs_number}</StyledTableCell>
          ) : (
            Uppercase(row.pay_mode) === 'CASH' || (Uppercase(row.pay_mode) === 'Cash' && <StyledTableCell align="left">-</StyledTableCell>)
          )}
          <StyledTableCell align="left">{row.net_salrx}</StyledTableCell>
          <StyledTableCell align="left">
            <IconButton aria-label="view" size="small" onClick={() => handleSalary(row.id)}>
              <SalaryPayDownload fontSize="inherit" />
            </IconButton>
          </StyledTableCell>
        </StyledTableRow>
      ))}
    </TableBody>
  );
}
