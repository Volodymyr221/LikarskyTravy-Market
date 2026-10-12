"use client";
// «Обране» (серце) на картці. Прототип: стан лише на екрані.
import { useState } from "react";

export function FavButton({ id }: { id: string }) {
  const [on, setOn] = useState(false);
  return (
    <button type="button" onClick={() => setOn(!on)} aria-pressed={on} aria-label={on ? "Прибрати з обраного" : "В обране"} data-id={id}
      className="pressable absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-surface/90 shadow-card backdrop-blur sm:right-2.5 sm:top-2.5">
      <svg width={17} height={17} viewBox="0 0 24 24" aria-hidden="true" className={on ? "text-danger" : "text-muted"}
        fill={on ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.9} strokeLinejoin="round">
        <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
      </svg>
    </button>
  );
}
