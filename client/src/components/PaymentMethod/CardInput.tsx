import { Button, CircularProgress, Box } from '@mui/material';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { StripeCardElementOptions, Card } from '@stripe/stripe-js';
import { FormEvent, useState, useEffect } from 'react';
import { useSnackBar } from '../../context/useSnackbarContext';
import { setPaymentMethod } from '../../helpers/APICalls/paymentMethod';

interface PropTypes {
  text: string;
  setCard(card: Card | null): void;
}

const options: StripeCardElementOptions = {
  hidePostalCode: true,
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const defaultErrorMessage = 'Error adding payment method';

const CardInput = ({ text, setCard }: PropTypes) => {
  const stripe = useStripe();
  const elements = useElements();
  const { updateSnackBarMessage } = useSnackBar();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const card = elements?.getElement(CardElement);
    if (card) {
      card.on('ready', () => setIsLoading(false));
    }
  }, [elements]);

  const handleSubmit = async (e: FormEvent) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      if (!stripe || !elements) {
        setIsLoading(false);
        return;
      }

      const card = elements.getElement(CardElement);
      if (!card) {
        setIsLoading(false);
        return;
      }
      const result = await stripe.createToken(card);

      if (result.error) {
        updateSnackBarMessage(result.error.message ?? defaultErrorMessage);
        setIsLoading(false);
        return;
      }
      const { success } = await setPaymentMethod(result.token.id);
      if (success) {
        setCard(success.card);
        card.clear();
      } else updateSnackBarMessage(defaultErrorMessage);
    } catch (e) {
      updateSnackBarMessage(defaultErrorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box mx="10px" my="20px">
        <CardElement options={options} />
      </Box>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Button type="submit" disabled={!stripe || !elements} color="primary" variant="contained">
          {text} card
        </Button>
      )}
    </form>
  );
};
export default CardInput;
