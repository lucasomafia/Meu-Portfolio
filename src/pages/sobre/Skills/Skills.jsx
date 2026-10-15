import { useTranslation } from "react-i18next";
import SkillsGlobe from "../../../components/3d/SkillsGlobe";
import { skillGroups, skillIcon } from "../../../data/skills";
import "./Skills.css";

export default function Skills() {
  const { t } = useTranslation();
  return <section id="skills" className="skills-section" aria-labelledby="skills-title">
    <div><h2 id="skills-title">Skills</h2><SkillsGlobe /></div>
    <dl className="skills-groups">{skillGroups.map(group => <div className="skills-category" key={group.key}><dt>{t(`about.${group.key}`)}</dt><dd>{group.skills.map(([name, icon]) => <span className="skill-chip" key={name}><span>{name}</span><span className="skill-symbol"><img src={skillIcon(icon)} alt="" /></span></span>)}</dd></div>)}</dl>
  </section>;
}
