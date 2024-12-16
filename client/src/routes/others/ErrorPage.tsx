import { useTranslation } from "react-i18next";

import { Replay } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

import { ContainerStyles, ErrorPageStyles } from "./styles/errorPage.style";

const ErrorPage = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const HandleReload = () => {
    queryClient.clear();
    window.location.reload();
  };

  return (
    <Box sx={ErrorPageStyles}>
      <Box sx={ContainerStyles}>
        <Typography variant="h2" fontWeight={"500"}>
          {t("errorPage.title")}
        </Typography>
        <Typography variant="body1">{t("errorPage.description")}</Typography>
        <Button variant="contained" onClick={HandleReload} startIcon={<Replay />} sx={{ marginTop: 2 }}>
          {t("errorPage.reload")}
        </Button>
      </Box>
    </Box>
  );
};

export default ErrorPage;
