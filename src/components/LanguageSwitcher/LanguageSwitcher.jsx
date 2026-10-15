import { useTranslation } from "react-i18next";
import I18N_CONFIG from "../../config/i18nConfig";
import "./LanguageSwitcher.css";

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  return (
    <div className="language-switcher" role="group" aria-label={t("switcher.label")}>
      {I18N_CONFIG.LANGUAGES.map(({ code, name, short }, index) => (
        <span className="language-option" key={code}>
          {index > 0 && <span className="language-divider" aria-hidden="true">/</span>}
          <button
            type="button"
            lang={code}
            aria-pressed={i18n.resolvedLanguage === code}
            aria-label={t("switcher.changeTo", { language: name })}
            onClick={() => i18n.changeLanguage(code)}
          >
            {short}
          </button>
        </span>
      ))}
    </div>
  );
}
