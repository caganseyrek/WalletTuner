import { FC } from "react";

import { Box, Typography } from "@mui/material";

import { formHeaderStyles, formTitleStyles, logoStyles } from "@/styles/formStyles";

const FormHeader: FC<FormHeaderProps> = ({ children, title }) => {
  return (
    <Box sx={formHeaderStyles}>
      <img src="../../assets/logo.png" style={logoStyles} />
      <Typography variant="h3" style={formTitleStyles}>
        {title}
      </Typography>
      {children}
    </Box>
  );
};

export default FormHeader;
