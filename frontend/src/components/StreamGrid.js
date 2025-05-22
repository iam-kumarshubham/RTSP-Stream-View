import React from 'react';
import { Grid, Box } from '@mui/material';
import StreamCard from './StreamCard';

export default function StreamGrid({ streams, onRemove }) {
  return (
    <Grid container spacing={3} sx={{ mt: 1, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr', lg: '1fr 1fr 1fr 1fr' }, gap: 3 }}>
      {streams.map((streamUrl) => (
        <Box key={streamUrl} sx={{ display: 'flex', justifyContent: 'center' }}>
          <StreamCard url={streamUrl} onRemove={() => onRemove(streamUrl)} />
        </Box>
      ))}
    </Grid>
  );
}
