import type { ValidationError, RequestError, OnSuccess, OnError, OnLoading } from '../interface/ApiData';
import type { GetNotificationsData } from '../interface/Notification';
import { useContext, createContext, useEffect, ReactElement, useCallback, useRef, ReactNode } from 'react';
import { useRequest } from '../hooks';
import { getNotifications } from '../helpers/APICalls/notifications';

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
  read?: boolean;
  limit?: number;
  page?: number;
  sortBy?: keyof Notification;
  order?: 'asc' | 'desc';
  loadOnMount?: boolean;
  delay?: number;
}

export const NotificationsProvider = ({ children, loadOnMount, delay, ...params }: Props): ReactElement => {
  const { data, error, isLoading, makeRequest, matchRequest } = useRequest<GetNotificationsData>(delay || 0);
  const loaded = useRef(false);

  const loadNotifications = useCallback(() => makeRequest(() => getNotifications(params)), [makeRequest, params]);

  useEffect(() => {
    if (loadOnMount && !loaded.current) {
      loadNotifications();
      loaded.current = true;
    }
  }, [loadNotifications, loadOnMount]);

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
