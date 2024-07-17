import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector/cjs";
import { initReactI18next } from "react-i18next";
import backend from "i18next-http-backend";

i18next
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .use(backend)
  .init({
    debug: true,
    fallbackLng: "en",
    returnObjects: true,
  });
