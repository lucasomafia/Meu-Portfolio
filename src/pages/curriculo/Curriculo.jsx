import { useTranslation } from "react-i18next";

export default function Curriculo() {
  const { t } = useTranslation();
  return <main className="internal-page"><h1>{t("pages.resume")}</h1></main>;
}
