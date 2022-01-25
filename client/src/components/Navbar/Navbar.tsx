import { FinalCheck, MenuItemData } from './interface/Navbar';
import React, { useState, useMemo } from 'react';
import clsx from 'clsx';
import { useAuth } from '../../context/useAuthContext';
import {
  Button,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem as DropdownMenuItem,
  styled,
} from '@mui/material';
import { AccountType } from '../../types/AccountType';

import lovingSitterLogo from '../../images/logo.svg';
import { useStyles } from './useStyles';
import { NavLink, useLocation } from 'react-router-dom';
import { Settings, Logout, Person } from '@mui/icons-material';
import { checkProfile } from './utils';

const NavbarButton = styled(Button)({
  padding: '15px 0',
});

const menuItems: MenuItemData[] = [
  {
    item: 'Become a Sitter',
    resource: '/dashboard',
    canView: [AccountType.PET_OWNER],
    authenticated: true,
  },
  {
    item: 'Become a sitter',
    resource: '/signup?accountType=pet_sitter',
    canView: null,
    authenticated: false,
  },
  {
    item: <UnreadNotificationsBtn>Notifications</UnreadNotificationsBtn>,
    canView: [AccountType.PET_SITTER, AccountType.PET_OWNER],
    authenticated: true,
  },
  {
    item: 'My Jobs',
    resource: '/my-jobs',
    canView: [AccountType.PET_SITTER],
    authenticated: true,
  },
  {
    item: 'My Sitters',
    resource: '/sitters',
    canView: [AccountType.PET_OWNER],
    authenticated: true,
  },
  {
    item: 'Messages',
    resource: '/messages',
    canView: [AccountType.PET_SITTER, AccountType.PET_OWNER],
    authenticated: true,
  },
  {
    item: (
      <NavbarButton variant="outlined" size="large" fullWidth>
        Login
      </NavbarButton>
    ),
    resource: '/login',
    canView: null,
    authenticated: false,
  },
  {
    item: (
      <NavbarButton variant="contained" size="large" fullWidth disableElevation>
        Sign up
      </NavbarButton>
    ),
    resource: '/signup',
    canView: null,
    authenticated: false,
  },
];

const MenuItem: React.FC<{
  resource?: string;
  item: string | JSX.Element;
  index: number;
}> = ({ resource, item, index }) => {
  const classes = useStyles();

  return (
    <Grid key={resource} sx={{ textAlign: 'center' }} xs={2} justifySelf="flex-end" item>
      {resource && (
        <NavLink className={classes.navbarItem} to={resource}>
          {item}
        </NavLink>
      )}
      {!resource && item}
    </Grid>
  );
};

const Navbar: React.FC = () => {
  const location = useLocation();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { loggedInUser, logout, profile } = useAuth();
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };
  const checkCanView = useMemo<FinalCheck>(() => checkProfile(profile, loggedInUser), [loggedInUser, profile]);

  const renderMenuItems = () =>
    menuItems.map((menu, index) => {
      if (checkCanView(menu.canView, menu.authenticated)) {
        return <MenuItem key={menu?.resource || index} {...menu} />;
      }
      return null;
    });

  return (
    <UnreadNotifications>
      <Grid
        className={clsx(classes.navbar, location.pathname === '/' && classes.transparentNavbar)}
        justifyContent="space-between"
        alignItems="center"
        container
      >
        <Grid xs={4} md={6} item>
          <img className={classes.navbarLogo} alt="Love Sitter logo" src={lovingSitterLogo} />
        </Grid>
        <Grid xs={8} md={6} item>
          <Grid container alignItems="center" gap={2} justifyContent="flex-end">
            {renderMenuItems()}
            {loggedInUser && (
              <Grid xs={2} item>
                <>
                  <IconButton
                    size="large"
                    aria-label="account profile picture"
                    aria-controls="menu-navbar"
                    arais-haspopup="true"
                    onClick={handleMenuOpen}
                    color="inherit"
                  >
                    <img style={{ width: 50 }} src={`https://robohash.org/${loggedInUser.email}`} />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <DropdownMenuItem component={NavLink} to="/profile/settings" onClick={handleClose}>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Settings</ListItemText>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <Person fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Profile</ListItemText>
                    </DropdownMenuItem>
                    <Divider />
                    <DropdownMenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Logout</ListItemText>
                    </DropdownMenuItem>
                  </Menu>
                </>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </UnreadNotifications>
  );
};

export { Navbar };
