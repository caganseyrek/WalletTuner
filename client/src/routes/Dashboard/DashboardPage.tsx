import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Typography } from "@mui/material";

import Accounts from "./components/Accounts";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Overview from "./components/Overview";
import Settings from "./components/Settings";
import Transactions from "./components/Transactions";
import AuthCheckProvider from "@/components/AuthCheckProvider";

import useAuthDetails from "@/hooks/useAuthDetails";

import getGreeting from "@/utils/greeter";

const MainPage = () => {
  const [accountsModalState, setAccountsModalState] = useState<boolean>(false);
  const [settingsModalState, setSettingsModalState] = useState<boolean>(false);
  const { t } = useTranslation();

  const { data: authDetails } = useAuthDetails();

  const greeting = getGreeting(authDetails!.name!);

  return (
    <AuthCheckProvider isPagePublic={false}>
      <Header
        openAccountsModal={() => setAccountsModalState(true)}
        openSettingsModal={() => setSettingsModalState(true)}
      />
      <Modal
        open={accountsModalState}
        onClose={() => setAccountsModalState(false)}
        title={t("dashboard.accounts.modalTitle")}>
        <Accounts />
      </Modal>
      <Modal
        open={settingsModalState}
        onClose={() => setSettingsModalState(false)}
        title={t("dashboard.settings.modalTitle")}>
        <Settings />
      </Modal>
      <Typography
        variant="h3"
        sx={{
          padding: "15px 0px",
          boxSizing: "border-box",
          fontWeight: "600",
          width: "996px",
          margin: "auto ",
        }}>
        {greeting}
      </Typography>
      <Overview />
      <Transactions />
    </AuthCheckProvider>
  );
};

export default MainPage;
