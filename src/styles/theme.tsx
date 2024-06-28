import { createTheme } from '@mui/material/styles';

const PRIMARY_COLOR = '#21bcbe';
const SECONDARY_COLOR = '#ffffff';
const BACKGROUND_COLOR = '#eeeeee';
const TEXT_COLOR = '#303030';

const theme = createTheme({
  palette: {
    primary: {
      main: PRIMARY_COLOR,
    },
    secondary: {
      main: SECONDARY_COLOR,
    },
    background: {
      default: BACKGROUND_COLOR,
    },
    text: {
      primary: TEXT_COLOR,
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: SECONDARY_COLOR,
        },
      },
    },
  },
});

export default theme;