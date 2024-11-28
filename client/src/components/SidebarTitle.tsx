import { FC } from "react";

import ComponentTypes from "@/types/components";
import { Typography } from "@mui/material";

import { menuTitleStyles } from "@/routes/layouts/styles/privateLayout.style";

const SidebarTitle: FC<ComponentTypes.SidebarTitleProps> = ({ text }) => {
  return (
    <Typography variant="subtitle1" sx={menuTitleStyles}>
      {text}
    </Typography>
  );
};

export default SidebarTitle;
