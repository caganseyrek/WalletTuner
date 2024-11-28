import { FC } from "react";

import ComponentTypes from "@/types/components";
import { ListItemIcon, ListItemText, MenuItem as MenuItemComponent } from "@mui/material";

import { menuItemStyles } from "@/routes/layouts/styles/privateLayout.style";

const MenuItem: FC<ComponentTypes.MenuItemProps> = ({ icon, text, onClick }) => {
  return (
    <MenuItemComponent sx={menuItemStyles} onClick={onClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{text}</ListItemText>
    </MenuItemComponent>
  );
};

export default MenuItem;
