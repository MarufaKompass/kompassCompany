import React, { useEffect, useState } from 'react';
import { Box, Table, TableContainer, Paper } from '@mui/material';
import MainCard from 'components/MainCard';
import TableRows from 'components/table/TableRows';
import axiosInstance from 'utils/axios.config';
import TableEarnWage from 'components/table/TableEarnWage';
import { useAppContext } from 'AppContextProvider';
import Loader from 'components/loader/Loader';

export default function EarnWageList() {
  const [loading, setLoading] = useState(true);
  const { tableData, updateTableData } = useAppContext();
  const tHead = {
    cell1: 'ID',
    cell2: 'Apply Date',
    cell3: 'Apply Amount',
    cell4: 'Approved By',
    cell5: 'Status',
    cell6: 'Approval Date',
    cell7: 'Action'
  };

  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get('https://api.hellokompass.com/payroll/wage')
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
              <TableEarnWage arrRow={tableData}></TableEarnWage>
            </Table>
          </TableContainer>
        )}
      </MainCard>
    </Box>
  );
}
