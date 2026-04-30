import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNotify } from '../context/NotificationContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const { notify } = useNotify();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.user, res.data.token);
      notify('Logged in successfully', 'success');
      navigate('/dashboard');
    } catch (err) {
      notify('Login failed. Please check your credentials.', 'error');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper sx={{ p: 4, width: '100%' }}>
          <Typography variant="h5" align="center" gutterBottom>
            Welcome Back
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              fullWidth
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button fullWidth variant="contained" type="submit" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Button fullWidth variant="text" onClick={() => navigate('/signup')}>
              Don't have an account? Sign Up
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
