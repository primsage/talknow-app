import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Box, Card, CardContent } from '@mui/material';
import { People, Chat, Event, Call } from '@mui/icons-material';
import api from '../api/axios';

const Overview: React.FC = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/dashboard/stats');
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Leads', value: stats?.totalLeads || 0, icon: <People color="primary" />, color: '#e0f2fe' },
    { title: 'Leads Today', value: stats?.leadsToday || 0, icon: <Call color="secondary" />, color: '#ecfdf5' },
    { title: 'Active Chats', value: stats?.totalChats || 0, icon: <Chat color="info" />, color: '#fef3c7' },
    { title: 'Bookings', value: stats?.totalBookings || 0, icon: <Event color="warning" />, color: '#fae8ff' },
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Dashboard Overview</Typography>
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {statCards.map((card, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card>
              <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ p: 1, borderRadius: 2, bgcolor: card.color, mr: 2, display: 'flex' }}>
                  {card.icon}
                </Box>
                <Box>
                  <Typography color="textSecondary" variant="body2">{card.title}</Typography>
                  <Typography variant="h6">{card.value}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Placeholder for charts */}
      <Paper sx={{ mt: 4, p: 3, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography color="textSecondary">Lead Growth Chart (Coming Soon)</Typography>
      </Paper>
    </Box>
  );
};

export default Overview;
