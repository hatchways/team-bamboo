import React from 'react';
import { Route, RouteProps, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';
import { CircularProgress } from '@mui/material';

const ProtectedRoute: React.FC<RouteProps> = ({ ...rest }) => {
  const { loggedInUser } = useAuth();
  const history = useHistory();

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  return <Route {...rest} />;
};

export default ProtectedRoute;
