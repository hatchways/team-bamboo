import { CircularProgress, Grid } from '@mui/material';
import { useHistory } from 'react-router-dom';
import PageContainer from '../../components/PageContainer/PageContainer';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import { useAuth } from '../../context/useAuthContext';
import { Profile } from '../../interface/Profile';

const profile: Profile = {
  city: 'Toronto',
  availability: [true, false, false, false, false, false, true],
  coverPhoto: 'https://www.kimballstock.com/images/dog-stock-photos.jpg',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit ex reprehenderit sequi labore atque corporis officia. Ducimus veritatis dolore fugit est, magni alias, iure voluptates quos aliquid sunt sed quaerat! Quos porro cupiditate eum ipsam quam enim odio fugit nam vel! Tempore ut tempora iste laudantium rem dignissimos iure voluptatibus.',
  hourlyRate: 5,
  name: 'Norma Byers',
  photo: 'https://thoughtcatalog.com/wp-content/uploads/2016/04/24597829769_1c5fd5517a_k.jpg',
  uploadedImages: [
    'https://i.picsum.photos/id/1062/5092/3395.jpg?hmac=o9m7qeU51uOLfXvepXcTrk2ZPiSBJEkiiOp-Qvxja-k',
    'https://i.picsum.photos/id/1025/4951/3301.jpg?hmac=_aGh5AtoOChip_iaMo8ZvvytfEojcgqbCH7dzaz-H8Y',
  ],
};

const ProfilePage = () => {
  // const { loggedInUser } = useAuth();
  // const history = useHistory();

  // if (loggedInUser === undefined) return <CircularProgress />;
  // if (!loggedInUser) {
  //   history.push('/login');
  //   return <CircularProgress />;
  // }
  return (
    <PageContainer>
      <Grid container>
        <ProfileCard profile={profile} />
      </Grid>
    </PageContainer>
  );
};
export default ProfilePage;
