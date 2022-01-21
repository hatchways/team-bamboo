import { Grid, Box, Typography, styled, Stack } from '@mui/material';
import FindForm from './FindForm/FindForm';
import useStyles from './useStyles';

const Title = styled(Typography)(({ theme }) => ({
  ...theme.typography.h2,
  fontSize: 64,
  fontWeight: 700,
}));

const Home = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid container item md={6} xs={12} className={classes.content}>
        <Stack spacing={8}>
          <Title>Find the care your dog deserves</Title>
          <FindForm />
        </Stack>
      </Grid>
      <Grid item md={6} className={classes.heroContainer}>
        <Box className={classes.hero} />
      </Grid>
    </Grid>
  );
};

export default Home;
