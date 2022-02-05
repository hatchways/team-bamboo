export interface Values {
  location: string;
  start: Date | null;
  end: Date | null;
}

const initialValues: Values = {
  location: '',
  start: null,
  end: null,
};

export default initialValues;
