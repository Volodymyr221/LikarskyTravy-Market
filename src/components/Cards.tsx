// Картки маркетплейсу: оголошення продавця, заявка закупівельника, лот аукціону.
import Link from "next/link";
import { HerbArt } from "./HerbArt";
import { Icon } from "./Icon";
import { Countdown } from "./Countdown";
import { Verified } from "./ui";
import { herbById } from "@/data/herbs";
import type { Auction, BuyRequest, Listing } from "@/data/market";
import { potential, uah, weight } from "@/lib/format";

const card = "lift pressable group block overflow-hidden rounded-[22px] bg-surface shadow-card";

export function ListingCard({ l }: { l: Listing }) {
  return (
    <Link href={`/catalog/${l.id}/`} className={card}>
      <HerbArt herbId={l.herbId} className="aspect-[4/3]" />
      <div className="p-3.5 md:p-4">
        <div className="flex items-baseline justify-between gap-2">
          <div className="text-[18px] font-semibold tracking-tight md:text-[20px]">{uah(l.pricePerKg)}<span className="text-[14px] font-normal text-muted">/кг</span></div>
          <div className="rounded-full bg-surface-2 px-2.5 py-0.5 text-[13px] font-semibold">{weight(l.volumeKg)}</div>
        </div>
        <div className="mt-1 line-clamp-2 text-[15px] leading-snug">{l.title}</div>
        <div className="mt-3 text-[13px] text-muted">
          <div className="flex items-center gap-1"><Icon name="pin" size={14} className="shrink-0" /><span className="truncate">{l.village}, {l.region}</span></div>
          <div className="mt-0.5 pl-[18px]">{l.postedAgo}</div>
        </div>
      </div>
    </Link>
  );
}

export function RequestCard({ r }: { r: BuyRequest }) {
  const herb = herbById(r.herbId);
  const pct = Math.round((r.collectedT / r.volumeT) * 100);
  return (
    <Link href={`/requests/${r.id}/`} className={`${card} p-5`}>
      <div className="flex items-start gap-4">
        <HerbArt herbId={r.herbId} label={false} className="h-16 w-16 shrink-0 rounded-2xl" />
        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-semibold uppercase tracking-wider text-accent">Куплю</div>
          <div className="text-[19px] font-semibold leading-tight tracking-tight">{herb.name} · {r.volumeT} т</div>
          <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[13px] text-muted">
            <span className="truncate">{r.buyer.name}</span>
            {r.buyer.verified && <Verified company={r.buyer.company} />}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[20px] font-semibold tracking-tight text-accent">{r.pricePerKg} ₴</div>
          <div className="text-[12px] text-muted">за кг</div>
        </div>
      </div>
      <div className="mt-4">
        <div className="mb-1.5 flex justify-between text-[13px]">
          <span className="text-muted">Зібрано {r.collectedT} з {r.volumeT} т</span>
          <span className="font-medium">{pct}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-surface-2">
          <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-[13px]">
        <span className="flex items-center gap-1 text-muted"><Icon name="calendar" size={14} /> до {r.deadline}</span>
        <span className="font-medium">Можна заробити до <span className="text-accent">{uah(potential(r.volumeT - r.collectedT, r.pricePerKg))}</span></span>
      </div>
    </Link>
  );
}

export function AuctionCard({ a }: { a: Auction }) {
  const herb = herbById(a.herbId);
  return (
    <Link href={`/auctions/${a.id}/`} className={card}>
      <div className="relative">
        <HerbArt herbId={a.herbId} className="aspect-[16/10]" />
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[12px] font-semibold text-white backdrop-blur-md">
          <span className="live-dot h-2 w-2 rounded-full bg-[#ff5a3c]" /> Наживо
        </div>
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/45 px-2.5 py-1 text-[12px] font-semibold text-white backdrop-blur-md">
          <Icon name="clock" size={13} /> <Countdown endsInHours={a.endsInHours} />
        </div>
      </div>
      <div className="p-4">
        <div className="text-[17px] font-semibold tracking-tight">{herb.name} · {weight(a.volumeKg)}</div>
        <div className="mt-0.5 flex items-center gap-1 text-[13px] text-muted"><Icon name="pin" size={14} /> {a.village}, {a.region}</div>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <div className="text-[12px] text-muted">Поточна ставка</div>
            <div className="text-[22px] font-semibold tracking-tight">{uah(a.currentBid)}<span className="text-[14px] font-normal text-muted">/кг</span></div>
          </div>
          <div className="text-right text-[13px] text-muted">
            <div>{a.bids.length} ставок</div>
            <div>старт {uah(a.startPrice)}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
