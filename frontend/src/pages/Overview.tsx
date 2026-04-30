import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Box, Card, CardContent } from '@mui/material';
import { People, Chat, Event, Call } from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import api from '../api/axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Lead & Chat Trends</Typography>
            <Box sx={{ height: 300 }}>
              <Line
                data={{
                  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                  datasets: [
                    {
                      label: 'Leads',
                      data: [12, 19, 3, 5, 2, 3, 7],
                      borderColor: '#2563eb',
                      tension: 0.4
                    },
                    {
                      label: 'Chats',
                      data: [2, 10, 5, 2, 20, 30, 45],
                      borderColor: '#10b981',
                      tension: 0.4
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>Quick Actions</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <Card variant="outlined" sx={{ bgcolor: '#f8fafc' }}>
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Typography variant="subtitle2">Total Lead Limit</Typography>
                  <Typography variant="h5" color="primary">50 / 1,000</Typography>
                </CardContent>
              </Card>
              <Card variant="outlined" sx={{ bgcolor: '#f8fafc' }}>
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Typography variant="subtitle2">Connected Integrations</Typography>
                  <Typography variant="body2" color="textSecondary">Zoom, Google Meet</Typography>
                </CardContent>
              </Card>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Overview;
