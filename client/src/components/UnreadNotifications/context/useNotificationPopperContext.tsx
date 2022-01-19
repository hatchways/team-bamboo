import { useContext, createContext, ReactElement, useState, useRef, MutableRefObject, FunctionComponent } from 'react';
import { NotificationsProvider } from '../../../context/useNotificationContext';

interface UnreadNotificationsPopperContext {
  anchorEl: MutableRefObject<HTMLButtonElement | null>;
  isOpen: boolean;
  toggleOpen: () => void;
}

export const UnreadNotificationsPopperContext = createContext<UnreadNotificationsPopperContext>({
  anchorEl: { current: null },
  isOpen: false,
  toggleOpen: () => {
    return null;
  },
});

export const UnreadNotificationsPopperProvider: FunctionComponent = ({ children }): ReactElement => {
  const anchorEl = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <UnreadNotificationsPopperContext.Provider value={{ anchorEl, isOpen, toggleOpen }}>
      <NotificationsProvider loadOnMount read={false} delay={500}>
        {children}
      </NotificationsProvider>
    </UnreadNotificationsPopperContext.Provider>
  );
};

export const useUnreadNotificationsPopper = (): UnreadNotificationsPopperContext =>
  useContext(UnreadNotificationsPopperContext);
