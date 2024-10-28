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
import { ButtonGroup, Grid2 as Grid, MenuList, Typography } from "@mui/material";

import AppBarButton from "@/components/AppBarButton";
import AuthCheckProvider from "@/components/AuthCheckProvider";
import MenuItem from "@/components/MenuItem";
import SidebarLogo from "@/components/SidebarLogo";
import SidebarTitle from "@/components/SidebarTitle";
import TranslatePopover from "@/components/TranslatePopover";

import useAuthDetails from "@/hooks/useAuthDetails";
import useLogoutMutation from "@/hooks/user/useLogoutMutation";

import getGreeting from "@/shared/utils/greeter";

import {
  appBarStyles,
  containerStyles,
  contentStyles,
  darkColorStyles,
  lightColorStyles,
  mainStyles,
  sidebarStyles,
} from "./styles/privateLayout.style";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
  const { t } = useTranslation();

  const { data: authDetails } = useAuthDetails();

  const { mutateAsync: logoutMutate } = useLogoutMutation();

  const HandleLogout = async () => {
    await logoutMutate({
      currentUser: authDetails!.currentUser,
      accessToken: authDetails!.accessToken,
    });
    return navigate("/login");
  };

  const greeting = getGreeting(authDetails?.name || "");

  return (
    <AuthCheckProvider>
      <main style={mainStyles}>
        <Grid sx={sidebarStyles}>
          <SidebarLogo />
          <Grid>
            <SidebarTitle text={t("layouts.sidebar.dashboardsTitle")} />
            <MenuList sx={lightColorStyles}>
              <MenuItem
                icon={<AccountBalance sx={lightColorStyles} />}
                text={t("layouts.sidebar.accounts")}
                onClick={() => navigate("/accounts")}
              />
              <MenuItem
                icon={<ReceiptLong sx={lightColorStyles} />}
                text={t("layouts.sidebar.transactions")}
                onClick={() => navigate("/transactions")}
              />
              <MenuItem
                icon={<BarChart sx={lightColorStyles} />}
                text={t("layouts.sidebar.graphs")}
                onClick={() => navigate("/graphs")}
              />
              <MenuItem
                icon={<ListAlt sx={lightColorStyles} />}
                text={t("layouts.sidebar.summaries")}
                onClick={() => navigate("/summaries")}
              />
            </MenuList>
          </Grid>
          <Grid>
            <SidebarTitle text={t("layouts.sidebar.generalTitle")} />
            <MenuList sx={lightColorStyles}>
              <MenuItem
                icon={<Settings sx={lightColorStyles} />}
                text={t("layouts.sidebar.settings")}
                onClick={() => navigate("/settings")}
              />
              <MenuItem
                icon={<KeyboardCommandKey sx={lightColorStyles} />}
                text={t("layouts.sidebar.shortcuts")}
                onClick={() => navigate("/shortcuts")}
              />
              <MenuItem
                icon={<FindInPage sx={lightColorStyles} />}
                text={t("layouts.sidebar.docs")}
                onClick={() => {
                  /* TODO */
                }}
              />
            </MenuList>
          </Grid>
        </Grid>
        <Grid container sx={containerStyles}>
          <Grid container sx={appBarStyles}>
            <Typography sx={darkColorStyles}>{greeting}</Typography>
            <ButtonGroup>
              <AppBarButton
                tooltip={t("layouts.appbar.translateTooltip")}
                icon={<Translate sx={darkColorStyles} />}
                onClick={(event) => setAnchor(event.currentTarget)}
              />
              <AppBarButton
                tooltip={t("layouts.appbar.toggleDarkTooltip")}
                icon={<DarkMode sx={darkColorStyles} />}
              />
              <AppBarButton
                tooltip={t("layouts.appbar.logoutTooltip")}
                icon={<Logout sx={darkColorStyles} />}
                onClick={() => HandleLogout()}
              />
              <TranslatePopover anchor={anchor} setAnchor={setAnchor} />
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
