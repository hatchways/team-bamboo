import { Card, CardContent, Typography, Box } from '@mui/material';
import differenceInHours from 'date-fns/differenceInHours';
import format from 'date-fns/format';
import { Booking } from '../../interface/Booking';
import OrderDetailItem from './OrderDetailItem';

interface PropTypes {
  booking: Booking;
}

const OrderDetails = ({ booking }: PropTypes) => {
  const { otherUser, start, end, hourlyRate } = booking;
  const { name } = otherUser;
  const totalHours = differenceInHours(end, start);

  return (
    <Card sx={{ minHeight: '600px', padding: '20px' }}>
      <CardContent>
        <Typography variant="h2">Order Details</Typography>
        <Box sx={{ height: '20px' }} />
        <OrderDetailItem label="Sitter" value={name} />
        <OrderDetailItem label="Start" value={format(start, 'd LLLL y, haaa')} />
        <OrderDetailItem label="End" value={format(end, 'd LLLL y, haaa')} />
        <OrderDetailItem label="Hourly Rate" value={`$${hourlyRate}`} />
        <OrderDetailItem label="Total Hours" value={totalHours.toString()} />
        <Box sx={{ height: '10px' }} />
        <Typography sx={{ fontSize: '2rem', fontWeight: '500' }}>Total Price: ${totalHours * hourlyRate}</Typography>
      </CardContent>
    </Card>
  );
};
export default OrderDetails;
