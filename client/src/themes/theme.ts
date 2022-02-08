import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#f14140',
    },
    secondary: {
      main: '#afafaf',
    },
    info: {
      main: '#555',
    },
    success: {
      main: '#35DF87',
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
