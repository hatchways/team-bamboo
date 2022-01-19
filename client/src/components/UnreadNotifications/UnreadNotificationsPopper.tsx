import { Stack, Paper, Popper, styled, Box, Fade } from '@mui/material';
import UnreadNotificationSkeleton from './UnreadNotificationSkeleton';
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
    top: -10,
    transform: 'rotate(45deg)',
    left: 'calc(50% - 6px)',
    zIndex: -1,
  },
});

const UnreadNotificationsPopper = () => {
  const { matchNotifications, loadNotifications } = useNotifications();
  const { anchorEl, isOpen } = useUnreadNotificationsPopper();

  return (
    <>
      <button onClick={loadNotifications} ref={anchorEl}>
        Notifications
      </button>
      <Popper open={true} anchorEl={anchorEl.current} placement="bottom" transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper elevation={12} sx={{ overflowY: 'hidden' }}>
              {/* Figure out the arrow */}
              <Arrow />
              <Stack
                spacing={3}
                p={3}
                bgcolor="white"
                width="min-content"
                minWidth={400}
                maxHeight={200}
                sx={{ overflowY: 'auto' }}
              >
                {matchNotifications(
                  () => (
                    <>
                      <UnreadNotificationSkeleton />
                      <UnreadNotificationSkeleton />
                      <UnreadNotificationSkeleton />
                    </>
                  ),
                  (error) => {
                    console.log(error);
                    return <p>An error occurred</p>;
                  },
                  (data) => (
                    <></>
                  ),
                )}
              </Stack>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default UnreadNotificationsPopper;
