import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Quarto3D from "../../components/3d/Quarto3D";
import SiteHeader from "../../components/SiteHeader/SiteHeader";
import Sobre from "../sobre/Sobre";
import "./Home.css";

function Home() {
  const [entrando, setEntrando] = useState(false);
  const [deslizando, setDeslizando] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (!entrando) return;
    const timer = setTimeout(() => setDeslizando(true), 2200);
    return () => clearTimeout(timer);
  }, [entrando]);

  function concluir() {
    window.scrollTo({ top: 0, behavior: "instant" });
    navigate("/sobre");
  }

  function iniciar() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      navigate("/sobre");
      return;
    }
    setEntrando(true);
  }

  return (
    <div className={`home${entrando ? " home--entrando" : ""}${deslizando ? " home--deslizando" : ""}`} aria-busy={entrando}>
      {deslizando && <div className="home-destino" inert aria-hidden="true"><SiteHeader /><Sobre /></div>}
      <div className="home-cena">
      <div className="home-quarto" onAnimationEnd={event => {
        if (event.target === event.currentTarget && event.animationName === "home-elemento-sair") concluir();
      }}><Quarto3D entrando={entrando} /></div>
      <div className="home-composicao">
      <h1 className="titulo">{t("home.welcome")}</h1>
      <button className="get-started" type="button" onClick={iniciar} disabled={entrando}>
        {t("home.start")}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
      </div>
      </div>
    </div>
  );
}

export default Home;
