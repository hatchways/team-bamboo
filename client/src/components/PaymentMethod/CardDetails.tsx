import { Card, CardContent, Typography, Box } from '@mui/material';
import { Card as CreditCard } from '@stripe/stripe-js';
import { Visa, Mastercard } from 'react-pay-icons';

interface PropTypes {
  card: CreditCard | null;
}

interface CardMap {
  [brand: string]: (() => JSX.Element) | undefined;
}

const cardMap: CardMap = {
  MasterCard: Mastercard,
  Visa: Visa,
};

const CardDetails = ({ card }: PropTypes) => {
  if (!card) return <Typography sx={{ textAlign: 'center', marginBottom: '30px' }}>No payment method saved</Typography>;

  const CardBrand = cardMap[card.brand];
  const twoDigitMonth = `0${card.exp_month}`.slice(-2);
  const twoDigitYear = card.exp_year.toString().slice(2);

  return (
    <Card variant="outlined" sx={{ width: '350px' }}>
      <CardContent>
        {CardBrand && (
          <Box width="75px" mb="10px">
            <CardBrand />
          </Box>
        )}
        <Typography variant="h6">****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;{card.last4}</Typography>
        <Typography>
          Exp. Date {twoDigitMonth}/{twoDigitYear}
        </Typography>
        <Typography variant="h6" sx={{ marginTop: '10px' }}>
          {card.name}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default CardDetails;
