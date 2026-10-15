import { useTranslation } from "react-i18next";

export default function ProjectPreview({ image, imageAlt, title }) {
  const { t } = useTranslation();
  return <div className="project-window">
    <div className="project-window-bar" aria-hidden="true"><div className="project-window-controls"><span /><span /><span /></div><span className="project-window-title">{title}</span><span className="project-window-spacer" /></div>
    <div className="project-window-content">{image ? <img src={image} alt={imageAlt} loading="lazy" /> : <div className="project-preview-placeholder"><span aria-hidden="true">⌘</span><span>{t("projects.previewSoon")}</span></div>}</div>
  </div>;
}
