import { Badge } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { CalendarDate } from '../../interface/Calendar';

interface PropTypes {
  calendarDate: CalendarDate;
}

const useStyles = makeStyles((theme: any) => ({
  badge: ({ isHighlighted, isInCurrentMonth }: any) => {
    let style = {
      color: 'black',
      backgroundColor: 'white',
    };
    if (!isInCurrentMonth) {
      style.color = '#d3d3d3';
    } else if (isHighlighted) {
      style = {
        color: 'white',
        backgroundColor: theme.palette.primary.main,
      };
    }
    return style;
  },
}));

const CalendarDay = ({ calendarDate }: PropTypes) => {
  const classes = useStyles(calendarDate);
  const numDate = calendarDate.date.getDate();
  return (
    <div style={{ width: '50px', textAlign: 'center', margin: '5px 0px' }}>
      <Badge classes={{ badge: classes.badge }} badgeContent={numDate} />
    </div>
  );
};
export default CalendarDay;
