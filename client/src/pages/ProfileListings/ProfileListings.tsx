import { ReactElement } from 'react';
import { Typography, Stack, Zoom, Grid, styled, Button, CircularProgress } from '@mui/material';
import PageContainer from '../../components/PageContainer/PageContainer';
import SearchBar from './SearchBar/SearchBar';
import { LoadingCard, ProfileCard } from '../../components/ProfileCard';
import { Box } from '@mui/system';
import { useSitterProfiles } from './hooks';
import { useQuery } from '../../hooks';
import { TransitionGroup } from 'react-transition-group';

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
  const query = useQuery();
  const { matchProfiles, loadMore, isLoading } = useSitterProfiles({
    ...query,
    limit: 8,
    delay: 1000,
  });

  return (
    <PageContainer>
      <Stack py={4} px={{ xl: 30, md: 20, xs: 8 }} gap={6}>
        <Title>Your search results</Title>
        <SearchBar {...query} />
        <Grid container spacing={8} sx={{ pt: 4 }}>
          {matchProfiles<ReactElement | ReactElement[]>(
            (error) => (
              <Typography>{!(error instanceof Array) ? error.message : error.join('\n')}</Typography>
            ),
            (profiles) => (
              <TransitionGroup component={null} appear={isLoading}>
                {profiles.map(({ sitter, loading, id }, index) => (
                  <Zoom
                    key={id}
                    timeout={{
                      exit: 500,
                      enter: loading ? (index + 1) * 150 : 300,
                    }}
                  >
                    <Grid item xl={2} lg={4} md={6} xs={12}>
                      {sitter && <ProfileCard {...sitter} />}
                      {loading && <LoadingCard />}
                    </Grid>
                  </Zoom>
                ))}
              </TransitionGroup>
            ),
          )}
        </Grid>
        <Box width="100%" display="flex" justifyContent="center" pt={2}>
          <ShowMoreBtn onClick={loadMore} variant="outlined" color="inherit" disabled={isLoading}>
            {isLoading && <CircularProgress color="primary" />}
            {!isLoading && 'Show more'}
          </ShowMoreBtn>
        </Box>
      </Stack>
    </PageContainer>
  );
};

export default ProfileListings;
