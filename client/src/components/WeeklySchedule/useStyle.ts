import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  scheduleContainer: {
    padding: theme.spacing(3),
    borderRadius: 10,
  },
  schedules: {
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: 7,
  },
  scheduleItemContainer: {
    padding: '25px 40px',
  },
  dateContainer: {
    width: 250,
  },
  monthDate: {
    minWidth: 115,
    fontWeight: 700,
    fontSize: 19,
  },
  weekDay: {
    color: theme.palette.secondary.main,
    fontWeight: 700,
    fontSize: 19,
  },
}));

export default useStyles;
