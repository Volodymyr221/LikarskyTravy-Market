// Картки стрічки оголошень у стилі звичного маркетплейсу: «Продам» (зелена) і «Куплю» (помаранчева).
// Телефон: рядок (ілюстрація зліва). Від sm: плитка (ілюстрація зверху).
import Link from "next/link";
import type { ReactNode } from "react";
import { HerbArt } from "./HerbArt";
import { Icon } from "./Icon";
import { FavButton } from "./FavButton";
import { herbById } from "@/data/herbs";
import type { BuyRequest, Listing } from "@/data/market";
import { num, uah, weight } from "@/lib/format";

const shell =
  "relative grid grid-cols-[112px_1fr] gap-x-3 gap-y-3 rounded-[20px] bg-surface p-3 shadow-card sm:flex sm:flex-col sm:gap-0 sm:overflow-hidden sm:p-0";

function Badge({ kind }: { kind: "sell" | "buy" }) {
  return kind === "sell" ? (
    <span className="absolute left-2 top-2 rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-semibold text-on-accent">Продам</span>
  ) : (
    <span className="absolute left-2 top-2 rounded-full bg-orange px-2.5 py-0.5 text-[11px] font-semibold text-on-orange">Куплю</span>
  );
}

function Row({ icon, children }: { icon: string; children: ReactNode }) {
  return (
    <li className="flex items-center gap-1.5">
      <Icon name={icon} size={14} className="shrink-0" />
      <span className="truncate">{children}</span>
    </li>
  );
}

export function SellCard({ l }: { l: Listing }) {
  const herb = herbById(l.herbId);
  const href = `/catalog/${l.id}/`;
  return (
    <article className={shell}>
      <Link href={href} className="relative block overflow-hidden rounded-2xl sm:rounded-none" aria-label={l.title}>
        <HerbArt herbId={l.herbId} className="h-full min-h-[112px] sm:aspect-[4/3] sm:h-auto" />
        <Badge kind="sell" />
      </Link>
      <FavButton id={l.id} />
      <div className="flex min-w-0 flex-col sm:px-4 sm:pt-3.5">
        <Link href={href} className="line-clamp-2 pr-8 text-[15px] font-semibold leading-snug sm:pr-0">
          {herb.name} <span className="font-normal text-muted">({herb.part})</span>
        </Link>
        <div className="mt-1 text-[19px] font-bold tracking-tight text-accent">{uah(l.pricePerKg)}/кг</div>
        <ul className="mt-1.5 space-y-0.5 text-[13px] text-muted">
          <Row icon="box">Кількість: {weight(l.volumeKg)}</Row>
          <Row icon="sun">Стан: {l.condition ?? "сушена"} · збір {l.harvest.match(/\d{4}/)?.[0]}</Row>
          <Row icon="pin">{l.region} обл., {l.village}</Row>
        </ul>
        <p className="mt-2 hidden text-[13px] leading-snug text-muted sm:line-clamp-2">{l.description}</p>
      </div>
      <div className="col-span-2 grid grid-cols-2 gap-2 sm:mt-auto sm:p-4 sm:pt-3">
        <Link href={href} className="pressable flex items-center justify-center gap-1.5 rounded-xl bg-accent py-2.5 text-[14px] font-semibold text-on-accent">
          <Icon name="phone" size={16} /> Подзвонити
        </Link>
        <Link href="/login/" className="pressable flex items-center justify-center gap-1.5 rounded-xl border border-line py-2.5 text-[14px] font-semibold text-accent">
          <Icon name="chat" size={16} /> Написати
        </Link>
      </div>
    </article>
  );
}

export function BuyCard({ r }: { r: BuyRequest }) {
  const herb = herbById(r.herbId);
  const href = `/requests/${r.id}/`;
  return (
    <article className={shell}>
      <Link href={href} className="relative block overflow-hidden rounded-2xl sm:rounded-none" aria-label={`Куплю ${herb.name}`}>
        <HerbArt herbId={r.herbId} className="h-full min-h-[112px] sm:aspect-[16/9] sm:h-auto" />
        <Badge kind="buy" />
      </Link>
      <FavButton id={r.id} />
      <div className="flex min-w-0 flex-col sm:px-4 sm:pt-3.5">
        <Link href={href} className="line-clamp-2 pr-8 text-[15px] font-semibold leading-snug sm:pr-0">
          Куплю {herb.name.toLowerCase()} <span className="font-normal text-muted">({herb.part})</span>
        </Link>
        <div className="mt-1 text-[19px] font-bold tracking-tight">до {uah(r.pricePerKg)}/кг</div>
        <ul className="mt-1.5 space-y-0.5 text-[13px] text-muted">
          <Row icon="box">Потрібно: {num(r.volumeT)} т</Row>
          <Row icon="pin">{r.regions.join(", ")}</Row>
          <Row icon="calendar">до {r.deadline}</Row>
        </ul>
        <p className="mt-2 hidden text-[13px] leading-snug text-muted sm:line-clamp-2">{r.buyer.name}: {r.requirements.join(", ")}.</p>
      </div>
      <div className="col-span-2 sm:mt-auto sm:p-4 sm:pt-3">
        <Link href={href} className="pressable flex items-center justify-center gap-1.5 rounded-xl bg-orange py-2.5 text-[14px] font-semibold text-on-orange">
          Запропонувати товар
        </Link>
      </div>
    </article>
  );
}
