// App.js
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Grid, Typography } from "@mui/material";
import ConversionRateChart from "./components/ConversionRateChart";
import Statistics from "./components/Statistics"; 
import './styles/App.css';

const logoPath = process.env.PUBLIC_URL + "/PufferFinance_logo.svg";

const theme = createTheme({
  typography: {
    fontFamily: `'PT Serif', serif`,
    h3: {
      fontWeight: 700,
    },
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <div className="header">
        <Grid container justifyContent="center" alignItems="center" className="header-grid">
          <Grid item xs={2} container justifyContent="flex-end">
            <img src={logoPath} alt="Left Logo" className="logo" />
          </Grid>
          <Grid item xs={8} container justifyContent="center">
            <Typography variant="h3" component="h1" gutterBottom={true} className="header-title">
              pufETH Conversion Rate Tracker
            </Typography>
          </Grid>
          <Grid item xs={2} container justifyContent="flex-start">
            <img src={logoPath} alt="Right Logo" className="logo" />
          </Grid>
        </Grid>
      </div>

      <Container className="container">
        <Grid container spacing={2} direction="column" style={{ height: '100%' }}>
          <Grid item xs>
            <div className="chart-container" style={{ height: '100%' }}>
              <ConversionRateChart />
            </div>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
