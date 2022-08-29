import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./en.json";
import pl from "./pl.json";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)

  .init({
    debug: true,
    supportedLngs: ["en", "pl"],
    fallbackLng: "en",
    resources: {
      en: {
        translation: en,
      },
      pl: {
        translation: pl,
      },
    },
    detection: {
      order: ["cookie", "htmlTag", "localStorage", "path", "subdomain"],
      caches: ["cookie"],
    },
  });

export default i18next;
