import React, { useEffect, useState } from 'react';
import { Box, Table, TableContainer, Paper } from '@mui/material';
import MainCard from 'components/MainCard';
import TableRows from 'components/table/TableRows';
import { useAppContext } from 'AppContextProvider';
import Info from './Info';
import axiosInstance from 'utils/axios.config';
import TableEmi from 'components/table/TableEmi';
import Loader from 'components/loader/Loader';

export default function EmiDetails() {
  const { emiId } = useAppContext();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const tHead = {
    cell1: 'ID',
    cell2: 'Month',
    cell3: 'Emi Amount',
    cell4: 'Interest',
    cell5: 'Principal',
    cell6: 'Balance',
    cell7: 'Status'
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = { loan_id: emiId };
      try {
        const res = await axiosInstance.post('https://api.hellokompass.com/payroll/emi', data);
        setRows(res.data.data.emidata);
        sessionStorage.setItem('emiId', JSON.stringify(res.data.data.emidata[0].lonidx));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [emiId]);
  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <MainCard>
          <Info></Info>
        </MainCard>
      </Box>
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
                <TableEmi arrRow={rows}></TableEmi>
              </Table>
            </TableContainer>
          )}
        </MainCard>
      </Box>
    </Box>
  );
}
