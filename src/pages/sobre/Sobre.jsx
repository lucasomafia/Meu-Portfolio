import { useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Education from "./Education/Education";
import Skills from "./Skills/Skills";
import GitHubStats from "./GitHubStats/GitHubStats";
import "./Sobre.css";
import profilePhoto from "../../assets/images/lucas-mafia.png";

const iconUrl = name => `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.7.2/svgs/${name}.svg`;
// Font Awesome Free 6.7.2 icons, CC BY 4.0: https://fontawesome.com/license/free
function ActionIcon({ name }) { return <img src={iconUrl(name)} alt="" width="22" height="22" />; }

export default function Sobre() {
  const { state } = useLocation();
  const { t } = useTranslation();
  return <main className={`sobre${state?.apagouLuzes ? " sobre--aparecer" : ""}`}>
    <div className="sobre-content">
      <div className="about-profile">
        <aside className="about-sidebar">
          <div className="about-photo"><img src={profilePhoto} alt="Lucas Mafia" width="1086" height="1448" /></div>
          <nav className="about-shortcuts" aria-label={t("about.sections")}>
            <a href="#skills">Skills <span aria-hidden="true">↘</span></a>
            <a href="#github-stats">GitHub Stats <span aria-hidden="true">↘</span></a>
            <a href="#education-title">{t("education.title")} <span aria-hidden="true">↘</span></a>
          </nav>
        </aside>
        <div className="about-copy">
          <h1>Lucas Mafia<span className="about-dot">.</span></h1>
          <div className="about-role"><span>{t("about.role")}</span><span aria-hidden="true">/</span><span>{t("about.location")}</span></div>
          <p>{t("about.intro")}</p><p>{t("about.bio")}</p>
          <div className="about-actions">
            <Link className="about-resume" to="/curriculo"><ActionIcon name="regular/file-lines" /><span>{t("nav.resume")}</span></Link>
            <Link className="about-social" to="/contato" aria-label={t("nav.contact")}><ActionIcon name="regular/envelope" /></Link>
            <a className="about-social" href="https://www.instagram.com/lucasomafia_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram @lucasomafia_"><ActionIcon name="brands/instagram" /></a>
            <button type="button" className="about-social" aria-label={t("about.linkedinPending")} title={t("about.linkedinPending")} disabled><ActionIcon name="brands/linkedin-in" /></button>
            <a className="about-social" href="https://github.com/lucasomafia" target="_blank" rel="noreferrer" aria-label="GitHub"><ActionIcon name="brands/github" /></a>
            <a className="about-social" href="https://wa.me/5531987850504" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp +55 31 98785-0504"><ActionIcon name="brands/whatsapp" /></a>
          </div>
        </div>
      </div>
      <Skills /><GitHubStats /><Education />
    </div>
  </main>;
}
