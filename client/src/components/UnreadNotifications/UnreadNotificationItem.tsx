import type { Notification } from '../../interface/Notification';
import { Box, Avatar, Stack, Typography, styled } from '@mui/material';
import moment from 'moment';
import { NavLink } from 'react-router-dom';

interface Props extends Omit<Notification, 'receivers' | 'id' | 'notifyType'> {
  to: string;
}

const Link = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
}));

const NotificationItem = ({ title, description, sender, createdAt, to }: Props) => {
  return (
    <Link to={to}>
      <Stack direction="row" spacing={2}>
        <Avatar
          alt={sender?.name || 'Robot'}
          src={sender?.photo || `https://robohash.org/${description}.png`}
          sx={{ width: 54, height: 54 }}
          variant="square"
        />
        <Stack maxHeight={54} maxWidth={396} overflow="hidden" spacing={0.5}>
          <Box>
            <Typography
              m={0}
              lineHeight="1rem"
              variant="h6"
              sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
            >
              {description}
            </Typography>
            <Typography color="GrayText" variant="caption">
              {title}
            </Typography>
          </Box>
          <Typography variant="body2" fontWeight={500}>
            {moment(createdAt).format('MM/DD/YYYY')}
          </Typography>
        </Stack>
      </Stack>
    </Link>
  );
};

export default NotificationItem;
