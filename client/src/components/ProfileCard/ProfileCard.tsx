import { Card, CardMedia, Box, Typography } from '@mui/material';
import { Profile } from '../../interface/Profile';
import { Room } from '@mui/icons-material';

interface PropTypes {
  profile: Profile;
}

const ProfileCard = ({ profile }: PropTypes) => {
  return (
    <Card>
      <CardMedia image={profile.coverPhoto} title="cover photo" sx={{ height: '20%' }} />
      <Typography>{profile.name}</Typography>
      <Typography>
        {<Room />} {profile.city}
      </Typography>
      <Typography>About me</Typography>
      <Typography>{profile.description}</Typography>
      <Box display="flex" flexDirection="row">
        {/* <CardMedia
          key={'profile.uploadedImages[0]'}
          image={profile.uploadedImages[0]}
          title="gallery photo"
          sx={{ height: '50px' }}
        /> */}
        {profile.uploadedImages.map((image, i) => (
          <img width="20%" key={image} src={image} alt={`gallery photo ${i + 1}`} />
        ))}
      </Box>
    </Card>
  );
};
export default ProfileCard;
