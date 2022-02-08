import { Booking } from '../../interface/Booking';
import { Avatar, Card, CardContent, Grid, Typography, Box } from '@mui/material';
import format from 'date-fns/format';
import BookingActionButton from '../BookingActionButton/BookingActionButton';

interface PropTypes {
  booking: Booking;
}

const BookingCard = ({ booking }: PropTypes) => {
  return (
    <Card variant="outlined" sx={{ padding: '0px 10px 10px 10px', margin: '10px 0px' }}>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="flex-end">
          <Typography sx={{ fontSize: '0.8rem' }}>
            {format(booking.start, 'd LLLL y, haaa')} - {format(booking.end, 'haaa')}
          </Typography>
          <BookingActionButton bookingId={booking._id} bookingStatus={booking.status} />
        </Grid>
        <Box sx={{ height: '10px' }}></Box>
        <Grid container alignItems="center">
          <Grid item xs={2}>
            <Avatar src={`https://robohash.org/${booking.otherUser.email}`}>{booking.otherUser.name[0]}</Avatar>
          </Grid>
          <Grid item xs={7}>
            <Typography sx={{ fontSize: '0.8rem', fontWeight: 'bold', marginLeft: '5px' }}>
              {booking.otherUser.name}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ fontVariant: 'small-caps', color: 'gray' }}>{booking.status}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
export default BookingCard;
