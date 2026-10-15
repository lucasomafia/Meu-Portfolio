import { getContributions } from './_github.js';

// Vercel serverless endpoint. No GitHub token is needed for public contributions.
export default async function handler(_request, response) {
  try {
    const data = await getContributions();
    response.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=3600');
    response.status(200).json(data);
  } catch {
    response.status(502).json({ error: 'GitHub contributions temporarily unavailable' });
  }
}
