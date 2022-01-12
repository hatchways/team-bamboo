import { useContext, createContext, ReactElement, FunctionComponent, useCallback } from 'react';
import { AccountType } from '../types/AccountType';

type Keys = keyof typeof AccountType;
type Type = typeof AccountType[Keys];

interface IDevModeStaticContext {
  mode: 'development' | 'production' | 'test';
  isDev: boolean;
}

interface IDevModeContext extends IDevModeStaticContext {
  loginAsDemoUser: (accountType: Type) => void;
}

const staticIntialContext: IDevModeStaticContext = {
  mode: process.env.NODE_ENV,
  isDev: process.env.NODE_ENV === 'development',
};

export const DevModeContext = createContext<IDevModeContext>({
  ...staticIntialContext,
  loginAsDemoUser: (accountType: Type) => null,
});

// Utility context for development mode, in case we need to login as a different type of user or implement functions to switch account view.

export const DevModeProvider: FunctionComponent = ({ children }): ReactElement => {
  const loginAsDemoUser = useCallback((accountType: Type) => {
    return null;
  }, []);

  return (
    <DevModeContext.Provider value={{ ...staticIntialContext, loginAsDemoUser }}>{children}</DevModeContext.Provider>
  );
};

export const useDevMode = (): IDevModeContext => useContext(DevModeContext);
