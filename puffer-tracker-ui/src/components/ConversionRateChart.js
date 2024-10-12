import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import 'chart.js/auto';
import 'react-datepicker/dist/react-datepicker.css';
import 'chartjs-adapter-date-fns'; 
import { fetchConversionRates } from '../accessors/ConversionRateAccessor'; 
import DatePickerComponent from './DatePicker'; 
import Chart from './Chart'; 

const ConversionRateChart = () => {
  const [conversionRates, setConversionRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date('2023-10-01'));
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    const loadConversionRates = async () => {
      setLoading(true);
      try {
        const rates = await fetchConversionRates(startDate, endDate);
        setConversionRates(rates);
      } catch (error) {
        console.error("Error loading conversion rates:", error);
      } finally {
        setLoading(false);
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
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
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
          tooltipFormat: 'MMM d, YYYY, h:mm a',
          displayFormats: {
            minute: 'MMM d, h:mm a',
          },
        },
        title: {
          display: true,
          text: 'Date',
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Conversion Rate',
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Rate: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <Container>
      <Typography variant="h5" component="h2" gutterBottom>
        Conversion Rate Over Time
      </Typography>
      <Grid container spacing={2}>
        <DatePickerComponent 
          label="Start Date" 
          selectedDate={startDate} 
          onChange={date => setStartDate(date)} 
        />
        <DatePickerComponent 
          label="End Date" 
          selectedDate={endDate} 
          onChange={date => setEndDate(date)} 
        />
      </Grid>
      <Chart chartData={chartData} options={options} />
    </Container>
  );
};

export default ConversionRateChart;
