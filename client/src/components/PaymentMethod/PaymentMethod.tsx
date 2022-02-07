import SettingHeader from '../SettingsHeader/SettingsHeader';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Card } from '@stripe/stripe-js';
import CardInput from './CardInput';
import CardDetails from './CardDetails';
import { useCallback, useState, useEffect } from 'react';
import { getPaymentMethod, deletePaymentMethod } from '../../helpers/APICalls/paymentMethod';
import { useSnackBar } from '../../context/useSnackbarContext';
import { Button, CircularProgress } from '@mui/material';

const stripePromise = loadStripe(
  'pk_test_51KOD99CVbTsPOFgPMZ2coO2U9wF4getgD19fq8x2EiO3J8CgeNmjXHyP6Xumd349f286Z1Cky3F0iE0PMFhV3okc00FRI1Vjx3',
);

const PaymentMethod = () => {
  const [card, setCard] = useState<Card | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { updateSnackBarMessage } = useSnackBar();

  const fetchCard = useCallback(async () => {
    setIsLoading(true);
    const errMsg = 'Error loading card';
    try {
      const { success } = await getPaymentMethod();
      if (success) setCard(success.card);
      else updateSnackBarMessage(errMsg);
    } catch (e) {
      updateSnackBarMessage(errMsg);
    } finally {
      setIsLoading(false);
    }
  }, [updateSnackBarMessage]);

  const deleteCard = async () => {
    try {
      setIsLoading(true);
      await deletePaymentMethod();
      setCard(null);
    } catch (e) {
      updateSnackBarMessage('Error deleting card');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCard();
  }, [fetchCard]);

  if (isLoading) return <CircularProgress />;

  return (
    <Elements stripe={stripePromise}>
      <SettingHeader header="Payment Method" />
      <CardDetails card={card} />
      {card && (
        <Button sx={{ marginTop: '5px', marginBottom: '30px' }} onClick={deleteCard}>
          Remove Payment Method
        </Button>
      )}
      <CardInput setCard={setCard} text={card ? 'update' : 'add'} />
    </Elements>
  );
};
export default PaymentMethod;
