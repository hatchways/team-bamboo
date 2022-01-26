import { IconButton, Menu, MenuItem } from '@mui/material';
import { MouseEvent, useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';

const HandleRequestButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (action: string) => {
    setAnchorEl(null);
  };

  const handleDecline = () => handleClose('declined');
  const handleAccept = () => handleClose('accepted');

  return (
    <>
      <IconButton onClick={handleClick}>
        <SettingsIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleAccept}>Accept</MenuItem>
        <MenuItem onClick={handleDecline}>Decline</MenuItem>
      </Menu>
    </>
  );
};
export default HandleRequestButton;
