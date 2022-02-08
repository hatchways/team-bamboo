import { useAuth } from '../../context/useAuthContext';
import { Status } from '../../interface/Booking';
import HandleRequestButton from './HandleRequestButton';
import CheckoutButton from './CheckoutButton';

interface PropTypes {
  bookingId: string;
  bookingStatus: Status;
}

const BookingActionButton = ({ bookingId, bookingStatus }: PropTypes) => {
  const { profile } = useAuth();

  if (profile.isSitter) return <HandleRequestButton bookingId={bookingId} />;
  if (bookingStatus !== 'accepted') return <></>;

  return <CheckoutButton bookingId={bookingId} />;
};
export default BookingActionButton;
