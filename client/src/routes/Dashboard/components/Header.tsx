import { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";

import { AccountBalance, Settings, Translate } from "@mui/icons-material";
import { AppBar, Box, Button, ButtonGroup, MenuItem, Popover, Typography } from "@mui/material";

interface HeaderProps {
  openAccountsModal: () => void;
  openSettingsModal: () => void;
}

const Header = ({ openAccountsModal, openSettingsModal }: HeaderProps) => {
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
  const { t, i18n } = useTranslation();

  return (
    <AppBar position="static">
      <Box
        sx={{
          padding: "20px 0px",
          boxSizing: "border-box",
          width: "996px",
          margin: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <Typography variant="h1" fontWeight={"600"} fontFamily={"Odor Mean Chey"} lineHeight={0}>
          WalletTuner
        </Typography>
        <ButtonGroup variant="contained" color="inherit" disableElevation>
          <Button startIcon={<AccountBalance />} onClick={openAccountsModal}>
            {t("dashboard.header.accountsButton")}
          </Button>
          <Button startIcon={<Settings />} onClick={openSettingsModal}>
            {t("dashboard.header.settingsButton")}
          </Button>
          <Button onClick={(event) => setAnchor(event.currentTarget)}>
            <Translate sx={{ width: "20px", height: "20px" }} />
          </Button>
        </ButtonGroup>
        <Popover
          open={Boolean(anchor)}
          anchorEl={anchor}
          onClose={() => setAnchor(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}>
          <MenuItem onClick={() => i18n.changeLanguage("en")}>
            <ReactCountryFlag countryCode="gb" />
          </MenuItem>
          <MenuItem onClick={() => i18n.changeLanguage("tr")}>
            <ReactCountryFlag countryCode="tr" />
          </MenuItem>
        </Popover>
      </Box>
    </AppBar>
  );
};

export default Header;
