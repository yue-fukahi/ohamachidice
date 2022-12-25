import { createTheme } from '@mui/material/styles';
import { Montserrat } from "@next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

const theme = createTheme({
  typography: {
    h1: {
      color: '#263238',
      fontSize: '3rem',
      fontWeight: 100,
      fontFamily: montserrat.style.fontFamily,
    },
    h2: {
      color: '#263238',
      fontSize: '2rem',
      fontWeight: 100,
      fontFamily: montserrat.style.fontFamily,
    },
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
