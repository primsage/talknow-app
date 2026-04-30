import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Chip, IconButton } from '@mui/material';
import { Delete, PersonAdd } from '@mui/icons-material';
import api from '../api/axios';
import { useNotify } from '../context/NotificationContext';

const Team: React.FC = () => {
  const { notify } = useNotify();
  const [team, setTeam] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [newAgent, setNewAgent] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const res = await api.get('/team');
      setTeam(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddAgent = async () => {
    try {
      await api.post('/team', newAgent);
      setOpen(false);
      setNewAgent({ name: '', email: '', password: '' });
      fetchTeam();
      notify('Agent added successfully!', 'success');
    } catch (err) {
      notify('Failed to add agent', 'error');
    }
  };

  const handleRemoveAgent = async (id: string) => {
    if (!window.confirm('Remove this agent?')) return;
    try {
      await api.delete(`/team/${id}`);
      fetchTeam();
      notify('Agent removed', 'info');
    } catch (err) {
      notify('Failed to remove agent', 'error');
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>Team Management</Typography>
        <Button variant="contained" startIcon={<PersonAdd />} onClick={() => setOpen(true)}>
          Add Agent
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {team.map((member) => (
              <TableRow key={member._id}>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>
                  <Chip
                    label={member.role.replace('_', ' ').toUpperCase()}
                    color={member.role === 'business_owner' ? 'primary' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {member.role === 'agent' && (
                    <IconButton color="error" onClick={() => handleRemoveAgent(member._id)}>
                      <Delete />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Agent</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Name"
              value={newAgent.name}
              onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              value={newAgent.email}
              onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={newAgent.password}
              onChange={(e) => setNewAgent({ ...newAgent, password: e.target.value })}
              sx={{ mb: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddAgent}>Add Agent</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Team;
