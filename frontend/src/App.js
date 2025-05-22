import React, { useState } from 'react';
import { Container, Paper, Typography, Box } from '@mui/material';
import StreamInput from './components/StreamInput';
import StreamGrid from './components/StreamGrid';

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
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100', py: 5 }}>
      <Container maxWidth="md">
        <Paper sx={{ p: 4, mb: 4, borderRadius: 4, boxShadow: 4 }}>
          <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: 700, letterSpacing: 1 }}>
            RTSP Stream Viewer
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
            Add and view live RTSP streams in your browser. Powered by Django, Channels, OpenCV, and React.
          </Typography>
          <StreamInput url={url} setUrl={setUrl} onAdd={handleAdd} />
        </Paper>
        <StreamGrid streams={streams} onRemove={handleRemove} />
      </Container>
    </Box>
  );
}

export default App;
