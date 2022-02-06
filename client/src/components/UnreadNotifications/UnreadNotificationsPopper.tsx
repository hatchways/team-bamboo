import { ReactElement, useEffect } from 'react';
import { Stack, Popper, Box, Typography, ClickAwayListener, Fade } from '@mui/material';
import UnreadNotificationSkeleton from './UnreadNotificationSkeleton';
import UnreadNotificationItem from './UnreadNotificationItem';
import { useNotifications } from '../../context/useNotificationContext';
import { useUnreadNotificationsPopper } from './context/useNotificationPopperContext';
import { useStyles } from './hook/useStyles';
import { useSocket } from '../../context/useSocketContext';

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
  const { matchNotifications, loadNotifications } = useNotifications();
  const { anchorEl, isOpen, onClose } = useUnreadNotificationsPopper();
  const { socket } = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on('new-notification', loadNotifications);
      socket.on('mark-notification-read', loadNotifications);
      return () => {
        socket.off('new-notification');
        socket.off('mark-notification-read');
      };
    }
  }, [socket, loadNotifications]);

  return (
    <Popper open={isOpen} anchorEl={anchorEl} placement="bottom" transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Box>
            <ClickAwayListener onClickAway={onClose}>
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
                          data.notifications.map(({ id, notifyType, receivers, ...notification }) => {
                            return <UnreadNotificationItem key={id} to={'#notification'} {...notification} />;
                          })
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
