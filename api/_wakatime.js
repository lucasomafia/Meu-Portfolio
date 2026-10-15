import process from 'node:process';

const ranges = new Set(['last_7_days', 'last_30_days']);
const cache = new Map();
export class WakaTimeError extends Error {
  constructor(code, status) { super(code); this.code = code; this.status = status; }
}

// Only totals, languages and editors are exposed; never projects, files or tokens.
export function normalizeStats(data) {
  if (!data || !Number.isFinite(data.total_seconds)) throw new WakaTimeError('unavailable', 502);
  const items = values => (Array.isArray(values) ? values : []).filter(item => typeof item.name === 'string' && Number.isFinite(item.total_seconds)).map(item => ({ name: item.name, seconds: Math.max(0, item.total_seconds), percent: Math.min(100, Math.max(0, Number(item.percent) || 0)) }));
  return {
    totalSeconds: Math.max(0, data.total_seconds_including_other_language ?? data.total_seconds),
    languages: items(data.languages), editors: items(data.editors),
    updating: data.is_up_to_date === false, updatedAt: new Date().toISOString(),
  };
}

export async function getWakaTimeStats(range, env = process.env, request = fetch) {
  if (!ranges.has(range)) throw new WakaTimeError('invalid_range', 400);
  const token = env.WAKATIME_ACCESS_TOKEN?.trim();
  if (!token) throw new WakaTimeError('not_configured', 503);
  const previous = cache.get(range);
  if (previous?.token === token && previous.expires > Date.now()) return previous.data;
  let response;
  try {
    response = await request(`https://api.wakatime.com/api/v1/users/current/stats/${range}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      signal: AbortSignal.timeout(10000), redirect: 'error',
    });
  } catch { throw new WakaTimeError('unavailable', 502); }
  if ([401, 403].includes(response.status)) throw new WakaTimeError('authorization_required', 503);
  if (response.status === 429) throw new WakaTimeError('rate_limited', 503);
  if (!response.ok) throw new WakaTimeError('unavailable', 502);
  const payload = await response.json();
  if (!payload.data || !Number.isFinite(payload.data.total_seconds)) {
    if (response.status === 202) throw new WakaTimeError('calculating', 202);
    throw new WakaTimeError('unavailable', 502);
  }
  const data = normalizeStats(payload.data);
  cache.set(range, { token, data, expires: Date.now() + (data.updating ? 30000 : 300000) });
  return data;
}
