import { useContext, createContext, ReactElement, useState, FunctionComponent, MouseEvent } from 'react';
import { NotificationsProvider } from '../../../context/useNotificationContext';

interface UnreadNotificationsPopperContext {
  anchorEl: HTMLElement | null;
  isOpen: boolean;
  toggleOpen: (event: MouseEvent<HTMLElement>) => void;
  onOpen: (event: MouseEvent<HTMLElement>) => void;
  onClose: () => void;
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
    <UnreadNotificationsPopperContext.Provider value={{ anchorEl, isOpen, toggleOpen, onOpen, onClose }}>
      <NotificationsProvider loadOnMount read={false} delay={500}>
        {children}
      </NotificationsProvider>
    </UnreadNotificationsPopperContext.Provider>
  );
};

export const useUnreadNotificationsPopper = (): UnreadNotificationsPopperContext =>
  useContext(UnreadNotificationsPopperContext);
