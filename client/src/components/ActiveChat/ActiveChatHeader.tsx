import { Stack, Avatar, Badge, Typography, IconButton, styled } from '@mui/material';
import { OtherUser } from '../../interface/Conversation';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const AvatarPic = styled(Avatar)(({ theme }) => ({
  width: 70,
  height: 70,
  background: theme.palette.grey[200],
}));

const AvatarBadge = styled(Badge)(() => ({
  '& .MuiBadge-badge': {
    border: '2px solid #FFF',
    minWidth: 20,
    minHeight: 20,
    borderRadius: '50%',
  },
}));

const ActiveChatHeader = ({ id, photo, name }: OtherUser) => {
  return (
    <Stack
      direction="row"
      width="100%"
      p={2}
      spacing={3}
      alignItems="center"
      justifyContent="space-between"
      sx={(theme) => ({
        borderBottom: `1px solid ${theme.palette.grey[200]}`,
        zIndex: '300',
        background: theme.palette.grey[50],
        flex: '0 1 auto',
      })}
    >
      <Stack direction="row" alignItems="center" spacing={3}>
        <AvatarBadge
          color="success"
          invisible={false}
          variant="dot"
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <AvatarPic src={photo || `https://robohash.org/${id}.png`} alt={name} variant="circular" />
        </AvatarBadge>
        <Typography variant="h5">{name}</Typography>
      </Stack>
      <IconButton sx={(theme) => ({ color: theme.palette.grey[500] })}>
        <MoreHorizIcon />
      </IconButton>
    </Stack>
  );
};

export default ActiveChatHeader;
