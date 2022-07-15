import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const Languages = ["en", "it", "fr", "de"];

export default i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "it",
    debug: true,
    whitelist: Languages,
    interpolation: {
      escapeValue: false,
    },
});