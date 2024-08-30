import { useTranslation } from "react-i18next";

import { Replay } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

import { formPageStyles } from "@/styles/formStyles";

const ErrorElement = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const HandleReload = () => {
    queryClient.clear();
    window.location.reload();
  };

  return (
    <Box sx={formPageStyles}>
      <Box
        sx={{
          width: "fit-content",
          height: "fit-content",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          rowGap: "5px",
        }}>
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
