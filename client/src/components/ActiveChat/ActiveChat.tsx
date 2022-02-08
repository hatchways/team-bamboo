import { useActiveConversation } from '../../context/useActiveConversationContext';
import { Stack, Box } from '@mui/material';
import ActiveChatHeader from './ActiveChatHeader';
import ActiveChatMessages from './ActiveChatMessages';
import MessageInput from './MessageInput';

const ActiveChat = () => {
  const { activeConversation } = useActiveConversation();

  return (
    <Stack width="100%" height="100vh">
      {activeConversation && (
        <>
          <ActiveChatHeader {...activeConversation.otherUser} />
          <Box width="100%" sx={{ overflowY: 'hidden', flex: '1 1 auto' }}>
            <ActiveChatMessages activeId={activeConversation.id} />
          </Box>
          <MessageInput {...activeConversation} />
        </>
      )}
    </Stack>
  );
};

export default ActiveChat;
