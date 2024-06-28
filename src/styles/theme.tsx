import { createTheme } from '@mui/material/styles';

const PRIMARY_COLOR = '#21bcbe';
const SECONDARY_COLOR = '#ffffff';
const BACKGROUND_COLOR = '#eeeeee';
const TEXT_COLOR = '#303030';

const theme = createTheme({
  shape: {
    borderRadius: 16, // Adjust this value to make the components more rounded
  },
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
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
        containedPrimary: {
          color: SECONDARY_COLOR,
        },
      },
    },
  },
});

export default theme;