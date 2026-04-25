import React, { useState, useEffect } from 'react';
import { Fab, Box, Paper, IconButton, Typography, List, ListItem, ListItemText, ListItemIcon, TextField, Button } from '@mui/material';
import { Chat, WhatsApp, Event, Phone, Message, Close, Send } from '@mui/icons-material';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';
import Tracker from '../api/Tracker';

const API_URL = 'http://localhost:5000/api';
const SOCKET_URL = 'http://localhost:5000';

const Widget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'menu' | 'chat' | 'lead' | 'booking'>('menu');
  const [config, setConfig] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const businessId = (window as any).TALKNOW_BUSINESS_ID || '6628f...'; // Fallback for dev

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await axios.get(`${API_URL}/widget/config/${businessId}`);
        setConfig(res.data);
        // Initialize Tracker once we have the businessId
        new Tracker(businessId);
      } catch (err) {
        console.error('Failed to load widget config', err);
      }
    };
    fetchConfig();
  }, [businessId]);

  useEffect(() => {
    if (view === 'chat' && !socket) {
      const newSocket = io(SOCKET_URL);
      const visitorId = localStorage.getItem('talknow_visitor_id') || Math.random().toString(36).substring(7);
      localStorage.setItem('talknow_visitor_id', visitorId);

      newSocket.emit('join_room', visitorId);
      newSocket.on('receive_message', (msg) => {
        setMessages((prev) => [...prev, msg]);
      });
      setSocket(newSocket);
    }
  }, [view]);

  const handleSendMessage = () => {
    if (inputText.trim() && socket) {
      const visitorId = localStorage.getItem('talknow_visitor_id');
      const msgData = {
        visitorId,
        text: inputText,
        sender: 'visitor',
        businessId,
        visitorName: 'Visitor'
      };
      socket.emit('send_message', msgData);
      setMessages((prev) => [...prev, { ...msgData, createdAt: new Date() }]);
      setInputText('');
    }
  };

  const renderContent = () => {
    switch (view) {
      case 'menu':
        return (
          <List>
            <ListItem button onClick={() => setView('chat')}>
              <ListItemIcon><Chat color="primary" /></ListItemIcon>
              <ListItemText primary="Live Chat" secondary="Chat with us now" />
            </ListItem>
            <ListItem button onClick={() => window.open(`https://wa.me/${config?.widgetSettings?.whatsappNumber || ''}`)}>
              <ListItemIcon><WhatsApp sx={{ color: '#25D366' }} /></ListItemIcon>
              <ListItemText primary="WhatsApp" secondary="Instant reply" />
            </ListItem>
            <ListItem button onClick={() => setView('booking')}>
              <ListItemIcon><Event color="secondary" /></ListItemIcon>
              <ListItemText primary="Book a Call" secondary="Schedule a meeting" />
            </ListItem>
            <ListItem button onClick={() => setView('lead')}>
              <ListItemIcon><Phone color="info" /></ListItemIcon>
              <ListItemText primary="Request Callback" secondary="We'll call you back" />
            </ListItem>
          </List>
        );
      case 'chat':
        return (
          <Box sx={{ height: 400, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
              {messages.map((m, i) => (
                <Box key={i} sx={{ textAlign: m.sender === 'visitor' ? 'right' : 'left', mb: 1 }}>
                  <Typography variant="body2" sx={{ display: 'inline-block', p: 1, borderRadius: 2, bgcolor: m.sender === 'visitor' ? '#2563eb' : '#f1f5f9', color: m.sender === 'visitor' ? 'white' : 'black' }}>
                    {m.text}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box sx={{ p: 2, borderTop: '1px solid #e2e8f0', display: 'flex' }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Type a message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <IconButton color="primary" onClick={handleSendMessage}><Send /></IconButton>
            </Box>
          </Box>
        );
      default:
        return <Box sx={{ p: 3 }}><Typography>Feature coming soon</Typography><Button onClick={() => setView('menu')}>Back</Button></Box>;
    }
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999 }}>
      {isOpen && (
        <Paper sx={{ width: 350, mb: 2, borderRadius: 3, overflow: 'hidden', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}>
          <Box sx={{ bgcolor: config?.widgetSettings?.primaryColor || '#2563eb', color: 'white', p: 2, display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>{config?.name || 'TalkNow'}</Typography>
            {view !== 'menu' && <IconButton size="small" sx={{ color: 'white' }} onClick={() => setView('menu')}>←</IconButton>}
            <IconButton size="small" sx={{ color: 'white' }} onClick={() => setIsOpen(false)}><Close /></IconButton>
          </Box>
          {renderContent()}
        </Paper>
      )}
      <Fab
        color="primary"
        onClick={() => setIsOpen(!isOpen)}
        sx={{ bgcolor: config?.widgetSettings?.primaryColor || '#2563eb' }}
      >
        {isOpen ? <Close /> : <Chat />}
      </Fab>
    </Box>
  );
};

export default Widget;
