import * as Yup from 'yup';
import moment from 'moment';

const dateSchema = Yup.date()
  .default(new Date(Date.now()))
  .min(
    new Date(Date.now()),
    `Date cannot be less than todays date of: ${moment(new Date(Date.now())).format('MM/DD/yyyy')}`,
  );

const FindFormSchema = Yup.object().shape({
  location: Yup.string().required('Location is required!'),
  start: dateSchema,
  end: dateSchema.nullable(),
});

export default FindFormSchema;
