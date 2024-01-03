import React, { useState } from 'react';
import { Chip, TableBody, TableCell, tableCellClasses, TableRow, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppContext } from 'AppContextProvider';
import SettlementModal from 'components/modal/SettlementModal';
import View from 'components/svg/View';
import Delete from 'components/svg/Delete';
import axiosInstance from 'utils/axios.config';
import { toast } from 'react-toastify';
import IouModal from 'components/modal/TableModal/IouModal';
import IouDelete from 'components/modal/TableModal/IouDelete';
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

export default function IouApplyTable(rows) {
  const { arrRow } = rows;
  const { profile } = useAppContext();
  const { company_id, employee_id } = profile;
  const [iouDeleteModal, setIouDeleteModal] = useState(false);
  const [iouViewModal, setIouViewModal] = useState(false);
  const [iouSettlementModal, setIouSettlementModal] = useState(false);
  const [iouId, setIouId] = useState('');

  const [iouView, setIouView] = useState([]);
  const [iouViewSettlement, setIouViewSettlement] = useState([]);

  const handleIouSettlement = (iou_app_sl) => {
    setIouSettlementModal(true);
    const data = { emp_id: employee_id, com_id: company_id, iou_id: iou_app_sl };
    axiosInstance
      .post('https://api.hellokompass.com/payroll/iouview', data)
      .then((res) => {
        setIouViewSettlement(res.data.data);
      })
      .catch((error) => toast.error(error));
  };

  const handleIou = (iou_app_sl) => {
    setIouViewModal(true);
    const data = { emp_id: employee_id, com_id: company_id, iou_id: iou_app_sl };
    axiosInstance
      .post('https://api.hellokompass.com/payroll/iouview', data)
      .then((res) => {
        setIouView(res.data.data);
      })
      .catch((error) => toast.error(error));
  };

  const onClickIouDelete = (iou_app_sl) => {
    setIouDeleteModal(true);
    setIouId(iou_app_sl);
  };

  return (
    <TableBody>
      {arrRow.map((row, index) => (
        <StyledTableRow key={row.id}>
          <StyledTableCell component="th" scope="row">
            {index + 1}
          </StyledTableCell>
          <StyledTableCell align="left">{row.iou_appdate?.substring(0, 10)}</StyledTableCell>
          <StyledTableCell align="left">{row.iou_amount}</StyledTableCell>
          <StyledTableCell align="left">{row.iou_reason}</StyledTableCell>
          <StyledTableCell align="left">
            <CustomChip>{row.iou_status}</CustomChip>
          </StyledTableCell>
          <StyledTableCell align="left" display="flex">
            {Uppercase(row.iou_status) === 'Approved' ? (
              <>
                <Chip
                  onClick={() => handleIouSettlement(row.iou_app_sl)}
                  clickable
                  label="Sattlement"
                  sx={{ backgroundColor: '#4EA20F', color: '#fff', borderRadius: 1 }}
                  size="small"
                />
                <IconButton aria-label="view" size="small" onClick={() => handleIou(row.iou_app_sl)}>
                  <View fontSize="inherit" />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton aria-label="view" size="small" onClick={() => handleIou(row.iou_app_sl)}>
                  <View fontSize="inherit" />
                </IconButton>
                <IconButton aria-label="delete" size="small" onClick={() => onClickIouDelete(row.iou_app_sl)}>
                  <Delete fontSize="inherit" />
                </IconButton>
              </>
            )}
          </StyledTableCell>
        </StyledTableRow>
      ))}
      <SettlementModal
        iouViewSettlement={iouViewSettlement}
        iouSettlementModal={iouSettlementModal}
        handleClose={() => setIouSettlementModal(false)}
      />
      <IouModal iouView={iouView} iouViewModal={iouViewModal} handleClose={() => setIouViewModal(false)} />
      <IouDelete iouId={iouId} iouDeleteModal={iouDeleteModal} handleClose={() => setIouDeleteModal(false)} />
    </TableBody>
  );
}
