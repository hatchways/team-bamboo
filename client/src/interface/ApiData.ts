export interface ValidationError {
  location: string;
  msg: string;
  param: string;
  value: any;
}

export interface RequestError {
  message: string;
}

export type Fetcher<D> = () => Promise<ApiData<D>>;
export type OnSuccess<D, R> = (data: D) => R;
export type OnError<R> = (error: ValidationError[] | RequestError) => R;
export type OnLoading<R> = () => R;
export default interface ApiData<T> {
  error?: RequestError;
  errors?: ValidationError[];
  success?: T;
}
