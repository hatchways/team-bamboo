import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import format from 'date-fns/format';
import { Booking } from '../../interface/Booking';
import BookingActionButton from '../BookingActionButton/BookingActionButton';

interface PropTypes {
  booking: Booking;
}

const NextBooking = ({ booking }: PropTypes) => {
  return (
    <Card sx={{ padding: '10px 0px 30px 20px', minWidth: '280px' }}>
      <CardContent>
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-end">
          <Typography sx={{ fontVariant: 'small-caps', fontWeight: 'bold' }}>your next booking:</Typography>
          <BookingActionButton bookingStatus={booking.status} bookingId={booking._id} />
        </Grid>
        <Typography sx={{ margin: '10px 0px' }}>
          {format(booking.start, 'd LLLL y, haaa')} - {format(booking.end, 'haaa')}
        </Typography>
        <Grid container direction="row" alignItems="center">
          <Avatar src={`https://robohash.org/${booking.otherUser.email}`}>{booking.otherUser.name[0]}</Avatar>
          <Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold', marginLeft: '5px' }}>
            {booking.otherUser.name}
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
};
export default NextBooking;
