import type { ValidationError, RequestError, OnSuccess, OnError, OnLoading } from '../interface/ApiData';
import type { GetNotificationsData, NotificationReceiver } from '../interface/Notification';
import { useContext, createContext, useEffect, ReactElement, useCallback, useRef, ReactNode } from 'react';
import { useFetchRequest } from '../hooks';
import { getNotifications, createNotification } from '../helpers/APICalls/notifications';
import { useAuth } from './useAuthContext';
import { useSocket } from './useSocketContext';
import moment from 'moment';

interface SendNewRequestNotificationOptions {
  start: Date;
  end: Date;
  receivers: Omit<NotificationReceiver, 'read'>[];
}
type SendNewRequestNotification = (options: SendNewRequestNotificationOptions) => void;

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
  sendNewRequestNotification: SendNewRequestNotification;
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
  sendNewRequestNotification: () => null,
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
  const { loggedInUser, profile } = useAuth();
  const { socket } = useSocket();
  const loaded = useRef(false);

  const loadNotifications = useCallback(() => makeRequest(() => getNotifications(params)), [makeRequest, params]);

  const sendNewRequestNotification = useCallback<SendNewRequestNotification>(
    ({ start, end, receivers }) => {
      if (loggedInUser && profile) {
        const title = 'Dog Sitting',
          timeDiff = moment(end).diff(moment(start), 'hours'),
          hour = timeDiff > 2 ? 'hour' : 'hours',
          description = `${profile?.name || loggedInUser.name} has requested your service for ${timeDiff} ${hour}`;

        createNotification({
          title,
          description,
          receivers,
          notifyType: 'user',
        }).then((res) => {
          if (res.success && socket) {
            socket.emit('send-notification', res.success.notification.receivers);
          }
        });
      }
    },
    [profile, socket, loggedInUser],
  );

  useEffect(() => {
    if (loadOnMount && !loaded.current && loggedInUser) {
      loadNotifications();
      loaded.current = true;
    }
  }, [loadNotifications, loadOnMount, loggedInUser]);

  return (
    <NotificationsContext.Provider
      value={{
        isLoading,
        data,
        error,
        loadNotifications,
        matchNotifications: matchRequest,
        sendNewRequestNotification,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const NotificationsConsumer = NotificationsContext.Consumer;
export const useNotifications = (): NotificationsContext => useContext(NotificationsContext);
