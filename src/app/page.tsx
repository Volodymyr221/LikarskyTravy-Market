import Link from "next/link";
import { HerbArt } from "@/components/HerbArt";
import { Icon } from "@/components/Icon";
import { Market } from "@/components/Market";
import { categories, herbById } from "@/data/herbs";
import { auctions, listings, regions, requests } from "@/data/market";
import { guides } from "@/data/content";
import { asset } from "@/lib/brand";

const countIn = (cat: string) =>
  listings.filter((l) => herbById(l.herbId).category === cat).length + requests.filter((r) => herbById(r.herbId).category === cat).length;

const trust = [
  { icon: "leaf", t: "Тільки натуральна лікарська сировина" },
  { icon: "shield", t: "Перевірені продавці й компанії" },
  { icon: "phone", t: "Прямий контакт, без посередників" },
  { icon: "truck", t: "Самовивіз або доставка поштою" },
];

const sel = "w-full appearance-none rounded-xl bg-surface-2 py-3 pl-10 pr-9 text-[15px] text-ink outline-none md:rounded-none md:bg-transparent md:py-3.5";

export default function Home() {
  return (
    <>
      {/* Банер з пошуком */}
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#173d28_0%,#2b7448_60%,#3d8a55_100%)] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_70%_at_85%_20%,rgba(255,255,255,0.18),transparent_70%)]" />
        <div className="pointer-events-none absolute -right-10 top-6 hidden w-[520px] md:block">
          <div className="absolute right-[260px] top-6 w-40 -rotate-6 overflow-hidden rounded-[26px] shadow-float"><HerbArt herbId="chamomile" className="aspect-[3/4]" /></div>
          <div className="absolute right-[100px] top-0 w-44 rotate-3 overflow-hidden rounded-[26px] shadow-float"><HerbArt herbId="linden" className="aspect-[3/4]" /></div>
          <div className="absolute right-[180px] top-[118px] w-44 overflow-hidden rounded-[26px] shadow-float"><HerbArt herbId="air-root" className="aspect-[4/3]" /></div>
        </div>
        <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-10 md:pb-28 md:pt-16">
          <h1 className="max-w-xl text-[32px] font-bold leading-[1.08] tracking-tight md:text-[48px]">
            Маркетплейс лікарських рослин України
          </h1>
          <p className="mt-3 max-w-lg text-[17px] leading-snug text-white/85 md:text-[19px]">
            Продавайте зібрану сировину. Знаходьте покупців. Замовляйте потрібні рослини.
          </p>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-16 max-w-6xl px-4 md:-mt-20">
        <form action={asset("/catalog/")} className="grid gap-2 rounded-[22px] bg-surface p-2 shadow-float md:grid-cols-[1.6fr_1fr_1fr_auto] md:items-center md:gap-0 md:divide-x md:divide-line">
          <label className="relative block">
            <span className="sr-only">Назва рослини</span>
            <Icon name="search" size={19} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input name="q" placeholder="Пошук за назвою рослини…" className="w-full rounded-xl bg-surface-2 py-3 pl-11 pr-3 text-[16px] outline-none placeholder:text-muted md:rounded-none md:bg-transparent md:py-3.5" />
          </label>
          <div className="grid grid-cols-2 gap-2 md:contents">
            <label className="relative block">
              <span className="sr-only">Область</span>
              <Icon name="pin" size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <select name="region" className={sel} defaultValue="">
                <option value="">Усі області</option>
                {regions.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
              <Icon name="chevron" size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
            </label>
            <label className="relative block">
              <span className="sr-only">Категорія</span>
              <Icon name="grid" size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <select name="cat" className={sel} defaultValue="">
                <option value="">Усі категорії</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <Icon name="chevron" size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
            </label>
          </div>
          <div className="md:pl-2">
            <button className="pressable flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-[16px] font-semibold text-on-accent md:rounded-2xl">
              <Icon name="search" size={18} /> Знайти
            </button>
          </div>
        </form>
      </div>

      {/* Категорії */}
      <section className="mx-auto mt-8 max-w-6xl px-4">
        <div className="grid grid-cols-3 gap-2.5 md:grid-cols-6 md:gap-4">
          {categories.map((c) => (
            <Link key={c.id} href={`/catalog/?cat=${c.id}`} className="lift pressable overflow-hidden rounded-[20px] bg-surface text-center shadow-card">
              <HerbArt herbId={c.icon} className="aspect-[4/3]" />
              <div className="px-2 py-2.5">
                <div className="text-[15px] font-semibold">{c.name}</div>
                <div className="text-[12px] text-muted">{countIn(c.id)} оголош.</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Оголошення */}
      <section className="mx-auto mt-12 max-w-6xl px-4">
        <Market limit={6} />
      </section>

      {/* Аукціони · навчання · магазин */}
      <section className="mx-auto mt-14 grid max-w-6xl gap-4 px-4 md:grid-cols-3">
        <Link href="/auctions/" className="lift pressable flex items-center gap-4 rounded-[22px] bg-amber-soft p-5">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-surface text-amber"><Icon name="gavel" size={24} /></span>
          <div className="flex-1">
            <div className="flex items-center gap-1.5 text-[13px] font-semibold text-amber"><span className="live-dot h-2 w-2 rounded-full bg-[#ff5a3c]" /> {auctions.length} аукціони наживо</div>
            <div className="text-[17px] font-semibold leading-snug">Продайте дорожче на аукціоні</div>
          </div>
          <Icon name="arrow" size={18} className="text-muted" />
        </Link>
        <Link href="/learn/" className="lift pressable flex items-center gap-4 rounded-[22px] bg-accent-soft p-5">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-surface text-accent"><Icon name="book" size={24} /></span>
          <div className="flex-1">
            <div className="text-[13px] font-semibold text-accent">{guides.length} коротких гайдів</div>
            <div className="text-[17px] font-semibold leading-snug">Як правильно збирати й сушити</div>
          </div>
          <Icon name="arrow" size={18} className="text-muted" />
        </Link>
        <Link href="/shop/" className="lift pressable flex items-center gap-4 rounded-[22px] bg-surface p-5 shadow-card">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-surface-2"><Icon name="bag" size={24} /></span>
          <div className="flex-1">
            <div className="text-[13px] font-semibold text-muted">Від родини засновника</div>
            <div className="text-[17px] font-semibold leading-snug">Чаї, сушіння, вивезення партій</div>
          </div>
          <Icon name="arrow" size={18} className="text-muted" />
        </Link>
      </section>

      {/* Довіра */}
      <section className="mx-auto mt-14 max-w-6xl px-4">
        <div className="grid gap-4 rounded-[26px] bg-accent-soft p-6 sm:grid-cols-2 md:grid-cols-4 md:p-8">
          {trust.map((x) => (
            <div key={x.t} className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-surface text-accent"><Icon name={x.icon} size={22} /></span>
              <span className="text-[15px] font-medium leading-snug">{x.t}</span>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-[18px] font-semibold italic text-accent">Разом зберігаємо природні багатства України</p>
      </section>
    </>
  );
}
