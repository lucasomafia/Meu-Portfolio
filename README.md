# Meu Portfolio

Bem-vindo ao código-fonte do meu site pessoal!

Sou Lucas Otávio Costa Mafia, estudante de Engenharia de Software na PUC Minas. Este portfólio apresenta minha trajetória, conhecimentos, projetos e formas de contato.

Acesse o site: [lucasmaf.ia.br](https://lucasmaf.ia.br).

O site está organizado nas seguintes seções:

- **Início** — Página de boas-vindas com um quarto 3D interativo e uma transição para a apresentação pessoal.
- **Sobre mim** — Apresentação em português e inglês, habilidades, formação e estatísticas de atividade.
- **Projetos** — Projetos acadêmicos e profissionais, com imagens, descrições, tecnologias, datas e links para os repositórios.
- **Currículo** — Resumo profissional, experiências, formação e habilidades, com download do PDF em português ou inglês.
- **Contato** — Links de contato e formulário para envio de mensagens pelo EmailJS.

---

## Tecnologias

O projeto foi desenvolvido com:

- **React** — Construção da interface com componentes.
- **JavaScript** — Lógica da aplicação e das interações.
- **CSS** — Estilização, responsividade e animações.
- **Vite** — Servidor de desenvolvimento e geração do build de produção.

As seguintes bibliotecas são utilizadas em funcionalidades específicas:

- **React DOM** — Renderização da aplicação no navegador.
- **React Router DOM** — Navegação entre as páginas.
- **Three.js** — Renderização do quarto 3D da página inicial.
- **React Three Fiber** — Integração entre React e Three.js.
- **React Three Drei** — Utilitários disponíveis para a cena 3D.
- **i18next e react-i18next** — Traduções em português e inglês.
- **i18next Browser Language Detector** — Detecção e persistência da preferência de idioma.
- **EmailJS Browser** — Envio das mensagens do formulário de contato.

O desenvolvimento também utiliza **ESLint**, seus plugins para React Hooks e React Refresh, e o plugin oficial de React para Vite. A lista completa das dependências e versões está no [package.json](package.json); as versões instaladas estão no [package-lock.json](package-lock.json).

A interface utiliza a fonte **Space Grotesk** e ícones do **Font Awesome Free** e **Devicon**. O globo de habilidades usa Canvas 2D com projeção espacial, e o mapa de contribuições utiliza SVG com projeção 3D.

---

## Instalação e execução

### Pré-requisitos

- Node.js 22.12 ou superior.
- npm e Git instalados.

### Baixar o projeto

```bash
git clone https://github.com/lucasomafia/Meu-Portfolio.git
cd Meu-Portfolio
```

### Instalar as dependências

```bash
npm ci
```

### Configurar o ambiente

Copie o arquivo `.env.example` para um novo arquivo chamado `.env.local`, na raiz do projeto. Se ele já existir, preserve os valores configurados.

Para habilitar o formulário de contato, preencha as variáveis com os dados da sua conta EmailJS:

```env
VITE_EMAILJS_SERVICE_ID=seu_service_id
VITE_EMAILJS_TEMPLATE_ID=seu_template_id
VITE_EMAILJS_PUBLIC_KEY=sua_chave_publica
```

Consulte o [guia de configuração do EmailJS](docs/emailjs.md) para mais detalhes. Utilize somente a chave pública do serviço.

O WakaTime está em modo demonstrativo e não exige configuração para executar o projeto.

### Executar localmente

```bash
npm run dev
```

Abra no navegador o endereço informado no terminal.

### Gerar a versão de produção

```bash
npm run build
```

Os arquivos gerados ficam na pasta `dist`.

Para visualizar essa versão localmente:

```bash
npm run preview
```

### Verificar o código

```bash
npm run lint
```

---

## Estrutura de diretórios

O projeto está organizado da seguinte forma:

```text
meu-portfolio/
├── api/
│   ├── _github.js
│   ├── _wakatime.js
│   ├── github.js
│   └── wakatime.js
├── docs/
│   ├── prototipos/
│   │   ├── 01-inicio.png
│   │   ├── 02-sobre-mim.png
│   │   ├── 03-curriculo.png
│   │   ├── 04-projetos.png
│   │   └── 05-contato.png
│   └── emailjs.md
├── public/
│   ├── curriculos/
│   │   ├── Lucas_Otavio_Costa_Mafia_Curriculo_PT.pdf
│   │   └── Lucas_Otavio_Costa_Mafia_Resume_EN.pdf
│   └── github-contributions.json
├── src/
│   ├── assets/
│   │   └── images/
│   │       ├── projetos/
│   │       │   ├── casa-limpa.png
│   │       │   └── monitoramento-queimadas.png
│   │       └── lucas-mafia.png
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── ContributionSkyline.jsx
│   │   │   ├── drawSkyline.js
│   │   │   ├── Quarto3D.jsx
│   │   │   ├── SkillsGlobe.css
│   │   │   └── SkillsGlobe.jsx
│   │   ├── LanguageSwitcher/
│   │   │   ├── LanguageSwitcher.css
│   │   │   └── LanguageSwitcher.jsx
│   │   └── SiteHeader/
│   │       └── SiteHeader.jsx
│   ├── config/
│   │   ├── emailjsConfig.js
│   │   ├── i18nConfig.js
│   │   └── wakatimeConfig.js
│   ├── data/
│   │   ├── contact.js
│   │   ├── curriculo.js
│   │   ├── projetos.js
│   │   ├── skills.js
│   │   └── wakatimeDemo.js
│   ├── i18n/
│   │   ├── locales/
│   │   │   ├── en/
│   │   │   │   └── translation.json
│   │   │   └── pt-BR/
│   │   │       └── translation.json
│   │   └── index.js
│   ├── pages/
│   │   ├── contato/
│   │   │   ├── Contato.css
│   │   │   └── Contato.jsx
│   │   ├── curriculo/
│   │   │   ├── Curriculo.css
│   │   │   └── Curriculo.jsx
│   │   ├── home/
│   │   │   ├── Home.css
│   │   │   └── home.jsx
│   │   ├── projetos/
│   │   │   ├── ProjectPreview.jsx
│   │   │   ├── Projetos.css
│   │   │   └── Projetos.jsx
│   │   └── sobre/
│   │       ├── Education/
│   │       │   ├── Education.css
│   │       │   └── Education.jsx
│   │       ├── GitHubStats/
│   │       │   ├── GitHubStats.css
│   │       │   ├── GitHubStats.jsx
│   │       │   └── WakaTimeStats.jsx
│   │       ├── Skills/
│   │       │   ├── Skills.css
│   │       │   └── Skills.jsx
│   │       ├── Sobre.css
│   │       └── Sobre.jsx
│   ├── services/
│   │   ├── contactService.js
│   │   ├── githubService.js
│   │   └── wakatimeService.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.example
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── vercel.json
└── vite.config.js
```

## Protótipos

### Início

![Wireframe da página Início](docs/prototipos/01-inicio.png)

### Sobre mim

![Wireframe da página Sobre mim](docs/prototipos/02-sobre-mim.png)

### Currículo

![Wireframe da página Currículo](docs/prototipos/03-curriculo.png)

### Projetos

![Wireframe da página Projetos](docs/prototipos/04-projetos.png)

### Contato

![Wireframe da página Contato](docs/prototipos/05-contato.png)

## Referências

- [Materiais da disciplina — João Paulo Aramuni](https://github.com/joaopauloaramuni/desenvolvimento-e-integracao-de-aplicacoes-web).
- [SkillsGlobe](https://github.com/joaopauloaramuni/desenvolvimento-e-integracao-de-aplicacoes-web/tree/main/PROJETOS/React/SkillsGlobe) — Referência para o globo de habilidades.
- [Internacionalizacao_i18n](https://github.com/joaopauloaramuni/desenvolvimento-e-integracao-de-aplicacoes-web/tree/main/PROJETOS/React/Internacionalizacao_i18n) — Referência para a configuração de idiomas.
- [WakaTimeAPI](https://github.com/joaopauloaramuni/desenvolvimento-e-integracao-de-aplicacoes-web/tree/main/PROJETOS/React/WakaTimeAPI) — Referência para a integração de atividade.
- [Contribution Skyline](https://21st.dev/@kedhareswer?preview=%2F%40kedhareswer%2Fcomponents%2Fcontribution-skyline) — Referência visual para as contribuições em 3D.
- [Font Awesome Free](https://fontawesome.com/license/free) e [Devicon](https://devicon.dev/) — Ícones utilizados no site.

## Autor

**Lucas Otávio Costa Mafia** — estudante de Engenharia de Software na PUC Minas.

[GitHub](https://github.com/lucasomafia) · [Instagram](https://www.instagram.com/lucasomafia_/) · [E-mail](mailto:lucasomafia@gmail.com)
