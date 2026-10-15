import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function SiteHeader() {
  const { t } = useTranslation();
  return <header className="site-header">
    <nav className="menu" aria-label={t("nav.label")}>
      <NavLink to="/">{t("nav.home")}</NavLink>
      <NavLink to="/sobre">{t("nav.me")}</NavLink>
      <NavLink to="/curriculo">{t("nav.resume")}</NavLink>
      <NavLink to="/projetos">{t("nav.projects")}</NavLink>
      <NavLink to="/contato">{t("nav.contact")}</NavLink>
    </nav>
  </header>;
}
