"use client";
// «Що збирати зараз»: місяць береться з пристрою, тож блок завжди актуальний без перезбирання сайту.
import Link from "next/link";
import { useEffect, useState } from "react";
import { herbs, monthNamesLoc } from "@/data/herbs";
import { HerbArt } from "./HerbArt";
import { priceRange } from "@/lib/format";

export function Season() {
  const [month, setMonth] = useState(10);
  useEffect(() => setMonth(new Date().getMonth() + 1), []);
  const now = herbs.filter((h) => h.months.includes(month));
  return (
    <div>
      <div className="mb-5">
        <div className="mb-1 text-[13px] font-semibold uppercase tracking-wider text-accent">Календар збору</div>
        <h2 className="text-[26px] font-semibold leading-tight tracking-tight md:text-[32px]">Що збирати в {monthNamesLoc[month - 1]}</h2>
      </div>
      <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2">
        {now.map((h) => (
          <Link key={h.id} href={`/catalog/?herb=${h.id}`} className="lift pressable w-[200px] shrink-0 snap-start overflow-hidden rounded-[22px] bg-surface shadow-card">
            <HerbArt herbId={h.id} label={false} className="aspect-square" />
            <div className="p-3.5">
              <div className="font-semibold">{h.name}</div>
              <div className="text-[13px] text-muted">{h.part} · {priceRange(h.priceHint)}</div>
            </div>
          </Link>
        ))}
        {now.length === 0 && <div className="text-muted">Зараз сезон відпочинку — саме час підготувати сушарку й тару.</div>}
      </div>
    </div>
  );
}
