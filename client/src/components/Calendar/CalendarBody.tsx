import { Grid } from '@mui/material';
import { Calendar } from 'calendar';
import { CalendarDate } from '../../interface/Calendar';
import CalendarWeek from './CalendarWeek';

interface PropTypes {
  selectedMonth: Date;
  highlightedDates: string[];
}

const NUM_DAYS_IN_WEEK = 7;
const CalendarBody = ({ selectedMonth, highlightedDates }: PropTypes) => {
  const calendar = new Calendar();
  const year = selectedMonth.getFullYear();
  const month = selectedMonth.getMonth();

  // the following 3 arrays are 2d arrays
  // outer arrays represent weeks in the month
  // all inner arrays will have length of 7, grouping dates into weeks

  // daysOfMonth numbers will either represent the date, or 0
  //if the date falls outside of the current month
  const daysOfMonth: number[][] = calendar.monthDays(year, month);
  const datesByWeek: Date[][] = calendar.monthDates(year, month);
  const weeks: CalendarDate[][] = [];

  for (let w = 0; w < datesByWeek.length; ++w) {
    weeks[w] = [];
    for (let d = 0; d < NUM_DAYS_IN_WEEK; ++d) {
      const date = datesByWeek[w][d];
      const dateString = date.toString().slice(0, 10);
      weeks[w][d] = {
        date,
        isInCurrentMonth: !!daysOfMonth[w][d],
        isHighlighted: highlightedDates.includes(dateString),
      };
    }
  }

  return (
    <Grid container direction="column" spacing={1}>
      {weeks.map((week, i) => (
        <CalendarWeek key={`${year}-${month}:${i}`} dates={week} />
      ))}
    </Grid>
  );
};
export default CalendarBody;
