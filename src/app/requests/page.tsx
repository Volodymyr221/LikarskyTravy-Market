import type { Metadata } from "next";
import Link from "next/link";
import { RequestCard } from "@/components/Cards";
import { Icon } from "@/components/Icon";
import { PageHead } from "@/components/ui";
import { requests } from "@/data/market";
import { potential, uah } from "@/lib/format";

export const metadata: Metadata = { title: "Заявки закупівельників", description: "Що зараз купують заготівельники й компанії: обсяги, ціни, терміни." };

export default function RequestsPage() {
  const total = requests.reduce((s, r) => s + potential(r.volumeT - r.collectedT, r.pricePerKg), 0);
  return (
    <>
      <PageHead title="Заявки закупівельників" sub="Компанії публікують, що їм потрібно. Ви збираєте — вони купують. Кожну заявку перевіряємо.">
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="rounded-2xl bg-accent-soft px-4 py-3 text-accent">
            <div className="text-[13px]">Разом готові заплатити</div>
            <div className="text-[22px] font-semibold tracking-tight">{uah(Math.round(total / 1000) * 1000)}</div>
          </div>
          <Link href="/sell/?mode=request" className="pressable inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-semibold text-bg">
            <Icon name="plus" size={17} strokeWidth={2.4} /> Розмістити заявку
          </Link>
        </div>
      </PageHead>
      <div className="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-2">
        {requests.map((r) => <RequestCard key={r.id} r={r} />)}
      </div>
    </>
  );
}
