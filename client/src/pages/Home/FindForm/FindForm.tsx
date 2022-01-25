import { useState } from 'react';
import FormInput from '../../../components/FormInput/FormInput';
import { Button, Grid, styled } from '@mui/material';
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import useStyles from './useStyles';

const SubmitBtn = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2.5, 5),
}));

const FindForm = () => {
  const classes = useStyles();
  const [dates, setDates] = useState<DateRange<Date>>([null, null]);

  function handleSubmit() {
    console.log('submitted');
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <FormInput
            id="where"
            label="Where"
            fullWidth
            margin="normal"
            name="where"
            placeholder="Anywhere"
            size="normal"
            autoComplete="where"
            autoFocus
            inputProps={{
              style: { padding: '20px' },
            }}
          />
          <DateRangePicker
            value={dates}
            onChange={(newValue) => setDates(newValue)}
            minDate={new Date(Date.now())}
            renderInput={(startProps, endProps) => (
              <>
                <FormInput
                  {...startProps}
                  id="dropIn"
                  label="Drop in / drop off"
                  fullWidth
                  margin="normal"
                  name="drop-in"
                  size="normal"
                  placeholder="mm/dd/yyyy"
                  inputProps={{
                    ...startProps.inputProps,
                    style: {
                      borderRadius: '8px 0 0 8px',
                      padding: '20px',
                    },
                  }}
                />
                <FormInput
                  {...endProps}
                  id="dropOff"
                  label=""
                  fullWidth
                  margin="normal"
                  name="drop-off"
                  size="normal"
                  placeholder="mm/dd/yyyy"
                  inputProps={{
                    ...endProps.inputProps,
                    style: {
                      borderRadius: '0 8px 8px 0',
                      padding: '20px',
                    },
                  }}
                />
              </>
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <SubmitBtn type="submit" variant="contained" disableElevation>
            Find my dog sitter
          </SubmitBtn>
        </Grid>
      </Grid>
    </form>
  );
};

export default FindForm;
