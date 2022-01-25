import { Grid, IconButton } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { add, sub, format, Duration } from 'date-fns';
import { makeStyles } from '@mui/styles';

interface PropTypes {
  date: Date;
  setDate(d: Date): void;
}

const useStyles = makeStyles((theme: any) => ({
  monthText: {
    textAlign: 'center',
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
}));

const CalendarHead = ({ date, setDate }: PropTypes) => {
  const classes = useStyles();
  const modifyDate = (date: Date, action: (dt: Date, dr: Duration) => Date) => {
    const newDate = action(date, { months: 1 });
    setDate(newDate);
  };
  const increment = () => modifyDate(date, add);
  const decrement = () => modifyDate(date, sub);

  return (
    <Grid container justifyContent="space-between">
      <Grid item xs={1} sx={{ textAlign: 'center' }} onClick={decrement}>
        <IconButton>
          <KeyboardArrowLeft />
        </IconButton>
      </Grid>
      <Grid className={classes.monthText} item xs={10}>
        {format(date, 'LLLL y')}
      </Grid>
      <Grid item xs={1} sx={{ textAlign: 'center' }} onClick={increment}>
        <IconButton>
          <KeyboardArrowRight />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default CalendarHead;
