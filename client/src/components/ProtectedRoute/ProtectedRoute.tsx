import React from 'react';
import { Route, RouteProps, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';
import { CircularProgress } from '@mui/material';

interface ProtectedRouteProps extends Omit<RouteProps, 'component'> {
  component: React.ElementType;
}

const ProtectedRoute = ({ component: Component, ...rest }: ProtectedRouteProps): JSX.Element => {
  const { loggedInUser } = useAuth();
  const history = useHistory();
  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default ProtectedRoute;
