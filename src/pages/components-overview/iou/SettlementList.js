import React, { useEffect, useState } from 'react';
import { Box, Table, TableContainer, Paper } from '@mui/material';
import MainCard from 'components/MainCard';
import TableRows from 'components/table/TableRows';
import { useAppContext } from 'AppContextProvider';
import axiosInstance from 'utils/axios.config';
import IouAdjustmentTable from 'components/table/IouAdjustmentTable';
import Loader from 'components/loader/Loader';

export default function SettlementList() {
  const { iouAdjustmentId, setAdjustment } = useAppContext();
  const tHead = { cell1: 'ID', cell2: 'Date', cell3: 'Adjustment Amount', cell4: 'Document' };
  setAdjustment('Adjustment');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = { iou_id: iouAdjustmentId };

      try {
        const res = await axiosInstance.post('https://api.hellokompass.com/payroll/iouadjustlist', data);
        setRows(res.data.data);
        sessionStorage.setItem('settlementId', JSON.stringify(res.data.data[0].iou_app_id));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [iouAdjustmentId]);

  return (
    <Box>
      <MainCard>
        {loading ? (
          <Box width="150px" height="150px">
            <Loader loading={loading} display="flex" justifyContent="center" alignItems="center" />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableRows {...tHead}></TableRows>
              <IouAdjustmentTable arrRow={rows}></IouAdjustmentTable>
            </Table>
          </TableContainer>
        )}
      </MainCard>
    </Box>
  );
}
