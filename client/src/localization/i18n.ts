import { initReactI18next } from "react-i18next";

import i18n from "i18next";

import data_grid_en from "./translations/data_grid_en.json";
import data_grid_tr from "./translations/data_grid_tr.json";
import main_en from "./translations/main_en.json";
import main_tr from "./translations/main_tr.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      main: main_en,
      data_grid: data_grid_en,
    },
    tr: {
      main: main_tr,
      data_grid: data_grid_tr,
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
