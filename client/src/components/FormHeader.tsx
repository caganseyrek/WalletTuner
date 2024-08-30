import { FC } from "react";

import { Box, Typography } from "@mui/material";

const FormHeader: FC<FormHeaderProps> = ({ title }) => {
  return (
    <Box
      sx={{
        paddingTop: "30px",
        paddingBottom: "15px",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        rowGap: "10px",
      }}>
      <img
        src="../../assets/logo.png"
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "100%",
          border: "solid 5px #413d80",
          boxSizing: "border-box",
        }}
      />
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          fontWeight: "600",
          padding: "0px 20px",
        }}>
        {title}
      </Typography>
    </Box>
  );
};

export default FormHeader;
