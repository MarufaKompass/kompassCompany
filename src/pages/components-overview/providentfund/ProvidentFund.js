import React, { useEffect, useState } from 'react';
import { Box, Table, TableContainer, Paper } from '@mui/material/index';
import MainCard from 'components/MainCard';
import TableRows from 'components/table/TableRows';
import axiosInstance from 'utils/axios.config';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TableProvidentFund from 'components/table/TableProvidentFund';

export default function ProvidentFund() {
  const getCurrentYear = () => {
    const currentDate = new Date();
    return currentDate.getFullYear();
  };

  const [year, setYear] = useState(getCurrentYear);
  const currentYear = getCurrentYear();
  const years = Array.from({ length: currentYear - 2021 }, (_, index) => 2022 + index);

  const [rows, setRows] = useState([]);

  const tHead = {
    cell1: 'ID',
    cell2: 'Month',
    cell3: 'Amount'
  };

  const handleChange = (event) => {
    const selectedYear = event.target.value;
    setYear(selectedYear);

    axiosInstance
      .get(`https://api.hellokompass.com/payroll/pfslist?year=${selectedYear}`)
      .then((res) => {
        setRows(res.data.data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    handleChange({ target: { value: year } });
  }, []);

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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableRows {...tHead}></TableRows>
            <TableProvidentFund arrRow={rows}></TableProvidentFund>
          </Table>
        </TableContainer>
      </MainCard>
    </Box>
  );
}
