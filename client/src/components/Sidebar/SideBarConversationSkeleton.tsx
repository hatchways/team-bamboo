import { Stack, Skeleton, Box, Typography, styled } from '@mui/material';

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

const SideBarConversationSkeleton = () => {
  return (
    <ConversationBox direction="row" spacing={2} p={4} alignItems="center" borderBottom="1px solid grey">
      <Skeleton animation="wave" sx={{ width: 60, height: 70, borderRadius: '50%' }} />
      <Stack width="100%">
        <Skeleton variant="text" animation="wave" width="100%">
          <Typography variant="h6">Robot 2.0</Typography>
        </Skeleton>
        <Skeleton variant="text" animation="wave" width="100%">
          <DetailText>Last message</DetailText>
        </Skeleton>
      </Stack>
      <Stack alignItems="flex-end">
        <Skeleton variant="text" animation="wave">
          <DetailText textAlign="right">24:59</DetailText>
        </Skeleton>
        <Skeleton variant="text" animation="wave">
          <DetailText textAlign="right">AM</DetailText>
        </Skeleton>
      </Stack>
    </ConversationBox>
  );
};

export default SideBarConversationSkeleton;
