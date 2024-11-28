import { FC } from "react";

import ComponentTypes from "@/types/components";
import { Box, SxProps, Typography } from "@mui/material";

const FormHeaderStyles: SxProps = {
  paddingTop: "10px",
  paddingBottom: "15px",
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  rowGap: "10px",
};

const FormHeader: FC<ComponentTypes.FormHeaderProps> = ({ title, subtitle }) => {
  return (
    <Box sx={FormHeaderStyles}>
      <Typography variant="h3">{title}</Typography>
      <Typography variant="subtitle1">{subtitle}</Typography>
    </Box>
  );
};

export default FormHeader;
