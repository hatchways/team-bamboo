import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import format from 'date-fns/format';
import { Booking } from '../../interface/Booking';
import HandleRequestButton from '../HandleRequestButton/HandleRequestButton';

interface PropTypes {
  booking: Booking;
}

const NextBooking = ({ booking }: PropTypes) => {
  return (
    <Card sx={{ padding: '10px 0px 30px 20px' }}>
      <CardContent>
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-end">
          <Typography sx={{ fontVariant: 'small-caps', fontWeight: 'bold' }}>your next booking:</Typography>
          <HandleRequestButton />
        </Grid>
        <Typography sx={{ margin: '10px 0px' }}>
          {format(booking.start, 'd LLLL y, haaa')} - {format(booking.end, 'haaa')}
        </Typography>
        <Grid container direction="row" alignItems="center">
          <Avatar src={`https://robohash.org/${booking.sitter.email}`}>{booking.sitter.name[0]}</Avatar>
          <Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold', marginLeft: '5px' }}>
            {booking.sitter.name}
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
};
export default NextBooking;
