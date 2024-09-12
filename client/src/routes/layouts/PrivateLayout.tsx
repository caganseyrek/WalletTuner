import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate } from "react-router-dom";

import {
  AccountBalance,
  BarChart,
  DarkMode,
  FindInPage,
  KeyboardCommandKey,
  ListAlt,
  Logout,
  ReceiptLong,
  Settings,
  Translate,
} from "@mui/icons-material";
import {
  ButtonGroup,
  Grid2 as Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Popover,
  Tooltip,
  Typography,
} from "@mui/material";

import AuthCheckProvider from "@/components/AuthCheckProvider";

import useAuthDetails from "@/hooks/useAuthDetails";

import getGreeting from "@/shared/utils/greeter";

import {
  appBarStyles,
  containerStyles,
  contentStyles,
  darkColorStyles,
  lightColorStyles,
  logoStyles,
  mainStyles,
  menuItemStyles,
  menuTitleStyles,
  sidebarStyles,
} from "./privateLayout.style";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
  const { t, i18n } = useTranslation();

  const { data: authDetails } = useAuthDetails();

  const greeting = getGreeting(authDetails?.name!);

  return (
    <AuthCheckProvider>
      <main style={mainStyles}>
        <Grid sx={sidebarStyles}>
          <Typography variant="h1" fontFamily={"Lobster Two"} fontWeight={"600"} sx={logoStyles}>
            WalletTuner
          </Typography>
          <Grid>
            <Typography variant="subtitle1" sx={menuTitleStyles}>
              {t("layouts.sidebar.dashboardsTitle")}
            </Typography>
            <MenuList sx={lightColorStyles}>
              <MenuItem sx={menuItemStyles} onClick={() => navigate("/accounts")}>
                <ListItemIcon>
                  <AccountBalance sx={lightColorStyles} />
                </ListItemIcon>
                <ListItemText>{t("layouts.sidebar.accounts")}</ListItemText>
              </MenuItem>
              <MenuItem sx={menuItemStyles} onClick={() => navigate("/transactions")}>
                <ListItemIcon>
                  <ReceiptLong sx={lightColorStyles} />
                </ListItemIcon>
                <ListItemText>{t("layouts.sidebar.transactions")}</ListItemText>
              </MenuItem>
              <MenuItem sx={menuItemStyles} onClick={() => navigate("/graphs")}>
                <ListItemIcon>
                  <BarChart sx={lightColorStyles} />
                </ListItemIcon>
                <ListItemText>{t("layouts.sidebar.graphs")}</ListItemText>
              </MenuItem>
              <MenuItem sx={menuItemStyles} onClick={() => navigate("/summeries")}>
                <ListItemIcon>
                  <ListAlt sx={lightColorStyles} />
                </ListItemIcon>
                <ListItemText>{t("layouts.sidebar.summaries")}</ListItemText>
              </MenuItem>
            </MenuList>
          </Grid>
          <Grid>
            <Typography variant="subtitle1" sx={menuTitleStyles}>
              {t("layouts.sidebar.generalTitle")}
            </Typography>
            <MenuList sx={lightColorStyles}>
              <MenuItem sx={menuItemStyles}>
                {/* TODO: add modal for settings */}
                <ListItemIcon>
                  <Settings sx={lightColorStyles} />
                </ListItemIcon>
                <ListItemText>{t("layouts.sidebar.settings")}</ListItemText>
              </MenuItem>
              <MenuItem sx={menuItemStyles}>
                {/* TODO: add modal for shortcuts */}
                <ListItemIcon>
                  <KeyboardCommandKey sx={lightColorStyles} />
                </ListItemIcon>
                <ListItemText>{t("layouts.sidebar.shortcuts")}</ListItemText>
              </MenuItem>
              <MenuItem sx={menuItemStyles}>
                {/* TODO: add docs */}
                <ListItemIcon>
                  <FindInPage sx={lightColorStyles} />
                </ListItemIcon>
                <ListItemText>{t("layouts.sidebar.docs")}</ListItemText>
              </MenuItem>
            </MenuList>
          </Grid>
        </Grid>
        <Grid container sx={containerStyles}>
          <Grid container sx={appBarStyles}>
            <Typography sx={darkColorStyles}>{greeting}</Typography>
            <ButtonGroup>
              <Tooltip title={t("layouts.appbar.translateTooltip")}>
                <IconButton onClick={(event) => setAnchor(event.currentTarget)}>
                  <Translate sx={darkColorStyles} />
                </IconButton>
              </Tooltip>
              <Tooltip title={t("layouts.appbar.toggleDarkTooltip")}>
                <IconButton>
                  <DarkMode sx={darkColorStyles} />
                </IconButton>
              </Tooltip>
              <Tooltip title={t("layouts.appbar.logoutTooltip")}>
                <IconButton>
                  <Logout sx={darkColorStyles} />
                </IconButton>
              </Tooltip>
              <Popover
                open={Boolean(anchor)}
                anchorEl={anchor}
                onClose={() => setAnchor(null)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}>
                <MenuList>
                  <MenuItem
                    selected={i18n.language === "en" ? true : false}
                    onClick={() => {
                      i18n.changeLanguage("en");
                      setAnchor(null);
                    }}>
                    English
                  </MenuItem>
                  <MenuItem
                    selected={i18n.language === "tr" ? true : false}
                    onClick={() => {
                      i18n.changeLanguage("tr");
                      setAnchor(null);
                    }}>
                    Türkçe
                  </MenuItem>
                </MenuList>
              </Popover>
            </ButtonGroup>
          </Grid>
          <Grid container sx={contentStyles}>
            <Outlet />
          </Grid>
        </Grid>
      </main>
    </AuthCheckProvider>
  );
};

export default DashboardPage;
