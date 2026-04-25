import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Chip, Button } from '@mui/material';
import { VideoCall, Phone } from '@mui/icons-material';
import api from '../api/axios';

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get('/dashboard/bookings');
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBookings();
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Bookings</Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Visitor</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Meeting Link / Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking._id}>
                <TableCell>{booking.visitorName}</TableCell>
                <TableCell>{booking.visitorEmail}</TableCell>
                <TableCell>
                  {new Date(booking.startTime).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Chip
                    label={booking.type.replace('_', ' ')}
                    icon={booking.type.includes('phone') ? <Phone fontSize="small" /> : <VideoCall fontSize="small" />}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {booking.meetingLink ? (
                    <Button variant="outlined" size="small" href={booking.meetingLink} target="_blank">
                      Join Meeting
                    </Button>
                  ) : (
                    <Typography variant="caption" color="textSecondary">No link generated</Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {bookings.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">No bookings found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Bookings;
