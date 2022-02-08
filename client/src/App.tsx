import './App.css';
import './index.css';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Home/Home';
import ProfileListings from './pages/ProfileListings/ProfileListings';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Navbar } from './components/Navbar/Navbar';
import Settings from './pages/Settings/Settings';
import NotFound from './pages/NotFound/NotFound';
import Bookings from './pages/Bookings/Bookings';
import Profile from './pages/Profile/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { BookingsProvider } from './context/useBookingsContext';
import ConfirmPayment from './pages/ConfirmPayment/ConfirmPayment';
import TransactionResult from './pages/TransactionResult/TransactionResult';

const unAuthUserRoutes = ['/', '/login', '/signup', '/listings'];

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <BookingsProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <SnackBarProvider>
              <AuthProvider unAuthUserRoutes={unAuthUserRoutes}>
                <SocketProvider>
                  <CssBaseline />
                  <Navbar />
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/profile" component={Profile} />
                    <ProtectedRoute exact path="/transactionResult" component={TransactionResult} />
                    <ProtectedRoute exact path="/bookings/:id/confirm" component={ConfirmPayment} />
                    <ProtectedRoute exact path="/bookings" component={Bookings} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/listings" component={ProfileListings} />
                    <Route path="/profile/settings" component={Settings} />
                    <Route exact path="/profile/:id" component={Profile} />
                    <Route path="*">
                      <NotFound />
                    </Route>
                  </Switch>
                </SocketProvider>
              </AuthProvider>
            </SnackBarProvider>
          </LocalizationProvider>
        </BookingsProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
