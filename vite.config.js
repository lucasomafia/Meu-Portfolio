import react from '@vitejs/plugin-react'
import process from 'node:process'
import { getWakaTimeStats } from './api/_wakatime.js'
import { defineConfig, loadEnv } from 'vite'
import { getContributions } from './api/_github.js'

function githubApi() {
  const configure = server => server.middlewares.use('/api/github', async (_request, response) => {
    response.setHeader('Content-Type', 'application/json');
    try { response.end(JSON.stringify(await getContributions())); }
    catch { response.statusCode = 502; response.end(JSON.stringify({ error: 'GitHub unavailable' })); }
  });
  return { name: 'github-contributions', configureServer: configure, configurePreviewServer: configure };
}

function wakatimeApi(env) {
  const configure = server => server.middlewares.use('/api/wakatime', async (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Cache-Control', 'no-store');
    const range = new URL(request.url, 'http://localhost').searchParams.get('range') || 'last_7_days';
    try { response.end(JSON.stringify(await getWakaTimeStats(range, env))); }
    catch (error) { response.statusCode = error.status || 502; response.end(JSON.stringify({ error: error.code || 'unavailable' })); }
  });
  return { name: 'wakatime-stats', configureServer: configure, configurePreviewServer: configure };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), 'WAKATIME_'), ...process.env };
  return { plugins: [react(), githubApi(), wakatimeApi(env)] };
})
