import type { Fetcher, ValidationError, RequestError, OnSuccess, OnError, OnLoading } from '../../../interface/ApiData';
import type { GetNotificationsData } from '../../../interface/Notification';
import { useContext, createContext, useEffect, ReactElement, useCallback, useRef, ReactNode } from 'react';
import { useRequest } from '../../../hooks';

interface NotificationsContext {
  isLoading: boolean;
  data: GetNotificationsData | null;
  error: ValidationError[] | RequestError | null;
  loadNotifications: () => void;
  matchNotifications: (
    onLoading: OnLoading<any>,
    onError: OnError<any>,
    onSuccess: OnSuccess<GetNotificationsData, any>,
  ) => any;
}

export const NotificationsContext = createContext<NotificationsContext>({
  isLoading: false,
  data: null,
  error: null,
  loadNotifications: () => {
    return null;
  },
  matchNotifications: () => {
    return null;
  },
});

interface Props {
  children: ReactNode;
  fetcher: Fetcher<GetNotificationsData>;
  loadOnMount?: boolean;
  delay?: number;
}

export const NotificationsProvider = ({ children, fetcher, loadOnMount, delay }: Props): ReactElement => {
  const { data, error, isLoading, makeRequest, matchRequest } = useRequest<GetNotificationsData>(delay || 0);
  const loaded = useRef(false);

  useEffect(() => {
    if (loadOnMount && !loaded.current) {
      const controller = new AbortController();
      makeRequest(() => fetcher(controller));
      loaded.current = true;
      return () => controller.abort();
    }
  }, [loadOnMount, makeRequest, fetcher]);

  const loadNotifications = useCallback(() => makeRequest(() => fetcher()), [makeRequest, fetcher]);

  return (
    <NotificationsContext.Provider
      value={{ isLoading, data, error, loadNotifications, matchNotifications: matchRequest }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const NotificationsConsumer = NotificationsContext.Consumer;
export const useNotifications = (): NotificationsContext => useContext(NotificationsContext);
