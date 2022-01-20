import type { ValidationError, RequestError, OnSuccess, OnError, OnLoading } from '../interface/ApiData';
import type { GetNotificationsData } from '../interface/Notification';
import { useContext, createContext, useEffect, ReactElement, useCallback, useRef, ReactNode } from 'react';
import { useRequest } from '../hooks';
import { getNotifications, markNotificationRead } from '../helpers/APICalls/notifications';

interface NotificationsContext {
  isLoading: boolean;
  data: GetNotificationsData | null;
  error: ValidationError[] | RequestError | null;
  loadNotifications: () => void;
  markNotificationsRead: () => void;
  matchNotifications: <R>(
    onLoading: OnLoading<R>,
    onError: OnError<R>,
    onSuccess: OnSuccess<GetNotificationsData, R>,
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
  markNotificationsRead: () => {
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

  const markNotificationsRead = useCallback(() => {
    if (data && data.notifications.length && !isLoading) {
      Promise.all(
        data.notifications.map(({ id }) => {
          markNotificationRead(id);
        }),
      ).then(loadNotifications);
    }
  }, [data, isLoading, loadNotifications]);

  useEffect(() => {
    if (loadOnMount && !loaded.current) {
      loadNotifications();
      loaded.current = true;
    }
  }, [loadNotifications, loadOnMount]);

  return (
    <NotificationsContext.Provider
      value={{ isLoading, data, error, loadNotifications, matchNotifications: matchRequest, markNotificationsRead }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const NotificationsConsumer = NotificationsContext.Consumer;
export const useNotifications = (): NotificationsContext => useContext(NotificationsContext);
