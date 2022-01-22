import {
  Stack,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  Box,
  Avatar,
  Typography,
  Rating,
  styled,
  Divider,
} from '@mui/material';
import { LocationOn } from '@mui/icons-material';
import { useStyles } from './hooks';

const ProfileAvatar = styled(Avatar)(() => ({
  width: 104,
  height: 104,
}));

const StyledCard = styled(Card)(() => ({
  boxShadow: '4px 4px 13px 7px rgba(217,217,217,0.26)',
}));

const ProfileCard = () => {
  const classes = useStyles();
  return (
    <StyledCard variant="elevation" className={classes.root}>
      <CardContent>
        <Stack alignItems="center">
          <ProfileAvatar src="https://robohash.org/hello-world" />
          <Typography>Norma Byers</Typography>
          <Typography>Loving pet sitter</Typography>
          <Rating name="rating" readOnly value={3} />
          <Typography>Dog sitting, cat sitting, pocket pet and bird care</Typography>
        </Stack>
      </CardContent>
      <CardActionArea>
        <Divider />
        <Stack direction="row" justifyContent="space-between" alignItems="center" p={3}>
          <Typography>
            <LocationOn color="primary" />
            <Typography component="span">Toronto, Ontario</Typography>
          </Typography>
          <Typography>$14/hr</Typography>
        </Stack>
      </CardActionArea>
    </StyledCard>
  );
};

export default ProfileCard;
