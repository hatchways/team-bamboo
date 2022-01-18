export default interface ApiData<T> {
  error?: { message: string };
  errors?: {
    location: string;
    msg: string;
    param: string;
    value: any;
  }[];
  success?: T;
}
