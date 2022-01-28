import { Room } from '@mui/icons-material';
import { Card, CardContent, CardMedia, Grid, Typography, Avatar } from '@mui/material';
import { Profile } from '../../interface/Profile';
import Gallery from './Gallery';

interface PropTypes {
  profile: Profile;
}

const ProfileDetailsCard = ({ profile }: PropTypes) => {
  return (
    <Card sx={{ width: '50%' }}>
      <CardMedia image={profile.coverPhoto} title="cover photo" sx={{ minHeight: '200px' }} />
      <CardContent sx={{ position: 'relative', bottom: '135px', marginBottom: '-135px', padding: '30px' }}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="space-evenly"
          sx={{ minHeight: '600px' }}
        >
          <Avatar sx={{ border: '4px solid white', width: '170px', height: '170px' }} src={profile.photo} />
          <Typography variant="h5">{profile.name}</Typography>
          <Typography>
            <Room sx={{ margin: '0rem 0.3rem', color: 'primary.main' }} />
            {profile.city}
          </Typography>
          <Typography variant="h6" sx={{ width: '100%' }}>
            About me
          </Typography>
          <Typography>{profile.description}</Typography>
          <Gallery images={profile.uploadedImages} />
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProfileDetailsCard;
