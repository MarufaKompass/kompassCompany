import React, { useEffect, useState } from 'react';
import { Box, Table, TableContainer, Paper } from '@mui/material';
import MainCard from 'components/MainCard';
import TableRows from 'components/table/TableRows';
import axiosInstance from 'utils/axios.config';
import TableLoan from 'components/table/TableLoan';
import Loader from 'components/loader/Loader';

export default function LoanList() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const tHead = {
    cell1: 'ID',
    cell2: 'Loan Amount',
    cell3: 'Total Amount',
    cell4: 'EMI Limit',
    cell5: 'EMI Amount',
    cell6: 'Status',
    cell7: 'Details'
  };

  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get('https://api.hellokompass.com/payroll/loanlist')
        .then((res) => {
          setRows(res.data.data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
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
              <TableLoan arrRow={rows}></TableLoan>
            </Table>
          </TableContainer>
        )}
      </MainCard>
    </Box>
  );
}
