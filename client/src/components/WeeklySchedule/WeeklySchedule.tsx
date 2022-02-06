import React from 'react';
import SettingHeader from '../SettingsHeader/SettingsHeader';
import { styled, Grid, TextField, Stack, Typography } from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TimePicker from '@mui/lab/TimePicker';
import DateAdapter from '@mui/lab/AdapterMoment';
import getCurrentWeek from './utils/getCurrentWeek';

interface ScheduleItemProps {
  date: string;
}

const ScheduleItem = ({ date }: ScheduleItemProps) => {
  const [value, setValue] = React.useState<Date | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
        <Typography>{date}</Typography>
        <TimePicker
          label="FROM"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <TimePicker
          renderInput={(params) => <TextField {...params} />}
          value={value}
          label="TO"
          onChange={(newValue) => {
            setValue(newValue);
          }}
          minTime={new Date(0, 0, 0, 8)}
          maxTime={new Date(0, 0, 0, 18, 45)}
        />
      </Stack>
    </LocalizationProvider>
  );
};

const WeeklySchedule = (): JSX.Element => {
  const weeklyDates = getCurrentWeek();
  return (
    <Grid>
      <SettingHeader header="Your availability" />
      {weeklyDates.map((date) => (
        <ScheduleItem key={date} date={date} />
      ))}
    </Grid>
  );
};

export default WeeklySchedule;
