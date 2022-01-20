import type { RequestError, ValidationError, Fetcher, OnError, OnSuccess, OnLoading } from './../interface/ApiData';
import { useState, useCallback, ReactElement } from 'react';
import wait from '../helpers/wait';

const useRequest = <D>(delay = 0) => {
  const [data, setData] = useState<D | null>(null);
  const [error, setError] = useState<ValidationError[] | RequestError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const makeRequest = useCallback(
    (fetcher: Fetcher<D>) => {
      setIsLoading(true);
      fetcher()
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
    <R = ReactElement>(onLoading: OnLoading<R>, onError: OnError<R>, onSuccess: OnSuccess<D, R>) => {
      if (!data && !error) return onLoading();
      if (error) return isLoading ? onLoading() : onError(error);
      if (data) return isLoading ? onLoading() : onSuccess(data);
      return onLoading();
    },
    [data, error, isLoading],
  );

  return { data, error, isLoading, makeRequest, matchRequest, setData, setError } as const;
};

export default useRequest;
