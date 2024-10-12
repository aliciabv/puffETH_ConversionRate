// Chart.js
import React from 'react';
import { Line } from 'react-chartjs-2';

const Chart = ({ chartData, options }) => (
  <Line data={chartData} options={options} />
);

export default Chart;
