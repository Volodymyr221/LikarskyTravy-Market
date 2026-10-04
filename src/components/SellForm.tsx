"use client";
// Створення оголошення / аукціону / заявки. Прототип: нічого не надсилає, показує прев'ю й екран успіху.
import Link from "next/link";
import { useEffect, useState } from "react";
import { HerbArt } from "./HerbArt";
import { Icon } from "./Icon";
import { herbs } from "@/data/herbs";
import { regions } from "@/data/market";
import { priceRange, uah, weight } from "@/lib/format";

type Mode = "sale" | "auction" | "request";
const modes: { id: Mode; label: string; hint: string }[] = [
  { id: "sale", label: "Продаж", hint: "Фіксована ціна" },
  { id: "auction", label: "Аукціон", hint: "Хто більше дасть" },
  { id: "request", label: "Куплю", hint: "Я закупівельник" },
];

const field = "w-full rounded-2xl bg-surface-2 px-4 py-3.5 text-[16px] outline-none ring-accent focus:ring-2";

export function SellForm() {
  const [mode, setMode] = useState<Mode>("sale");
  const [herbId, setHerbId] = useState("air-root");
  const [volume, setVolume] = useState(500);
  const [price, setPrice] = useState(80);
  const [days, setDays] = useState(3);
  const [region, setRegion] = useState("Волинська");
  const [moisture, setMoisture] = useState(12);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const m = new URLSearchParams(location.search).get("mode");
    if (m === "auction" || m === "request") setMode(m);
  }, []);

  const herb = herbs.find((h) => h.id === herbId)!;
  const unitVolume = mode === "request" ? volume * 1000 : volume;

  if (sent) {
    return (
      <div className="rise mx-auto max-w-md px-4 pt-16 text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-accent-soft text-accent"><Icon name="check" size={40} strokeWidth={2.4} /></div>
        <h1 className="mt-6 text-[30px] font-semibold tracking-tight">{mode === "request" ? "Заявку створено" : mode === "auction" ? "Аукціон створено" : "Оголошення створено"}</h1>
        <p className="mt-2 text-muted">У робочій версії воно з’явиться в каталозі після короткої перевірки. Зараз це прототип — дані нікуди не надсилаються.</p>
        <div className="mt-8 grid gap-2">
          <Link href="/cabinet/" className="pressable rounded-full bg-accent py-3.5 font-semibold text-on-accent">До кабінету</Link>
          <button onClick={() => setSent(false)} className="pressable rounded-full bg-surface-2 py-3.5 font-semibold">Створити ще</button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-[1.3fr_1fr]">
      <form className="min-w-0 space-y-6" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
        <div className="grid grid-cols-3 gap-1 rounded-2xl bg-surface-2 p-1" role="tablist">
          {modes.map((m) => (
            <button key={m.id} type="button" role="tab" aria-selected={mode === m.id} onClick={() => setMode(m.id)}
              className={`pressable rounded-xl px-2 py-2.5 text-center transition-colors ${mode === m.id ? "bg-surface shadow-card" : "text-muted"}`}>
              <div className="text-[15px] font-semibold">{m.label}</div>
              <div className="text-[11px] text-muted">{m.hint}</div>
            </button>
          ))}
        </div>

        <div>
          <div className="mb-2 text-[14px] font-medium">Сировина</div>
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
            {herbs.map((h) => (
              <button key={h.id} type="button" onClick={() => setHerbId(h.id)}
                className={`pressable w-[92px] shrink-0 overflow-hidden rounded-2xl text-left ${herbId === h.id ? "ring-2 ring-accent" : ""}`}>
                <HerbArt herbId={h.id} label={false} className="aspect-square" />
                <div className="bg-surface px-2 py-1.5 text-[11px] font-medium leading-tight">{h.name}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label>
            <div className="mb-2 text-[14px] font-medium">{mode === "request" ? "Обсяг, т" : "Обсяг, кг"}</div>
            <input type="number" inputMode="numeric" min={1} value={volume} onChange={(e) => setVolume(+e.target.value)} className={field} />
          </label>
          <label>
            <div className="mb-2 text-[14px] font-medium">{mode === "auction" ? "Стартова ціна, ₴/кг" : "Ціна, ₴/кг"}</div>
            <input type="number" inputMode="numeric" min={1} value={price} onChange={(e) => setPrice(+e.target.value)} className={field} />
          </label>
        </div>
        <p className="-mt-3 text-[13px] text-muted">Орієнтир ринку: {priceRange(herb.priceHint)}</p>

        {mode === "auction" && (
          <div>
            <div className="mb-2 text-[14px] font-medium">Тривалість аукціону</div>
            <div className="flex gap-2">
              {[1, 3, 5, 7].map((d) => (
                <button key={d} type="button" onClick={() => setDays(d)}
                  className={`pressable flex-1 rounded-2xl py-3 font-semibold ${days === d ? "bg-ink text-bg" : "bg-surface-2"}`}>{d} дн</button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <label>
            <div className="mb-2 text-[14px] font-medium">Область</div>
            <select value={region} onChange={(e) => setRegion(e.target.value)} className={field}>
              {regions.map((r) => <option key={r}>{r}</option>)}
            </select>
          </label>
          <label>
            <div className="mb-2 text-[14px] font-medium">{mode === "request" ? "Макс. вологість, %" : "Вологість, %"}</div>
            <input type="number" min={5} max={20} value={moisture} onChange={(e) => setMoisture(+e.target.value)} className={field} />
          </label>
        </div>

        {mode !== "request" && (
          <div>
            <div className="mb-2 text-[14px] font-medium">Фото партії</div>
            <div className="grid grid-cols-4 gap-2">
              <div className="col-span-2 row-span-2 grid aspect-square place-items-center rounded-2xl border-2 border-dashed border-line text-center text-muted">
                <div><Icon name="upload" size={26} className="mx-auto" /><div className="mt-2 text-[13px]">Додати фото</div></div>
              </div>
              {[0, 1, 2, 3].map((i) => <div key={i} className="aspect-square rounded-2xl bg-surface-2" />)}
            </div>
            <p className="mt-2 text-[13px] text-muted">Порада: загальний вигляд, крупний план, злам і мішки з вагою.</p>
          </div>
        )}

        <label className="block">
          <div className="mb-2 text-[14px] font-medium">Опис</div>
          <textarea rows={4} placeholder={mode === "request" ? "Вимоги до сировини, як забираєте, умови оплати" : "Де і коли зібрано, як сушили, як можна забрати"} className={field} />
        </label>

        <button className="pressable w-full rounded-full bg-accent py-4 text-[17px] font-semibold text-on-accent">
          {mode === "request" ? "Опублікувати заявку" : mode === "auction" ? "Запустити аукціон" : "Опублікувати оголошення"}
        </button>
      </form>

      {/* Живе прев'ю */}
      <aside className="min-w-0 md:sticky md:top-24 md:self-start">
        <div className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-muted">Так побачать покупці</div>
        <div className="overflow-hidden rounded-[22px] bg-surface shadow-float">
          <HerbArt herbId={herbId} className="aspect-[4/3]" />
          <div className="p-5">
            <div className="text-[13px] font-semibold uppercase tracking-wider text-accent">
              {mode === "request" ? "Куплю" : mode === "auction" ? `Аукціон · ${days} дн` : "Продаю"}
            </div>
            <div className="mt-1 text-[20px] font-semibold tracking-tight">{herb.name} · {weight(unitVolume)}</div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-[26px] font-semibold tracking-tight">{uah(price)}<span className="text-[14px] font-normal text-muted">/кг</span></span>
              <span className="text-[13px] text-muted">вологість {mode === "request" ? "до " : ""}{moisture}%</span>
            </div>
            <div className="mt-3 flex items-center gap-1 text-[13px] text-muted"><Icon name="pin" size={14} /> {region} обл.</div>
            <div className="mt-4 rounded-2xl bg-surface-2 px-4 py-3 text-[14px]">
              {mode === "request" ? "Бюджет заявки" : "Вартість партії"}: <span className="font-semibold">{uah(unitVolume * price)}</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
