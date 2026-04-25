import React from 'react';
import { Box, Typography, Paper, Grid, Button, Divider } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import api from '../api/axios';

const Pricing: React.FC = () => {
  const plans = [
    { name: 'Free', price: '0', leads: '50', tracking: false, heatmap: false, color: '#64748b', id: 'free' },
    { name: 'Pro', price: '2900', leads: '1,000', tracking: true, heatmap: false, color: '#2563eb', id: 'pro' },
    { name: 'Premium', price: '9900', leads: '5,000', tracking: true, heatmap: true, color: '#7c3aed', id: 'premium' },
    { name: 'Extra Premium', price: '19900', leads: 'Unlimited', tracking: true, heatmap: true, color: '#db2777', id: 'extra_premium' },
  ];

  const handleSubscribe = async (plan: any) => {
    if (plan.id === 'free') return;

    try {
      const { data } = await api.post('/payment/create-order', { plan: plan.id });

      const options = {
        key: 'rzp_test_placeholder', // Should come from backend or env
        amount: data.order.amount,
        currency: data.order.currency,
        name: 'TalkNow',
        description: `${plan.name} Subscription`,
        order_id: data.order.id,
        handler: async (response: any) => {
          try {
            await api.post('/payment/verify-payment', {
              ...response,
              plan: data.plan,
              leadsLimit: data.leadsLimit
            });
            alert('Payment Successful!');
          } catch (err) {
            alert('Payment Verification Failed');
          }
        },
        prefill: {
          name: 'Business Owner',
          email: 'owner@example.com'
        },
        theme: { color: plan.color }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      alert('Failed to initiate payment');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold" }}>Choose Your Plan</Typography>
      <Typography variant="body1" align="center" color="textSecondary" sx={{ mb: 6 }}>Scale your business with TalkNow</Typography>
      <Grid container spacing={4} sx={{ justifyContent: "center" }}>
        {plans.map((plan) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={plan.id}>
            <Paper sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', border: plan.id === 'pro' ? '2px solid #2563eb' : 'none' }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>{plan.name}</Typography>
              <Box sx={{ my: 2, display: 'flex', alignItems: 'baseline' }}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>₹{plan.price}</Typography>
                <Typography variant="body2" color="textSecondary">/mo</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CheckCircle sx={{ fontSize: 18, mr: 1, color: 'green' }} />
                  <Typography variant="body2">{plan.leads} Leads/mo</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CheckCircle sx={{ fontSize: 18, mr: 1, color: 'green' }} />
                  <Typography variant="body2">Real-time Chat</Typography>
                </Box>
                {plan.id !== 'free' && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CheckCircle sx={{ fontSize: 18, mr: 1, color: 'green' }} />
                    <Typography variant="body2">Chat History</Typography>
                  </Box>
                )}
                {plan.tracking && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CheckCircle sx={{ fontSize: 18, mr: 1, color: 'green' }} />
                    <Typography variant="body2">Session Tracking</Typography>
                  </Box>
                )}
                {plan.heatmap && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CheckCircle sx={{ fontSize: 18, mr: 1, color: 'green' }} />
                    <Typography variant="body2">Heatmap Analysis</Typography>
                  </Box>
                )}
              </Box>
              <Button
                fullWidth
                variant={plan.id === 'pro' ? 'contained' : 'outlined'}
                sx={{ mt: 3 }}
                onClick={() => handleSubscribe(plan)}
              >
                {plan.id === 'free' ? 'Current Plan' : 'Subscribe'}
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Pricing;
