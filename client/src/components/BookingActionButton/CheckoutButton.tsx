import { IconButton } from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { useHistory } from 'react-router-dom';

interface PropTypes {
  bookingId: string;
}

const CheckoutButton = ({ bookingId }: PropTypes) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/bookings/${bookingId}/confirm`);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <ShoppingCartCheckoutIcon />
      </IconButton>
    </>
  );
};
export default CheckoutButton;
