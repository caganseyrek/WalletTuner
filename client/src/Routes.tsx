import { BrowserRouter, Routes as BrowserRoutes, Route } from "react-router-dom";

import {
  AccountsPage,
  ErrorPage,
  GraphsPage,
  LoginPage,
  NotFoundPage,
  RegisterPage,
  SettingsPage,
  ShortcutsPage,
  SummariesPage,
  TransactionsPage,
} from "./routes";
import PrivateLayout from "./routes/layouts/PrivateLayout";
import PublicLayout from "./routes/layouts/PublicLayout";

const Routes = () => {
  return (
    <BrowserRouter>
      <BrowserRoutes>
        <Route path="/" element={<PrivateLayout />}>
          <Route path="/accounts" element={<AccountsPage />} errorElement={<ErrorPage />} />
          <Route path="/transactions" element={<TransactionsPage />} errorElement={<ErrorPage />} />
          <Route path="/graphs" element={<GraphsPage />} errorElement={<ErrorPage />} />
          <Route path="/summaries" element={<SummariesPage />} errorElement={<ErrorPage />} />
          <Route path="/settings" element={<SettingsPage />} errorElement={<ErrorPage />} />
          <Route path="/shortcuts" element={<ShortcutsPage />} errorElement={<ErrorPage />} />
        </Route>
        <Route path="/" element={<PublicLayout />}>
          <Route path="/login" element={<LoginPage />} errorElement={<ErrorPage />} />
          <Route path="/register" element={<RegisterPage />} errorElement={<ErrorPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </BrowserRoutes>
    </BrowserRouter>
  );
};

export default Routes;
