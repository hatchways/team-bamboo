import { useState, useContext, createContext, FunctionComponent, useCallback, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './useAuthContext';

interface ISocketContext {
  socket: Socket | undefined;
  initSocket: () => void;
  disconnectSocket: () => void;
}

export const SocketContext = createContext<ISocketContext>({
  socket: undefined,
  initSocket: () => null,
  disconnectSocket: () => null,
});

export const SocketProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const { loggedInUser } = useAuth();

  const initSocket = useCallback(() => {
    if (!socket) {
      setSocket(
        io('/', {
          withCredentials: true,
        }),
      );
    }
  }, [socket]);

  const disconnectSocket = useCallback(() => {
    if (socket) {
      socket.disconnect();
      setSocket(undefined);
    }
  }, [socket]);

  useEffect(() => {
    if (loggedInUser) {
      initSocket();
    } else if (!loggedInUser) {
      disconnectSocket();
    }
  }, [initSocket, disconnectSocket, loggedInUser]);

  return <SocketContext.Provider value={{ socket, initSocket, disconnectSocket }}>{children}</SocketContext.Provider>;
};

export function useSocket(): ISocketContext {
  return useContext(SocketContext);
}
