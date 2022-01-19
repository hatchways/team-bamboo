import { useContext, createContext, ReactElement, useState, FunctionComponent, MouseEvent } from 'react';
import { NotificationsProvider } from '../../../context/useNotificationContext';

interface UnreadNotificationsPopperContext {
  anchorEl: HTMLElement | null;
  isOpen: boolean;
  toggleOpen: <E extends { currentTarget: HTMLElement }>(event: E) => void;
  onOpen: <E extends { currentTarget: HTMLElement }>(event: E) => void;
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

  const toggleOpen = <E extends { currentTarget: HTMLElement }>(event: E) => {
    setAnchorEl(event.currentTarget);
    setIsOpen((prev) => !prev);
  };

  const onOpen = <E extends { currentTarget: HTMLElement }>(event: E) => {
    setAnchorEl(event.currentTarget);
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
