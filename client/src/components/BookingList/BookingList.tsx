import { Typography } from '@mui/material';
import { Booking } from '../../interface/Booking';
import BookingCard from './BookingCard';

export interface PropTypes {
  bookings: Booking[];
  type: string;
}

const BookingList = ({ bookings, type }: PropTypes) => {
  return (
    <>
      <Typography sx={{ marginTop: '10px', fontVariant: 'small-caps', fontWeight: 'bold' }}>
        {type} bookings:
      </Typography>
      {bookings.map((b) => (
        <BookingCard key={b._id} booking={b} />
      ))}
    </>
  );
};
export default BookingList;
