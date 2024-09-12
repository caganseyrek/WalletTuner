import { FC, MouseEventHandler, ReactNode } from "react";

import { IconButton, Tooltip } from "@mui/material";

interface AppBarButtonProps {
  tooltip: string;
  icon: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const AppBarButton: FC<AppBarButtonProps> = ({ tooltip, icon, onClick }) => {
  return (
    <Tooltip title={tooltip}>
      <IconButton onClick={onClick}>{icon}</IconButton>
    </Tooltip>
  );
};

export default AppBarButton;
