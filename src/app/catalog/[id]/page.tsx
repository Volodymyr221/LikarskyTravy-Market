import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HerbArt } from "@/components/HerbArt";
import { ListingCard } from "@/components/Cards";
import { ContactBox } from "@/components/ContactBox";
import { BackLink, Fact, SellerLine } from "@/components/ui";
import { herbById } from "@/data/herbs";
import { findListing, listings } from "@/data/market";
import { uah, weight } from "@/lib/format";

export const dynamicParams = false;
export const generateStaticParams = () => listings.map((l) => ({ id: l.id }));

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const l = findListing((await params).id);
  return { title: l ? `${l.title} — ${l.pricePerKg} ₴/кг` : "Оголошення" };
}

export default async function ListingPage({ params }: Props) {
  const l = findListing((await params).id);
  if (!l) notFound();
  const herb = herbById(l.herbId);
  const more = listings.filter((x) => x.id !== l.id && (x.herbId === l.herbId || x.region === l.region)).slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-4 pt-6">
      <BackLink href="/catalog/" label="Каталог" />
      <div className="mt-4 grid gap-8 md:grid-cols-[1.25fr_1fr]">
        <div className="min-w-0 md:col-start-1">
          <HerbArt herbId={l.herbId} className="aspect-[4/3] rounded-[28px]" />
          <div className="mt-3 grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`overflow-hidden rounded-2xl ${i === 0 ? "ring-2 ring-accent" : "opacity-70"}`}>
                <HerbArt herbId={l.herbId} label={false} className="aspect-square" />
              </div>
            ))}
          </div>
        </div>
        <aside className="min-w-0 md:col-start-2 md:row-span-2 md:row-start-1 md:sticky md:top-24 md:self-start">
          <div className="rounded-[26px] bg-surface p-6 shadow-card">
            <div className="text-[14px] text-muted">{herb.name} · {herb.latin}</div>
            <h1 className="mt-1 text-[26px] font-semibold leading-tight tracking-tight">{l.title}</h1>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-[36px] font-semibold tracking-tight">{uah(l.pricePerKg)}</span>
              <span className="text-muted">за кг</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {[["В наявності", weight(l.volumeKg)], ["Мін. замовлення", weight(l.minOrderKg)], ["Вся партія", uah(l.volumeKg * l.pricePerKg)]].map(([k, v]) => (
                <div key={k} className="rounded-2xl bg-surface-2 px-2 py-3">
                  <div className="text-[15px] font-semibold">{v}</div>
                  <div className="text-[11px] text-muted">{k}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 text-[14px] text-muted">{l.village}, {l.region} обл. · {l.postedAgo}</div>
            <div className="mt-5"><ContactBox /></div>
          </div>
          <div className="mt-4 rounded-[26px] bg-surface p-5 shadow-card"><SellerLine seller={l.seller} /></div>
        </aside>
        <div className="min-w-0 md:col-start-1">
          <section className="md:mt-2">
            <h2 className="text-[22px] font-semibold tracking-tight">Опис</h2>
            <p className="mt-2 text-[16px] leading-relaxed">{l.description}</p>
          </section>
          <section className="mt-6 rounded-[22px] bg-surface px-5 shadow-card">
            <div className="divide-y divide-line">
              <Fact icon="leaf" label="Сировина" value={`${herb.name} (${herb.part})`} />
              <Fact icon="calendar" label="Збір" value={l.harvest} />
              <Fact icon="drop" label="Вологість" value={`${l.moisture}%`} />
              <Fact icon="sun" label="Сушіння" value={l.drying} />
              <Fact icon="box" label="Тара" value={l.packaging} />
              {l.certificate && <Fact icon="shield" label="Документи" value={l.certificate} />}
            </div>
          </section>
        </div>
      </div>

      {more.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-5 text-[24px] font-semibold tracking-tight">Схожі партії</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">{more.map((x) => <ListingCard key={x.id} l={x} />)}</div>
        </section>
      )}
    </div>
  );
}
