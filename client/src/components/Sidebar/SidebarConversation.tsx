import type { Conversation } from '../../interface/Conversation';
import { Stack, Avatar, Badge, Button, Typography, styled, BadgeUnstyled, CardActionArea } from '@mui/material';
import moment from 'moment';
import { useActiveConversation } from '../../context/useActiveConversationContext';

const getFormattedMessageTime = (time: string) => {
  const now = moment(Date.now()),
    sent = moment(time),
    dayDiff = sent.diff(now, 'days'),
    weekDiff = sent.diff(now, 'weeks');

  if (!dayDiff) return sent.format('h:mm A');
  if (dayDiff === 1) return 'Yesterday';
  if (!weekDiff) return sent.format('dddd');
  return sent.format('DD/MM/YYYY');
};

const DetailText = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.grey[400],
}));

const ConversationBox = styled(Stack)(({ theme }) => ({
  ...theme.components?.MuiStack,
  padding: theme.spacing(3, 4),
  alignItems: 'center',
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
}));

const AvatarPic = styled(Avatar)(({ theme }) => ({
  width: 54,
  height: 54,
  background: theme.palette.grey[200],
}));

const AvatarBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    border: '2px solid #FFF',
    minWidth: 15,
    minHeight: 15,
    borderRadius: '50%',
  },
}));

interface Props extends Conversation {
  isOnline: boolean;
}

const SidebarConversation = ({ id, lastMessage, otherUser, isOnline = false }: Props) => {
  const { updateActiveConversation } = useActiveConversation();

  return (
    <CardActionArea onClick={() => updateActiveConversation(id)}>
      <ConversationBox direction="row" spacing={2} p={4} alignItems="center">
        <AvatarBadge
          color="success"
          invisible={isOnline}
          variant="dot"
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <AvatarPic
            src={otherUser.photo || `https://robohash.org/${otherUser.id}.png`}
            alt={otherUser.name}
            variant="circular"
            sx={{ width: 54, height: 54 }}
          />
        </AvatarBadge>
        <Stack maxWidth={300} width="100%">
          <Typography variant="h6" noWrap>
            {otherUser.name}
          </Typography>
          <DetailText noWrap>{lastMessage?.content || ''}</DetailText>
        </Stack>
        <Stack>
          <DetailText textAlign="right">{lastMessage ? getFormattedMessageTime(lastMessage.createdAt) : ''}</DetailText>
        </Stack>
      </ConversationBox>
    </CardActionArea>
  );
};

export default SidebarConversation;
