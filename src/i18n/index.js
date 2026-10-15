// Base: https://github.com/joaopauloaramuni/desenvolvimento-e-integracao-de-aplicacoes-web/tree/main/PROJETOS/React/Internacionalizacao_i18n
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import I18N_CONFIG from "../config/i18nConfig";
import en from "./locales/en/translation.json";
import ptBR from "./locales/pt-BR/translation.json";

i18n.use(LanguageDetector).use(initReactI18next).init({
  resources: { en: { translation: en }, "pt-BR": { translation: ptBR } },
  supportedLngs: I18N_CONFIG.LANGUAGES.map(({ code }) => code),
  fallbackLng: I18N_CONFIG.FALLBACK,
  detection: {
    order: ["localStorage", "navigator"],
    lookupLocalStorage: I18N_CONFIG.STORAGE_KEY,
    caches: ["localStorage"],
  },
  interpolation: { escapeValue: false },
});

function syncDocument(language) {
  document.documentElement.lang = i18n.resolvedLanguage || language;
  document.title = i18n.t("meta.title");
}
i18n.on("languageChanged", syncDocument);
syncDocument(i18n.language);

export default i18n;
