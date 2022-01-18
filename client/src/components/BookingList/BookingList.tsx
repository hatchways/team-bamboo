import { Typography } from '@mui/material';
import { Booking as IBooking } from '../../interface/Booking';
import Booking from './Booking';

export interface PropTypes {
  bookings: IBooking[];
  type: string;
}

const BookingList = ({ bookings, type }: PropTypes) => {
  return (
    <>
      <Typography sx={{ marginTop: '10px', fontVariant: 'small-caps', fontWeight: 'bold' }}>
        {type} bookings:
      </Typography>
      {bookings.map((b) => (
        <Booking key={b.start.getTime()} booking={b} />
      ))}
    </>
  );
};
export default BookingList;
