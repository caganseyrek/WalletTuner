import { useTranslation } from "react-i18next";

import useOnMountEffect from "@/hooks/useOnMountEffect";

const supportedLanguages = ["en", "tr"];
const defaultLanguage = "en";

const LoadLanguage = ({ children }: LoadLanguageProps) => {
  const { i18n } = useTranslation();

  useOnMountEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (!savedLang || !supportedLanguages.includes(savedLang)) {
      i18n.changeLanguage(defaultLanguage);
      localStorage.setItem("language", i18n.language);
    } else {
      i18n.changeLanguage(savedLang);
    }
  });

  return <>{children}</>;
};

export default LoadLanguage;
