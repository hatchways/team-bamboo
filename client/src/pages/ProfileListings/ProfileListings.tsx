import { Typography, Stack, Grid, styled } from '@mui/material';
import PageContainer from '../../components/PageContainer/PageContainer';
import SearchBar from './SearchBar/SearchBar';
import { ProfileCard } from '../../components/ProfileCard';

const Title = styled(Typography)(({ theme }) => ({
  ...theme.typography.h3,
  textAlign: 'center',
  fontWeight: 600,
}));

const ProfileListings = () => {
  return (
    <PageContainer>
      <Stack py={4} px={8} gap={6}>
        <Title>Your search results</Title>
        <SearchBar />
        <Grid container spacing={10}>
          <Grid item xs={4}>
            <ProfileCard />
          </Grid>
          <Grid item xs={4}>
            <ProfileCard />
          </Grid>
          <Grid item xs={4}>
            <ProfileCard />
          </Grid>
        </Grid>
      </Stack>
    </PageContainer>
  );
};

export default ProfileListings;
