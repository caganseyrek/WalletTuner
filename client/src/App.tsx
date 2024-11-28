import { createTheme, CssBaseline, Theme, ThemeProvider } from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import LoadLanguage from "./components/LoadLanguage";

import { darkColor, lightColor } from "./shared/globals.style";

import Routes from "./Routes";

const App = () => {
  const queryClient: QueryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: 5, retryDelay: 2000 },
    },
  });

  const typography: TypographyOptions = {
    fontFamily: "Inter",
    fontSize: 14,
    htmlFontSize: 16,
    h1: { fontSize: "2.3em" },
    h2: { fontSize: "2rem" },
    h3: { fontSize: "1.6rem" },
    h4: { fontSize: "1.3rem" },
    h5: { fontSize: "1rem" },
    h6: { fontSize: "1rem" },
  };

  const lightTheme: Theme = createTheme({
    palette: {
      mode: "light",
      primary: { main: darkColor },
      secondary: { main: "#ee6c4d" },
      background: { default: lightColor },
    },
    typography,
  });

  /*
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#807ce8" },
      secondary: { main: "#da6a4e" },
    },
    typography,
  });
  */

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <LoadLanguage children={<Routes />} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
