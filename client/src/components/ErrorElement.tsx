import { useTranslation } from "react-i18next";

import { Replay } from "@mui/icons-material";
import { Box, Button, SxProps, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

import { FormPageStyles as ErrorPageStyles } from "@/shared/styles";

const ErrorPageContainerStyles: SxProps = {
  width: "fit-content",
  height: "fit-content",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  rowGap: "5px",
};

const ErrorElement = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const HandleReload = () => {
    queryClient.clear();
    window.location.reload();
  };

  return (
    <Box sx={ErrorPageStyles}>
      <Box sx={ErrorPageContainerStyles}>
        <Typography variant="h2" fontWeight={"500"}>
          {t("publicForms.errorPage.title")}
        </Typography>
        <Typography variant="body1">{t("publicForms.errorPage.description")}</Typography>
        <Button
          variant="contained"
          onClick={HandleReload}
          startIcon={<Replay />}
          sx={{ marginTop: 2 }}>
          {t("publicForms.errorPage.reload")}
        </Button>
      </Box>
    </Box>
  );
};

export default ErrorElement;
