import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import { theme } from "../styles/theme";

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App;
