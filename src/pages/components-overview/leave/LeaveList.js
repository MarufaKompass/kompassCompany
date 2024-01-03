import React, { useEffect, useState } from 'react';
import { Box, Table, TableContainer, Paper, Typography, Toolbar } from '@mui/material';
import MainCard from 'components/MainCard';
import TableRows from 'components/table/TableRows';
import axiosInstance from 'utils/axios.config';
import TableLeave from 'components/table/TableLeave';
import Loader from 'components/loader/Loader';

export default function LeaveList() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get('https://api.hellokompass.com/payroll/leavelist')
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

  const tHead = {
    cell1: 'ID',
    cell2: 'Leave Type',
    cell3: 'From(Date)',
    cell4: 'To(Date)',
    cell5: 'Duration(Days)',
    cell6: 'Status',
    cell7: 'Action'
  };

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar sx={{ my: 1, mx: -2 }}>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Leave List
          </Typography>
        </Toolbar>
      </Box>
      <MainCard>
        {loading ? (
          <Box width="150px" height="150px">
            <Loader loading={loading} display="flex" justifyContent="center" alignItems="center" />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableRows {...tHead}></TableRows>
              <TableLeave arrRow={rows}></TableLeave>
            </Table>
          </TableContainer>
        )}
      </MainCard>
    </Box>
  );
}
