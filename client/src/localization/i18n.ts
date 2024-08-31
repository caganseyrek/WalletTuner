import { initReactI18next } from "react-i18next";

import i18n from "i18next";

import dataGridTranslationsEn from "./translations/datagrid_en.json";
import dataGridTranslationsTr from "./translations/datagrid_tr.json";
import mainTranslationsEn from "./translations/main_en.json";
import mainTranslationsTr from "./translations/main_tr.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      main: mainTranslationsEn,
      datagrid: dataGridTranslationsEn,
    },
    tr: {
      main: mainTranslationsTr,
      datagrid: dataGridTranslationsTr,
    },
  },
  lng: "en",
  fallbackLng: "en",
  ns: ["main", "datagrid"],
  defaultNS: "main",
  interpolation: {
    escapeValue: false,
  },
});

export const errorMessage = (errorLocation: string, errorMessage: unknown) => {
  return `There was an error in '${errorLocation}': ${errorMessage}.`;
};
