import { Box, Skeleton, Stack, Typography } from '@mui/material';

// Will use notifyType later when we need to style notifications differently based on their type.
const UnreadNotificationSkeleton = () => {
  return (
    <Stack direction="row" spacing={2}>
      <Skeleton variant="rectangular" height={54} width={54} animation="wave" />
      <Stack maxHeight={54} maxWidth={396} overflow="hidden" spacing={0.5}>
        <Box>
          <Typography
            m={0}
            lineHeight="1rem"
            variant="h6"
            sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
            width={250}
          >
            <Skeleton animation="wave" />
          </Typography>
          <Typography paragraph width={75} marginBottom={0} color="GrayText" variant="caption">
            <Skeleton animation="wave" />
          </Typography>
        </Box>
        <Typography paragraph width={125} variant="body2" fontWeight={500}>
          <Skeleton animation="wave" />
        </Typography>
      </Stack>
    </Stack>
  );
};

export default UnreadNotificationSkeleton;
