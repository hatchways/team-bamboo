import ApiData, { RequestError, ValidationError } from './../interface/ApiData';
import { useState, useCallback } from 'react';
import wait from '../helpers/wait';

type FetchData<D> = () => Promise<ApiData<D>>;
type OnLoading<R> = () => R;
type OnError<R> = (error: ValidationError[] | RequestError) => R;
type OnSuccess<D, R> = (data: D) => R;

const useRequest = <D, R>(delay = 0) => {
  const [data, setData] = useState<D | null>(null);
  const [error, setError] = useState<ValidationError[] | RequestError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const makeRequest = useCallback(
    (fetchData: FetchData<D>) => {
      setIsLoading(true);
      fetchData()
        .then((res) =>
          res.success
            ? setData(res.success)
            : res.error
            ? setError(res.error)
            : setError(res.errors as ValidationError[]),
        )
        .catch(() => setError({ message: 'Unable to connect to server. Please try again.' }))
        .finally(async () => wait(() => setIsLoading(false), delay));
    },
    [delay],
  );

  const matchRequest = useCallback(
    (onLoading: OnLoading<R>, onError: OnError<R>, onSuccess: OnSuccess<D, R>) => {
      if (!data && !error) return onLoading();
      if (error) return isLoading ? onLoading() : onError(error);
      if (data) return isLoading ? onLoading() : onSuccess(data);
      return onLoading();
    },
    [data, error, isLoading],
  );

  return [makeRequest, matchRequest] as const;
};

export default useRequest;
