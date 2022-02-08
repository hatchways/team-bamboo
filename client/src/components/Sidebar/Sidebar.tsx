import { Stack, Box, Typography, styled } from '@mui/material';
import { ReactElement } from 'react';
import { useActiveConversation } from '../../context/useActiveConversationContext';
import SidebarConversation from './SidebarConversation';
import SideBarConversationSkeleton from './SideBarConversationSkeleton';

const Inbox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  borderRight: `1px solid ${theme.palette.grey[200]}`,
}));

const Sidebar = () => {
  const { matchConversations } = useActiveConversation();
  return (
    <Stack
      maxHeight="100vh"
      height="100vh"
      sx={{ overflowY: 'hidden' }}
      boxShadow="4px 4px 13px 7px rgba(217,217,217,0.26)"
    >
      <Stack height="min-content" zIndex={1} sx={{ overflowY: 'auto' }}>
        <Inbox p={4}>
          <Typography variant="h4">Inbox Messages</Typography>
        </Inbox>
        {matchConversations<ReactElement | ReactElement[]>(
          () =>
            Array(20)
              .fill(0)
              .map((_, i) => <SideBarConversationSkeleton key={i} />),
          (error) =>
            !(error instanceof Array) ? <Typography>{error}</Typography> : <Typography>{error.join(', ')}</Typography>,
          (data) =>
            data.conversations.map((conversation) => (
              <SidebarConversation isOnline={true} key={conversation.id} {...conversation} />
            )),
        )}
      </Stack>
    </Stack>
  );
};

export default Sidebar;
