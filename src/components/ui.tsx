// Спільні дрібні елементи інтерфейсу: значки, заголовки секцій, рейтинг, порожній стан.
import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icon";
import type { Seller } from "@/data/market";

export function Verified({ company }: { company?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-semibold text-accent">
      <Icon name="shield" size={12} strokeWidth={2} />
      {company ? "Верифікована компанія" : "Перевірений"}
    </span>
  );
}

export function Rating({ value, deals }: { value: number; deals?: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-[13px] text-muted">
      <Icon name="star" size={13} className="text-amber" />
      <span className="font-medium text-ink">{value.toFixed(1)}</span>
      {deals !== undefined && <span>· {deals} угод</span>}
    </span>
  );
}

export function SellerLine({ seller }: { seller: Seller }) {
  const initials = seller.name.replace(/[«»"]/g, "").split(/\s+/).slice(0, 2).map((w) => w[0]).join("");
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-surface-2 text-[14px] font-semibold text-muted">{initials}</div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="truncate font-semibold">{seller.name}</span>
          {seller.verified && <Verified company={seller.company} />}
        </div>
        <div className="mt-0.5"><Rating value={seller.rating} deals={seller.deals} /> <span className="text-[13px] text-muted">· з {seller.since}</span></div>
      </div>
    </div>
  );
}

export function SectionHead({ eyebrow, title, href, cta = "Усі" }: { eyebrow?: string; title: string; href?: string; cta?: string }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        {eyebrow && <div className="mb-1 text-[13px] font-semibold uppercase tracking-wider text-accent">{eyebrow}</div>}
        <h2 className="text-[26px] font-semibold leading-tight tracking-tight md:text-[32px]">{title}</h2>
      </div>
      {href && (
        <Link href={href} className="group flex shrink-0 items-center gap-1 text-[15px] font-medium text-accent">
          {cta} <Icon name="arrow" size={16} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}

export function PageHead({ title, sub, children }: { title: string; sub?: string; children?: ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-6 pt-8 md:pt-14">
      <h1 className="text-[34px] font-semibold leading-[1.05] tracking-tight md:text-[52px]">{title}</h1>
      {sub && <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-muted md:text-[19px]">{sub}</p>}
      {children}
    </div>
  );
}

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="pressable inline-flex items-center gap-1.5 text-[15px] font-medium text-accent">
      <Icon name="back" size={17} /> {label}
    </Link>
  );
}

export function Fact({ icon, label, value }: { icon: string; label: string; value: ReactNode }) {
  return (
    <div className="flex items-start gap-3 py-3">
      <Icon name={icon} size={19} className="mt-0.5 shrink-0 text-muted" />
      <div className="flex-1 text-[15px] text-muted">{label}</div>
      <div className="text-right text-[15px] font-medium">{value}</div>
    </div>
  );
}

export function DemoNote({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2 rounded-2xl bg-amber-soft px-4 py-3 text-[14px] text-amber">
      <Icon name="bell" size={17} className="mt-0.5 shrink-0" /> <span>{children}</span>
    </div>
  );
}
