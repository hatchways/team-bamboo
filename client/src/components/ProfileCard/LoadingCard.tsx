import type { Profile } from '../../interface/Profile';
import { FunctionComponent } from 'react';
import {
  Stack,
  Card,
  CardContent,
  CardActionArea,
  Avatar,
  Typography,
  Rating,
  styled,
  Divider,
  Box,
  Skeleton,
} from '@mui/material';
import { LocationOn, Star } from '@mui/icons-material';

const StyledCard = styled(Card)(() => ({
  boxShadow: '4px 4px 13px 7px rgba(217,217,217,0.26)',
}));

const Title = styled(Typography)(({ theme }) => ({
  ...theme.typography.h5,
  textAlign: 'center',
  fontWeight: 600,
}));

const Status = styled(Typography)(({ theme }) => ({
  ...theme.typography.caption,
  textAlign: 'center',
  fontSize: 14,
  fontWeight: 500,
  color: theme.palette.grey[500],
}));

const Description = styled(Typography)(({ theme }) => ({
  ...theme.typography.body1,
  textAlign: 'center',
  fontSize: 16,
  fontWeight: 400,
}));

const Location = styled(Typography)(({ theme }) => ({
  ...theme.typography.body1,
  color: theme.palette.grey[500],
}));

const ProfileCard: FunctionComponent = () => {
  return (
    <StyledCard variant="elevation">
      <CardActionArea component="div" disableRipple disabled>
        <CardContent sx={{ p: 0 }}>
          <Stack alignItems="center" gap={1} p={2} pt={4}>
            <Skeleton variant="circular" sx={{ width: 104, height: 104 }} animation="wave" />
            <Stack alignItems="center" width="100%">
              <Skeleton variant="text" animation="wave" sx={{ width: '100%' }}>
                <Title>Loading Profile Name</Title>
              </Skeleton>
              <Skeleton variant="text" animation="wave">
                <Status>Loading Job Title</Status>
              </Skeleton>
              <Rating
                name="rating"
                readOnly
                value={0}
                size="small"
                emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
              />
            </Stack>
            <Skeleton variant="text" animation="wave">
              <Description variant="body1" fontSize={14}>
                Loading the all knowing description
              </Description>
            </Skeleton>
          </Stack>
          <Box pt={3}>
            <Divider />
            <Stack direction="row" alignItems="center" p={3}>
              <Stack direction="row" spacing={0.5} sx={{ width: '100%' }}>
                <LocationOn color="primary" />
                <Skeleton variant="text" animation="wave">
                  <Location>Loading location</Location>
                </Skeleton>
              </Stack>
              <Skeleton variant="text" animation="wave">
                <Typography fontWeight="bold" variant="h6">
                  rate
                </Typography>
              </Skeleton>
            </Stack>
          </Box>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default ProfileCard;
