import { getWakaTimeStats } from './_wakatime.js';

export default async function handler(request, response) {
  const range = new URL(request.url, 'http://localhost').searchParams.get('range') || 'last_7_days';
  response.setHeader('Cache-Control', 'no-store');
  try { response.status(200).json(await getWakaTimeStats(range)); }
  catch (error) { response.status(error.status || 502).json({ error: error.code || 'unavailable' }); }
}
