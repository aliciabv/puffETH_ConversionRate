import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import 'chart.js/auto';
import 'react-datepicker/dist/react-datepicker.css';
import 'chartjs-adapter-date-fns'; 
import { fetchConversionRates } from '../accessors/ConversionRateAccessor'; 
import { fetchConversionRatesStatistics } from '../accessors/ConversionRateStatisticsAccessor';
import DatePickerComponent from './DatePicker'; 
import Chart from './Chart'; 
import InfoPopover from './InfoPopover';
import Statistics from './Statistics'; 
import '../styles/components/ConversionRateChart.css';

const ConversionRateChart = () => {
  const [conversionRates, setConversionRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [startDate, setStartDate] = useState(new Date('2023-10-01'));
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    const loadConversionRates = async () => {
      setLoading(true);
      try {
        const rates = await fetchConversionRates(startDate, endDate);
        setConversionRates(rates);
        const stats = await fetchConversionRatesStatistics(startDate, endDate);
        setStatistics(stats);
      } catch (error) {
        console.error("Error loading conversion rates:", error);
      } finally {
        setLoading(false);
        setLoadingStats(false);
      }
    };

    loadConversionRates();
  }, [startDate, endDate]);

  if (loading) return <p>Loading...</p>;

  const chartData = {
    labels: conversionRates.map(rate => new Date(rate.timestamp)),
    datasets: [
      {
        label: 'Conversion Rate',
        data: conversionRates.map(rate => rate.rate),
        borderColor: 'rgba(0, 200, 150, 1)',  
        backgroundColor: 'rgba(34, 123, 218, 0.1)',  
        pointBackgroundColor: 'rgba(0, 200, 150, 1)', 
        pointBorderColor: 'rgba(0, 200, 150, 1)',  
        fill: true,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
          tooltipFormat: 'MMM d, yyyy, h:mm a',
          displayFormats: {
            minute: 'MMM d, h:mm a',
          },
        },
        title: {
          display: true,
          text: 'DateTime',
          color: '#ffffff',  
          font: {
            size: 16
          }
        },
        ticks: {
          color: '#ffffff',  
          autoSkip: true,
          maxTicksLimit: 10,
          font: {
            size: 12
          }
        },
      },
      y: {
        title: {
          display: true,
          text: 'Conversion Rate',
          color: '#ffffff', 
          font: {
            size: 16
          }
        },
        ticks: {
          color: '#ffffff',  
          font: {
            size: 12
          }
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#ffffff',  
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Rate: ${tooltipItem.raw}`;
          },
        },
      },
    },
    elements: {
      line: {
        tension: 0.4, 
      },
    },
  };
  
  return (
    <Container className="container"> 
      <div className="title-container">
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom 
          className="title" 
        >
          Conversion Rate Over Time
        </Typography>
        <InfoPopover 
          infoContent="This chart displays the conversion rate of pufETH over time. Adjust the dates to filter the data."
          link="https://docs.puffer.fi"
          linkText="Learn more about pufETH"
        />
      </div>
      
      <Grid 
        container 
        spacing={2} 
        justifyContent="flex-start" 
        alignItems="center" 
        className="grid-container" 
      >
        <Grid item>
          <DatePickerComponent 
            label="Start Date" 
            selectedDate={startDate} 
            onChange={date => setStartDate(date)} 
          />
        </Grid>
        <Grid item>
          <DatePickerComponent 
            label="End Date" 
            selectedDate={endDate} 
            onChange={date => setEndDate(date)} 
          />
        </Grid>
      </Grid>

      <Grid 
        container 
        spacing={2} 
        alignItems="flex-start" 
      >
        <Grid item xs={9}>
          <Chart chartData={chartData} options={options} />
        </Grid>
        <Grid item xs={3}>
          <Statistics startDate={startDate} endDate={endDate} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ConversionRateChart;
