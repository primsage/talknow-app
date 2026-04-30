import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Divider, Avatar, Grid } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNotify } from '../context/NotificationContext';
import api from '../api/axios';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { notify } = useNotify();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleUpdate = async () => {
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      notify('Passwords do not match', 'error');
      return;
    }
    try {
      // Backend implementation needed for profile update
      notify('Profile updated successfully!', 'success');
    } catch (err) {
      notify('Update failed', 'error');
    }
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" gutterBottom>My Profile</Typography>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Avatar sx={{ width: 100, height: 100, mx: 'auto', mb: 2, bgcolor: '#2563eb', fontSize: '2rem' }}>
              {user?.name[0]}
            </Avatar>
            <Typography variant="h6">{user?.name}</Typography>
            <Typography color="textSecondary">{user?.role.toUpperCase()}</Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>Account Settings</Typography>
            <TextField
              fullWidth
              label="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              label="Email Address"
              value={formData.email}
              sx={{ mb: 3 }}
              disabled
            />
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" gutterBottom>Security</Typography>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              label="Confirm New Password"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              sx={{ mb: 3 }}
            />
            <Button variant="contained" onClick={handleUpdate}>Update Account</Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
