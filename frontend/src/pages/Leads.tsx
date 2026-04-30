import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Chip, Button } from '@mui/material';
import { Download } from '@mui/icons-material';
import api from '../api/axios';

const Leads: React.FC = () => {
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await api.get('/dashboard/leads');
        setLeads(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLeads();
  }, []);

  const handleExport = async () => {
    try {
      const response = await api.get('/dashboard/leads/export', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'leads.csv');
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Leads</Typography>
        <Button variant="outlined" startIcon={<Download />} onClick={handleExport}>
          Export CSV
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email / Phone</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead._id}>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.email || lead.phone}</TableCell>
                <TableCell>
                  <Chip label={lead.type} size="small" />
                </TableCell>
                <TableCell>
                  <Chip
                    label={lead.status}
                    size="small"
                    color={lead.status === 'new' ? 'primary' : 'default'}
                  />
                </TableCell>
                <TableCell>{new Date(lead.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
            {leads.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">No leads found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Leads;
