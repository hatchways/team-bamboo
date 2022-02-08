import { Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PageContainer from '../../components/PageContainer/PageContainer';

const useStyles = makeStyles((theme: Theme) => ({
  text: {
    // margin: 'auto',
    textAlign: 'center',
    color: theme.palette.primary.main,
  },
}));

const TransactionResult = () => {
  const classes = useStyles();
  return (
    <PageContainer>
      <Typography className={classes.text} variant="h1">
        Payment Successful!
      </Typography>
    </PageContainer>
  );
};
export default TransactionResult;
