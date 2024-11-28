import { FC } from "react";

import ComponentTypes from "@/types/components";
import { IconButton, Tooltip } from "@mui/material";

const AppBarButton: FC<ComponentTypes.AppBarButtonProps> = ({ tooltip, icon, onClick }) => {
  return (
    <Tooltip title={tooltip}>
      <IconButton onClick={onClick}>{icon}</IconButton>
    </Tooltip>
  );
};

export default AppBarButton;
