import React, { useState, useRef } from 'react';
import { Container, Paper, Grid, TextField, Button, Typography, Card, CardContent, CardActions, IconButton } from '@mui/material';
import { PlayArrow, Pause, Delete } from '@mui/icons-material';

function StreamCard({ url, onRemove }) {
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
    <Card sx={{ minHeight: 340, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <CardContent>
        <Typography variant="subtitle2" gutterBottom noWrap>
          {url}
        </Typography>
        {error ? (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        ) : loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 32 }}>
            <span className="MuiCircularProgress-root MuiCircularProgress-indeterminate" style={{ width: 40, height: 40, borderWidth: 4, borderStyle: 'solid', borderColor: '#1976d2 transparent #1976d2 transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>Connecting...</Typography>
          </div>
        ) : frame ? (
          <img
            src={`data:image/jpeg;base64,${frame}`}
            alt="RTSP Stream"
            style={{ width: '100%', maxHeight: 240, objectFit: 'contain', background: '#222', marginTop: 8 }}
          />
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>Paused</Typography>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
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
        <Grid container spacing={2} alignItems="center" columns={12}>
          <Grid sx={{ flexBasis: { xs: '75%', sm: '83.3333%' }, maxWidth: { xs: '75%', sm: '83.3333%' } }}>
            <TextField
              fullWidth
              label="RTSP Stream URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            />
          </Grid>
          <Grid sx={{ flexBasis: { xs: '25%', sm: '16.6667%' }, maxWidth: { xs: '25%', sm: '16.6667%' } }}>
            <Button fullWidth variant="contained" onClick={handleAdd} disabled={!url}>
              Add
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={2} columns={12}>
        {streams.map((streamUrl) => (
          <Grid key={streamUrl} sx={{ flexBasis: { xs: '100%', sm: '50%' }, maxWidth: { xs: '100%', sm: '50%' } }}>
            <StreamCard url={streamUrl} onRemove={() => handleRemove(streamUrl)} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;
