import { CSSProperties } from "react";

import { SxProps } from "@mui/material";

export const FormPageStyles: SxProps = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  paddingBottom: "120px",
  boxSizing: "border-box",
};

export const FormBodyStyles: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  rowGap: "15px",
};

export const PaperStyles: SxProps = {
  padding: "15px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  rowGap: "10px",
};
