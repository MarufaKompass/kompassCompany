import React, { useEffect, useState } from 'react';
import axiosInstance from 'utils/axios.config';
import { Box, FormControl, Select, MenuItem, Paper, TableContainer, Table } from '@mui/material';
import MainCard from 'components/MainCard';
import TableRows from 'components/table/TableRows';
import TableAttendance from 'components/table/TableAttendance';
import Loader from 'components/loader/Loader';

export default function AttendanceHistory() {
  const getCurrentYear = () => {
    const currentDate = new Date();
    return currentDate.getFullYear();
  };
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear();
  const startYear = 2023;
  const years = Array.from({ length: currentYear - startYear + 1 }, (_, index) => startYear + index);

  const [rows, setRows] = useState([]);

  const tHead = {
    cell1: 'ID',
    cell2: 'Attendance Date',
    cell3: 'In Time',
    cell4: 'Out Time',
    cell5: 'Status'
  };

  const [selectedDate, setSelectedDate] = useState({
    month: new Date().getMonth(),
    year: getCurrentYear()
  });

  const handleChange = (month, year) => {
    setLoading(true);
    axiosInstance
      .get(`https://api.hellokompass.com/payroll/attendMonthly?month=${month}&year=${year}`)
      .then((res) => {
        setRows(res.data.data);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleChange(selectedDate.month + 1, selectedDate.year);
  }, [selectedDate.month]);

  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'end' }}>
        <FormControl sx={{ width: '200px', marginRight: '16px' }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={`${selectedDate.month + 1}-${selectedDate.year}`}
            onChange={(event) => {
              const [selectedMonth, selectedYear] = event.target.value.split('-');
              setSelectedDate({
                month: selectedMonth - 1,
                year: selectedYear
              });
            }}
          >
            {years.map((yearOption) =>
              Array.from({ length: 12 }, (_, index) => (
                <MenuItem key={`${index}-${yearOption}`} value={`${index + 1}-${yearOption}`}>
                  {`${new Date(selectedDate.year, index).toLocaleString('default', { month: 'long' })} - ${yearOption}`}
                </MenuItem>
              ))
            )}
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
              <TableAttendance arrRow={rows}></TableAttendance>
            </Table>
          </TableContainer>
        )}
      </MainCard>
    </Box>
  );
}
