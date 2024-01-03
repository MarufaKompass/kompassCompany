import React, { useEffect, useState } from 'react';
import { Box, Table, TableContainer, Paper } from '@mui/material';
import MainCard from 'components/MainCard';
import TableRows from 'components/table/TableRows';
import axiosInstance from 'utils/axios.config';
import IouSettlementTable from 'components/table/IouSettlementTable';
import Loader from 'components/loader/Loader';

export default function Iou() {
  const [rows, setRows] = useState([]);
  const tHead = { cell1: 'ID', cell2: '	Applicants', cell3: 'Date', cell4: 'Amount', cell5: 'Adjustment Amount', cell6: 'View' };
  const [loading, setLoading] = useState();

  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get('https://api.hellokompass.com/payroll/iousettlelist')
        .then((res) => {
          setRows(res.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    };

    fetchData();
  }, []);
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
              <IouSettlementTable arrRow={rows}></IouSettlementTable>
            </Table>
          </TableContainer>
        )}
      </MainCard>
    </Box>
  );
}
