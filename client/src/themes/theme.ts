import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#f14140',
    },
    secondary: {
      main: '#afafaf',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Open Sans", "sans-serif"',
    fontSize: 12,
    button: {
      fontWeight: 700,
    },
  },
});
