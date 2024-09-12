import { FC } from "react";

import { Box, SxProps, Typography } from "@mui/material";

interface FormHeaderProps {
  title: string;
  subtitle: string;
}

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

const FormHeader: FC<FormHeaderProps> = ({ title, subtitle }) => {
  return (
    <Box sx={FormHeaderStyles}>
      <Typography variant="h3">{title}</Typography>
      <Typography variant="subtitle1">{subtitle}</Typography>
    </Box>
  );
};

export default FormHeader;
