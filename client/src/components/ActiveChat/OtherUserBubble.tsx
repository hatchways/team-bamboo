import type { Message } from '../../interface/Message';
import { Avatar, Stack, Box, Typography, styled } from '@mui/material';
import { MutableRefObject, useEffect } from 'react';

const AvatarPic = styled(Avatar)(({ theme }) => ({
  width: 48,
  height: 48,
  background: theme.palette.grey[200],
}));

const Bubble = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(3),
  background: theme.palette.grey[200],
}));

interface Props extends Message {
  bubbleRef?: MutableRefObject<HTMLDivElement | null>;
}

const OtherUserBubble = ({ content, sender, bubbleRef }: Props) => {
  useEffect(() => {
    if (bubbleRef) {
      bubbleRef.current?.scrollIntoView();
    }
  }, [bubbleRef]);

  return (
    <Stack width="100%" alignItems="center" justifyContent="flex-start" direction="row" pl={6}>
      <Stack maxWidth="50%" direction="row" spacing={2}>
        <AvatarPic src={sender.photo || `https://robohash.org/${sender.id}.png`} alt={sender.name} variant="circular" />
        <Bubble ref={bubbleRef}>
          <Typography variant="h6">{content}</Typography>
        </Bubble>
      </Stack>
    </Stack>
  );
};

export default OtherUserBubble;
