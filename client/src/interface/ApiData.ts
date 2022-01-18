export interface ValidationError {
  location: string;
  msg: string;
  param: string;
  value: any;
}

export interface RequestError {
  message: string;
}

export default interface ApiData<T> {
  error?: RequestError;
  errors?: ValidationError[];
  success?: T;
}
