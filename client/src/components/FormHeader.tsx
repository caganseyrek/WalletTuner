import { CSSProperties, FC } from "react";

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

const LogoStyles: CSSProperties = {
  width: "80px",
  height: "80px",
  borderRadius: "100%",
  border: "solid 5px #413d80",
  boxSizing: "border-box",
};

const TitleStyles: SxProps = {
  textAlign: "center",
  fontWeight: "600",
  padding: "0px 20px",
};

const FormHeader: FC<FormHeaderProps> = ({ title }) => {
  return (
    <Box sx={FormHeaderStyles}>
      <img src="../../assets/logo.png" style={LogoStyles} />
      <Typography variant="h3" sx={TitleStyles}>
        {title}
      </Typography>
    </Box>
  );
};

export default FormHeader;
