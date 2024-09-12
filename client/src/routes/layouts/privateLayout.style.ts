import { CSSProperties } from "react";

import { SxProps } from "@mui/material";

import { darkColor, lightColor, mediumColor } from "@/shared/globals.style";

export const mainStyles: CSSProperties = {
  display: "flex",
  alignItems: "start",
  justifyContent: "center",
};

export const sidebarStyles: SxProps = {
  bgcolor: darkColor,
  width: "280px",
  height: "100vh",
  padding: 1,
  boxSizing: "border-box",
};

export const logoStyles: SxProps = {
  padding: 2,
  color: lightColor,
  userSelect: "none",
  boxSizing: "border-box",
};

export const menuTitleStyles: SxProps = {
  color: "#6D889C",
  paddingTop: 1,
  paddingLeft: 2,
  paddingRight: 2,
  boxSizing: "border-box",
};

export const lightColorStyles: SxProps = {
  color: lightColor,
};

export const darkColorStyles: SxProps = {
  color: darkColor,
};

export const menuItemStyles: SxProps = {
  padding: 2,
  borderRadius: 2,
  boxSizing: "border-box",
};

export const containerStyles: SxProps = {
  width: "calc(100vw - 280px)",
  height: "100vh",
  display: "flex",
};

export const appBarStyles: SxProps = {
  width: "calc(100vw - 280px)",
  height: "fit-content",
  justifyContent: "space-between",
  alignItems: "center",
  paddingLeft: 2,
  paddingRight: 2,
  paddingTop: 1,
  paddingBottom: 1,
  boxSizing: "border-box",
  backgroundColor: mediumColor,
};

export const contentStyles: SxProps = {
  width: "calc(100vw - 280px)",
  height: "calc(100vh - 56.8px)",
  maxHeight: "calc(100vh - 56.8px)",
  minHeight: "calc(100vh - 56.8px)",
  overflow: "auto",
  padding: 2,
  boxSizing: "border-box",
  flex: 1,
};
