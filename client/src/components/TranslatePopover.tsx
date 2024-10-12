import { FC } from "react";
import { useTranslation } from "react-i18next";

import { MenuItem, MenuList, Popover } from "@mui/material";

/* eslint no-unused-vars: "off" */
interface TranslatePopoverProps {
  anchor: HTMLButtonElement | null;
  setAnchor: (anchor: HTMLButtonElement | null) => void;
}

const TranslatePopover: FC<TranslatePopoverProps> = ({ anchor, setAnchor }) => {
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
