"use client";
// Каталог: пошук, фільтр за сировиною й областю, сортування. Параметри ?q= і ?herb= читаються з адреси.
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ListingCard } from "./Cards";
import { Icon } from "./Icon";
import { herbs } from "@/data/herbs";
import { listings, regions } from "@/data/market";

const sorts = { new: "Спершу нові", cheap: "Дешевші", expensive: "Дорожчі", volume: "Більший обсяг" } as const;
type SortKey = keyof typeof sorts;

export function CatalogView() {
  const [q, setQ] = useState("");
  const [herb, setHerb] = useState<string | null>(null);
  const [region, setRegion] = useState("");
  const [sort, setSort] = useState<SortKey>("new");

  useEffect(() => {
    const p = new URLSearchParams(location.search);
    setQ(p.get("q") ?? "");
    setHerb(p.get("herb"));
  }, []);

  const items = useMemo(() => {
    const ql = q.trim().toLowerCase();
    const out = listings.filter((l) =>
      (!herb || l.herbId === herb) &&
      (!region || l.region === region) &&
      (!ql || `${l.title} ${l.village} ${l.region} ${herbs.find((h) => h.id === l.herbId)?.name}`.toLowerCase().includes(ql)));
    if (sort === "cheap") out.sort((a, b) => a.pricePerKg - b.pricePerKg);
    if (sort === "expensive") out.sort((a, b) => b.pricePerKg - a.pricePerKg);
    if (sort === "volume") out.sort((a, b) => b.volumeKg - a.volumeKg);
    return out;
  }, [q, herb, region, sort]);

  const chip = (active: boolean) =>
    `pressable shrink-0 rounded-full px-4 py-2 text-[14px] font-medium ${active ? "bg-ink text-bg" : "bg-surface text-ink shadow-card"}`;

  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="flex items-center gap-2 rounded-2xl bg-surface px-4 shadow-card">
        <Icon name="search" size={19} className="text-muted" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Пошук: сировина, село, область" aria-label="Пошук"
          className="min-w-0 flex-1 bg-transparent py-3.5 text-[16px] outline-none placeholder:text-muted" />
        {q && <button onClick={() => setQ("")} aria-label="Очистити" className="text-muted"><Icon name="close" size={18} /></button>}
      </div>

      <div className="no-scrollbar -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1">
        <button className={chip(!herb)} onClick={() => setHerb(null)}>Уся сировина</button>
        {herbs.map((h) => (
          <button key={h.id} className={chip(herb === h.id)} onClick={() => setHerb(herb === h.id ? null : h.id)}>{h.name}</button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <label className="relative">
          <span className="sr-only">Область</span>
          <select value={region} onChange={(e) => setRegion(e.target.value)}
            className="appearance-none rounded-full bg-surface py-2 pl-4 pr-9 text-[14px] font-medium shadow-card outline-none">
            <option value="">Уся Україна</option>
            {regions.map((r) => <option key={r} value={r}>{r} обл.</option>)}
          </select>
          <Icon name="pin" size={15} className="pointer-events-none absolute right-3 top-2.5 text-muted" />
        </label>
        <label className="relative">
          <span className="sr-only">Сортування</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}
            className="appearance-none rounded-full bg-surface py-2 pl-4 pr-9 text-[14px] font-medium shadow-card outline-none">
            {Object.entries(sorts).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <Icon name="filter" size={15} className="pointer-events-none absolute right-3 top-2.5 text-muted" />
        </label>
        <span className="ml-auto text-[14px] text-muted">{items.length} партій</span>
      </div>

      {items.length ? (
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {items.map((l) => <ListingCard key={l.id} l={l} />)}
        </div>
      ) : (
        <div className="mt-10 rounded-[22px] bg-surface p-10 text-center shadow-card">
          <div className="text-[19px] font-semibold">Поки нічого не знайшли</div>
          <p className="mt-2 text-muted">Розмістіть заявку — збирачі побачать, що вам потрібно.</p>
          <Link href="/sell/?mode=request" className="pressable mt-5 inline-flex rounded-full bg-accent px-6 py-3 font-semibold text-on-accent">Розмістити заявку</Link>
        </div>
      )}
    </div>
  );
}
