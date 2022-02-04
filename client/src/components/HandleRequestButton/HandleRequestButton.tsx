import { IconButton, Menu, MenuItem } from '@mui/material';
import { MouseEvent, useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { Status } from '../../interface/Booking';
import { useBookings } from '../../context/useBookingsContext';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';

interface PropTypes {
  bookingId: string;
}

const HandleRequestButton = ({ bookingId }: PropTypes) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { setBookingStatus } = useBookings();
  const { profile } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  if (!profile?.isSitter) {
    return <></>;
  }

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (status?: Status) => {
    if (status) {
      const { success } = await setBookingStatus(bookingId, status);
      if (success) updateSnackBarMessage('Request ' + status);
    }
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
        onClose={() => handleClose()}
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
