"use client";
// Панель ставок аукціону. Прототип: ставка зберігається лише на екрані.
import { useState } from "react";
import { Countdown } from "./Countdown";
import { Icon } from "./Icon";
import type { Auction, Bid } from "@/data/market";
import { uah, weight } from "@/lib/format";

export function BidPanel({ a }: { a: Auction }) {
  const [bids, setBids] = useState<Bid[]>(a.bids);
  const current = bids[0]?.amount ?? a.startPrice;
  const [value, setValue] = useState(current + a.step);
  const [done, setDone] = useState(false);
  const min = current + a.step;

  const place = () => {
    if (value < min) return;
    setBids([{ who: "Ви", amount: value, ago: "щойно" }, ...bids]);
    setValue(value + a.step);
    setDone(true);
    setTimeout(() => setDone(false), 2600);
  };

  return (
    <div className="rounded-[26px] bg-surface p-6 shadow-card">
      <div className="text-[13px] text-muted">До завершення</div>
      <div className="mt-2"><Countdown endsInHours={a.endsInHours} big /></div>

      <div className="mt-6 flex items-end justify-between">
        <div>
          <div className="text-[13px] text-muted">Поточна ставка</div>
          <div key={current} className="rise text-[38px] font-semibold leading-none tracking-tight">{uah(current)}<span className="text-[16px] font-normal text-muted">/кг</span></div>
        </div>
        <div className="text-right text-[13px] text-muted">за {weight(a.volumeKg)}<br /><span className="font-semibold text-ink">{uah(current * a.volumeKg)}</span></div>
      </div>

      <div className="mt-6 flex items-center gap-2">
        <button onClick={() => setValue(Math.max(min, value - a.step))} aria-label="Менше"
          className="pressable grid h-12 w-12 place-items-center rounded-full bg-surface-2 text-[22px]">−</button>
        <div className="flex-1 rounded-full bg-surface-2 py-3 text-center text-[19px] font-semibold tabular-nums">{uah(value)}</div>
        <button onClick={() => setValue(value + a.step)} aria-label="Більше"
          className="pressable grid h-12 w-12 place-items-center rounded-full bg-surface-2 text-[22px]">+</button>
      </div>
      <button onClick={place} className="pressable mt-3 w-full rounded-full bg-accent py-4 text-[17px] font-semibold text-on-accent">
        Зробити ставку
      </button>
      <p className="mt-2 text-center text-[12px] text-muted">Мінімальний крок {uah(a.step)} · прототип: ставка не надсилається</p>
      {done && (
        <div className="rise mt-3 flex items-center justify-center gap-2 rounded-2xl bg-accent-soft py-2.5 text-[14px] font-semibold text-accent">
          <Icon name="check" size={17} strokeWidth={2.4} /> Ваша ставка найвища
        </div>
      )}

      <div className="mt-6 border-t border-line pt-4">
        <div className="mb-2 text-[14px] font-semibold">Історія ставок · {bids.length}</div>
        <ul className="space-y-2.5">
          {bids.slice(0, 6).map((b, i) => (
            <li key={`${b.who}-${b.amount}-${i}`} className="flex items-center justify-between text-[14px]">
              <span className={`flex items-center gap-2 ${b.who === "Ви" ? "font-semibold text-accent" : ""}`}>
                {i === 0 && <Icon name="trend" size={15} className="text-accent" />} {b.who}
              </span>
              <span className="flex items-center gap-3"><span className="text-muted">{b.ago}</span><span className="font-semibold tabular-nums">{uah(b.amount)}</span></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
