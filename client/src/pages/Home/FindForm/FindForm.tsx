import type { Values } from './utils/initialValues';
import { Formik, FormikHelpers } from 'formik';
import FormInput from '../../../components/FormInput/FormInput';
import { Button, Grid, styled } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import DateRangePicker from '@mui/lab/DateRangePicker';
import { FindFormSchema, initialValues } from './utils';
import useStyles from './useStyles';

const SubmitBtn = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2.5, 5),
}));

export type FindFormSubmit = (values: Values, helpers: FormikHelpers<Values>) => void | Promise<any>;

interface Props {
  onSubmit: FindFormSubmit;
}

const FindForm = ({ onSubmit }: Props) => {
  const classes = useStyles();

  return (
    <Formik initialValues={initialValues} validationSchema={FindFormSchema} onSubmit={onSubmit}>
      {({ handleSubmit, handleChange, values, touched, errors, setValues, isSubmitting }) => {
        const dateErrorMsg = touched.start || touched.end ? errors.start || '' + errors.end || '' : '';

        const dateError = (touched.start || touched.end) && (Boolean(errors.start) || Boolean(errors.end));

        return (
          <form onSubmit={handleSubmit}>
            <Grid container className={classes.root}>
              <Grid item xs={12}>
                <FormInput
                  id="location"
                  label="Where"
                  fullWidth
                  margin="normal"
                  name="location"
                  placeholder="Anywhere"
                  size="normal"
                  autoComplete="location"
                  autoFocus
                  inputProps={{
                    style: { padding: '20px' },
                  }}
                  helperText={touched.location ? errors.location : ''}
                  error={touched.location && Boolean(errors.location)}
                  value={values.location}
                  onChange={handleChange}
                />
                <DateRangePicker
                  value={[values.start, values.end]}
                  onChange={([start, end]) => setValues({ ...values, start, end })}
                  minDate={new Date(Date.now())}
                  renderInput={(startProps, endProps) => (
                    <>
                      <FormInput
                        {...startProps}
                        id="start"
                        label="Drop in / drop off"
                        fullWidth
                        margin="normal"
                        name="start"
                        size="normal"
                        placeholder="mm/dd/yyyy"
                        error={dateError}
                        helperText={dateErrorMsg}
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
                        id="end"
                        label=""
                        fullWidth
                        margin="normal"
                        name="end"
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
                <SubmitBtn type="submit" variant="contained" disableElevation disabled={isSubmitting}>
                  {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Find my dog sitter'}
                </SubmitBtn>
              </Grid>
            </Grid>
          </form>
        );
      }}
    </Formik>
  );
};

export default FindForm;
