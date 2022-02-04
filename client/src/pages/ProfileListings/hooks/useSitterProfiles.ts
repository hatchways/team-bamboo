import type { RequestError, ValidationError, OnError } from './../../../interface/ApiData';
import type { GetSitterProfileParams, SitterProfile } from '../../../interface/Profile';
import { useEffect, useState, useCallback, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { getSitterProfiles } from '../../../helpers/APICalls/profile';
import wait from '../../../helpers/wait';
import { useSnackBar } from '../../../context/useSnackbarContext';

interface Options extends Omit<GetSitterProfileParams, 'page'> {
  delay?: number;
  loadOnMount?: boolean;
}

interface ProfileCardItem {
  id: string;
  loading: boolean;
  sitter: SitterProfile | null;
}

type OnSuccess<R> = (profiles: ProfileCardItem[]) => R;
type MatchProfiles = <R>(onError: OnError<R>, onSuccess: OnSuccess<R>) => R;

const useSitterProfiles = (
  { delay = 500, loadOnMount = true, limit = 6, ...initialParams }: Options = { delay: 50000, limit: 6 },
) => {
  const [error, setError] = useState<ValidationError[] | RequestError | null>(null);
  const [profiles, setProfiles] = useState<ProfileCardItem[]>([]);
  const { updateSnackBarMessage } = useSnackBar();
  const isLoading = useRef<boolean>(loadOnMount);
  const firstLoad = useRef<boolean>(true);
  const page = useRef<number>(1);

  const setLoadingProfiles = useCallback(
    (value: boolean, data: SitterProfile[] | null = null) => {
      if (value) {
        isLoading.current = value;
        setProfiles((profiles) => [
          ...profiles,
          ...Array(limit)
            .fill(0)
            .map(() => ({ id: uuid(), loading: true, sitter: null })),
        ]);
      } else if (data) {
        isLoading.current = value;
        setProfiles((profiles) => {
          const newProfiles = [...profiles];
          data.forEach((sitter, index) => {
            const data = newProfiles[newProfiles.length - limit + index];
            data.sitter = sitter;
            data.loading = false;
          });
          return newProfiles.filter(({ loading }) => !loading);
        });
      }
    },
    [limit],
  );

  const fetchProfiles = useCallback(async () => {
    setLoadingProfiles(true);
    try {
      const res = await getSitterProfiles({ limit, page: page.current, ...initialParams });
      if (res.error) setError(res.error);
      if (res.errors) setError(res.errors);
      wait(() => setLoadingProfiles(false, res?.success?.profiles), delay);
    } catch (err) {
      if (err instanceof Error) {
        return updateSnackBarMessage(err.message);
      }
      return updateSnackBarMessage('Something went wrong when trying to retrieve profiles.');
    }
  }, [limit, page, initialParams, setLoadingProfiles, delay, updateSnackBarMessage]);

  useEffect(() => {
    if (firstLoad.current && loadOnMount) {
      fetchProfiles();
      firstLoad.current = false;
    }
  }, [fetchProfiles, loadOnMount]);

  const matchProfiles: MatchProfiles = useCallback(
    (onError, onSuccess) => {
      if (error) return onError(error);
      // if (profiles.length) return onSuccess(profiles);
      return onSuccess(profiles);
    },
    [error, profiles],
  );

  const loadMore = useCallback(() => {
    if (!isLoading.current) {
      page.current++;
      fetchProfiles();
    }
  }, [isLoading, fetchProfiles]);

  return { loadMore, matchProfiles, isLoading: isLoading.current } as const;
};

export default useSitterProfiles;
