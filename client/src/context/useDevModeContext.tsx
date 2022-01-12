import { useContext, createContext, ReactElement, FunctionComponent, useCallback } from 'react';
import { AccountType } from '../types/AccountType';
import { useHistory } from 'react-router-dom';
import login from '../helpers/APICalls/login';
import register from '../helpers/APICalls/register';

type AccountTypeKeys = keyof typeof AccountType;

interface IDevModeStaticContext {
  mode: 'development' | 'production' | 'test';
  isDev: boolean;
}

interface IDevModeContext {
  loginAsDemoUser: (accountType: AccountTypeKeys | undefined) => void;
}

const staticIntialContext: IDevModeStaticContext = {
  mode: process.env.NODE_ENV,
  isDev: process.env.NODE_ENV === 'development',
};

export const DevModeContext = createContext<IDevModeContext & IDevModeStaticContext>({
  ...staticIntialContext,
  loginAsDemoUser: () => null,
});

const TEST_NAME = 'Demo User';
const TEST_EMAIL = 'demo_user@gmail.com';
const TEST_PASSWORD = 'gI!w4goypBHF^OnXy$1E';

// Utility context for development mode, in case we need to login as a different type of user or implement functions to switch account view.

export const DevModeProvider: FunctionComponent = ({ children }): ReactElement => {
  const history = useHistory();

  const loginAsDemoUser = useCallback(
    () =>
      !staticIntialContext.isDev
        ? null
        : register(TEST_NAME, TEST_EMAIL, TEST_PASSWORD)
            .catch(() => login(TEST_EMAIL, TEST_PASSWORD))
            .finally(() => history.push('/dashboard')),
    [history],
  );

  return (
    <DevModeContext.Provider value={{ ...staticIntialContext, loginAsDemoUser }}>{children}</DevModeContext.Provider>
  );
};

export const useDevMode = (): IDevModeContext => useContext(DevModeContext);
