export const skillGroups = [
  { key: "languages", skills: [["HTML", "html5"], ["CSS", "css3"], ["Python", "python"], ["Java", "java"], ["JavaScript", "javascript"]] },
  { key: "frameworks", skills: [["Spring Boot", "spring"], ["React", "react"], ["Vite", "vitejs"]] },
  { key: "tools", skills: [["Git", "git"], ["GitHub", "github"], ["Figma", "figma"], ["VS Code", "vscode"]] },
];
export const skills = skillGroups.flatMap(group => group.skills);
export const skillIcon = icon => `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/${icon}/${icon}-original.svg`;
