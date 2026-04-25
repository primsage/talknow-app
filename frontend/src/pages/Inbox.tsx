import React, { useState, useEffect, useRef } from 'react';
import { Box, Grid, List, ListItem, ListItemButton, ListItemText, Paper, Typography, TextField, IconButton, Divider, Avatar } from '@mui/material';
import { Send } from '@mui/icons-material';
import { io, Socket } from 'socket.io-client';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const SOCKET_URL = 'http://localhost:5000';

const Inbox: React.FC = () => {
  const [conversations, setConversations] = useState<any[]>([]);
  const [activeConv, setActiveConv] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const { user } = useAuth();
  const chatEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      // In a real app, we'd have a conversations endpoint
      // For MVP, we fetch unique visitor IDs from messages
      try {
        const res = await api.get('/dashboard/leads'); // Using leads as a proxy for visitors
        const visitors = res.data.map((l: any) => ({ visitorId: l.visitorInfo?.id || l._id, name: l.name }));
        setConversations(visitors);
      } catch (err) {
        console.error(err);
      }
    };
    fetchConversations();

    const newSocket = io(SOCKET_URL);
    newSocket.on('receive_message', (msg) => {
      if (activeConv && msg.visitorId === activeConv.visitorId) {
        setMessages((prev) => [...prev, msg]);
      }
    });
    setSocket(newSocket);

    return () => { newSocket.disconnect(); };
  }, [activeConv]);

  useEffect(() => {
    if (activeConv) {
      const fetchHistory = async () => {
        const res = await api.get(`/widget/chat/${user.businessId}/${activeConv.visitorId}`);
        setMessages(res.data);
      };
      fetchHistory();
      socket?.emit('join_room', activeConv.visitorId);
    }
  }, [activeConv]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputText.trim() && socket && activeConv) {
      const msgData = {
        visitorId: activeConv.visitorId,
        text: inputText,
        sender: 'agent',
        businessId: user.businessId,
        agentId: user.id
      };
      socket.emit('send_message', msgData);
      setMessages((prev) => [...prev, { ...msgData, createdAt: new Date() }]);
      setInputText('');
    }
  };

  return (
    <Box sx={{ height: 'calc(100vh - 120px)' }}>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        <Grid size={{ xs: 4 }} sx={{ height: '100%' }}>
          <Paper sx={{ height: '100%', overflow: 'auto' }}>
            <List>
              {conversations.map((conv) => (
                <ListItem key={conv.visitorId} disablePadding>
                  <ListItemButton
                    onClick={() => setActiveConv(conv)}
                    selected={activeConv?.visitorId === conv.visitorId}
                  >
                    <Avatar sx={{ mr: 2 }}>{conv.name[0]}</Avatar>
                    <ListItemText primary={conv.name} secondary="Click to chat" />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid size={{ xs: 8 }} sx={{ height: '100%' }}>
          <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {activeConv ? (
              <>
                <Box sx={{ p: 2, borderBottom: '1px solid #e2e8f0' }}>
                  <Typography variant="h6">{activeConv.name}</Typography>
                </Box>
                <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
                  {messages.map((m, i) => (
                    <Box key={i} sx={{ textAlign: m.sender === 'agent' ? 'right' : 'left', mb: 2 }}>
                      <Box sx={{
                        display: 'inline-block',
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: m.sender === 'agent' ? '#2563eb' : '#f1f5f9',
                        color: m.sender === 'agent' ? 'white' : 'black',
                        maxWidth: '70%'
                      }}>
                        <Typography variant="body2">{m.text}</Typography>
                      </Box>
                      <Typography variant="caption"  color="textSecondary">
                        {new Date(m.createdAt).toLocaleTimeString()}
                      </Typography>
                    </Box>
                  ))}
                  <div ref={chatEndRef} />
                </Box>
                <Divider />
                <Box sx={{ p: 2, display: 'flex' }}>
                  <TextField
                    fullWidth
                    placeholder="Type your response..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <IconButton color="primary" onClick={handleSendMessage} sx={{ ml: 1 }}>
                    <Send />
                  </IconButton>
                </Box>
              </>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <Typography color="textSecondary">Select a conversation to start chatting</Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Inbox;
