import type { Metadata } from "next";
import Link from "next/link";
import { HerbArt } from "@/components/HerbArt";
import { PageHead } from "@/components/ui";
import { guides } from "@/data/content";
import { herbs, monthNames } from "@/data/herbs";

export const metadata: Metadata = { title: "Навчання", description: "Як правильно збирати, сушити й готувати лікарську сировину до продажу." };

export default function LearnPage() {
  const [first, ...rest] = guides;
  return (
    <>
      <PageHead title="Навчання" sub="Правильно зібрана й висушена сировина коштує вдвічі дорожче. Короткі гайди — з телефона, просто в полі." />
      <div className="mx-auto max-w-6xl px-4">
        <Link href={`/learn/${first.slug}/`} className="lift pressable grid overflow-hidden rounded-[30px] bg-surface shadow-card md:grid-cols-2">
          <HerbArt herbId={first.herbId} className="aspect-[4/3] md:aspect-auto md:min-h-[340px]" />
          <div className="flex flex-col justify-center p-7 md:p-10">
            <div className="text-[13px] font-semibold uppercase tracking-wider text-accent">Головний гайд · {first.minutes} хв</div>
            <h2 className="mt-2 text-[28px] font-semibold leading-tight tracking-tight md:text-[36px]">{first.title}</h2>
            <p className="mt-3 text-[16px] text-muted">{first.summary}</p>
            <span className="mt-6 inline-flex w-fit rounded-full bg-ink px-5 py-3 font-semibold text-bg">Читати</span>
          </div>
        </Link>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {rest.map((g) => (
            <Link key={g.slug} href={`/learn/${g.slug}/`} className="lift pressable overflow-hidden rounded-[22px] bg-surface shadow-card">
              <HerbArt herbId={g.herbId} label={false} className="aspect-[16/9]" />
              <div className="p-5">
                <div className="text-[13px] text-muted">{g.minutes} хв · {g.level}</div>
                <div className="mt-1 text-[18px] font-semibold leading-snug tracking-tight">{g.title}</div>
                <p className="mt-2 line-clamp-2 text-[14px] text-muted">{g.summary}</p>
              </div>
            </Link>
          ))}
        </div>

        <section id="calendar" className="mt-16 scroll-mt-24">
          <h2 className="text-[26px] font-semibold tracking-tight md:text-[32px]">Календар збору</h2>
          <p className="mt-2 text-muted">Коли яку сировину заготовляють. Точні строки залежать від регіону й погоди.</p>
          <div className="no-scrollbar mt-6 overflow-x-auto rounded-[22px] bg-surface p-4 shadow-card">
            <table className="w-full min-w-[760px] border-separate border-spacing-y-1.5 text-[13px]">
              <thead>
                <tr><th className="w-44 text-left font-medium text-muted">Сировина</th>{monthNames.map((m) => <th key={m} className="font-medium text-muted">{m.slice(0, 3)}</th>)}</tr>
              </thead>
              <tbody>
                {herbs.map((h) => (
                  <tr key={h.id}>
                    <td className="pr-3 font-medium">{h.name}</td>
                    {monthNames.map((_, i) => (
                      <td key={i} className="px-0.5">
                        <div className={`h-6 rounded-md ${h.months.includes(i + 1) ? "bg-accent" : "bg-surface-2"}`} title={h.months.includes(i + 1) ? "сезон збору" : ""} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
