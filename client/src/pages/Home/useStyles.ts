import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import HeroImg from '../../images/landing/hero.jpg';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: '100vh',
    height: 'min-content',
  },
  heroContainer: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  hero: {
    display: 'flex',
    height: '100%',
    width: '100%',
    background: `center / cover no-repeat url(${HeroImg})`,
  },
  content: {
    padding: theme.spacing(10),
    marginTop: theme.spacing(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default useStyles;
