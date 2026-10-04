// Довідник сировини: рослина → частина, сезон, ілюстрація. Одне місце правди для всіх розділів.

export type ArtKind = "leaf" | "root" | "rhizome" | "flower" | "daisy" | "berry" | "umbel";

export type Herb = {
  id: string;
  name: string;
  latin: string;
  part: string;
  art: ArtKind;
  hue: number; // відтінок ілюстрації (HSL)
  months: number[]; // місяці збору, 1–12
  priceHint: [number, number]; // орієнтир ціни сухої сировини, ₴/кг
  photo?: string; // справжнє фото — підставимо пізніше
};

export const herbs: Herb[] = [
  { id: "air-root", name: "Корінь аїру", latin: "Acorus calamus", part: "кореневище", art: "rhizome", hue: 34, months: [4, 9, 10], priceHint: [70, 95] },
  { id: "nettle-root", name: "Корінь кропиви", latin: "Urtica dioica", part: "корінь", art: "root", hue: 28, months: [3, 4, 9, 10], priceHint: [45, 70] },
  { id: "nettle-leaf", name: "Листя кропиви", latin: "Urtica dioica", part: "лист", art: "leaf", hue: 128, months: [5, 6, 7], priceHint: [28, 42] },
  { id: "linden", name: "Липовий цвіт", latin: "Tilia cordata", part: "суцвіття", art: "flower", hue: 52, months: [6, 7], priceHint: [140, 210] },
  { id: "chamomile", name: "Ромашка лікарська", latin: "Matricaria chamomilla", part: "квітки", art: "daisy", hue: 46, months: [5, 6, 7, 8], priceHint: [55, 80] },
  { id: "hypericum", name: "Звіробій", latin: "Hypericum perforatum", part: "трава", art: "flower", hue: 42, months: [6, 7, 8], priceHint: [40, 60] },
  { id: "rosehip", name: "Шипшина", latin: "Rosa canina", part: "плоди", art: "berry", hue: 12, months: [9, 10], priceHint: [45, 65] },
  { id: "dandelion-root", name: "Корінь кульбаби", latin: "Taraxacum officinale", part: "корінь", art: "root", hue: 40, months: [4, 9, 10], priceHint: [60, 85] },
  { id: "elderflower", name: "Цвіт бузини", latin: "Sambucus nigra", part: "суцвіття", art: "umbel", hue: 70, months: [5, 6], priceHint: [110, 160] },
  { id: "mint", name: "М'ята перцева", latin: "Mentha × piperita", part: "лист", art: "leaf", hue: 152, months: [6, 7, 8], priceHint: [60, 85] },
  { id: "yarrow", name: "Деревій", latin: "Achillea millefolium", part: "трава", art: "umbel", hue: 96, months: [6, 7, 8], priceHint: [30, 45] },
];

export const herbById = (id: string): Herb => {
  const h = herbs.find((x) => x.id === id);
  if (!h) throw new Error(`Невідома сировина: ${id}`);
  return h;
};

export const monthNames = [
  "січень", "лютий", "березень", "квітень", "травень", "червень",
  "липень", "серпень", "вересень", "жовтень", "листопад", "грудень",
];

export const monthNamesLoc = [
  "січні", "лютому", "березні", "квітні", "травні", "червні",
  "липні", "серпні", "вересні", "жовтні", "листопаді", "грудні",
];
