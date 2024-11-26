import i18next from "i18next";
import I18NexFsBackend, { FsBackendOptions } from "i18next-fs-backend";
import { LanguageDetector } from "i18next-http-middleware";
import path from "path";

i18next
  .use(I18NexFsBackend)
  .use(LanguageDetector)
  .init<FsBackendOptions>({
    fallbackLng: "en",
    preload: ["en", "tr"],
    ns: ["main"],
    backend: {
      loadPath: path.join(__dirname, "./translations/{{ns}}_{{lng}}.json"),
    },
    detection: { order: ["header"] },
    debug: false,
  });
