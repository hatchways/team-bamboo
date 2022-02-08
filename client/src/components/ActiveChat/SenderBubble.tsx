import type { Message } from '../../interface/Message';
import { Stack, Typography } from '@mui/material';
import { useEffect, MutableRefObject } from 'react';

interface Props extends Message {
  bubbleRef?: MutableRefObject<HTMLDivElement | null>;
}
const SenderBubble = ({ content, bubbleRef }: Props) => {
  useEffect(() => {
    if (bubbleRef) {
      bubbleRef.current?.scrollIntoView();
    }
  }, [bubbleRef]);

  return (
    <Stack width="100%" alignItems="center" justifyContent="flex-end" direction="row" pr={6}>
      <Stack maxWidth="50%" boxShadow="4px 4px 13px 7px rgba(217,217,217,0.26)" p={2} borderRadius={6} ref={bubbleRef}>
        <Typography variant="h6">{content}</Typography>
      </Stack>
    </Stack>
  );
};

export default SenderBubble;
