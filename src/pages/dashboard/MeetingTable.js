import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import "../../styles.css";

// material-ui
import { Box, TableRow, Table, TableBody, TableCell, TableHead } from '@mui/material';

// project import
import axiosInstance from 'utils/axios.config';

// ==============================|| ORDER TABLE ||============================== //

export default function MeetingTable() {
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('https://api.hellokompass.com/allupcoming?limit=9&offset=0');
      setUpcoming(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const debouncedFetchData = debounce(fetchData, 100);

  useEffect(() => {
    setLoading(true); // Set loading to true before fetching data
    debouncedFetchData();
  }, []);

  const { meeting = [], booking = [], event = [], getinvitation = [] } = upcoming;

  return (
    <Box>
      <Box sx={{ height: 510 }}>
        <Table sx={{ minWidth: 710 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Guest</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Time</TableCell>
              <TableCell align="left">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {meeting.map((meet) => (
              <TableRow key={meet.id}>
                <TableCell align="left">{meet.guest_name}</TableCell>
                <TableCell align="left">{meet.date}</TableCell>
                <TableCell align="left">{meet.time}</TableCell>
                <TableCell align="left">{meet.status}</TableCell>
              </TableRow>
            ))}
            {booking.map((book) => (
              <TableRow key={book.id}>
                <TableCell align="left">{book.guest_name}</TableCell>
                <TableCell align="left">{book.date}</TableCell>
                <TableCell align="left">{book.time}</TableCell>
                <TableCell align="left">{book.status}</TableCell>
              </TableRow>
            ))}
            {event.map((evnt) => (
              <TableRow key={evnt.id}>
                <TableCell align="left">{evnt.evntname}</TableCell>
                <TableCell align="left">{evnt.date}</TableCell>
                <TableCell align="left">
                  {evnt.starttime} to {evnt.endtime}
                </TableCell>
              </TableRow>
            ))}
            {getinvitation.map((invite) => (
              <TableRow key={invite.id}>
                <TableCell align="left">{invite.evnt_name}</TableCell>
                <TableCell align="left">{invite.evnt_date}</TableCell>
                <TableCell align="left">
                  {invite.start_time} to {invite.end_time}
                </TableCell>
                <TableCell align="left">{invite.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}
