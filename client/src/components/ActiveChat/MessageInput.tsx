import { Stack, InputBase, Button, styled } from '@mui/material';
import { FormEvent, useState, useCallback } from 'react';
import { Conversation } from '../../interface/Conversation';
import { sendMessage } from '../../helpers/APICalls/conversations';
import { useActiveConversation } from '../../context/useActiveConversationContext';
import { useSnackBar } from '../../context/useSnackbarContext';

const SendButton = styled(Button)(({ theme }) => ({
  borderRadius: 0,
  minWidth: theme.spacing(20),
  padding: theme.spacing(2, 3),
}));

const Input = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    ...theme.typography.h5,
    fontWeight: 600,
  },
  '& .MuiInputBase-input::placeholder': {
    color: theme.palette.grey[600],
  },
}));

const MessageInput = ({ otherUser, id }: Conversation) => {
  const { updateMessageHistory, updateConversationLastMessage, messageHistory } = useActiveConversation();
  const { updateSnackBarMessage } = useSnackBar();
  const [text, setText] = useState('');

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const res = await sendMessage({ id }, { content: text });
      if (res.success) {
        updateMessageHistory([...messageHistory[id], res.success.message]);
        updateConversationLastMessage(id, res.success.message);
        setText('');
      } else if (res.error) {
        updateSnackBarMessage(res.error.message);
      } else if (res.errors) {
        updateSnackBarMessage(res.errors.join(', '));
      }
    },
    [updateMessageHistory, messageHistory, id, text, updateSnackBarMessage, updateConversationLastMessage],
  );

  return (
    <Stack
      component="form"
      width="100%"
      direction="row"
      p={6}
      spacing={4}
      sx={(theme) => ({ borderTop: `1px solid ${theme.palette.grey[400]}` })}
      onSubmit={handleSubmit}
    >
      <Input
        fullWidth
        placeholder={`Reply to ${otherUser.name}`}
        value={text}
        onChange={({ target }) => setText(target.value)}
        disabled={!messageHistory[id]}
      />
      <SendButton type="submit" variant="contained" disableElevation disabled={!messageHistory[id]}>
        Send
      </SendButton>
    </Stack>
  );
};

export default MessageInput;
