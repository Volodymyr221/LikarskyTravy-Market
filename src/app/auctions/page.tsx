import type { Metadata } from "next";
import { AuctionCard } from "@/components/Cards";
import { Icon } from "@/components/Icon";
import { PageHead } from "@/components/ui";
import { auctions } from "@/data/market";

export const metadata: Metadata = { title: "Аукціони", description: "Виставте партію на 1–7 днів — закупівельники змагаються за вашу сировину." };

const how = [
  { icon: "upload", t: "Виставляєте партію", d: "Стартова ціна, обсяг і тривалість — від 1 до 7 днів." },
  { icon: "trend", t: "Покупці роблять ставки", d: "Перевірені компанії підвищують ціну, ви бачите все наживо." },
  { icon: "check", t: "Перемагає найвища", d: "Після завершення — контакти переможця й угода." },
];

export default function AuctionsPage() {
  return (
    <>
      <PageHead title="Аукціони" sub="Хто більше дасть — той і забирає. Конкуренція покупців часто дає на 10–20% більше за звичайний продаж." />
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{auctions.map((a) => <AuctionCard key={a.id} a={a} />)}</div>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {how.map((h, i) => (
            <div key={h.t} className="rounded-[22px] bg-surface p-6 shadow-card">
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-soft text-amber"><Icon name={h.icon} size={22} /></span>
                <span className="text-[40px] font-semibold leading-none text-line">{i + 1}</span>
              </div>
              <div className="mt-4 text-[18px] font-semibold">{h.t}</div>
              <p className="mt-1 text-[15px] text-muted">{h.d}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
