import { Star } from '@mui/icons-material';

interface PropTypes {
  count: number;
  color: string;
}

const StarGroup = ({ count, color }: PropTypes) => {
  return <>{Array(count).fill(<Star htmlColor={color} />)}</>;
};
export default StarGroup;
