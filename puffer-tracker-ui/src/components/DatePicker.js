import React from 'react';
import DatePicker from 'react-datepicker';
import { Grid, Typography, TextField } from '@mui/material'; 
import '../styles/components/DatePickerComponent.css'; 

const DatePickerComponent = ({ label, selectedDate, onChange }) => (
  <Grid item xs={'auto'} md={'auto'}>
    <Typography variant="subtitle1" className="date-picker-label">
      {label}:
    </Typography>
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      showTimeSelect
      timeIntervals={1}
      timeCaption="Time"
      dateFormat="Pp"
      customInput={<TextField variant="outlined" className="custom-text-field" />} // Use CSS class for styling
      wrapperClassName="date-picker-wrapper"
      popperPlacement="bottom"
    />
  </Grid>
);

export default DatePickerComponent;
