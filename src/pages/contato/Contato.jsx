import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { contact } from "../../data/contact";
import { sendContactMessage } from "../../services/contactService";
import "./Contato.css";

// Font Awesome Free 6.7.2 icons (CC BY 4.0): https://fontawesome.com/license/free
function ContactIcon({ name }) {
  return <img src={`https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.7.2/svgs/${name}.svg`} alt="" width="23" height="23" />;
}

export default function Contato() {
  const { t } = useTranslation();
  const [status, setStatus] = useState("idle");
  const sendingRef = useRef(false);
  const sending = status === "sending";

  async function submitMessage(event) {
    event.preventDefault();
    if (sendingRef.current) return;
    const form = event.currentTarget;
    for (const field of form.querySelectorAll("input, textarea")) {
      field.setCustomValidity(field.value.trim() ? "" : t("contact.required"));
    }
    if (!form.reportValidity()) return;
    const fields = new FormData(form);
    sendingRef.current = true;
    setStatus("sending");
    try {
      await sendContactMessage(Object.fromEntries(fields));
      form.reset();
      setStatus("success");
    } catch (error) {
      setStatus(error.message === "not_configured" ? "unavailable" : error.status === 429 ? "rateLimited" : "error");
    } finally {
      sendingRef.current = false;
    }
  }

  return <main className="contact-page">
    <div className="contact-content">
      <header className="contact-intro">
        <span className="contact-eyebrow">{t("pages.contact")}</span>
        <h1>{t("contact.title")}<span>.</span></h1>
        <p>{t("contact.intro")}</p>
      </header>
      <div className="contact-layout">
        <aside className="contact-details" aria-label={t("contact.details")}>
          <div className="contact-availability"><span aria-hidden="true" />{t("contact.available")}</div>
          <a className="contact-info" href={`mailto:${contact.email}`}>
            <span className="contact-icon"><ContactIcon name="regular/envelope" /></span>
            <span className="contact-info-copy"><span className="contact-label">{t("contact.email")}</span><strong>{contact.email}</strong></span>
            <span className="contact-card-arrow" aria-hidden="true">↗</span>
          </a>
          <div className="contact-info">
            <span className="contact-icon"><ContactIcon name="solid/location-dot" /></span>
            <span className="contact-info-copy"><span className="contact-label">{t("contact.locationLabel")}</span><strong>{t("about.location")}</strong></span>
          </div>
          <div className="contact-socials" aria-label={t("contact.socials")}>
            {contact.socials.map(social => <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}><ContactIcon name={social.icon} /><span>{social.name}</span><span aria-hidden="true">↗</span></a>)}
            <span className="contact-social-placeholder"><ContactIcon name="brands/linkedin-in" /><span>LinkedIn</span><span className="contact-social-arrow" aria-hidden="true">↗</span></span>
          </div>
          <p className="contact-language-note">{t("contact.languages")}</p>
        </aside>
        <form className="contact-form" onSubmit={submitMessage} aria-busy={sending} onChange={event => {
          event.target.setCustomValidity?.("");
          if (status !== "sending") setStatus("idle");
        }}>
          <div className="contact-form-row">
            <label htmlFor="contact-name">{t("contact.name")}<input disabled={sending} id="contact-name" name="name" autoComplete="name" required maxLength={100} pattern=".*\S.*" placeholder={t("contact.namePlaceholder")} /></label>
            <label htmlFor="contact-email">{t("contact.email")}<input disabled={sending} id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder={t("contact.emailPlaceholder")} /></label>
          </div>
          <label htmlFor="contact-subject">{t("contact.subject")}<input disabled={sending} id="contact-subject" name="subject" required maxLength={160} pattern=".*\S.*" placeholder={t("contact.subjectPlaceholder")} /></label>
          <label htmlFor="contact-message">{t("contact.message")}<textarea disabled={sending} id="contact-message" name="message" required maxLength={3000} rows={7} placeholder={t("contact.messagePlaceholder")} /></label>
          <button className="contact-submit" type="submit" disabled={sending}><span>{t(sending ? "contact.sending" : "contact.submit")}</span><span aria-hidden="true">↗</span></button>
          <p className="contact-form-note">{t("contact.emailNotice")}</p>
          {["success", "error", "unavailable", "rateLimited"].includes(status) && <div className={`contact-send-status contact-send-status--${status}`} role={status === "success" ? "status" : "alert"}>{t(`contact.${status}`)}</div>}
        </form>
      </div>
    </div>
  </main>;
}
