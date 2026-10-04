import type { Metadata } from "next";
import Link from "next/link";
import { HerbArt } from "@/components/HerbArt";
import { Icon } from "@/components/Icon";
import { Countdown } from "@/components/Countdown";
import { DemoNote, Rating } from "@/components/ui";
import { herbById } from "@/data/herbs";
import { auctions, listings, requests } from "@/data/market";
import { uah, weight } from "@/lib/format";

export const metadata: Metadata = { title: "Кабінет" };

export default function CabinetPage() {
  const mine = listings.filter((l) => l.seller.name === "Родина Ковальчуків");
  const myAuction = auctions[0];
  const stats = [
    { icon: "box", v: String(mine.length + 1), l: "активні оголошення" },
    { icon: "gavel", v: "1", l: "аукціон наживо" },
    { icon: "wallet", v: uah(86400), l: "продано за сезон" },
    { icon: "star", v: "4,9", l: "рейтинг" },
  ];
  return (
    <div className="mx-auto max-w-6xl px-4 pt-8">
      <DemoNote>Демо-кабінет: так виглядатиме ваш профіль після входу. Дані тестові.</DemoNote>
      <div className="mt-6 flex items-center gap-4">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-accent text-[22px] font-semibold text-on-accent">РК</div>
        <div>
          <h1 className="text-[28px] font-semibold tracking-tight">Родина Ковальчуків</h1>
          <div className="flex items-center gap-2 text-[14px] text-muted"><Rating value={4.9} deals={37} /> · Олика, Волинська обл.</div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.l} className="rounded-[22px] bg-surface p-5 shadow-card">
            <Icon name={s.icon} size={20} className="text-accent" />
            <div className="mt-3 text-[24px] font-semibold tracking-tight">{s.v}</div>
            <div className="text-[13px] text-muted">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4 rounded-[22px] border border-line bg-surface p-5">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent"><Icon name="shield" size={22} /></span>
        <div className="flex-1">
          <div className="font-semibold">Пройдіть верифікацію</div>
          <div className="text-[14px] text-muted">Значок «Перевірений» — і закупівельники відповідають утричі частіше.</div>
        </div>
        <Icon name="arrow" size={18} className="text-muted" />
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <section className="min-w-0">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[22px] font-semibold tracking-tight">Мої оголошення</h2>
            <Link href="/sell/" className="text-[15px] font-medium text-accent">+ Додати</Link>
          </div>
          <div className="space-y-3">
            {[...mine, listings[5]].map((l) => (
              <Link key={l.id} href={`/catalog/${l.id}/`} className="pressable flex items-center gap-4 rounded-[22px] bg-surface p-3 shadow-card">
                <HerbArt herbId={l.herbId} label={false} className="h-16 w-16 shrink-0 rounded-2xl" />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold">{l.title}</div>
                  <div className="text-[13px] text-muted">{weight(l.volumeKg)} · {uah(l.pricePerKg)}/кг</div>
                </div>
                <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[12px] font-semibold text-accent">Активне</span>
              </Link>
            ))}
          </div>
        </section>
        <section className="min-w-0">
          <h2 className="mb-4 text-[22px] font-semibold tracking-tight">Мій аукціон</h2>
          <Link href={`/auctions/${myAuction.id}/`} className="pressable block rounded-[22px] bg-surface p-5 shadow-card">
            <div className="flex items-center justify-between">
              <div className="font-semibold">{herbById(myAuction.herbId).name} · {weight(myAuction.volumeKg)}</div>
              <div className="flex items-center gap-1 text-[14px] text-muted"><Icon name="clock" size={15} /> <Countdown endsInHours={myAuction.endsInHours} /></div>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div><div className="text-[13px] text-muted">Найвища ставка</div><div className="text-[28px] font-semibold tracking-tight text-accent">{uah(myAuction.currentBid)}/кг</div></div>
              <div className="text-right text-[13px] text-muted">+{Math.round((myAuction.currentBid / myAuction.startPrice - 1) * 100)}% до старту<br />{myAuction.bids.length} ставок</div>
            </div>
          </Link>
          <h2 className="mb-4 mt-8 text-[22px] font-semibold tracking-tight">Підходять вам</h2>
          <div className="space-y-2">
            {requests.filter((r) => r.regions.includes("Волинська") || r.regions.includes("вся Україна")).slice(0, 3).map((r) => (
              <Link key={r.id} href={`/requests/${r.id}/`} className="pressable flex items-center justify-between rounded-2xl bg-surface px-4 py-3 shadow-card">
                <span className="font-medium">{herbById(r.herbId).name} · {r.volumeT} т</span>
                <span className="font-semibold text-accent">{r.pricePerKg} ₴/кг</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
