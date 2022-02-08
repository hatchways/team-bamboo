import { CircularProgress, Stack, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useActiveConversation } from '../../context/useActiveConversationContext';
import { useAuth } from '../../context/useAuthContext';
import { getMessages } from '../../helpers/APICalls/conversations';
import wait from '../../helpers/wait';
import OtherUserBubble from './OtherUserBubble';
import SenderBubble from './SenderBubble';

interface Props {
  activeId: string;
}

const ActiveChatMessages = ({ activeId }: Props) => {
  const { updateMessageHistory, messageHistory } = useActiveConversation();
  const { loggedInUser } = useAuth();
  const bubbleRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!messageHistory[activeId]) {
      const controller = new AbortController();
      setLoading(true);
      getMessages({ id: activeId }, {}, controller).then((data) => {
        if (data.success) {
          updateMessageHistory(data.success.messages);
        }
        wait(() => setLoading(false), 500);
      });
      return () => controller.abort();
    }
  }, [activeId, messageHistory, updateMessageHistory]);

  const messages = messageHistory[activeId];

  if (!messages || loading || !loggedInUser) {
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Stack height="100%" py={6} spacing={2} sx={{ overflowY: 'auto' }}>
      {messages.map((message, index) => {
        if (index + 1 === messages.length) {
          return message.sender.userId === loggedInUser.id ? (
            <SenderBubble key={message.id} bubbleRef={bubbleRef} {...message} />
          ) : (
            <OtherUserBubble key={message.id} bubbleRef={bubbleRef} {...message} />
          );
        }
        return message.sender.userId === loggedInUser.id ? (
          <SenderBubble key={message.id} {...message} />
        ) : (
          <OtherUserBubble key={message.id} {...message} />
        );
      })}
    </Stack>
  );
};

export default ActiveChatMessages;
