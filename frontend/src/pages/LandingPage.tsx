import React from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardContent, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Chat, Event, Mouse, Assessment, WhatsApp, Security } from '@mui/icons-material';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    { title: 'Live Chat', description: 'Real-time communication with your visitors.', icon: <Chat color="primary" /> },
    { title: 'Call Booking', description: 'Automated scheduling with Zoom/Google Meet.', icon: <Event color="secondary" /> },
    { title: 'Session Tracking', description: 'Watch how users interact with your site.', icon: <Mouse color="info" /> },
    { title: 'Heatmaps', description: 'Visualize click density and hot spots.', icon: <Assessment color="warning" /> },
    { title: 'WhatsApp Integration', description: 'One-click chat for instant leads.', icon: <WhatsApp sx={{ color: '#25D366' }} /> },
    { title: 'Secure & Multi-tenant', description: 'Enterprise-grade security for your data.', icon: <Security color="error" /> },
  ];

  return (
    <Box sx={{ bgcolor: 'white' }}>
      {/* Hero Section */}
      <Box sx={{ bgcolor: '#f8fafc', py: 15, borderBottom: '1px solid #e2e8f0' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} sx={{ alignItems: "center" }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h2" gutterBottom sx={{ fontWeight: "800", color: '#1e293b' }}>
                All-in-One <span style={{ color: '#2563eb' }}>Growth</span> Widget for Your Website
              </Typography>
              <Typography variant="h5" color="textSecondary" sx={{ mb: 4, lineHeight: 1.6 }}>
                TalkNow combines Live Chat, Call Booking, and Session Tracking into one simple script. Boost conversions and understand your customers.
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" size="large" onClick={() => navigate('/signup')} sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}>
                  Get Started for Free
                </Button>
                <Button variant="outlined" size="large" onClick={() => navigate('/login')} sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}>
                  Live Demo
                </Button>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                sx={{ width: '100%', borderRadius: 4, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 15 }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
          Powerful Features to Grow Your Business
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" sx={{ mb: 8 }}>
          Everything you need to convert visitors into loyal customers.
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-8px)' } }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>{feature.title}</Typography>
                  <Typography variant="body1" color="textSecondary">{feature.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: '#2563eb', py: 10, color: 'white' }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>Ready to boost your conversion?</Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>Join 1,000+ businesses using TalkNow to grow.</Typography>
          <Button variant="contained" size="large" color="inherit" onClick={() => navigate('/signup')} sx={{ color: '#2563eb', bgcolor: 'white', px: 6, '&:hover': { bgcolor: '#f8fafc' } }}>
            Start Your 14-Day Free Trial
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
