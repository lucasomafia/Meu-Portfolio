import { Routes, Route, useLocation } from "react-router-dom";
import SiteHeader from "./components/SiteHeader/SiteHeader";
import LanguageSwitcher from "./components/LanguageSwitcher/LanguageSwitcher";
import Home from "./pages/home/home";
import Projetos from "./pages/projetos/Projetos";
import Sobre from "./pages/sobre/Sobre";
import Curriculo from "./pages/curriculo/Curriculo";
import Contato from "./pages/contato/Contato";


function App() {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== "/" && <SiteHeader />}
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
