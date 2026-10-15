import { useTranslation } from "react-i18next";
import { projetos } from "../../data/projetos";
import ProjectPreview from "./ProjectPreview";
import "./Projetos.css";

export default function Projetos() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language).startsWith("pt") ? "pt" : "en";
  return <main className="projects-page"><div className="projects-content">
    <header className="projects-intro"><span className="projects-eyebrow">{t("nav.projects")}</span><h1>{t("projects.title")}<span>.</span></h1><p>{t("projects.intro")}</p></header>
    <div className="projects-list">{projetos.map((project, index) => {
      const text = project[lang];
      return <article className="project-row" key={project.id} aria-labelledby={`project-${project.id}`}>
        <ProjectPreview image={project.image} imageAlt={text.imageAlt} title={text.title} />
        <div className="project-copy"><span className="project-index">{String(index + 1).padStart(2, "0")}</span><h2 id={`project-${project.id}`}>{text.title}</h2><p className="project-category">{text.category}</p>
          {project.technologies.length > 0 && <ul className="project-technologies" aria-label={t("projects.technologies")}>{project.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul>}
          <p className="project-description">{text.description}</p>
          {(project.repository || project.website) && <div className="project-links">
            {project.repository && <a href={project.repository} target="_blank" rel="noopener noreferrer"><img src="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.7.2/svgs/brands/github.svg" alt="" width="18" height="18" />{t("projects.code")}<span aria-hidden="true">↗</span></a>}
            {project.website && <a href={project.website} target="_blank" rel="noopener noreferrer">{t("projects.visit")}<span aria-hidden="true">↗</span></a>}
          </div>}
        </div>
      </article>;
    })}</div>
  </div></main>;
}
