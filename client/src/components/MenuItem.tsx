import { FC, ReactNode } from "react";

import { ListItemIcon, ListItemText, MenuItem as MenuItemComponent } from "@mui/material";

import { menuItemStyles } from "@/routes/layouts/styles/privateLayout.style";

interface MenuItemProps {
  icon: ReactNode;
  text: string;
  onClick?: () => void;
}

const MenuItem: FC<MenuItemProps> = ({ icon, text, onClick }) => {
  return (
    <MenuItemComponent sx={menuItemStyles} onClick={onClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{text}</ListItemText>
    </MenuItemComponent>
  );
};

export default MenuItem;
