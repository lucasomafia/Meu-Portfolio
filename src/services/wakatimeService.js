export async function loadWakaTimeStats(days, signal) {
  const response = await fetch(`/api/wakatime?range=last_${days}_days`, { signal });
  let data;
  try { data = await response.json(); }
  catch { throw new Error('unavailable'); }
  if (!response.ok || data.error) throw new Error(data.error || 'unavailable');
  if (!Number.isFinite(data.totalSeconds) || !Array.isArray(data.languages) || !Array.isArray(data.editors)) throw new Error('unavailable');
  return data;
}
export function formatCodingTime(seconds) {
  const minutes = Math.floor(Math.max(0, seconds) / 60);
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}
