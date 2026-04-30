import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import api from '../api/axios';
import { useNotify } from '../context/NotificationContext';

const AdminPanel: React.FC = () => {
  const { notify } = useNotify();
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [leadsLimit, setLeadsLimit] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get('/admin/businesses');
      setBusinesses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateSubscription = async () => {
    try {
      await api.put(`/admin/subscription/${selectedBusiness._id}`, {
        plan: selectedBusiness.subscription.plan,
        leadsLimit: parseInt(leadsLimit)
      });
      setOpen(false);
      fetchData();
      notify('Subscription updated successfully', 'success');
    } catch (err) {
      notify('Update failed', 'error');
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>Super Admin Panel</Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, bgcolor: '#eff6ff' }}>
            <Typography variant="h6">Total Businesses</Typography>
            <Typography variant="h4">{businesses.length}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>Managed Organizations</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Business Name</TableCell>
              <TableCell>Plan</TableCell>
              <TableCell>Leads Used / Limit</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {businesses.map((biz) => (
              <TableRow key={biz._id}>
                <TableCell>{biz.name}</TableCell>
                <TableCell>
                  <Chip label={biz.subscription.plan} color="primary" size="small" />
                </TableCell>
                <TableCell>{biz.subscription.leadsUsed} / {biz.subscription.leadsLimit}</TableCell>
                <TableCell>
                  <Chip label={biz.subscription.status} color={biz.subscription.status === 'active' ? 'success' : 'warning'} size="small" />
                </TableCell>
                <TableCell>
                  <Button variant="outlined" size="small" onClick={() => { setSelectedBusiness(biz); setLeadsLimit(biz.subscription.leadsLimit); setOpen(true); }}>
                    Manage
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Update Subscription: {selectedBusiness?.name}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Leads Limit"
              type="number"
              value={leadsLimit}
              onChange={(e) => setLeadsLimit(e.target.value)}
              sx={{ mb: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdateSubscription}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPanel;
