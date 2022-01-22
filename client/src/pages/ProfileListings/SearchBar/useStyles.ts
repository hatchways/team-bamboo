import type { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: 425,
  },
  left: {
    '& .MuiInputBase-root': {
      borderRadius: theme.spacing(1, 0, 0, 1),
    },
  },
  right: {
    '& .MuiInputBase-root': {
      borderRadius: theme.spacing(0, 1, 1, 0),
    },
    color: theme.palette.grey[200],
  },
}));

export default useStyles;
