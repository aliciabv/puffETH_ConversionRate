import React, { useEffect, useState } from 'react';
import { fetchConversionRatesStatistics } from '../accessors/ConversionRateStatisticsAccessor'; // Adjust the path as necessary
import { Paper, Typography } from '@mui/material';
import '../styles/components/Statistics.css';

const Statistics = ({ startDate, endDate }) => {
  const [statistics, setStatistics] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const data = await fetchConversionRatesStatistics(startDate, endDate);
        setStatistics(data);
      } catch (err) {
        setError("Failed to fetch statistics");
      }
    };

    if (startDate && endDate) {
      fetchStatistics();
    }
  }, [startDate, endDate]);

  if (error) return <div>{error}</div>;

  return (
    <Paper className="stats-paper">
      {statistics ? (
        <div>
          <Typography>Min Rate: {statistics.min_rate}</Typography>
          <Typography>Max Rate: {statistics.max_rate}</Typography>
          <Typography>Mean Rate: {statistics.mean_rate}</Typography>
        </div>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Paper>
  );
};

export default Statistics;
