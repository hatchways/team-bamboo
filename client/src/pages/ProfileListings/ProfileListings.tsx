import { Typography, Stack, Grid, styled, Button } from '@mui/material';
import PageContainer from '../../components/PageContainer/PageContainer';
import SearchBar from './SearchBar/SearchBar';
import { ProfileCard } from '../../components/ProfileCard';
import { Box } from '@mui/system';

const Title = styled(Typography)(({ theme }) => ({
  ...theme.typography.h3,
  textAlign: 'center',
  fontWeight: 600,
}));

const ShowMoreBtn = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2.5, 7),
  borderColor: theme.palette.grey[400],
}));

const ProfileListings = () => {
  return (
    <PageContainer>
      <Stack py={4} px={{ xl: 30, md: 20, xs: 8 }} gap={6}>
        <Title>Your search results</Title>
        <SearchBar />
        <Grid container spacing={8} sx={{ pt: 4 }}>
          <Grid item lg={4} md={6} xs={12}>
            <ProfileCard />
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <ProfileCard />
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <ProfileCard />
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <ProfileCard />
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <ProfileCard />
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <ProfileCard />
          </Grid>
        </Grid>
        <Box width="100%" display="flex" justifyContent="center" pt={2}>
          <ShowMoreBtn variant="outlined" color="inherit">
            Show more
          </ShowMoreBtn>
        </Box>
      </Stack>
    </PageContainer>
  );
};

export default ProfileListings;
