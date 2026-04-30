import React, { useState, useEffect } from 'react';
import { Box, Paper, TextField, Button, Typography, Switch, FormControlLabel, Divider, Grid } from '@mui/material';
import api from '../api/axios';
import { useNotify } from '../context/NotificationContext';

const Settings: React.FC = () => {
  const { notify } = useNotify();
  const [settings, setSettings] = useState({
    primaryColor: '#007bff',
    welcomeText: 'How can we help you today?',
    whatsappNumber: '',
    enabledFeatures: ['live_chat', 'whatsapp', 'booking', 'callback', 'message'],
  });

  useEffect(() => {
    // Fetch current settings TBD
  }, []);

  const handleSave = async () => {
    try {
      await api.put('/dashboard/widget-settings', settings);
      notify('Settings saved successfully!', 'success');
    } catch (err) {
      notify('Failed to save settings', 'error');
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Widget Settings</Typography>
      <Paper sx={{ p: 4, mt: 2 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom>Appearance</Typography>
            <TextField
              fullWidth
              label="Primary Color"
              type="color"
              value={settings.primaryColor}
              onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              label="Welcome Text"
              value={settings.welcomeText}
              onChange={(e) => setSettings({ ...settings, welcomeText: e.target.value })}
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              label="WhatsApp Number (with country code)"
              value={settings.whatsappNumber}
              onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
              sx={{ mb: 3 }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom>Enabled Features</Typography>
            {['live_chat', 'whatsapp', 'booking', 'callback', 'message'].map((feature) => (
              <FormControlLabel
                key={feature}
                control={
                  <Switch
                    checked={settings.enabledFeatures.includes(feature)}
                    onChange={(e) => {
                      const newFeatures = e.target.checked
                        ? [...settings.enabledFeatures, feature]
                        : settings.enabledFeatures.filter((f) => f !== feature);
                      setSettings({ ...settings, enabledFeatures: newFeatures });
                    }}
                  />
                }
                label={feature.replace('_', ' ').toUpperCase()}
                sx={{ display: 'block' }}
              />
            ))}
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Button variant="contained" onClick={handleSave}>Save Settings</Button>
      </Paper>

      <Typography variant="h5" sx={{ mt: 4 }} gutterBottom>Installation</Typography>
      <Paper sx={{ p: 4, mt: 2, bgcolor: '#1e293b', color: '#f8fafc' }}>
        <Typography variant="body2" sx={{ mb: 2 }}>Copy and paste this script tag into your website's &lt;head&gt; or &lt;body&gt; section:</Typography>
        <code>
          {`<script src="http://localhost:3001/widget.js" data-business-id="YOUR_BUSINESS_ID"></script>`}
        </code>
      </Paper>
    </Box>
  );
};

export default Settings;
