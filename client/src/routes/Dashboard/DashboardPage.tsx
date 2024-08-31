import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Grid2 as Grid, Paper, Typography } from "@mui/material";

import Accounts from "./components/Accounts";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Overview from "./components/Overview";
import Settings from "./components/Settings";
import Transactions from "./components/Transactions";
import AuthCheckProvider from "@/components/AuthCheckProvider";

const MainPage = () => {
  const { t } = useTranslation();

  const [accountsModalState, setAccountsModalState] = useState<boolean>(false);
  const [settingsModalState, setSettingsModalState] = useState<boolean>(false);

  return (
    <AuthCheckProvider isPagePublic={false}>
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
      <Grid container spacing={4} sx={{ margin: "auto" }}>
        <Header
          openAccountsModal={() => setAccountsModalState(true)}
          openSettingsModal={() => setSettingsModalState(true)}
        />
        <Grid container spacing={2} sx={{ width: "996px", margin: "auto" }}>
          <Overview />
          <Paper
            sx={{
              width: "996px",
              margin: "auto",
              padding: "15px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              rowGap: "10px",
            }}>
            <Typography variant="button">{t("dashboard.transactions.paperTitle")}</Typography>
            <Transactions />
          </Paper>
        </Grid>
      </Grid>
    </AuthCheckProvider>
  );
};

export default MainPage;
