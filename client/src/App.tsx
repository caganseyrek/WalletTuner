import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import MainPage from "./routes/Dashboard/DashboardPage";
import LoginPage from "./routes/Login/LoginPage";
import RegisterPage from "./routes/Register/RegisterPage";

const App = () => {
  const IS_DEV = Boolean(import.meta.env.VITE_APP_IS_DEV);
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
      // errorElement: <FormErrorElement />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
      // errorElement: <FormErrorElement />,
    },
    {
      path: "/",
      element: <MainPage />,
      // errorElement: <MainPageErrorElement />,
    },
  ]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: 5, retryDelay: 2000 },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {IS_DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

export default App;
