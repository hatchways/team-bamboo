import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  navbar: {
    boxShadow: '4px 4px 13px 7px rgba(217,217,217,0.26)',
    padding: theme.spacing(2),
    background: 'white',
    color: theme.palette.grey[900],
  },
  transparentNavbar: {
    boxShadow: 'none',
    background: 'none',
    position: 'absolute',
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down('md')]: {
      color: theme.palette.text.primary,
    },
  },
  navbarItem: {
    color: 'inherit',
    fontWeight: 700,
    textDecoration: 'none',
    transition: 'color 120ms ease-in-out',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  navbarLogo: {
    width: 180,
  },
  profilePhoto: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    objectFit: 'cover',
  },
}));
