import { Avatar, Card, Grid, IconButton, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import format from 'date-fns/format';
import { Booking } from '../../interface/Booking';

interface PropTypes {
  booking: Booking;
}

const NextBooking = ({ booking }: PropTypes) => {
  return (
    <Card sx={{ padding: '10px 0px 30px 20px' }}>
      <Grid container direction="row" justifyContent="space-between" alignItems="flex-end">
        <Typography sx={{ fontVariant: 'small-caps', fontWeight: 'bold' }}>your next booking:</Typography>
        <IconButton>
          <SettingsIcon />
        </IconButton>
      </Grid>
      <Typography sx={{ margin: '10px 0px' }}>
        {format(booking.start, 'd LLLL y, haaa')} - {format(booking.end, 'haaa')}
      </Typography>
      <Grid container direction="row" alignItems="center">
        <Avatar src={`https://robohash.org/${booking.user.email}`}>{booking.user.name[0]}</Avatar>
        <Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold', marginLeft: '5px' }}>{booking.user.name}</Typography>
      </Grid>
    </Card>
  );
};
export default NextBooking;
