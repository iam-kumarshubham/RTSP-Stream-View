import React, { useState, useRef } from 'react';
import { Card, CardContent, CardActions, Typography, IconButton, Box, CircularProgress } from '@mui/material';
import { PlayArrow, Pause, Delete } from '@mui/icons-material';

export default function StreamCard({ url, onRemove }) {
  const [playing, setPlaying] = useState(false);
  const [frame, setFrame] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const wsRef = useRef(null);

  React.useEffect(() => {
    if (playing && !wsRef.current) {
      setLoading(true);
      setError(null);
      wsRef.current = new WebSocket('ws://localhost:8000/ws/stream/');
      wsRef.current.onopen = () => {
        wsRef.current.send(JSON.stringify({ action: 'start', url }));
      };
      wsRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.error) {
            setError(data.error);
            setFrame(null);
            setLoading(false);
          } else if (data.frame) {
            setFrame(data.frame);
            setLoading(false);
          }
        } catch (e) {
          setError('Invalid data received');
          setLoading(false);
        }
      };
      wsRef.current.onerror = () => {
        setError('WebSocket connection failed');
        setLoading(false);
      };
      wsRef.current.onclose = () => {
        setLoading(false);
      };
    }
    if (!playing && wsRef.current) {
      wsRef.current.send(JSON.stringify({ action: 'stop' }));
      wsRef.current.close();
      wsRef.current = null;
    }
    return () => {
      if (wsRef.current) {
        wsRef.current.send(JSON.stringify({ action: 'stop' }));
        wsRef.current.close();
        wsRef.current = null;
      }
    };
    // eslint-disable-next-line
  }, [playing]);

  return (
    <Card sx={{ minHeight: 340, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: 3, boxShadow: 3, bgcolor: 'background.paper' }}>
      <CardContent>
        <Typography variant="subtitle2" gutterBottom noWrap color="primary" sx={{ fontWeight: 600 }}>
          {url}
        </Typography>
        {error ? (
          <Typography color="error" sx={{ mt: 2, fontWeight: 500 }}>
            {error}
          </Typography>
        ) : loading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
            <CircularProgress color="primary" thickness={5} />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>Connecting...</Typography>
          </Box>
        ) : frame ? (
          <img
            src={`data:image/jpeg;base64,${frame}`}
            alt="RTSP Stream"
            style={{ width: '100%', maxHeight: 240, objectFit: 'contain', background: '#222', marginTop: 8, borderRadius: 8 }}
          />
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>Paused</Typography>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', pb: 2 }}>
        <IconButton onClick={() => setPlaying((p) => !p)} color="primary">
          {playing ? <Pause /> : <PlayArrow />}
        </IconButton>
        <IconButton onClick={onRemove} color="error">
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
}
