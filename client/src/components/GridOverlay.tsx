import { FC } from "react";
import { useTranslation } from "react-i18next";

import { ErrorOutline } from "@mui/icons-material";
import { Box, CircularProgress, SxProps, Typography } from "@mui/material";

interface GridOverlayProps {
  type: "loading" | "error";
  message?: string;
}

const GridOverlayStyles: SxProps = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  rowGap: 1,
};

const IconStyles: SxProps = {
  width: "30px",
  height: "30px",
};

const GridOverlay: FC<GridOverlayProps> = ({ type, message }) => {
  const { t } = useTranslation(["data_grid"]);

  return (
    <Box sx={GridOverlayStyles}>
      {type === "loading" ? <CircularProgress size={30} /> : <ErrorOutline sx={IconStyles} />}
      <Typography>{type === "loading" ? t("loadingMessage") : t("errorMessage")}</Typography>
      <Typography>{type === "error" && message}</Typography>
    </Box>
  );
};

export default GridOverlay;
