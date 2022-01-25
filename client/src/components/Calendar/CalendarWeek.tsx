import { Grid } from '@mui/material';
import { CalendarDate } from '../../interface/Calendar';
import CalendarDay from './CalendarDay';

interface PropTypes {
  dates: CalendarDate[];
}

const CalendarWeek = ({ dates }: PropTypes) => {
  return (
    <Grid container justifyContent="space-around">
      {dates.map((d) => (
        <CalendarDay key={d.date.getTime()} calendarDate={d} />
      ))}
    </Grid>
  );
};

export default CalendarWeek;
