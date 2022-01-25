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

interface Props {
  id: string;
}

const ProfileCard: FunctionComponent<Props> = ({ id }) => {
  return (
    <StyledCard variant="elevation">
      <CardActionArea component={Link} to={`profile-details/${id}`} disableRipple>
        <CardContent sx={{ p: 0 }}>
          <Stack alignItems="center" gap={1} p={2} pt={4}>
            <ProfileAvatar src="https://robohash.org/hello-world" />
            <Stack alignItems="center">
              <Title>Norma Byers</Title>
              <Status>Loving pet sitter</Status>
              <Rating
                name="rating"
                readOnly
                value={3}
                size="small"
                emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
              />
            </Stack>
            <Description variant="body1" fontSize={14}>
              Dog sitting, cat sitting, pocket pet and bird care
            </Description>
          </Stack>
          <Box pt={3}>
            <Divider />
            <Stack direction="row" justifyContent="space-between" alignItems="center" p={3}>
              <Stack direction="row" spacing={0.5}>
                <LocationOn color="primary" />
                <Location>Toronto, Ontario</Location>
              </Stack>
              <Typography fontWeight="bold" variant="h6">
                $14/hr
              </Typography>
            </Stack>
          </Box>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default ProfileCard;
