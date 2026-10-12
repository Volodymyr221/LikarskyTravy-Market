"use client";
// Стрічка оголошень: вкладки «Продам / Куплю», фільтри (збоку на комп'ютері, панель знизу на телефоні), сортування.
// Параметри з адреси: ?q= ?region= ?cat= ?type=buy — так працює пошук з головної.
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BuyCard, SellCard } from "./AdCards";
import { Icon } from "./Icon";
import { categories, herbById, type CategoryId } from "@/data/herbs";
import { listings, regions, requests } from "@/data/market";
import { plural } from "@/lib/format";

type Kind = "sell" | "buy";
type Filters = { q: string; cat: CategoryId | ""; region: string; priceMin: string; priceMax: string; qtyMin: string; qtyMax: string };
const empty: Filters = { q: "", cat: "", region: "", priceMin: "", priceMax: "", qtyMin: "", qtyMax: "" };

const sorts = { new: "Спочатку нові", cheap: "Спочатку дешевші", expensive: "Спочатку дорожчі", volume: "Більший обсяг" } as const;
type SortKey = keyof typeof sorts;

const field = "w-full rounded-xl border border-line bg-surface px-3 py-2.5 text-[15px] outline-none focus:border-accent";

function FilterPanel({ f, set, kind, setKind, onReset }: {
  f: Filters; set: (p: Partial<Filters>) => void; kind: Kind; setKind: (k: Kind) => void; onReset: () => void;
}) {
  const sel = (label: string, value: string, onChange: (v: string) => void, opts: [string, string][]) => (
    <label className="block">
      <span className="mb-1.5 block text-[14px] font-semibold">{label}</span>
      <span className="relative block">
        <select value={value} onChange={(e) => onChange(e.target.value)} className={`${field} appearance-none pr-9`}>
          {opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
        <Icon name="chevron" size={16} className="pointer-events-none absolute right-3 top-3 text-muted" />
      </span>
    </label>
  );
  const range = (label: string, a: keyof Filters, b: keyof Filters) => (
    <div>
      <span className="mb-1.5 block text-[14px] font-semibold">{label}</span>
      <div className="grid grid-cols-2 gap-2">
        <input inputMode="numeric" placeholder="Від" value={f[a]} onChange={(e) => set({ [a]: e.target.value.replace(/\D/g, "") })} className={field} aria-label={`${label} від`} />
        <input inputMode="numeric" placeholder="До" value={f[b]} onChange={(e) => set({ [b]: e.target.value.replace(/\D/g, "") })} className={field} aria-label={`${label} до`} />
      </div>
    </div>
  );
  return (
    <div className="space-y-5">
      <div>
        <span className="mb-1.5 block text-[14px] font-semibold">Тип оголошення</span>
        <div className="grid grid-cols-2 gap-1 rounded-xl bg-surface-2 p-1">
          {(["sell", "buy"] as Kind[]).map((k) => (
            <button key={k} type="button" onClick={() => setKind(k)}
              className={`pressable rounded-lg py-2 text-[14px] font-semibold ${kind === k ? "bg-surface shadow-card" : "text-muted"}`}>
              {k === "sell" ? "Продам" : "Куплю"}
            </button>
          ))}
        </div>
      </div>
      {sel("Категорія", f.cat, (v) => set({ cat: v as CategoryId | "" }), [["", "Усі категорії"], ...categories.map((c) => [c.id, c.name] as [string, string])])}
      {sel("Область", f.region, (v) => set({ region: v }), [["", "Усі області"], ...regions.map((r) => [r, `${r} обл.`] as [string, string])])}
      {range("Ціна, грн/кг", "priceMin", "priceMax")}
      {range(kind === "sell" ? "Кількість, кг" : "Обсяг, кг", "qtyMin", "qtyMax")}
      <button type="button" onClick={onReset} className="flex w-full items-center justify-center gap-1.5 py-1 text-[14px] font-medium text-muted hover:text-ink">
        <Icon name="close" size={14} /> Очистити фільтри
      </button>
    </div>
  );
}

export function Market({ limit, title = "Оголошення" }: { limit?: number; title?: string }) {
  const [kind, setKind] = useState<Kind>("sell");
  const [f, setF] = useState<Filters>(empty);
  const [sort, setSort] = useState<SortKey>("new");
  const [sheet, setSheet] = useState(false);
  const set = (p: Partial<Filters>) => setF((x) => ({ ...x, ...p }));

  useEffect(() => {
    const p = new URLSearchParams(location.search);
    const cat = p.get("cat") ?? "";
    setF({ ...empty, q: p.get("q") ?? "", region: p.get("region") ?? "", cat: categories.some((c) => c.id === cat) ? (cat as CategoryId) : "" });
    if (p.get("type") === "buy") setKind("buy");
  }, []);

  // Замок прокрутки сторінки, поки відкрита панель фільтрів
  useEffect(() => {
    document.body.style.overflow = sheet ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sheet]);

  const n = (v: string) => (v === "" ? null : Number(v));
  const inRange = (x: number, a: string, b: string) => (n(a) === null || x >= n(a)!) && (n(b) === null || x <= n(b)!);
  const matchQ = (herbId: string, extra: string) => {
    const q = f.q.trim().toLowerCase();
    return !q || `${herbById(herbId).name} ${herbById(herbId).part} ${extra}`.toLowerCase().includes(q);
  };

  const sellItems = useMemo(() => {
    const out = listings.filter((l) =>
      (!f.cat || herbById(l.herbId).category === f.cat) && (!f.region || l.region === f.region) &&
      inRange(l.pricePerKg, f.priceMin, f.priceMax) && inRange(l.volumeKg, f.qtyMin, f.qtyMax) &&
      matchQ(l.herbId, `${l.title} ${l.village} ${l.region}`));
    if (sort === "cheap") out.sort((a, b) => a.pricePerKg - b.pricePerKg);
    if (sort === "expensive") out.sort((a, b) => b.pricePerKg - a.pricePerKg);
    if (sort === "volume") out.sort((a, b) => b.volumeKg - a.volumeKg);
    return out;
  }, [f, sort]);

  const buyItems = useMemo(() => {
    const out = requests.filter((r) =>
      (!f.cat || herbById(r.herbId).category === f.cat) &&
      (!f.region || r.regions.includes(f.region) || r.regions.includes("вся Україна")) &&
      inRange(r.pricePerKg, f.priceMin, f.priceMax) && inRange(r.volumeT * 1000, f.qtyMin, f.qtyMax) &&
      matchQ(r.herbId, `${r.buyer.name} ${r.regions.join(" ")}`));
    if (sort === "cheap") out.sort((a, b) => a.pricePerKg - b.pricePerKg);
    if (sort === "expensive") out.sort((a, b) => b.pricePerKg - a.pricePerKg);
    if (sort === "volume") out.sort((a, b) => b.volumeT - a.volumeT);
    return out;
  }, [f, sort]);

  const count = kind === "sell" ? sellItems.length : buyItems.length;
  const active = [f.cat, f.region, f.priceMin, f.priceMax, f.qtyMin, f.qtyMax].filter(Boolean).length;
  const reset = () => setF({ ...empty, q: f.q });
  const shownSell = limit ? sellItems.slice(0, limit) : sellItems;
  const shownBuy = limit ? buyItems.slice(0, limit) : buyItems;
  const catName = categories.find((c) => c.id === f.cat)?.name;

  return (
    <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-6">
      <aside className="hidden lg:block">
        <div className="sticky top-24 rounded-[20px] bg-surface p-5 shadow-card">
          <div className="mb-4 text-[18px] font-bold">Фільтри</div>
          <FilterPanel f={f} set={set} kind={kind} setKind={setKind} onReset={reset} />
        </div>
      </aside>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <h2 className="text-[24px] font-bold tracking-tight md:text-[28px]">{title}</h2>
          <div className="flex gap-1 rounded-full bg-surface-2 p-1" role="tablist">
            {(["sell", "buy"] as Kind[]).map((k) => (
              <button key={k} role="tab" aria-selected={kind === k} onClick={() => setKind(k)}
                className={`pressable rounded-full px-5 py-2 text-[15px] font-semibold ${kind === k ? (k === "sell" ? "bg-accent text-on-accent" : "bg-orange text-on-orange") : "text-muted"}`}>
                {k === "sell" ? "Продам" : "Куплю"}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button onClick={() => setSheet(true)} className="pressable flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 text-[14px] font-semibold lg:hidden">
              <Icon name="filter" size={16} /> Фільтри{active > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] text-on-accent">{active}</span>}
            </button>
            <label className="relative">
              <span className="sr-only">Сортування</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}
                className="appearance-none rounded-full border border-line bg-surface py-2 pl-4 pr-9 text-[14px] font-medium outline-none">
                {Object.entries(sorts).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
              <Icon name="chevron" size={16} className="pointer-events-none absolute right-3 top-2.5 text-muted" />
            </label>
          </div>
        </div>

        {(f.q || catName || f.region) && (
          <div className="mt-3 flex flex-wrap items-center gap-2 text-[13px]">
            {f.q && <button onClick={() => set({ q: "" })} className="flex items-center gap-1 rounded-full bg-accent-soft px-3 py-1 font-medium text-accent">«{f.q}» <Icon name="close" size={12} /></button>}
            {catName && <button onClick={() => set({ cat: "" })} className="flex items-center gap-1 rounded-full bg-accent-soft px-3 py-1 font-medium text-accent">{catName} <Icon name="close" size={12} /></button>}
            {f.region && <button onClick={() => set({ region: "" })} className="flex items-center gap-1 rounded-full bg-accent-soft px-3 py-1 font-medium text-accent">{f.region} обл. <Icon name="close" size={12} /></button>}
            <span className="text-muted">Знайдено: {count}</span>
          </div>
        )}

        {count === 0 ? (
          <div className="mt-6 rounded-[20px] bg-surface p-10 text-center shadow-card">
            <div className="text-[18px] font-semibold">Нічого не знайшли</div>
            <p className="mt-1.5 text-muted">Змініть фільтри або розмістіть своє оголошення — вас знайдуть.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <button onClick={reset} className="pressable rounded-full border border-line px-5 py-2.5 font-semibold">Очистити фільтри</button>
              <Link href="/sell/" className="pressable rounded-full bg-accent px-5 py-2.5 font-semibold text-on-accent">Подати оголошення</Link>
            </div>
          </div>
        ) : (
          <div className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
            {kind === "sell" ? shownSell.map((l) => <SellCard key={l.id} l={l} />) : shownBuy.map((r) => <BuyCard key={r.id} r={r} />)}
          </div>
        )}

        {limit && count > limit && (
          <div className="mt-6 text-center">
            <Link href={kind === "buy" ? "/catalog/?type=buy" : "/catalog/"} className="pressable inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 font-semibold">
              Показати всі {count} <Icon name="arrow" size={17} />
            </Link>
          </div>
        )}
      </div>

      {/* Панель фільтрів на телефоні */}
      {sheet && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Фільтри">
          <button className="absolute inset-0 bg-black/40" aria-label="Закрити" onClick={() => setSheet(false)} />
          <div className="rise safe-bottom absolute inset-x-0 bottom-0 flex max-h-[88dvh] flex-col rounded-t-[28px] bg-bg">
            <div className="sticky top-0 flex items-center justify-between rounded-t-[28px] border-b border-line bg-bg px-5 pb-3 pt-2">
              <span className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-line" />
              <span className="mt-3 text-[18px] font-bold">Фільтри</span>
              <button onClick={() => setSheet(false)} aria-label="Закрити" className="mt-3 grid h-9 w-9 place-items-center rounded-full bg-surface-2"><Icon name="close" size={16} /></button>
            </div>
            <div className="overflow-y-auto px-5 py-5">
              <FilterPanel f={f} set={set} kind={kind} setKind={setKind} onReset={reset} />
            </div>
            <div className="border-t border-line p-4">
              <button onClick={() => setSheet(false)} className="pressable w-full rounded-full bg-accent py-3.5 text-[16px] font-semibold text-on-accent">
                Показати {count} {plural(count, "оголошення", "оголошення", "оголошень")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
