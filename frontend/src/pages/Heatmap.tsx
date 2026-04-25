import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, Paper, TextField, Button } from '@mui/material';
import api from '../api/axios';

const Heatmap: React.FC = () => {
  const [url, setUrl] = useState('');
  const [clicks, setClicks] = useState<any[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const fetchHeatmap = async () => {
    try {
      const res = await api.get(`/dashboard/heatmap?url=${encodeURIComponent(url)}`);
      setClicks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (clicks.length > 0 && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        clicks.forEach(click => {
          const gradient = ctx.createRadialGradient(click.x, click.y, 2, click.x, click.y, 20);
          gradient.addColorStop(0, 'rgba(255, 0, 0, 0.6)');
          gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(click.x, click.y, 20, 0, 2 * Math.PI);
          ctx.fill();
        });
      }
    }
  }, [clicks]);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Heatmap Analysis</Typography>
      <Paper sx={{ p: 2, mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Enter page URL (e.g., http://localhost:3000/)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button variant="contained" onClick={fetchHeatmap}>Generate Heatmap</Button>
      </Paper>

      <Box sx={{ position: 'relative', border: '1px solid #e2e8f0', borderRadius: 2, overflow: 'hidden', bgcolor: '#f1f5f9', height: 800 }}>
        <iframe
          src={url}
          style={{ width: '100%', height: '100%', border: 'none' }}
          title="Heatmap Overlay"
        />
        <canvas
          ref={canvasRef}
          width={2000} // Oversized to cover iframe content
          height={2000}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            opacity: 0.8
          }}
        />
      </Box>
    </Box>
  );
};

export default Heatmap;
