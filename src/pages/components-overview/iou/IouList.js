import React, { useEffect, useState } from 'react';
import { Box, Table, TableContainer, Paper } from '@mui/material';
import MainCard from 'components/MainCard';
import TableRows from 'components/table/TableRows';
import axiosInstance from 'utils/axios.config';
import IouApplyTable from 'components/table/IouApplyTable';
import { useAppContext } from 'AppContextProvider';
import Loader from 'components/loader/Loader';

export default function IouList() {
  const tHead = { cell1: 'ID', cell2: 'Apply Date', cell3: 'Amount', cell4: 'Reason', cell5: 'Status', cell6: 'Action' };
  const [loading, setLoading] = useState();
  const { tableData, updateTableData } = useAppContext();

  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get('https://api.hellokompass.com/payroll/iou')
        .then((res) => {
          updateTableData(res.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    };

    fetchData();
  }, [updateTableData]);

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
              <IouApplyTable arrRow={tableData}></IouApplyTable>
            </Table>
          </TableContainer>
        )}
      </MainCard>
    </Box>
  );
}
