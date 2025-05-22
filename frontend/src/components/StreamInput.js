import React from 'react';
import { Grid, TextField, Button } from '@mui/material';

export default function StreamInput({ url, setUrl, onAdd }) {
  return (
    <Grid container spacing={2} alignItems="center" columns={12} sx={{ mb: 2 }}>
      <Grid xs={9} sm={10} item>
        <TextField
          fullWidth
          label="RTSP Stream URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onAdd()}
          size="small"
        />
      </Grid>
      <Grid xs={3} sm={2} item>
        <Button fullWidth variant="contained" onClick={onAdd} disabled={!url} size="medium">
          Add
        </Button>
      </Grid>
    </Grid>
  );
}
