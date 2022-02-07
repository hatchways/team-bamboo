import { CircularProgress, Grid } from '@mui/material';
import { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageContainer from '../../components/PageContainer/PageContainer';
import ProfileDetailsCard from '../../components/ProfileDetailsCard/ProfileDetailsCard';
import RequestForm from '../../components/RequestForm/RequestForm';
import { NotificationsProvider } from '../../context/useNotificationContext';
import { getProfile } from '../../helpers/APICalls/profile';
import { Profile } from '../../interface/Profile';
import NotFound from '../NotFound/NotFound';

interface RouteParams {
  id: string;
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams<RouteParams>();

  const fetchProfile = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      const { success } = await getProfile(id);
      if (success) {
        setProfile(success.profile);
      } else {
        setProfile(null);
      }
    } catch (e) {
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile(id);
  }, [fetchProfile, id]);

  if (isLoading) return <CircularProgress />;
  if (!profile) return <NotFound />;

  return (
    <PageContainer>
      <Grid container justifyContent="space-evenly" alignItems="flex-start">
        <ProfileDetailsCard profile={profile} />
        <NotificationsProvider loadOnMount={false}>
          <RequestForm profile={profile} />
        </NotificationsProvider>
      </Grid>
    </PageContainer>
  );
};
export default ProfilePage;
