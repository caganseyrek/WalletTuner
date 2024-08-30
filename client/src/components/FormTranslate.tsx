import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";

import { ButtonGroup, IconButton } from "@mui/material";

const FormTranslate = () => {
  const { i18n } = useTranslation();

  return (
    <ButtonGroup variant="outlined" disableElevation>
      <IconButton onClick={() => i18n.changeLanguage("en")}>
        <ReactCountryFlag countryCode="gb" />
      </IconButton>
      <IconButton onClick={() => i18n.changeLanguage("tr")}>
        <ReactCountryFlag countryCode="tr" />
      </IconButton>
    </ButtonGroup>
  );
};

export default FormTranslate;
