import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  popperPaper: {
    boxShadow: '4px 4px 13px 7px rgba(217,217,217,0.26)',
    borderBottomLeftRadius: theme.spacing(1),
    borderBottomRightRadius: theme.spacing(1),
    overflowY: 'hidden',
  },
  popper: {
    padding: theme.spacing(3),
    background: theme.palette.background.default,
    minWidth: 400,
    maxHeight: 200,
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: theme.spacing(3),
    },
    '&::-webkit-scrollbar-track': {
      borderRight: '6px solid transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      border: '8px solid rgba(0, 0, 0, 0)',
      backgroundClip: 'padding-box',
      borderRadius: theme.spacing(100),
      backgroundColor: theme.palette.grey[200],
    },
  },
  arrow: {
    position: 'relative',
    mt: '10px',
    width: '100%',
    height: 4,
    background: 'black',
    '&::before': {
      backgroundColor: 'black',
      content: '""',
      display: 'block',
      position: 'absolute',
      width: 12,
      height: 12,
      top: -6,
      transform: 'rotate(45deg)',
      left: 'calc(50% - 6px)',
      zIndex: -1,
    },
  },
}));
