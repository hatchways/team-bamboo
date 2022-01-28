import { DateTimePicker } from '@mui/lab';
import { Button, Card, Grid, Rating, TextField, Typography } from '@mui/material';
import { FormEvent, useState } from 'react';
import { useSnackBar } from '../../context/useSnackbarContext';
import { Profile } from '../../interface/Profile';

interface PropTypes {
  profile: Profile;
}
const MILLISECONDS_PER_HOUR = 3.6e6;
const RequestForm = ({ profile }: PropTypes) => {
  const hourFromNowTimestamp = Date.now() + MILLISECONDS_PER_HOUR;
  const [dropoff, setDropoff] = useState<Date | null>(new Date());
  const [pickup, setPickup] = useState<Date | null>(new Date(hourFromNowTimestamp));
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateSnackBarMessage('Request sent');
  };

  return (
    <Card sx={{ width: '25%', minWidth: '250px' }}>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          sx={{ minHeight: '300px' }}
          direction="column"
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Typography variant="h6">${profile.hourlyRate}/hr</Typography>
          <Grid item>
            <Rating readOnly value={profile.averageRating} />
          </Grid>
          <DateTimePicker
            label="Drop off"
            value={dropoff}
            onChange={setDropoff}
            renderInput={(params) => <TextField {...params} />}
          />
          <DateTimePicker
            label="Pick up"
            value={pickup}
            onChange={setPickup}
            renderInput={(params) => <TextField {...params} />}
          />
          <Button type="submit" variant="contained">
            send request
          </Button>
        </Grid>
      </form>
    </Card>
  );
};
export default RequestForm;
