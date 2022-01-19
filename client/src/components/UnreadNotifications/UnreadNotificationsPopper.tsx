import type { ValidationError, RequestError } from '../../interface/ApiData';
import type { MouseEvent, ReactElement } from 'react';
import { Stack, Paper, Popper, Box, Typography, ClickAwayListener, styled, Fade } from '@mui/material';
import UnreadNotificationSkeleton from './UnreadNotificationSkeleton';
import UnreadNotificationItem from './UnreadNotificationItem';
import { useNotifications } from '../../context/useNotificationContext';
import { useUnreadNotificationsPopper } from './context/useNotificationPopperContext';

const Arrow = styled(Box)({
  position: 'relative',
  mt: '10px',
  width: '100%',
  height: 4,
  background: 'black',
  '&::before': {
    backgroundColor: 'black',
    content: '""',
    display: 'block',
    position: 'absolute',
    width: 12,
    height: 12,
    top: -6,
    transform: 'rotate(45deg)',
    left: 'calc(50% - 6px)',
    zIndex: -1,
  },
});

const StyledStack = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(3),
  background: theme.palette.background.default,
  minWidth: 400,
  maxHeight: 200,
  overflowY: 'auto',
}));

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
  const { matchNotifications } = useNotifications();
  const { anchorEl, onClose, isOpen } = useUnreadNotificationsPopper();

  return (
    <ClickAwayListener onClickAway={onClose}>
      <Popper open={isOpen} anchorEl={anchorEl} placement="bottom" transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper elevation={12}>
              <Arrow />
              <Box sx={{ overflowY: 'hidden' }}>
                <StyledStack spacing={3}>
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
                </StyledStack>
              </Box>
            </Paper>
          </Fade>
        )}
      </Popper>
    </ClickAwayListener>
  );
};

export default UnreadNotificationsPopper;
