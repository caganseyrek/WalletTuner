import { CSSProperties } from "react";

import { SxProps } from "@mui/material";

export const containerBackground: string = "#f9f9f9";
export const containerBorder: string = "#cccccc";

export const lightColor: string = "#F3F5F7";
export const darkColor: string = "#232C33";

export const mediumColor: string = "#C2CDD6";

export const PaperStyles: SxProps = {
  padding: 4,
  borderRadius: 2,
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  rowGap: 2,
};

export const DividerStyles: SxProps = {
  marginTop: 1,
};

export const LinkStyles: CSSProperties = {
  textDecoration: "none",
  color: darkColor,
  textAlign: "center",
};
