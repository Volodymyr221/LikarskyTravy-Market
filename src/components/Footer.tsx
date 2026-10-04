// Футер: розділи, позначка прототипу і лічильник версії (підставляє CI).
import Link from "next/link";
import { Logo } from "./Icon";
import { brand } from "@/lib/brand";

const cols = [
  { title: "Маркетплейс", links: [["Каталог сировини", "/catalog/"], ["Заявки закупівельників", "/requests/"], ["Аукціони", "/auctions/"], ["Продати", "/sell/"]] },
  { title: "Знання", links: [["Як збирати", "/learn/"], ["Календар збору", "/learn/#calendar"], ["Як підготувати партію", "/learn/yak-pidhotuvaty-partiiu/"]] },
  { title: "Родина засновника", links: [["Чаї та збори", "/shop/"], ["Сушіння й логістика", "/shop/#services"], ["Кабінет", "/cabinet/"]] },
];

export function Footer() {
  const n = process.env.NEXT_PUBLIC_BUILD_NUMBER ?? "dev";
  const t = process.env.NEXT_PUBLIC_BUILD_TIME ?? "";
  return (
    <footer className="mt-20 border-t border-line pb-28 pt-12 md:pb-12">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5"><Logo /><span className="text-[19px] font-semibold tracking-tight">{brand.name}</span></div>
          <p className="mt-3 text-[14px] leading-relaxed text-muted">{brand.tagline}. Від села — до покупця.</p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div className="mb-3 text-[13px] font-semibold">{c.title}</div>
            <ul className="space-y-2">
              {c.links.map(([label, href]) => (
                <li key={href}><Link href={href} className="text-[14px] text-muted hover:text-ink">{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-2 px-4 text-[12px] text-muted md:flex-row md:justify-between">
        <span>Прототип · усі дані тестові · Інформація про рослини не є медичною порадою — перед застосуванням проконсультуйтесь з лікарем.</span>
        <span className="tabular-nums">v{n}{t && ` · ${t}`}</span>
      </div>
    </footer>
  );
}
