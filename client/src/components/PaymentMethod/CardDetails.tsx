import { Card, CardContent, Typography } from '@mui/material';
import { Card as CreditCard } from '@stripe/stripe-js';

interface PropTypes {
  card: CreditCard | null;
}

const CardDetails = ({ card }: PropTypes) => (
  <Card variant="outlined" sx={{ textAlign: 'center' }}>
    <CardContent>
      <Typography>{card ? `${card.brand} ending in ${card.last4}` : 'No payment method saved'}</Typography>
    </CardContent>
  </Card>
);
export default CardDetails;
