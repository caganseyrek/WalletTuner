import { FC } from "react";

import { Typography } from "@mui/material";

import { menuTitleStyles } from "@/routes/layouts/styles/privateLayout.style";

interface SidebarTitleProps {
  text: string;
}

const SidebarTitle: FC<SidebarTitleProps> = ({ text }) => {
  return (
    <Typography variant="subtitle1" sx={menuTitleStyles}>
      {text}
    </Typography>
  );
};

export default SidebarTitle;
