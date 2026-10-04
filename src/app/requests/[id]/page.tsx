import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HerbArt } from "@/components/HerbArt";
import { Icon } from "@/components/Icon";
import { BackLink, Fact, SellerLine } from "@/components/ui";
import { guides } from "@/data/content";
import { herbById } from "@/data/herbs";
import { findRequest, requests } from "@/data/market";
import { potential, uah } from "@/lib/format";

export const dynamicParams = false;
export const generateStaticParams = () => requests.map((r) => ({ id: r.id }));
type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = findRequest((await params).id);
  return { title: r ? `Куплю ${herbById(r.herbId).name.toLowerCase()} ${r.volumeT} т` : "Заявка" };
}

export default async function RequestPage({ params }: Props) {
  const r = findRequest((await params).id);
  if (!r) notFound();
  const herb = herbById(r.herbId);
  const left = r.volumeT - r.collectedT;
  const pct = Math.round((r.collectedT / r.volumeT) * 100);
  const guide = guides.find((g) => g.herbId === r.herbId);

  return (
    <div className="mx-auto max-w-5xl px-4 pt-6">
      <BackLink href="/requests/" label="Заявки" />
      <div className="mt-4 overflow-hidden rounded-[30px] bg-surface shadow-card">
        <HerbArt herbId={r.herbId} className="aspect-[21/9]" />
        <div className="p-6 md:p-10">
          <div className="text-[13px] font-semibold uppercase tracking-wider text-accent">Куплю</div>
          <h1 className="mt-1 text-[32px] font-semibold leading-tight tracking-tight md:text-[44px]">{herb.name} — {r.volumeT} т</h1>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-accent-soft p-4 text-accent">
              <div className="text-[13px]">Ціна</div>
              <div className="text-[26px] font-semibold tracking-tight">{r.pricePerKg} ₴/кг</div>
            </div>
            <div className="rounded-2xl bg-surface-2 p-4">
              <div className="text-[13px] text-muted">Ще потрібно</div>
              <div className="text-[26px] font-semibold tracking-tight">{Math.round(left * 10) / 10} т</div>
            </div>
            <div className="rounded-2xl bg-surface-2 p-4">
              <div className="text-[13px] text-muted">Можна заробити</div>
              <div className="text-[26px] font-semibold tracking-tight">{uah(potential(left, r.pricePerKg))}</div>
            </div>
          </div>
          <div className="mt-6">
            <div className="mb-2 flex justify-between text-[14px]"><span className="text-muted">Зібрано {r.collectedT} з {r.volumeT} т</span><span className="font-medium">{pct}%</span></div>
            <div className="h-2.5 overflow-hidden rounded-full bg-surface-2"><div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} /></div>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-[19px] font-semibold">Вимоги до сировини</h2>
              <ul className="mt-3 space-y-2">
                {r.requirements.map((q) => (
                  <li key={q} className="flex items-center gap-2.5 text-[16px]"><Icon name="check" size={18} className="text-accent" strokeWidth={2.2} /> {q}</li>
                ))}
              </ul>
              <div className="mt-5 divide-y divide-line">
                <Fact icon="pin" label="Регіони" value={r.regions.join(", ")} />
                <Fact icon="truck" label="Як забирають" value={<span className="block max-w-[220px]">{r.pickup}</span>} />
                <Fact icon="calendar" label="Термін" value={`до ${r.deadline}`} />
              </div>
            </div>
            <div>
              <div className="rounded-[22px] border border-line p-5"><SellerLine seller={r.buyer} /></div>
              <Link href="/login/" className="pressable mt-4 flex items-center justify-center gap-2 rounded-full bg-accent py-4 text-[17px] font-semibold text-on-accent">
                Запропонувати свою партію
              </Link>
              <p className="mt-2 text-center text-[13px] text-muted">Закупівельник побачить вашу пропозицію і зв’яжеться з вами</p>
              {guide && (
                <Link href={`/learn/${guide.slug}/`} className="pressable mt-5 flex items-center gap-3 rounded-[22px] bg-surface-2 p-4">
                  <Icon name="book" size={22} className="text-accent" />
                  <div className="flex-1"><div className="text-[13px] text-muted">Ще не збирали?</div><div className="font-semibold">{guide.title}</div></div>
                  <Icon name="arrow" size={18} className="text-muted" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
