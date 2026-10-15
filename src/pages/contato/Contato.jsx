import { useTranslation } from "react-i18next";

export default function Contato() {
  const { t } = useTranslation();
  return <main className="internal-page"><h1>{t("pages.contact")}</h1></main>;
}
