import { ReactElement } from 'react';
import { DevModeProvider, DevModeConsumer, AccountTypeKeys } from './context/useDevModeContext';
import { Button as MuiButton, Box, styled } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import { spacing } from '@mui/system';

interface Props {
  accountType?: AccountTypeKeys;
  delay?: number;
  children: string;
}

const Button = styled(MuiButton)(spacing);

const DemoUserLoginBtn = ({ children, accountType = 'PET_SITTER', delay = 0 }: Props): ReactElement => {
  return (
    <DevModeProvider>
      <DevModeConsumer>
        {({ loginAsDemoUser, isDev, isLoading }) =>
          isDev && (
            <Box textAlign="center" marginTop={8}>
              <Button
                onClick={() => loginAsDemoUser(accountType, delay)}
                color="primary"
                size="large"
                variant="outlined"
                disableElevation
                py={1.5}
                px={2}
                endIcon={!isLoading && <ArrowRightAltRoundedIcon />}
              >
                {isLoading ? <CircularProgress style={{ color: 'currentcolor' }} /> : children}
              </Button>
            </Box>
          )
        }
      </DevModeConsumer>
    </DevModeProvider>
  );
};

export default DemoUserLoginBtn;
