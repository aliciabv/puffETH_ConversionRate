import React from 'react';
import { Container, Typography } from '@mui/material';
import ConversionRateChart from './components/ConversionRateChart';

function App() {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Conversion Rate Tracker
      </Typography>
      <ConversionRateChart />
    </Container>
  );
}

export default App;
