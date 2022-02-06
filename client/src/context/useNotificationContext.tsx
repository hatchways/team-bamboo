import type { ValidationError, RequestError, OnSuccess, OnError, OnLoading } from '../interface/ApiData';
import type { GetNotificationsData } from '../interface/Notification';
import { useContext, createContext, useEffect, ReactElement, useCallback, useRef, ReactNode } from 'react';
import { useFetchRequest } from '../hooks';
import { getNotifications } from '../helpers/APICalls/notifications';
import { useAuth } from './useAuthContext';

interface NotificationsContext {
  isLoading: boolean;
  data: GetNotificationsData | null;
  error: ValidationError[] | RequestError | null;
  loadNotifications: () => void;
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
  const { data, error, isLoading, makeRequest, matchRequest } = useFetchRequest<GetNotificationsData>(delay || 0);
  const { loggedInUser } = useAuth();
  const loaded = useRef(false);

  const loadNotifications = useCallback(() => makeRequest(() => getNotifications(params)), [makeRequest, params]);

  useEffect(() => {
    if (loadOnMount && !loaded.current && loggedInUser) {
      loadNotifications();
      loaded.current = true;
    }
  }, [loadNotifications, loadOnMount, loggedInUser]);

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
