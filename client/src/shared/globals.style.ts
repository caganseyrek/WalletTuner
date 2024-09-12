import { CSSProperties } from "react";

import { SxProps } from "@mui/material";

export const containerBackground: string = "#f9f9f9";
export const containerBorder: string = "#cccccc";

export const lightColor: string = "#F3F5F7";
export const darkColor: string = "#232C33";

export const mediumColor: string = "#C2CDD6";

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
  width: 340,
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
