import React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, AppBar, Toolbar, Typography, IconButton, Avatar } from '@mui/material';
import { Dashboard, Chat, Event, People, Settings, ExitToApp, Build, Mouse, Assessment } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 240;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { text: 'Overview', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Inbox', icon: <Chat />, path: '/inbox' },
    { text: 'Bookings', icon: <Event />, path: '/bookings' },
    { text: 'Leads', icon: <People />, path: '/leads' },
    { text: 'Team', icon: <People />, path: '/team' },
    { text: 'Sessions', icon: <Mouse />, path: '/sessions' },
    { text: 'Heatmap', icon: <Assessment />, path: '/heatmap' },
    { text: 'Pricing', icon: <People />, path: '/pricing' },
    { text: 'Settings', icon: <Settings />, path: '/settings' },
  ];

  if (user?.role === 'admin') {
    menuItems.push({ text: 'Admin', icon: <Build />, path: '/admin' });
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: 'white', color: 'black', boxShadow: 'none', borderBottom: '1px solid #e2e8f0' }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#2563eb' }}>
            TalkNow
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ mr: 2 }}>{user?.name}</Typography>
            <Avatar sx={{ width: 32, height: 32, mr: 2 }}>{user?.name[0]}</Avatar>
            <IconButton onClick={() => { logout(); navigate('/login'); }}>
              <ExitToApp />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', borderRight: '1px solid #e2e8f0' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', mt: 2 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  selected={location.pathname === item.path}
                  sx={{
                    mx: 1,
                    borderRadius: 2,
                    mb: 0.5,
                    '&.Mui-selected': { bgcolor: '#eff6ff', color: '#2563eb', '& .MuiListItemIcon-root': { color: '#2563eb' } }
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f8fafc', minHeight: '100vh' }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
