const username = 'lucasomafia';
let cached;
let cachedAt = 0;

export function parseContributions(html) {
  const counts = new Map();
  for (const match of html.matchAll(/<tool-tip\b([^>]*)>([\s\S]*?)<\/tool-tip>/g)) {
    const id = match[1].match(/\bfor="([^"]+)"/)?.[1];
    const text = match[2].replace(/<[^>]*>/g, '').trim();
    const count = text.startsWith('No contributions') ? 0 : Number(text.match(/^([\d,]+) contribution/)?.[1]?.replaceAll(',', ''));
    if (id && Number.isFinite(count)) counts.set(id, count);
  }
  const days = [];
  for (const match of html.matchAll(/<td\b([^>]*\bdata-date="[^"]+"[^>]*)>/g)) {
    const attributes = match[1];
    const date = attributes.match(/\bdata-date="(\d{4}-\d{2}-\d{2})"/)?.[1];
    const id = attributes.match(/\bid="([^"]+)"/)?.[1];
    const level = Number(attributes.match(/\bdata-level="([0-4])"/)?.[1]);
    if (date && counts.has(id) && Number.isInteger(level)) days.push({ date, count: counts.get(id), level });
  }
  days.sort((a, b) => a.date.localeCompare(b.date));
  if (days.length < 350) throw new Error('Invalid GitHub contribution calendar');
  return { username, days, total: days.reduce((sum, day) => sum + day.count, 0), updatedAt: new Date().toISOString() };
}

export async function getContributions() {
  if (cached && Date.now() - cachedAt < 600000) return cached;
  const response = await fetch(`https://github.com/users/${username}/contributions`, {
    headers: { Accept: 'text/html', 'User-Agent': 'LucasMafia-Portfolio' },
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
  cached = parseContributions(await response.text()); cachedAt = Date.now();
  return cached;
}
