import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HerbArt } from "@/components/HerbArt";
import { Icon } from "@/components/Icon";
import { BackLink } from "@/components/ui";
import { findGuide, guides } from "@/data/content";
import { herbById } from "@/data/herbs";
import { requests } from "@/data/market";

export const dynamicParams = false;
export const generateStaticParams = () => guides.map((g) => ({ slug: g.slug }));
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const g = findGuide((await params).slug);
  return { title: g?.title ?? "Гайд", description: g?.summary };
}

export default async function GuidePage({ params }: Props) {
  const g = findGuide((await params).slug);
  if (!g) notFound();
  const herb = herbById(g.herbId);
  const demand = requests.find((r) => r.herbId === g.herbId);

  return (
    <article className="mx-auto max-w-3xl px-4 pt-6">
      <BackLink href="/learn/" label="Навчання" />
      <div className="mt-5 text-[14px] text-muted">{g.minutes} хв читання · {g.level}</div>
      <h1 className="mt-2 text-[34px] font-semibold leading-[1.08] tracking-tight md:text-[48px]">{g.title}</h1>
      <p className="mt-4 text-[19px] leading-relaxed text-muted">{g.summary}</p>
      <HerbArt herbId={g.herbId} className="mt-8 aspect-[16/9] rounded-[28px]" />
      <div className="mt-6 flex items-center gap-3 rounded-2xl bg-accent-soft p-4 text-accent">
        <Icon name="calendar" size={20} /> <span className="text-[15px] font-medium">Коли збирати: {g.when}</span>
      </div>

      <ol className="mt-10 space-y-8">
        {g.steps.map((s, i) => (
          <li key={s.title} className="flex gap-5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-[15px] font-semibold text-bg">{i + 1}</span>
            <div>
              <h2 className="text-[20px] font-semibold tracking-tight">{s.title}</h2>
              <p className="mt-1.5 text-[17px] leading-relaxed">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 rounded-[22px] bg-surface p-6 shadow-card">
        <div className="font-semibold">Поради</div>
        <ul className="mt-3 space-y-2">
          {g.tips.map((t) => <li key={t} className="flex gap-2.5 text-[16px]"><Icon name="leaf" size={18} className="mt-0.5 shrink-0 text-accent" /> {t}</li>)}
        </ul>
      </div>
      {g.warning && (
        <div className="mt-4 flex gap-2.5 rounded-2xl bg-amber-soft p-4 text-[15px] text-amber"><Icon name="shield" size={18} className="mt-0.5 shrink-0" /> {g.warning}</div>
      )}

      {demand && (
        <Link href={`/requests/${demand.id}/`} className="lift pressable mt-10 flex items-center gap-4 rounded-[22px] bg-ink p-5 text-bg">
          <div className="flex-1">
            <div className="text-[13px] opacity-70">Уже зараз купують</div>
            <div className="text-[18px] font-semibold">{herb.name}: {demand.volumeT} т по {demand.pricePerKg} ₴/кг</div>
          </div>
          <Icon name="arrow" size={20} />
        </Link>
      )}
    </article>
  );
}
