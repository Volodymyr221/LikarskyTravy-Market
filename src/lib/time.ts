// Таймер аукціону для прототипу: кінець = початок поточної доби + N годин.
// Якщо час уже минув — переносимо на 3 доби вперед, щоб лоти завжди були «живі».
export function auctionEnd(endsInHours: number, now = Date.now()): number {
  const d = new Date(now);
  d.setHours(0, 0, 0, 0);
  let end = d.getTime() + endsInHours * 3_600_000;
  while (end <= now) end += 72 * 3_600_000;
  return end;
}

export function splitDuration(ms: number) {
  const t = Math.max(0, Math.floor(ms / 1000));
  return { d: Math.floor(t / 86400), h: Math.floor((t % 86400) / 3600), m: Math.floor((t % 3600) / 60), s: t % 60 };
}
