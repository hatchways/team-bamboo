import { Box, Card, CircularProgress, Grid } from '@mui/material';
import Calendar from '../../components/Calendar/Calendar';
import PageContainer from '../../components/PageContainer/PageContainer';
import NextBooking from '../../components/NextBookings/NextBooking';
import { Booking } from '../../interface/Booking';
import BookingList from '../../components/BookingList/BookingList';
import { useSnackBar } from '../../context/useSnackbarContext';
import { useBookings } from '../../context/useBookingsContext';

const Bookings = () => {
  const { bookings, isLoadingBookings } = useBookings();
  const { updateSnackBarMessage } = useSnackBar();

  if (isLoadingBookings) return <CircularProgress />;

  if (!bookings) {
    updateSnackBarMessage('Error fetching bookings');
    return <></>;
  }

  const highlightedDates = bookings.filter((b) => b.status !== 'declined').map((b) => b.start.toString().slice(0, 10));

  const currentBookings: Booking[] = [];
  const pastBookings: Booking[] = [];

  const now = new Date();
  for (const booking of bookings) {
    if (booking.start < now) pastBookings.push(booking);
    else currentBookings.push(booking);
  }

  const nextBooking = currentBookings.shift();

  const scrollableCardStyles = {
    padding: '0px 10px 10px 10px',
    minWidth: '280px',
    height: '300px',
    overflow: 'auto',
    '::-webkit-scrollbar': {
      width: 6,
      bgcolor: 'rgba(0, 0, 0, 0.26)',
      borderRadius: 2,
    },
    '::-webkit-scrollbar-thumb': { bgcolor: 'rgba(0, 0, 0, 0.21)', borderRadius: 2 },
  };

  return (
    <PageContainer>
      <Grid container justifyContent="space-evenly">
        <Grid item xs={4}>
          {nextBooking && <NextBooking booking={nextBooking} />}
          <Box sx={{ height: '20px' }} />
          <Card sx={scrollableCardStyles}>
            <BookingList type="current" bookings={currentBookings} />
            <BookingList type="past" bookings={pastBookings} />
          </Card>
        </Grid>
        <Grid item xs={5}>
          <Calendar highlightedDates={highlightedDates} />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Bookings;
