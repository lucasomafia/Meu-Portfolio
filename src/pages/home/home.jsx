import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Quarto3D from "../../components/Quarto3D";
import "./Home.css";

function Home() {
  const [entrando, setEntrando] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  function iniciar() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      navigate("/sobre");
      return;
    }
    setEntrando(true);
  }

  return (
    <div className={`home${entrando ? " home--entrando" : ""}`} aria-busy={entrando}>
      <Quarto3D entrando={entrando} />
      <div className="home-composicao">
      <h1 className="titulo">{t("home.welcome")}</h1>
      <button className="get-started" type="button" onClick={iniciar} disabled={entrando}>
        {t("home.start")}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
      </div>
      {entrando && (
        <div
          className="home-escurecer"
          aria-hidden="true"
          onAnimationEnd={() => navigate("/sobre", { state: { apagouLuzes: true } })}
        />
      )}
    </div>
  );
}

export default Home;
