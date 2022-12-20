import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    h1: {
      color: '#263238',
      fontSize: '3rem',
      fontWeight: 100,
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1.5rem',
        },
      },
    },
  }
});

export { theme };
