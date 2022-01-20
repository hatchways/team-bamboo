import { Button, Badge, Typography, styled } from '@mui/material';
import { useUnreadNotificationsPopper } from '../UnreadNotifications/context/useNotificationPopperContext';
import { useNotifications } from '../../context/useNotificationContext';
import { FunctionComponent } from 'react';

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  padding: theme.spacing(2),
  textTransform: 'none',
}));

const UnreadNotificationsBtn: FunctionComponent = ({ children }): JSX.Element => {
  const { data } = useNotifications();
  const { onOpen } = useUnreadNotificationsPopper();

  return (
    <StyledButton onClick={onOpen} variant="text" disableElevation disableRipple>
      <Badge variant="dot" color="success" invisible={!data || !data.notifications.length}>
        <Typography fontWeight={600}>{children}</Typography>
      </Badge>
    </StyledButton>
  );
};

export default UnreadNotificationsBtn;
