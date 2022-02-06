import React from 'react';
import SettingHeader from '../SettingsHeader/SettingsHeader';
import { Box, Grid, TextField, Stack, Divider } from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TimePicker from '@mui/lab/TimePicker';
import DateAdapter from '@mui/lab/AdapterMoment';
import getCurrentWeek from './utils/getCurrentWeek';
import useStyles from './useStyle';

interface ScheduleItemProps {
  date: string;
}

const ScheduleItem = ({ date }: ScheduleItemProps) => {
  const classes = useStyles();
  const [startTime, setStartTime] = React.useState<Date | null>(null);
  const [endTime, setEndTime] = React.useState<Date | null>(null);
  const dateArr = date.split(',');

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        alignItems="center"
        className={classes.scheduleItemContainer}
      >
        <Stack className={classes.dateContainer} direction={{ xs: 'column', xl: 'row' }}>
          <Box className={classes.monthDate}>{dateArr[1]},</Box>
          <Box className={classes.weekDay}>{dateArr[0]}</Box>
        </Stack>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TimePicker
            label="FROM"
            value={startTime}
            onChange={(newStart) => {
              setStartTime(newStart);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <TimePicker
            renderInput={(params) => <TextField {...params} />}
            value={endTime}
            label="TO"
            onChange={(newEnd) => {
              setEndTime(newEnd);
            }}
            minTime={startTime ? startTime : new Date(0, 0, 0, 0, 0)}
          />
        </Stack>
      </Stack>
    </LocalizationProvider>
  );
};

const WeeklySchedule = (): JSX.Element => {
  const classes = useStyles();
  const weeklyDates = getCurrentWeek();
  return (
    <Grid className={classes.scheduleContainer}>
      <SettingHeader header="Your availability" />
      <Stack divider={<Divider light />} className={classes.schedules}>
        {weeklyDates.map((date) => (
          <ScheduleItem key={date} date={date} />
        ))}
      </Stack>
    </Grid>
  );
};

export default WeeklySchedule;
