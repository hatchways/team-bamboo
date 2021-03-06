import { useState } from 'react';
import { IconButton, Grid, InputAdornment, TextField, styled } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import useStyles from './useStyles';
import { Search, Close } from '@mui/icons-material';
import moment from 'moment';

const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: 0,
  '& .MuiInputBase-root': {
    padding: theme.spacing(0, 2),
    gap: theme.spacing(1),
  },
  '& .MuiInputBase-input': {
    fontSize: 16,
    width: '100%',
  },
}));

interface State {
  date: Date | null;
  location: string | null;
}

const initialState: State = {
  date: new Date(Date.now()),
  location: null,
};

const SearchBar = () => {
  const classes = useStyles();
  const [value, setValue] = useState<State>(initialState);

  const handleChange =
    <T,>(name: keyof State) =>
    (value: T) =>
      setValue((values) => ({ ...values, [name]: value }));

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} dateFormat="dd MMM yy">
      <form>
        <Grid container justifyContent="center">
          <Grid container item md={8} xs={12}>
            <Grid item md={7} xs={6}>
              <StyledTextField
                id="location"
                fullWidth
                margin="normal"
                name="location"
                placeholder="Location"
                autoFocus
                className={classes.left}
                InputProps={{
                  startAdornment: (
                    <label htmlFor="location">
                      <InputAdornment position="start">
                        <Search color="primary" fontSize="large" />
                      </InputAdornment>
                    </label>
                  ),
                }}
              />
            </Grid>
            <Grid item md={5} xs={6}>
              <DatePicker
                value={value.date}
                onChange={handleChange<Date | null>('date')}
                minDate={new Date(Date.now())}
                OpenPickerButtonProps={{ sx: { ml: 0, mr: 0.5 } }}
                renderInput={(params) => (
                  <StyledTextField
                    {...params}
                    placeholder="DD-DD MMM yy"
                    fullWidth
                    className={classes.right}
                    inputProps={{
                      ...params.inputProps,
                      value: moment(value.date).format('DD MMM yyyy'),
                    }}
                    InputProps={{
                      startAdornment: params.InputProps?.endAdornment,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => handleChange<Date | null>('date')(new Date(Date.now()))}>
                            <Close color="inherit" fontSize="medium" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
      </form>
    </LocalizationProvider>
  );
};

export default SearchBar;
