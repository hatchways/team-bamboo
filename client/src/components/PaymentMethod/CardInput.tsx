import { Button, CircularProgress, Card, TextField, InputAdornment } from '@mui/material';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { StripeCardElementOptions, Card as CreditCard } from '@stripe/stripe-js';
import { FormEvent, useState, useEffect, ChangeEvent } from 'react';
import { useSnackBar } from '../../context/useSnackbarContext';
import { setPaymentMethod } from '../../helpers/APICalls/paymentMethod';
import BadgeIcon from '@mui/icons-material/Badge';

interface PropTypes {
  text: string;
  setCard(card: CreditCard | null): void;
}

const options: StripeCardElementOptions = {
  hidePostalCode: true,
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Roboto", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '14px',
      '::placeholder': {
        color: '#bcbcbc',
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
  const [name, setName] = useState('');

  useEffect(() => {
    const card = elements?.getElement(CardElement);
    if (card) {
      card.on('ready', () => setIsLoading(false));
    }
  }, [elements]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (!name) {
        setIsLoading(false);
        updateSnackBarMessage('Cardholder name is required');
        return;
      }
      if (!stripe || !elements) {
        setIsLoading(false);
        return;
      }

      const card = elements.getElement(CardElement);
      if (!card) {
        setIsLoading(false);
        return;
      }
      const result = await stripe.createToken(card, { name });

      if (result.error) {
        updateSnackBarMessage(result.error.message ?? defaultErrorMessage);
        setIsLoading(false);
        return;
      }
      const { success } = await setPaymentMethod(result.token.id);
      if (success) {
        setCard(success.card);
        card.clear();
        setName('');
      } else updateSnackBarMessage(defaultErrorMessage);
    } catch (e) {
      updateSnackBarMessage(defaultErrorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      {!isLoading && (
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BadgeIcon sx={{ color: '#dcdfe6' }} />
              </InputAdornment>
            ),
          }}
          fullWidth
          variant="outlined"
          placeholder="Cardholder name"
          value={name}
          onChange={onChange}
        />
      )}
      <Card
        variant="outlined"
        sx={{ padding: '15px 10px', margin: '5px 0px', visibility: isLoading ? 'hidden' : 'visible' }}
      >
        <CardElement options={options} />
      </Card>
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
