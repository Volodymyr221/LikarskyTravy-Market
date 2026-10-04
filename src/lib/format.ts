const nf = new Intl.NumberFormat("uk-UA");

export const num = (n: number) => nf.format(n);
export const uah = (n: number) => `${nf.format(n)} ₴`;

/** Коротко для великих сум: 1 012 000 → «1 млн ₴», 237 600 → «238 тис. ₴» */
export const uahShort = (n: number) =>
  n >= 1_000_000 ? `${new Intl.NumberFormat("uk-UA", { maximumFractionDigits: 1 }).format(n / 1_000_000)} млн ₴`
  : n >= 10_000 ? `${nf.format(Math.round(n / 1000))} тис. ₴` : uah(n);

export const priceRange = ([a, b]: [number, number]) => `${a}–${b} ₴/кг`;

/** 1500 → «1,5 т», 340 → «340 кг» */
export const weight = (kg: number) =>
  kg >= 1000 ? `${new Intl.NumberFormat("uk-UA", { maximumFractionDigits: 1 }).format(kg / 1000)} т` : `${nf.format(kg)} кг`;

/** Дохід, який можна заробити на заявці: обсяг × ціна */
export const potential = (tonnes: number, pricePerKg: number) => tonnes * 1000 * pricePerKg;

export const plural = (n: number, one: string, few: string, many: string) => {
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
  return many;
};
