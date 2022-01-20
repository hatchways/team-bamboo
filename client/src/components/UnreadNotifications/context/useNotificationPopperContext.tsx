import { useContext, createContext, ReactElement, useState, FunctionComponent, MouseEvent } from 'react';
import { NotificationsProvider, NotificationsConsumer } from '../../../context/useNotificationContext';
import { markNotificationRead } from '../../../helpers/APICalls/notifications';

interface UnreadNotificationsPopperContext {
  anchorEl: HTMLElement | null;
  isOpen: boolean;
  toggleOpen: (event: MouseEvent<HTMLElement>) => void;
  onOpen: (event: MouseEvent<HTMLElement>) => void;
  onClose: () => void;
  markNotificationsRead: () => void;
}

export const UnreadNotificationsPopperContext = createContext<UnreadNotificationsPopperContext>({
  anchorEl: null,
  isOpen: false,
  toggleOpen: () => {
    return null;
  },
  onOpen: () => {
    return null;
  },
  onClose: () => {
    return null;
  },
  markNotificationsRead: () => {
    return null;
  },
});

export const UnreadNotificationsPopperProvider: FunctionComponent = ({ children }): ReactElement => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget as HTMLElement);
    setIsOpen((prev) => !prev);
  };

  const onOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget as HTMLElement);
    setIsOpen(true);
  };

  const onClose = () => setIsOpen(false);

  return (
    <NotificationsProvider loadOnMount read={false} delay={500}>
      <NotificationsConsumer>
        {({ isLoading, loadNotifications, data }) => {
          const markNotificationsRead = () => {
            if (data && data.notifications.length && !isLoading) {
              Promise.all(
                data.notifications.map(({ id }) => {
                  markNotificationRead(id);
                }),
              );
            }
          };
          return (
            <UnreadNotificationsPopperContext.Provider
              value={{
                anchorEl,
                isOpen,
                toggleOpen,
                onOpen: (event: MouseEvent<HTMLElement>) => {
                  onOpen(event);
                  markNotificationsRead();
                },
                onClose: () => {
                  onClose();
                  if (data && data.notifications.length && !isLoading) {
                    loadNotifications();
                  }
                },
                markNotificationsRead,
              }}
            >
              {children}
            </UnreadNotificationsPopperContext.Provider>
          );
        }}
      </NotificationsConsumer>
    </NotificationsProvider>
  );
};

export const useUnreadNotificationsPopper = (): UnreadNotificationsPopperContext =>
  useContext(UnreadNotificationsPopperContext);
