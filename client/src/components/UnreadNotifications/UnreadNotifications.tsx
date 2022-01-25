import type { FunctionComponent, ReactElement } from 'react';
import { UnreadNotificationsPopperProvider } from './context/useNotificationPopperContext';
import UnreadNotificationsPopper from './UnreadNotificationsPopper';

const UnreadNotifications: FunctionComponent = ({ children }): ReactElement => {
  return (
    <UnreadNotificationsPopperProvider>
      {children}
      <UnreadNotificationsPopper />
    </UnreadNotificationsPopperProvider>
  );
};

export default UnreadNotifications;
