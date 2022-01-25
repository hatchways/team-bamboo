import { Badge, Box, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { CalendarDate } from '../../interface/Calendar';

interface PropTypes {
  calendarDate: CalendarDate;
}

const useStyles = makeStyles((theme: Theme) => ({
  badge: ({ isHighlighted, isInCurrentMonth }: CalendarDate) => {
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
    <Box style={{ width: '50px', textAlign: 'center', margin: '5px 0px' }}>
      <Badge classes={{ badge: classes.badge }} badgeContent={numDate} />
    </Box>
  );
};
export default CalendarDay;
