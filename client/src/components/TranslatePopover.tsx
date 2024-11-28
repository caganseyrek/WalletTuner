import { FC } from "react";
import { useTranslation } from "react-i18next";

import ComponentTypes from "@/types/components";
import { MenuItem, MenuList, Popover } from "@mui/material";

const TranslatePopover: FC<ComponentTypes.TranslatePopoverProps> = ({ anchor, setAnchor }) => {
  const { i18n } = useTranslation();

  return (
    <Popover
      open={Boolean(anchor)}
      anchorEl={anchor}
      onClose={() => setAnchor(null)}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}>
      <MenuList>
        <MenuItem
          selected={i18n.language === "en" ? true : false}
          onClick={() => {
            i18n.changeLanguage("en");
            localStorage.setItem("language", i18n.language);
            setAnchor(null);
          }}>
          English
        </MenuItem>
        <MenuItem
          selected={i18n.language === "tr" ? true : false}
          onClick={() => {
            i18n.changeLanguage("tr");
            localStorage.setItem("language", i18n.language);
            setAnchor(null);
          }}>
          Türkçe
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

export default TranslatePopover;
