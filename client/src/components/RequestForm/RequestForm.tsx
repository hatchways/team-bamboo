import { DateTimePicker } from '@mui/lab';
import { Button, Card, Grid, Rating, TextField, Typography } from '@mui/material';
import { FormEvent, useState } from 'react';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import { createBooking } from '../../helpers/APICalls/requests';
import { Profile } from '../../interface/Profile';

interface PropTypes {
  profile: Profile;
}

const MILLISECONDS_PER_HOUR = 3.6e6;

const placeholderAverageRating = 3;

const RequestForm = ({ profile }: PropTypes) => {
  const hourFromNowTimestamp = Date.now() + MILLISECONDS_PER_HOUR;
  const [dropoff, setDropoff] = useState<Date | null>(new Date());
  const [pickup, setPickup] = useState<Date | null>(new Date(hourFromNowTimestamp));
  const { loggedInUser } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!dropoff || !pickup) {
      updateSnackBarMessage('Dropoff and pickup must be valid');
      return;
    }
    const reqBody = {
      sitter: profile.userId,
      start: dropoff,
      end: pickup,
    };
    try {
      setIsButtonDisabled(true);
      const { success } = await createBooking(reqBody);
      if (success) {
        updateSnackBarMessage('Request sent');
      } else {
        updateSnackBarMessage('Error sending request');
      }
    } catch (e) {
      updateSnackBarMessage('Error sending request');
    } finally {
      setIsButtonDisabled(false);
    }
  };

  profile.averageRating = placeholderAverageRating;
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
            disabled={!loggedInUser}
            label="Drop off"
            value={dropoff}
            onChange={setDropoff}
            renderInput={(params) => <TextField {...params} />}
          />
          <DateTimePicker
            disabled={!loggedInUser}
            label="Pick up"
            value={pickup}
            onChange={setPickup}
            renderInput={(params) => <TextField {...params} />}
          />
          <Button type="submit" variant="contained" disabled={isButtonDisabled || !loggedInUser}>
            send request
          </Button>
        </Grid>
      </form>
    </Card>
  );
};
export default RequestForm;
