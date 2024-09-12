import { CSSProperties } from "react";

import { SxProps } from "@mui/material";

import { PaperStyles } from "@/shared/globals.style";

export const PageStyles: SxProps = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const ContainerStyles: SxProps = {
  ...PaperStyles,
  width: "fit-content",
};

export const FormBodyStyles: CSSProperties = {
  width: 340,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  rowGap: "15px",
};
