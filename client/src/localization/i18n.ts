import { initReactI18next } from "react-i18next";

import i18n from "i18next";

import enTranslations from "./translations/en.json";
import trTranslations from "./translations/tr.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslations,
    },
    tr: {
      translation: trTranslations,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export const errorMessage = (errorLocation: string, errorMessage: unknown) => {
  return `There was an error in '${errorLocation}': ${errorMessage}.`;
};
