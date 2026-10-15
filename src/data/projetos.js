import casaLimpaPreview from '../assets/images/projetos/casa-limpa.png';
import queimadasPreview from '../assets/images/projetos/monitoramento-queimadas.png';

// Add new objects here to display more projects. Only supplied URLs are linked.
export const projetos = [
  {
    id: 'monitoramento-queimadas',
    image: queimadasPreview,
    technologies: ['HTML', 'CSS', 'JavaScript'],
    repository: 'https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2026-1-ti1-0427100-firefighter-radar',
    website: null,
    pt: {
      title: 'Firefighter Radar',
      category: 'Projeto acadêmico · Aplicação web',
      description: 'Aplicação web desenvolvida em equipe para o monitoramento de queimadas e a mobilização de voluntários. Participei do desenvolvimento com HTML, CSS e JavaScript, utilizando Git e GitHub para versionamento e Scrum na organização do trabalho.',
      imageAlt: 'Página do projeto com uma floresta ao fundo e a chamada Tornando a natureza mais segura',
    },
    en: {
      title: 'Firefighter Radar',
      category: 'Academic project · Web application',
      description: 'A web application built as a team to support wildfire monitoring and volunteer mobilization. I contributed to development with HTML, CSS and JavaScript, using Git and GitHub for version control and Scrum to organize the work.',
      imageAlt: 'Project homepage with a forest background and a headline about making nature safer',
    },
  },
  {
    id: 'casa-limpa',
    image: casaLimpaPreview,
    technologies: ['HTML', 'CSS', 'JavaScript'],
    repository: 'https://github.com/lucasomafia/Casa-Limpa-produtos-de-limpeza',
    website: null,
    pt: {
      title: 'Casa Limpa',
      category: 'Freelance · Site institucional',
      description: 'Site institucional desenvolvido individualmente para a Casa Limpa, empresa de produtos de limpeza. O projeto apresenta a empresa e seus produtos, com acesso ao contato pelo WhatsApp. Desenvolvido com HTML, CSS e JavaScript.',
      imageAlt: 'Página inicial da Casa Limpa, com menu azul, produtos de limpeza e botão de contato pelo WhatsApp',
    },
    en: {
      title: 'Casa Limpa',
      category: 'Freelance · Business website',
      description: 'A business website independently developed for Casa Limpa, a cleaning products company. The project introduces the company and its products, with a direct WhatsApp contact link. Built with HTML, CSS and JavaScript.',
      imageAlt: 'Casa Limpa homepage with a blue navigation bar, cleaning products and a WhatsApp contact button',
    },
  },
];
