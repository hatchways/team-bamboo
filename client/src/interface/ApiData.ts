<<<<<<< Updated upstream
export default interface ApiData<T> {
  error?: { message: string };
  errors?: {
    location: string;
    msg: string;
    param: string;
    value: any;
  }[];
=======
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
>>>>>>> Stashed changes
  success?: T;
}
