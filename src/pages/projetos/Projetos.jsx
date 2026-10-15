import { useTranslation } from "react-i18next";

function Projetos() {
  const { t } = useTranslation();
  return (
    <div style={{ padding: "80px 40px", color: "#fff" }}>
      <h1>{t("pages.projects")}</h1>
    </div>
  );
}

export default Projetos;
