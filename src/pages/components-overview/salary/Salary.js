import React, { useEffect, useState } from 'react';
import { Box, Table, TableContainer, Paper, MenuItem, FormControl, Select } from '@mui/material';
import MainCard from 'components/MainCard';
import TableRows from 'components/table/TableRows';
import axiosInstance from 'utils/axios.config';
import TableSalary from 'components/table/TableSalary';
import Loader from 'components/loader/Loader';

export default function Salary() {
  const getCurrentYear = () => {
    const currentDate = new Date();
    return currentDate.getFullYear();
  };
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(getCurrentYear);
  const currentYear = getCurrentYear();
  const years = Array.from({ length: currentYear - 2021 }, (_, index) => 2022 + index);

  const [rows, setRows] = useState([]);

  const tHead = {
    cell1: 'ID',
    cell2: 'Month',
    cell3: 'Payment Type',
    cell4: 'Payment Details',
    cell5: 'Account Details',
    cell6: 'Net Amount',
    cell7: 'Action'
  };

  const handleChange = (event) => {
    const selectedYear = event.target.value;
    setYear(selectedYear);
    setLoading(true);

    axiosInstance
      .get(`https://api.hellokompass.com/payroll/salarylist?year=${selectedYear}`)
      .then((res) => {
        setRows(res.data.data);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleChange({ target: { value: year } });
  }, [year]);

  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'end' }}>
        <FormControl sx={{ width: '200px' }}>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={year} onChange={handleChange}>
            {years.map((yearOption) => (
              <MenuItem key={yearOption} value={yearOption}>
                {yearOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
              <TableSalary arrRow={rows}></TableSalary>
            </Table>
          </TableContainer>
        )}
      </MainCard>
    </Box>
  );
}
