import { Grid } from '@mui/material';
import StarGroup from './StarGroup';

interface PropTypes {
  rating: number;
  maxRating?: number;
  primaryColor?: string;
  secondaryColor?: string;
}

const StarRating = (props: PropTypes) => {
  const { rating, maxRating = 5, primaryColor = 'gold', secondaryColor = 'gray' } = props;
  return (
    <Grid container>
      <StarGroup color={primaryColor} count={rating} />
      <StarGroup color={secondaryColor} count={maxRating - rating} />
    </Grid>
  );
};
export default StarRating;
