import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { createTheme, CssBaseline, Theme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import MainPage from "./routes/Dashboard/DashboardPage";
import LoginPage from "./routes/Login/LoginPage";
import RegisterPage from "./routes/Register/RegisterPage";

import FormErrorElement from "./components/error/FormErrorElement";
import MainPageErrorElement from "./components/error/MainPageErrorElement";

const App = () => {
  const IS_DEV = Boolean(import.meta.env.VITE_APP_IS_DEV);
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
      errorElement: <FormErrorElement />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
      errorElement: <FormErrorElement />,
    },
    {
      path: "/",
      element: <MainPage />,
      errorElement: <MainPageErrorElement />,
    },
  ]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: 5, retryDelay: 2000 },
    },
  });

  const lightTheme: Theme = createTheme({
    palette: {
      mode: "light",
      primary: { main: "#413d80" },
      secondary: { main: "#ee6c4d" },
      background: { default: "#eeeeee" },
    },
    typography: {
      fontFamily: "Inter",
      fontSize: 14,
      htmlFontSize: 16,
      h1: { fontSize: "2.5em" },
      h2: { fontSize: "2.25rem" },
      h3: { fontSize: "2rem" },
      h4: { fontSize: "1.75rem" },
      h5: { fontSize: "1.5rem" },
      h6: { fontSize: "1.25rem" },
    },
  });

  /*
  const darkTheme = createTheme({
    palette: { mode: "dark", primary: { main: "#807ce8" }, secondary: { main: "#da6a4e" } },
  });
  */

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {IS_DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
