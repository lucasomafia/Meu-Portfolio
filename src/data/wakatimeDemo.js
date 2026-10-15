const sample = (totalSeconds, languages) => ({
  totalSeconds,
  languages: languages.map(([name, percent]) => ({ name, percent, seconds: totalSeconds * percent / 100 })),
  editors: [{ name: 'VS Code' }],
  updating: false,
});

export const wakatimeDemo = {
  7: sample(67200, [['JavaScript', 45], ['Java', 30], ['HTML', 15], ['CSS', 10]]),
  30: sample(274800, [['JavaScript', 40], ['Java', 35], ['HTML', 15], ['CSS', 10]]),
};
