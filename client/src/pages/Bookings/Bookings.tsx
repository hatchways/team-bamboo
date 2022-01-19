import { useAuth } from '../../context/useAuthContext';
import { useHistory } from 'react-router-dom';
import { Box, Card, CircularProgress, Grid } from '@mui/material';
import Calendar from '../../components/Calendar/Calendar';
import PageContainer from '../../components/PageContainer/PageContainer';
import NextBooking from '../../components/NextBookings/NextBooking';
import { Booking } from '../../interface/Booking';
import BookingList from '../../components/BookingList/BookingList';

const inMemoryNextBooking: Booking = {
  _id: '1',
  start: new Date('2022-01-20T10:00'),
  end: new Date('2022-01-20T12:00'),
  status: 'accepted',
  user: {
    name: 'Norma Byes',
    email: 'norma.byes@example.com',
  },
};

const inMemoryCurrentBookings: Booking[] = [
  {
    _id: '2',
    user: {
      name: 'Charles Compton',
      email: 'charles.compton@example.com',
    },
    start: new Date('2022-01-20T19:00'),
    end: new Date('2022-01-20T21:00'),
    status: 'accepted',
  },
  {
    _id: '3',
    user: {
      name: 'Joan Blackeny',
      email: 'joan.blackeny@example.com',
    },
    start: new Date('2022-01-23T08:00'),
    end: new Date('2022-01-23T12:00'),
    status: 'declined',
  },
];

const inMemoryPastBookings: Booking[] = [
  {
    _id: '0',
    user: {
      name: 'Michael Carnahan',
      email: 'michael.carnahan@example.com',
    },
    start: new Date('2022-01-16T15:00'),
    end: new Date('2022-01-16T22:00'),
    status: 'accepted',
  },
];

const combinedBookings = [...inMemoryCurrentBookings, ...inMemoryPastBookings, inMemoryNextBooking];
const filteredBookings = combinedBookings.filter((b) => b.status !== 'declined');
const highlightedDates = filteredBookings.map((b) => b.start.toString().slice(0, 10));

const Bookings = () => {
  const { loggedInUser } = useAuth();
  const history = useHistory();

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    return <CircularProgress />;
  }

  const scrollableCardStyles = {
    padding: '0px 10px 10px 10px',
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
          <NextBooking booking={inMemoryNextBooking} />
          <Box sx={{ height: '20px' }} />
          <Card sx={scrollableCardStyles}>
            <BookingList type="current" bookings={inMemoryCurrentBookings} />
            <BookingList type="past" bookings={inMemoryPastBookings} />
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
