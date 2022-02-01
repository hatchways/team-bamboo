import { KeyboardEvent, useState, FormEvent } from 'react';
import { IconButton, Grid, InputAdornment, TextField, styled } from '@mui/material';
import { LocalizationProvider, DateRangePicker } from '@mui/lab';
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
  start: Date | null;
  end: Date | null;
  location: string;
}

interface Props {
  start: string | null;
  end: string | null;
  location: string | null;
}

const formatInitialState = (from: string | null, to: string | null, location: string | null) => {
  const curDate = new Date(),
    dateFrom = from ? new Date(parseInt(from)) : curDate,
    dateTo = to ? new Date(parseInt(to)) : curDate,
    start = dateFrom.getTime() >= curDate.getTime() ? dateFrom : curDate,
    end = dateTo.getTime() >= curDate.getTime() && dateTo.getTime() >= start.getTime() ? dateTo : start;

  return {
    location: location ? location : '',
    start,
    end,
  };
};

const SearchBar = ({ location, start, end }: Props) => {
  const classes = useStyles();
  const curDate = new Date();
  const [value, setValue] = useState<State>(formatInitialState(start, end, location));

  const handleChange =
    <T,>(name: keyof State) =>
    (value: T) =>
      setValue((values) => ({ ...values, [name]: value }));

  const handleDateChange = ([start, end]: [Date | null, Date | null]) =>
    setValue((values) => ({ ...values, start, end }));

  const handleReset = () => setValue((values) => ({ ...values, start: curDate, end: curDate }));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event);
  };

  const onEnterPress = (event: KeyboardEvent<HTMLFormElement>) => (event.key === 'Enter' ? handleSubmit(event) : null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} dateFormat="dd MMM yy">
      <form onSubmit={handleSubmit} onKeyDown={onEnterPress}>
        <Grid container justifyContent="center">
          <Grid container item md={8} xs={12}>
            <Grid item md={7} xs={6}>
              <StyledTextField
                id="location"
                value={value.location}
                fullWidth
                margin="normal"
                name="location"
                placeholder="Location"
                autoFocus
                className={classes.left}
                onChange={(event) => handleChange('location')(event.target.value)}
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
              <DateRangePicker
                value={[value.start, value.end]}
                onChange={handleDateChange}
                minDate={new Date(Date.now())}
                OpenPickerButtonProps={{ sx: { ml: 0, mr: 0.5 } }}
                renderInput={(startProps) => (
                  <StyledTextField
                    {...startProps}
                    placeholder="DD-DD MMM yy"
                    fullWidth
                    className={classes.right}
                    label=""
                    inputProps={{
                      ...startProps.inputProps,
                      value: [moment(value.start).format('DD MMM'), moment(value.end).format('DD MMM yyyy')].join(
                        ' - ',
                      ),
                    }}
                    InputProps={{
                      startAdornment: startProps.InputProps?.endAdornment,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleReset}>
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
