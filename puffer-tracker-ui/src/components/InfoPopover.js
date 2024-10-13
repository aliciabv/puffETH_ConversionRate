// InfoPopover.js
import React, { useState } from 'react';
import { IconButton, Popover, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info'; // Material UI icon for info
import '../styles/components/InfoPopover.css'; // Import the CSS file

const InfoPopover = ({ infoContent, link, linkText }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'info-popover' : undefined;

  return (
    <div>
      <IconButton aria-describedby={id} onClick={handleClick} color="inherit">
        <InfoIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className="popover-content">
          {infoContent}
          <br />
          <a href={link} target="_blank" rel="noopener noreferrer" className="popover-link">
            {linkText}
          </a>
        </Typography>
      </Popover>
    </div>
  );
};

export default InfoPopover;
