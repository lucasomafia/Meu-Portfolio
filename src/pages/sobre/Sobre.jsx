import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Sobre.css";

function Sobre() {
  const { state } = useLocation();
  const { t } = useTranslation();

  return (
    <div className={state?.apagouLuzes ? "sobre sobre--aparecer" : "sobre"}>
      <h1>{t("pages.me")}</h1>
    </div>
  );
}

export default Sobre;
