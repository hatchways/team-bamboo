import { useContext, createContext, useState, ReactElement, FunctionComponent, useCallback } from 'react';
import { AccountType } from '../../../types/AccountType';
import login from '../../../helpers/APICalls/login';
import { useAuth } from '../../../context/useAuthContext';
import register from '../../../helpers/APICalls/register';

export type AccountTypeKeys = keyof typeof AccountType;

interface DevModeStaticContext {
  mode: typeof process.env.NODE_ENV;
  isDev: boolean;
}

interface DevModeContext {
  loginAsDemoUser: (accountType: AccountTypeKeys, delay: number) => void;
  isLoading: boolean;
}

const staticIntialContext: DevModeStaticContext = {
  mode: process.env.NODE_ENV,
  isDev: process.env.NODE_ENV === 'development',
};

export const DevModeContext = createContext<DevModeContext & DevModeStaticContext>({
  ...staticIntialContext,
  loginAsDemoUser: () => null,
  isLoading: false,
});

const TEST_NAME = process.env.REACT_APP_TEST_NAME;
const TEST_EMAIL = process.env.REACT_APP_TEST_EMAIL;
const TEST_PASSWORD = process.env.REACT_APP_TEST_PASSWORD;

const wait = (fn: () => void, delay = 300) => new Promise((resolve) => setTimeout(() => resolve(fn()), delay));

// Utility context for development mode, in case we need to login as a different type of user or implement functions to switch account view.

export const DevModeProvider: FunctionComponent = ({ children }): ReactElement => {
  const { updateLoginContext } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const loginAsDemoUser = useCallback(
    (accountType: AccountTypeKeys, delay = 300) => {
      if (!TEST_EMAIL || !TEST_PASSWORD || !TEST_NAME) {
        console.error('Please create a .env file containing the name, email, and password for the test account.');
        return null;
      }
      if (staticIntialContext.isDev) {
        setIsLoading(true);
        register(TEST_NAME, TEST_EMAIL, TEST_PASSWORD)
          .then((data) => (data.success ? data : login(TEST_EMAIL, TEST_PASSWORD)))
          .then(async (data) => {
            await wait(() => setIsLoading(false), delay);
            return data;
          })
          .then((data) =>
            data.success
              ? updateLoginContext(data.success)
              : console.error(
                  'Password for test user does not match test user in database. Either delete existing test user account or create a new one by updating the .env file.',
                ),
          );
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
export const useDevMode = (): DevModeContext => useContext(DevModeContext);
