import Link from "next/link";
import { HerbArt } from "@/components/HerbArt";
import { Icon } from "@/components/Icon";
import { AuctionCard, ListingCard, RequestCard } from "@/components/Cards";
import { Season } from "@/components/Season";
import { SectionHead } from "@/components/ui";
import { auctions, listings, requests } from "@/data/market";
import { guides, shop } from "@/data/content";
import { herbById } from "@/data/herbs";
import { num, potential, uah, uahShort } from "@/lib/format";
import { asset } from "@/lib/brand";

const tiles = [
  { href: "/catalog/", icon: "grid", title: "Каталог", text: "Партії сировини від збирачів" },
  { href: "/requests/", icon: "clipboard", title: "Заявки", text: "Що шукають закупівельники" },
  { href: "/auctions/", icon: "gavel", title: "Аукціони", text: "Ціну визначає попит" },
  { href: "/learn/", icon: "book", title: "Навчання", text: "Як збирати й сушити" },
  { href: "/shop/", icon: "bag", title: "Магазин", text: "Чаї та послуги родини" },
];

export default function Home() {
  const wantedT = requests.reduce((s, r) => s + (r.volumeT - r.collectedT), 0);
  const wantedUah = requests.reduce((s, r) => s + potential(r.volumeT - r.collectedT, r.pricePerKg), 0);
  const top = requests[0];
  const hot = auctions[0];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_80%_0%,var(--accent-soft),transparent_70%)]" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-12 pt-10 md:grid-cols-[1.1fr_1fr] md:pb-20 md:pt-20">
          <div className="rise">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[13px] font-medium shadow-card">
              <span className="h-2 w-2 rounded-full bg-accent" /> Маркетплейс лікарських рослин України
            </div>
            <h1 className="text-[44px] font-semibold leading-[1.02] tracking-[-0.035em] md:text-[72px]">
              Збирайте.<br />Сушіть.<br /><span className="text-accent">Продавайте.</span>
            </h1>
            <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-muted md:text-[20px]">
              Корінь аїру, кропива, липовий цвіт — закупівельники вже шукають сировину з вашого села. Вам лишається заготовити.
            </p>
            <form action={asset("/catalog/")} className="mt-7 flex max-w-lg items-center gap-2 rounded-full border border-line bg-surface p-1.5 pl-5 shadow-card">
              <Icon name="search" size={19} className="text-muted" />
              <input name="q" placeholder="Що шукаєте? Наприклад, корінь аїру" aria-label="Пошук сировини"
                className="min-w-0 flex-1 bg-transparent py-2 text-[16px] outline-none placeholder:text-muted" />
              <button className="pressable rounded-full bg-ink px-5 py-2.5 text-[15px] font-semibold text-bg">Знайти</button>
            </form>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/sell/" className="pressable inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[16px] font-semibold text-on-accent shadow-card">
                <Icon name="plus" size={18} strokeWidth={2.4} /> Продати сировину
              </Link>
              <Link href="/sell/?mode=request" className="pressable inline-flex items-center gap-2 rounded-full bg-surface px-6 py-3.5 text-[16px] font-semibold shadow-card">
                Я закупівельник <Icon name="arrow" size={17} />
              </Link>
            </div>
          </div>

          {/* Композиція карток */}
          <div className="rise relative mx-auto h-[360px] w-full max-w-[460px] md:h-[480px]" style={{ animationDelay: "120ms" }}>
            <div className="absolute left-0 top-6 w-[58%] -rotate-6 overflow-hidden rounded-[28px] shadow-float">
              <HerbArt herbId="linden" className="aspect-[3/4]" />
            </div>
            <div className="absolute right-0 top-0 w-[56%] rotate-[5deg] overflow-hidden rounded-[28px] shadow-float">
              <HerbArt herbId="nettle-leaf" className="aspect-[3/4]" />
            </div>
            <div className="absolute bottom-0 left-[18%] w-[64%] overflow-hidden rounded-[28px] shadow-float">
              <HerbArt herbId="air-root" className="aspect-[4/3]" />
            </div>
            <div className="absolute -left-2 bottom-24 rounded-2xl bg-surface/90 px-4 py-3 shadow-float backdrop-blur-xl md:-left-6">
              <div className="text-[12px] text-muted">Куплю · {top.buyer.name}</div>
              <div className="text-[15px] font-semibold">{herbById(top.herbId).name} {top.volumeT} т · <span className="text-accent">{top.pricePerKg} ₴/кг</span></div>
            </div>
            <div className="absolute -right-1 bottom-40 rounded-2xl bg-surface/90 px-4 py-3 shadow-float backdrop-blur-xl md:-right-4">
              <div className="flex items-center gap-1.5 text-[12px] text-muted"><span className="live-dot h-2 w-2 rounded-full bg-[#ff5a3c]" /> Аукціон</div>
              <div className="text-[15px] font-semibold">Нова ставка {uah(hot.currentBid)}</div>
            </div>
          </div>
        </div>

        {/* Цифри (рахуються з тестових даних) */}
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-3 divide-x divide-line rounded-[22px] bg-surface py-5 shadow-card">
            {[
              [`${num(Math.round(wantedT * 10) / 10)} т`, "шукають закупівельники"],
              [uahShort(wantedUah), "готові заплатити за сировину"],
              [String(auctions.length), "аукціони наживо"],
            ].map(([v, l]) => (
              <div key={l} className="px-3 text-center md:px-6">
                <div className="text-[19px] font-semibold tracking-tight md:text-[30px]">{v}</div>
                <div className="mt-0.5 text-[12px] leading-tight text-muted md:text-[14px]">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Розділи */}
      <section className="mx-auto mt-14 max-w-6xl px-4">
        <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-5 md:px-0">
          {tiles.map((t) => (
            <Link key={t.href} href={t.href} className="lift pressable w-[150px] shrink-0 rounded-[22px] bg-surface p-4 shadow-card md:w-auto">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent-soft text-accent"><Icon name={t.icon} size={22} /></span>
              <div className="mt-4 font-semibold">{t.title}</div>
              <div className="mt-0.5 text-[13px] leading-snug text-muted">{t.text}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Заявки */}
      <section className="mx-auto mt-16 max-w-6xl px-4">
        <SectionHead eyebrow="Шукають зараз" title="Збирайте під замовлення" href="/requests/" cta="Усі заявки" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {requests.slice(0, 3).map((r) => <RequestCard key={r.id} r={r} />)}
        </div>
      </section>

      {/* Аукціони */}
      <section className="mx-auto mt-16 max-w-6xl px-4">
        <SectionHead eyebrow="Наживо" title="Аукціони" href="/auctions/" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {auctions.map((a) => <AuctionCard key={a.id} a={a} />)}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-4"><Season /></section>

      {/* Свіжі оголошення */}
      <section className="mx-auto mt-16 max-w-6xl px-4">
        <SectionHead eyebrow="Каталог" title="Свіжі партії" href="/catalog/" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {listings.slice(0, 8).map((l) => <ListingCard key={l.id} l={l} />)}
        </div>
      </section>

      {/* Як це працює */}
      <section className="mx-auto mt-20 max-w-6xl px-4">
        <SectionHead eyebrow="Просто" title="Як це працює" />
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { who: "Для збирачів", icon: "leaf", steps: ["Подивіться заявки й календар — що зараз купують", "Зберіть і висушіть за нашими гайдами", "Викладіть партію або виставте на аукціон", "Отримайте оплату після зважування"] },
            { who: "Для закупівельників", icon: "truck", steps: ["Розмістіть заявку: що, скільки, за якою ціною", "Збирачі в регіонах бачать її одразу", "Обирайте партії з фото, вологістю й рейтингом", "Забирайте самовивозом або поштою"] },
          ].map((c) => (
            <div key={c.who} className="rounded-[26px] bg-surface p-6 shadow-card md:p-8">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent-soft text-accent"><Icon name={c.icon} size={22} /></span>
                <h3 className="text-[22px] font-semibold tracking-tight">{c.who}</h3>
              </div>
              <ol className="mt-6 space-y-4">
                {c.steps.map((s, i) => (
                  <li key={s} className="flex gap-4">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-[13px] font-semibold text-bg">{i + 1}</span>
                    <span className="pt-0.5 text-[16px] leading-snug">{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {/* Навчання */}
      <section className="mx-auto mt-20 max-w-6xl px-4">
        <SectionHead eyebrow="Навчання" title="Збирайте правильно — продавайте дорожче" href="/learn/" cta="Усі гайди" />
        <div className="grid gap-4 md:grid-cols-3">
          {guides.slice(0, 3).map((g) => (
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
      </section>

      {/* Магазин родини */}
      <section className="mx-auto mt-20 max-w-6xl px-4">
        <div className="grid overflow-hidden rounded-[30px] bg-ink text-bg md:grid-cols-2">
          <div className="p-8 md:p-12">
            <div className="text-[13px] font-semibold uppercase tracking-wider opacity-70">Від родини засновника</div>
            <h2 className="mt-2 text-[30px] font-semibold leading-tight tracking-tight md:text-[40px]">Ми самі збираємо й сушимо трави вже багато років</h2>
            <p className="mt-4 text-[16px] leading-relaxed opacity-75">Чаї та збори з нашої сировини, а ще послуги для збирачів: сушіння, вивезення партій, протокол вологості.</p>
            <Link href="/shop/" className="pressable mt-7 inline-flex items-center gap-2 rounded-full bg-bg px-6 py-3.5 font-semibold text-ink">
              До магазину <Icon name="arrow" size={17} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 p-4 md:p-6">
            {shop.slice(0, 4).map((s) => (
              <div key={s.id} className="overflow-hidden rounded-2xl bg-white/5">
                <HerbArt herbId={s.herbId} label={false} className="aspect-square" />
                <div className="p-3 text-[14px]">
                  <div className="font-semibold">{s.title}</div>
                  <div className="opacity-70">{uah(s.price)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Заклик */}
      <section className="mx-auto mt-20 max-w-3xl px-4 text-center">
        <h2 className="text-[32px] font-semibold leading-tight tracking-tight md:text-[48px]">У вашому селі вже ростуть гроші.</h2>
        <p className="mx-auto mt-4 max-w-xl text-[17px] text-muted">Викладіть першу партію за 2 хвилини — з телефона, просто з поля.</p>
        <Link href="/sell/" className="pressable mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-[17px] font-semibold text-on-accent shadow-card">
          <Icon name="plus" size={18} strokeWidth={2.4} /> Розмістити оголошення
        </Link>
      </section>
    </>
  );
}
