import { useContext, createContext, useState, ReactElement, FunctionComponent, useCallback } from 'react';
import { AccountType } from '../../../types/AccountType';
import login from '../../../helpers/APICalls/login';
import register from '../../../helpers/APICalls/register';
import { useAuth } from '../../../context/useAuthContext';

export type AccountTypeKeys = keyof typeof AccountType;

interface IDevModeStaticContext {
  mode: 'development' | 'production' | 'test';
  isDev: boolean;
}

interface IDevModeContext {
  loginAsDemoUser: (accountType: AccountTypeKeys, delay: number) => void;
  isLoading: boolean;
}

const staticIntialContext: IDevModeStaticContext = {
  mode: process.env.NODE_ENV,
  isDev: process.env.NODE_ENV === 'development',
};

export const DevModeContext = createContext<IDevModeContext & IDevModeStaticContext>({
  ...staticIntialContext,
  loginAsDemoUser: () => null,
  isLoading: false,
});

const TEST_NAME = 'Demo User';
const TEST_EMAIL = 'demo_user@gmail.com';
const TEST_PASSWORD = 'gI!w4goypBHF^OnXy$1E';

const wait = (fn: () => void, delay = 300) => new Promise((resolve) => setTimeout(() => resolve(fn()), delay));

// Utility context for development mode, in case we need to login as a different type of user or implement functions to switch account view.

export const DevModeProvider: FunctionComponent = ({ children }): ReactElement => {
  const { updateLoginContext } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const loginAsDemoUser = useCallback(
    (accountType: AccountTypeKeys, delay = 300) => {
      if (staticIntialContext.isDev) {
        setIsLoading(true);
        register(TEST_NAME, TEST_EMAIL, TEST_PASSWORD)
          .then((data) => (data.success ? data : login(TEST_EMAIL, TEST_PASSWORD)))
          .then(async (data) => {
            await wait(() => setIsLoading(false), delay);
            return data;
          })
          .then((data) => (data.success ? updateLoginContext(data.success) : null));
      }
    },
    [updateLoginContext],
  );

  return (
    <DevModeContext.Provider value={{ ...staticIntialContext, isLoading, loginAsDemoUser }}>
      {children}
    </DevModeContext.Provider>
  );
};

export const DevModeConsumer = DevModeContext.Consumer;
export const useDevMode = (): IDevModeContext => useContext(DevModeContext);
