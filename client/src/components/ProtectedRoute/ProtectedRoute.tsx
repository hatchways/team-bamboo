import React from 'react';
import { Route, RouteProps, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';
import { CircularProgress } from '@mui/material';

const ProtectedRoute = ({ component: Component, ...rest }: RouteProps): JSX.Element => {
  const { loggedInUser } = useAuth();
  const history = useHistory();
  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser || !Component) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default ProtectedRoute;
