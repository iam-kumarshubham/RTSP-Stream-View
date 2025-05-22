import React, { useState, useRef } from 'react';
import { Container, Paper, Grid, TextField, Button, Typography, Card, CardContent, CardActions, IconButton } from '@mui/material';
import { PlayArrow, Pause, Delete } from '@mui/icons-material';

function StreamCard({ url, ws, onRemove }) {
  const [playing, setPlaying] = useState(false);
  const [frame, setFrame] = useState(null);
  const wsRef = useRef(null);

  React.useEffect(() => {
    if (playing && !wsRef.current) {
      wsRef.current = new WebSocket('ws://localhost:8000/ws/stream/');
      wsRef.current.onopen = () => {
        wsRef.current.send(JSON.stringify({ action: 'start', url }));
      };
      wsRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setFrame(data.frame);
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
    <Card>
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          {url}
        </Typography>
        {frame ? (
          <img
            src={`data:image/jpeg;base64,${frame}`}
            alt="RTSP Stream"
            style={{ width: '100%', maxHeight: 240, objectFit: 'contain', background: '#222' }}
          />
        ) : (
          <Typography variant="body2" color="text.secondary">{playing ? 'Connecting...' : 'Paused'}</Typography>
        )}
      </CardContent>
      <CardActions>
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

function App() {
  const [url, setUrl] = useState('');
  const [streams, setStreams] = useState([]);

  const handleAdd = () => {
    if (url && !streams.includes(url)) {
      setStreams([...streams, url]);
      setUrl('');
    }
  };
  const handleRemove = (removeUrl) => {
    setStreams(streams.filter((u) => u !== removeUrl));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          RTSP Stream Viewer
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={9} sm={10}>
            <TextField
              fullWidth
              label="RTSP Stream URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            />
          </Grid>
          <Grid item xs={3} sm={2}>
            <Button fullWidth variant="contained" onClick={handleAdd} disabled={!url}>
              Add
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={2}>
        {streams.map((streamUrl) => (
          <Grid item xs={12} sm={6} key={streamUrl}>
            <StreamCard url={streamUrl} onRemove={() => handleRemove(streamUrl)} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;
