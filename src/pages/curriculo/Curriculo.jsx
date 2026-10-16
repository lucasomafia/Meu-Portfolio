import { useTranslation } from "react-i18next";
import "./Curriculo.css";
import { resumeContent } from "../../data/curriculo";


export default function Curriculo() {
  const { i18n } = useTranslation();
  const language = (i18n.resolvedLanguage || i18n.language || "pt").startsWith("en") ? "en" : "pt";
  const resume = resumeContent[language];
  const filename = language === "en" ? "Lucas_Otavio_Costa_Mafia_Resume_EN.pdf" : "Lucas_Otavio_Costa_Mafia_Curriculo_PT.pdf";
  return (
    <main className="resume-page" lang={language === "pt" ? "pt-BR" : "en"}>
      <div className="resume-toolbar">
        <a className="resume-download" href={`${import.meta.env.BASE_URL}curriculos/${filename}`} download={filename}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" /></svg>
          {resume.download}
        </a>
      </div>
      <article className="resume-document">
        <header>
          <h1>Lucas Otávio Costa Mafia</h1>
          <p>{resume.role} | {resume.location}</p>
          <div className="resume-contacts">
            <a href="mailto:lucasomafia@gmail.com">lucasomafia@gmail.com</a>
            <a href="tel:+5531987850504">+55 31 98785-0504</a>
            <a href="https://lucasmaf.ia.br" target="_blank" rel="noopener noreferrer">lucasmaf.ia.br</a>
            <a href="https://github.com/lucasomafia">GitHub</a>
            <a href="https://www.instagram.com/lucasomafia_/">Instagram</a>
          </div>
        </header>
        {resume.sections.map(([title, items]) => (
          <section key={title}>
            <h2>{title}</h2>
            {items.map((item) => typeof item === "string" ? <p key={item}>{item}</p> : (
              <div key={item.title}>
                <div className="resume-entry-heading"><h3>{item.title}</h3>{item.date && <span>{item.date}</span>}</div>
                {item.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            ))}
          </section>
        ))}
      </article>
    </main>
  );
}
