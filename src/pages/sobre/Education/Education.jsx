import { useTranslation } from "react-i18next";
import "./Education.css";

export default function Education() {
  const { t } = useTranslation();
  const progress = 20;
  const yearsRemaining = Math.max(0, 2030 - new Date().getFullYear());
  const remaining = yearsRemaining > 0
    ? t("education.remainingYears", { count: yearsRemaining })
    : t("education.graduationYear");

  return (
    <section className="education" aria-labelledby="education-title">
      <div className="education-heading">
        <div>
          <span className="education-kicker">{t("education.kicker")}</span>
          <h2 id="education-title">{t("education.title")}</h2>
        </div>
        <span className="education-status">{t("education.status")}</span>
      </div>
      <div className="education-timeline">
        <div className="education-dates">
          <span>2026</span>
          <strong>{t("education.currentYear")}</strong>
          <span>{t("education.end")}</span>
        </div>
        <div className="education-progress" role="progressbar" aria-label={t("education.progressLabel")} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} aria-valuetext={t("education.progressDescription")}>
          {Array.from({ length: 8 }, (_, index) => (
            <span className="education-semester" key={index} aria-hidden="true">
              <span style={{ width: `${Math.max(0, Math.min(100, progress * 8 - index * 100))}%` }} />
            </span>
          ))}
        </div>
        <div className="education-semester-labels" aria-hidden="true">
          {Array.from({ length: 8 }, (_, index) => <span key={index}>{t("education.semesterShort", { count: index + 1 })}</span>)}
        </div>
        <div className="education-caption">
          <span>{t("education.progress")}</span>
          <span>{remaining}</span>
        </div>
      </div>
      <article className="education-degree">
        <span className="education-marker" aria-hidden="true" />
        <div>
          <h3>{t("education.degree")}</h3>
          <a className="education-school" href="https://www.pucminas.br/" target="_blank" rel="noopener noreferrer">{t("education.institution")}<span className="education-external" aria-hidden="true">↗</span></a>
          <p className="education-period">{t("education.period")}</p>
        </div>
      </article>
    </section>
  );
}
