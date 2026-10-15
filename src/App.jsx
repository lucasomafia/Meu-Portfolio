import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./components/LanguageSwitcher/LanguageSwitcher";
import Home from "./pages/home/home";
import Projetos from "./pages/projetos/Projetos";
import Sobre from "./pages/sobre/Sobre";
import Curriculo from "./pages/curriculo/Curriculo";
import Contato from "./pages/contato/Contato";


function App() {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  return (
    <>
      {pathname !== "/" && (
        <header className="site-header">
          <nav className="menu" aria-label={t("nav.label")}>
            <NavLink to="/">{t("nav.home")}</NavLink>
            <NavLink to="/sobre">{t("nav.me")}</NavLink>
            <NavLink to="/curriculo">{t("nav.resume")}</NavLink>
            <NavLink to="/projetos">{t("nav.projects")}</NavLink>
            <NavLink to="/contato">{t("nav.contact")}</NavLink>
          </nav>
        </header>
      )}
      <LanguageSwitcher />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projetos" element={<Projetos />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/curriculo" element={<Curriculo />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>
    </>
  );
}

export default App;
