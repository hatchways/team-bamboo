import { Grid } from '@mui/material';
import { ActiveChat } from '../../components/ActiveChat';
import { Sidebar } from '../../components/Sidebar';

const MessagesPage = () => (
  <Grid container maxHeight="100vh">
    <Grid item xs={4}>
      <Sidebar />
    </Grid>
    <Grid item xs={8}>
      <ActiveChat />
    </Grid>
  </Grid>
);

export default MessagesPage;
