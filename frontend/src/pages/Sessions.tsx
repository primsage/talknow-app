import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Button } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import api from '../api/axios';

const Sessions: React.FC = () => {
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await api.get('/dashboard/sessions');
        setSessions(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSessions();
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Visitor Sessions</Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Session ID</TableCell>
              <TableCell>Events</TableCell>
              <TableCell>Screen Size</TableCell>
              <TableCell>Last Active</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sessions.map((session) => (
              <TableRow key={session._id}>
                <TableCell>{session.sessionId}</TableCell>
                <TableCell>{session.events.length}</TableCell>
                <TableCell>{session.screen?.width}x{session.screen?.height}</TableCell>
                <TableCell>{new Date(session.updatedAt).toLocaleString()}</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small" startIcon={<Visibility />}>
                    View Heatmap
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {sessions.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">No sessions found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Sessions;
