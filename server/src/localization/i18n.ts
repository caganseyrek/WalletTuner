// import i18next from "i18next";
// import I18NexFsBackend, { FsBackendOptions } from "i18next-fs-backend";
// import { LanguageDetector } from "i18next-http-middleware";
// import path from "path";

// const i18nextInstance = i18next.use(LanguageDetector).use(I18NexFsBackend);

// i18nextInstance.init<FsBackendOptions>({
//   fallbackLng: "en",
//   preload: ["en", "tr"],
//   load: "all",
//   ns: ["main"],
//   backend: {
//     loadPath: path.join(__dirname, "/translations/{{ns}}_{{lng}}.json"),
//   },
//   detection: {
//     order: ["header"],
//     lookupHeader: "Accept-Language",
//   },
//   debug: true,
// });
