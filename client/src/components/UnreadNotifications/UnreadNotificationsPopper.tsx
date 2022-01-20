import type { ReactElement } from 'react';
import { Stack, Popper, Box, Typography, ClickAwayListener, Fade } from '@mui/material';
import UnreadNotificationSkeleton from './UnreadNotificationSkeleton';
import UnreadNotificationItem from './UnreadNotificationItem';
import { useNotifications } from '../../context/useNotificationContext';
import { useUnreadNotificationsPopper } from './context/useNotificationPopperContext';
import { useStyles } from './hook/useStyles';

const NoNotificationsText = () => (
  <Typography
    variant="h6"
    color="GrayText"
    textAlign="center"
    width="100%"
  >{`You don't have any new notifications.`}</Typography>
);

const ErrorText = ({ children }: { children: string }) => {
  return (
    <Typography width="100%" textAlign="center" color="GrayText">
      {children}
    </Typography>
  );
};

const UnreadNotificationsPopper = () => {
  const classes = useStyles();
  const { matchNotifications } = useNotifications();
  const { anchorEl, onClose, isOpen, markNotificationsRead } = useUnreadNotificationsPopper();

  function handleClose() {
    onClose();
    markNotificationsRead();
  }

  return (
    // This is where I need to add the markRead functions or I can use a useEffect
    <Popper open={isOpen} anchorEl={anchorEl} placement="bottom" transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Box>
            <ClickAwayListener onClickAway={handleClose}>
              <Box>
                <Box className={classes.arrow} />
                <Box className={classes.popperPaper}>
                  <Stack className={classes.popper} spacing={3}>
                    {matchNotifications<ReactElement | ReactElement[]>(
                      () => (
                        <>
                          <UnreadNotificationSkeleton />
                          <UnreadNotificationSkeleton />
                          <UnreadNotificationSkeleton />
                        </>
                      ),
                      (error) =>
                        !(error instanceof Array) ? (
                          <ErrorText>{error.message}</ErrorText>
                        ) : (
                          error.map(({ msg }, index) => <ErrorText key={index}>{msg}</ErrorText>)
                        ),
                      (data) =>
                        data.notifications.length === 0 ? (
                          <NoNotificationsText />
                        ) : (
                          data.notifications.map(({ id, receivers, ...notification }) => (
                            <UnreadNotificationItem key={id} {...notification} />
                          ))
                        ),
                    )}
                  </Stack>
                </Box>
              </Box>
            </ClickAwayListener>
          </Box>
        </Fade>
      )}
    </Popper>
  );
};

export default UnreadNotificationsPopper;
