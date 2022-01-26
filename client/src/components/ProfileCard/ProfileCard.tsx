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
} from '@mui/material';
import { LocationOn, Star } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 104,
  height: 104,
  background: theme.palette.grey[300],
}));

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

interface Props extends Omit<Profile, 'userId' | 'isSitter' | 'gender' | 'telephone' | 'birthday' | 'uploadedImages'> {
  hourlyRate: number;
}

const ProfileCard: FunctionComponent<Props> = (profile) => {
  return (
    <StyledCard variant="elevation">
      <CardActionArea component={Link} to={`profile-details/${profile.id}`} disableRipple>
        <CardContent sx={{ p: 0 }}>
          <Stack alignItems="center" gap={1} p={2} pt={4}>
            <ProfileAvatar src={profile.photo || `https://robohash.org/${profile.id}`} />
            <Stack alignItems="center">
              <Title>{profile?.name || 'No Name'}</Title>
              <Status>{profile?.jobTitle || 'Unknown'}</Status>
              <Rating
                name="rating"
                readOnly
                value={profile?.averageRating || 0}
                size="small"
                emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
              />
            </Stack>
            <Description variant="body1" fontSize={14}>
              {profile?.description || 'No description provided'}
            </Description>
          </Stack>
          <Box pt={3}>
            <Divider />
            <Stack direction="row" justifyContent="space-between" alignItems="center" p={3}>
              <Stack direction="row" spacing={0.5}>
                <LocationOn color="primary" />
                <Location>{profile?.address || 'No location'}</Location>
              </Stack>
              <Typography fontWeight="bold" variant="h6">
                ${profile.hourlyRate}/hr
              </Typography>
            </Stack>
          </Box>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default ProfileCard;
