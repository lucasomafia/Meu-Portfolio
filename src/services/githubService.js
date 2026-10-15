function valid(data) {
  return data?.username === 'lucasomafia' && Array.isArray(data.days) && data.days.length >= 350 && data.days.every(day => /^\d{4}-\d{2}-\d{2}$/.test(day.date) && Number.isInteger(day.level) && day.level >= 0 && day.level <= 4 && Number.isInteger(day.count) && day.count >= 0);
}
export async function loadContributions(signal) {
  for (const url of ['/api/github', '/github-contributions.json']) {
    try {
      const response = await fetch(url, { signal });
      if (!response.ok) continue;
      const data = await response.json();
      if (valid(data)) return { ...data, snapshot: url.endsWith('.json') };
    } catch (error) {
      if (signal.aborted) throw error;
    }
  }
  throw new Error('Contributions unavailable');
}
