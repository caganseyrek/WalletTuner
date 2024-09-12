import { BrowserRouter, Routes as BrowserRoutes, Route } from "react-router-dom";

import DashboardPage from "./routes/layouts/PrivateLayout";
import PrivateLayout from "./routes/layouts/PrivateLayout";
import PublicLayout from "./routes/layouts/PublicLayout";
import ErrorPage from "./routes/others/ErrorPage";
import NotFoundPage from "./routes/others/NotFoundPage";
import AccountsPage from "./routes/private/AccountsPage";
import TransactionsPage from "./routes/private/TransactionsPage";
import LoginPage from "./routes/public/LoginPage";
import RegisterPage from "./routes/public/RegisterPage";

const Routes = () => {
  return (
    <BrowserRouter>
      <BrowserRoutes>
        <Route path="/" element={<PrivateLayout />}>
          <Route path="/accounts" element={<AccountsPage />} errorElement={<ErrorPage />} />
          <Route path="/transactions" element={<TransactionsPage />} errorElement={<ErrorPage />} />
          <Route path="/graphs" element={<DashboardPage />} errorElement={<ErrorPage />} />
          <Route path="/summaries" element={<DashboardPage />} errorElement={<ErrorPage />} />
        </Route>
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<LoginPage />} errorElement={<ErrorPage />} />
          <Route path="/register" element={<RegisterPage />} errorElement={<ErrorPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </BrowserRoutes>
    </BrowserRouter>
  );
};

export default Routes;
