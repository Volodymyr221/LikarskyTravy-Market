"use client";
// Живий таймер до кінця аукціону. До монтування показує «—», щоб не було розбіжності SSR/клієнта.
import { useEffect, useState } from "react";
import { auctionEnd, splitDuration } from "@/lib/time";

const pad = (n: number) => String(n).padStart(2, "0");

export function Countdown({ endsInHours, big = false }: { endsInHours: number; big?: boolean }) {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const end = auctionEnd(endsInHours);
    const tick = () => setLeft(end - Date.now());
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [endsInHours]);

  if (left === null) return <span className="tabular-nums">—</span>;
  const { d, h, m, s } = splitDuration(left);
  const urgent = left < 12 * 3_600_000;

  if (big) {
    const cells = [
      ...(d ? [{ v: d, l: "дн" }] : []),
      { v: h, l: "год" }, { v: m, l: "хв" }, { v: s, l: "сек" },
    ];
    return (
      <div className="flex gap-2">
        {cells.map((c) => (
          <div key={c.l} className={`min-w-14 rounded-2xl px-3 py-2 text-center ${urgent ? "bg-amber-soft text-amber" : "bg-surface-2"}`}>
            <div className="text-2xl font-semibold tabular-nums tracking-tight">{pad(c.v)}</div>
            <div className="text-[11px] text-muted">{c.l}</div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <span className={`tabular-nums ${urgent ? "text-amber" : ""}`}>
      {d > 0 && `${d} д `}{pad(h)}:{pad(m)}:{pad(s)}
    </span>
  );
}
