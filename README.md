# Meu Portfolio

Bem-vindo ao código-fonte do meu site pessoal!

Sou Lucas Otávio Costa Mafia, estudante de Engenharia de Software na PUC Minas. Este portfólio apresenta minha trajetória, conhecimentos, projetos e formas de contato.

O site está organizado nas seguintes seções:

- **Início** — Página de boas-vindas com um quarto 3D interativo e uma transição para a apresentação pessoal.
- **Sobre mim** — Apresentação em português e inglês, habilidades, formação e estatísticas de atividade.
- **Projetos** — Projetos acadêmicos e profissionais, com imagens, descrições, tecnologias, datas e links para os repositórios.
- **Currículo** — Resumo profissional, experiências, formação e habilidades, com download do PDF em português ou inglês.
- **Contato** — Links de contato e formulário para envio de mensagens pelo EmailJS.

O projeto faz parte do Laboratório 01 — Portfólio Profissional, da disciplina Desenvolvimento e Integração de Aplicações Web, ministrada pelo professor João Paulo Carneiro Aramuni.

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

- `api` — Funções de servidor para consultar as contribuições do GitHub e as estatísticas do WakaTime.
- `docs` — Documentação de configuração e imagens dos protótipos.
- `docs/prototipos` — Wireframes das cinco páginas.
- `public` — Arquivos públicos servidos diretamente, incluindo os PDFs do currículo e uma cópia salva das contribuições do GitHub.
- `src/assets/images` — Foto pessoal e capturas dos projetos.
- `src/components` — Componentes compartilhados entre páginas.
- `src/components/3d` — Quarto, globo de habilidades e mapa de contribuições.
- `src/components/LanguageSwitcher` — Seletor de idioma EN/PT.
- `src/components/SiteHeader` — Menu das páginas internas.
- `src/config` — Configuração de idiomas, EmailJS e modo demonstrativo do WakaTime.
- `src/data` — Conteúdo dos projetos, currículo, habilidades, contatos e dados demonstrativos.
- `src/i18n` — Inicialização da internacionalização e arquivos de tradução.
- `src/pages` — Páginas Início, Sobre mim, Projetos, Currículo e Contato, com seus estilos e componentes exclusivos.
- `src/services` — Comunicação com as integrações externas.
- `src/App.jsx` — Definição das rotas e composição principal.
- `src/main.jsx` — Inicialização da aplicação React.
- `src/index.css` — Estilos globais.
- `vite.config.js` — Configuração do Vite e das rotas de API no ambiente local.

---

## Instalação e execução

### Pré-requisitos

- Node.js 20.19 ou superior na linha 20, ou Node.js 22.12 ou superior.
- npm e Git instalados.

### Instalação

```bash
git clone https://github.com/lucasomafia/Meu-Portfolio.git
cd Meu-Portfolio
npm ci
```

Na primeira instalação, copie o arquivo de exemplo para criar sua configuração local. Se `.env.local` já existir, preserve seus valores.

```bash
cp .env.example .env.local
```

### Variáveis de ambiente

Preencha `.env.local` com os dados das integrações:

```env
VITE_EMAILJS_SERVICE_ID=seu_service_id
VITE_EMAILJS_TEMPLATE_ID=seu_template_id
VITE_EMAILJS_PUBLIC_KEY=sua_public_key
WAKATIME_ACCESS_TOKEN=seu_token_oauth
```

O arquivo `.env.local` não é versionado. O token privado do WakaTime é utilizado apenas no servidor e não deve receber o prefixo `VITE_`. O EmailJS utiliza uma chave pública própria para o navegador; não utilize a Private Key no front-end.

Consulte o [guia do EmailJS](docs/emailjs.md) para configurar o serviço e o template. Sem essa configuração, o formulário não envia mensagens.

O WakaTime está em modo demonstrativo. Para exibir seus dados reais, configure o token OAuth e altere `WAKATIME_DEMO` para `false` em `src/config/wakatimeConfig.js`. O token é opcional enquanto o modo demonstrativo estiver ativo.

### Executar localmente

```bash
npm run dev
```

Abra o endereço informado no terminal. Para utilizar a porta 5180:

```bash
npm run dev -- --host 127.0.0.1 --port 5180
```

### Comandos disponíveis

- `npm run dev` — Inicia o ambiente de desenvolvimento.
- `npm run build` — Gera a versão de produção na pasta `dist`.
- `npm run preview` — Serve o build para conferência local.
- `npm run lint` — Analisa o código com ESLint.

O projeto ainda não possui uma suíte automatizada de testes. A verificação atual combina build, lint e testes manuais de navegação, idioma, downloads e envio do formulário.

---

## Integrações e manutenção

A aplicação utiliza React Router no front-end e funções de servidor para GitHub e WakaTime. No ambiente local, essas funções são atendidas pelos middlewares do Vite. Os handlers em `api` também estão preparados no formato de funções da Vercel. Não há banco de dados.

- **GitHub** — Exibe contribuições públicas e utiliza `public/github-contributions.json` como alternativa quando a consulta está indisponível. Nesse caso, a interface informa que os dados são salvos.
- **Projetos** — As datas dos últimos commits foram verificadas nos repositórios e cadastradas em `src/data/projetos.js`. A ordenação é calculada a partir dessas datas; elas não são sincronizadas automaticamente com o GitHub.
- **EmailJS** — Envia mensagens pelo formulário. O destinatário e o conteúdo do e-mail são configurados no template da conta EmailJS.
- **Idiomas** — O seletor EN/PT está disponível em todas as páginas e mantém a preferência do visitante.

Para adicionar projetos, inclua novos objetos em `src/data/projetos.js`, informe `lastCommitAt` e adicione as capturas em `src/assets/images/projetos`.

Os contatos ficam em `src/data/contact.js`. As traduções gerais ficam em `src/i18n/locales`; o conteúdo bilíngue do currículo fica em `src/data/curriculo.js` e o dos projetos em `src/data/projetos.js`.

---

## Protótipos

Os wireframes abaixo representam a organização das páginas em baixa fidelidade. A versão de média fidelidade no Figma ainda precisa ser documentada para a entrega do laboratório.

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

---

## Publicação

A publicação em nuvem está pendente. O endereço do site será adicionado aqui após o deploy.

O projeto está preparado para a Vercel. Ao importar este repositório, utilize a raiz do projeto, o preset Vite, o comando `npm run build` e a saída `dist`. O arquivo `vercel.json` configura o build e o acesso direto às páginas sem interferir nas funções de `api`.

Cadastre `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID` e `VITE_EMAILJS_PUBLIC_KEY` nas variáveis de ambiente da Vercel antes do build. Para ativar dados reais do WakaTime, cadastre também `WAKATIME_ACCESS_TOKEN` apenas no servidor e desative o modo demonstrativo. Não versione o arquivo `.env.local`.

---

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
