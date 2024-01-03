import React, { useState } from 'react';
import { TableBody, TableCell, tableCellClasses, TableRow, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppContext } from 'AppContextProvider';
import View from 'components/svg/View';
import Delete from 'components/svg/Delete';
import EarnWageModal from 'components/modal/TableModal/EarnWageModal';
import axiosInstance from 'utils/axios.config';
import EarnWageDelete from 'components/modal/TableModal/EarnWageDelete';
import Uppercase from 'components/Uppercase/Uppercase';
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

export default function TableEarnWage(rows) {
  const { arrRow } = rows;
  const { profile } = useAppContext();
  const { company_id, employee_id } = profile;
  const [earnWageDeleteModal, setEarnWageDeleteModal] = useState(false);
  const [earnWageViewModal, setEarnWageViewModal] = useState(false);

  const [earnWageModal, setEarnWageModal] = useState([]);

  const onClickEarnWage = (ewage_sl) => {
    setEarnWageViewModal(true);

    const data = { emp_id: employee_id, com_id: company_id, wage_id: ewage_sl };
    axiosInstance
      .post('https://api.hellokompass.com/payroll/wageview', data)
      .then((res) => {
        setEarnWageModal(res.data.data);
      })
      .catch((error) => console.error(error));
  };

  const [earnWageDelete, setEarnWageDelete] = useState('');

  const onClickEarnWageDelete = (ewage_sl) => {
    setEarnWageDelete(ewage_sl);
    setEarnWageDeleteModal(true);
  };

  return (
    <TableBody>
      {arrRow.map((row, index) => (
        <StyledTableRow key={row.id}>
          <StyledTableCell component="th" scope="row">
            {index + 1}
          </StyledTableCell>
          <StyledTableCell align="left">{row.wage_appdate}</StyledTableCell>
          <StyledTableCell align="left">{row.draw_amount}</StyledTableCell>
          {Uppercase(row.approve_by) ? (
            <StyledTableCell align="left">{Uppercase(row.approve_by)}</StyledTableCell>
          ) : (
            <StyledTableCell align="left">-</StyledTableCell>
          )}

          <StyledTableCell align="left">
            <CustomChip>{row.approval_status}</CustomChip>
          </StyledTableCell>
          {row.approval_date ? (
            <StyledTableCell align="left">{row.approval_date?.substring(0, 10)}</StyledTableCell>
          ) : (
            <StyledTableCell align="left">-</StyledTableCell>
          )}

          <StyledTableCell align="left">
            <IconButton aria-label="view" size="small" onClick={() => onClickEarnWage(row.ewage_sl)}>
              <View fontSize="inherit" />
            </IconButton>
            <IconButton aria-label="delete" size="small" onClick={() => onClickEarnWageDelete(row.ewage_sl)}>
              <Delete fontSize="inherit" />
            </IconButton>
          </StyledTableCell>
        </StyledTableRow>
      ))}
      <EarnWageModal earnWageModal={earnWageModal} earnWageViewModal={earnWageViewModal} handleClose={() => setEarnWageViewModal(false)} />
      <EarnWageDelete
        earnWageDelete={earnWageDelete}
        earnWageDeleteModal={earnWageDeleteModal}
        handleClose={() => setEarnWageDeleteModal(false)}
      />
    </TableBody>
  );
}
