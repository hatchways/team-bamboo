import { Typography, Box } from '@mui/material';

interface PropTypes {
  label: string;
  value: string;
}

const OrderDetailItem = ({ label, value }: PropTypes) => {
  return (
    <Typography sx={{ fontSize: '1.1rem' }} gutterBottom>
      <>
        <Box component="span" sx={{ fontWeight: 'bold' }}>
          {label}:&nbsp;
        </Box>
        {value}
      </>
    </Typography>
  );
};
export default OrderDetailItem;
