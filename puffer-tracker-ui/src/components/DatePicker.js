// DatePickerComponent.js
import React from 'react';
import DatePicker from 'react-datepicker';
import { Grid } from '@mui/material';

const DatePickerComponent = ({ label, selectedDate, onChange }) => (
  <Grid item xs={12} md={6}>
    <label>{label}: </label>
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      showTimeSelect
      timeIntervals={1}
      timeCaption="Time"
      dateFormat="Pp"
    />
  </Grid>
);

export default DatePickerComponent;
