import { Card, CircularProgress, CardContent, Typography, Box, Button } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';
import PageContainer from '../../components/PageContainer/PageContainer';
import { useAuth } from '../../context/useAuthContext';
import { useBookings } from '../../context/useBookingsContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import NotFound from '../NotFound/NotFound';
import { Card as CreditCard } from '@stripe/stripe-js';
import { useEffect, useState, useCallback } from 'react';
import { getPaymentMethod } from '../../helpers/APICalls/paymentMethod';
import CardDetails from '../../components/PaymentMethod/CardDetails';
import OrderDetails from './OrderDetails';
import { payForBooking } from '../../helpers/APICalls/requests';

interface RouteParams {
  id: string;
}

const ConfirmPayment = () => {
  const { id } = useParams<RouteParams>();
  const { isLoadingBookings, bookings } = useBookings();
  const { loggedInUser } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const [card, setCard] = useState<CreditCard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();

  const fetchCard = useCallback(async () => {
    try {
      setIsLoading(true);
      const { success } = await getPaymentMethod();
      if (success) setCard(success.card);
      else updateSnackBarMessage('Error loading payment method');
    } catch (e) {
      updateSnackBarMessage('Error loading payment method');
    } finally {
      setIsLoading(false);
    }
  }, [updateSnackBarMessage]);

  useEffect(() => {
    fetchCard();
  }, [fetchCard]);

  if (isLoadingBookings || !loggedInUser) return <CircularProgress />;

  if (!bookings) {
    updateSnackBarMessage('Error fetching booking');
    return <></>;
  }

  const booking = bookings.find((b) => b._id === id);
  if (!booking || booking.status !== 'accepted') return <NotFound />;

  const confirmPayment = async () => {
    try {
      setIsSubmitting(true);
      const { success } = await payForBooking(id);
      if (success) history.push('/transactionResult');
      else updateSnackBarMessage('Payment failed');
    } catch (e) {
      updateSnackBarMessage('Payment failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <OrderDetails booking={booking} />
        <Card sx={{ width: '40%', minHeight: '500px', padding: '20px' }}>
          <CardContent>
            <Typography variant="h2">Payment Method</Typography>
            <Box sx={{ height: '20px' }} />
            {isLoading ? <CircularProgress /> : <CardDetails card={card} />}
            <Button
              onClick={confirmPayment}
              sx={{ marginTop: '10px' }}
              disabled={!card || isSubmitting}
              variant="contained"
            >
              Confirm Payment
            </Button>
          </CardContent>
        </Card>
      </Box>
    </PageContainer>
  );
};
export default ConfirmPayment;
