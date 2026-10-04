"use client";
// Каркас застосунку: шапка (скло), нижня панель вкладок на телефоні, перемикач теми, реєстрація service worker.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon, Logo } from "./Icon";
import { brand, basePath } from "@/lib/brand";

const nav = [
  { href: "/catalog/", label: "Каталог" },
  { href: "/requests/", label: "Заявки" },
  { href: "/auctions/", label: "Аукціони" },
  { href: "/learn/", label: "Навчання" },
  { href: "/shop/", label: "Магазин" },
];

const isActive = (path: string, href: string) => (href === "/" ? path === "/" : path.startsWith(href.replace(/\/$/, "")));

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);
  useEffect(() => setDark(document.documentElement.dataset.theme === "dark"), []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch {}
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next ? "#0b0c0b" : "#f6f5f1");
  };
  return (
    <button onClick={toggle} aria-label={dark ? "Світла тема" : "Темна тема"}
      className="pressable grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-surface-2">
      <Icon name={dark ? "sun" : "moon"} size={19} />
    </button>
  );
}

export function Header() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-glass backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4 md:h-16">
        <Link href="/" className="pressable mr-2 flex items-center gap-2.5" aria-label={`${brand.name} — на головну`}>
          <Logo />
          <span className="text-[19px] font-semibold tracking-tight">{brand.name}</span>
        </Link>
        <nav className="hidden flex-1 items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href}
              className={`rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors ${isActive(path, n.href) ? "bg-surface-2 text-ink" : "text-muted hover:text-ink"}`}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <ThemeToggle />
          <Link href="/login/" aria-label="Увійти" className="pressable grid h-10 w-10 place-items-center rounded-full hover:bg-surface-2">
            <Icon name="user" size={20} />
          </Link>
          <Link href="/sell/" className="pressable ml-1 hidden items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[14px] font-semibold text-on-accent md:flex">
            <Icon name="plus" size={16} strokeWidth={2.4} /> Продати
          </Link>
        </div>
      </div>
    </header>
  );
}

const tabs = [
  { href: "/", label: "Головна", icon: "home" },
  { href: "/catalog/", label: "Каталог", icon: "grid" },
  { href: "/sell/", label: "Продати", icon: "plus", primary: true },
  { href: "/requests/", label: "Заявки", icon: "clipboard" },
  { href: "/auctions/", label: "Аукціони", icon: "gavel" },
];

export function TabBar() {
  const path = usePathname();
  return (
    <nav className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-line bg-glass backdrop-blur-xl backdrop-saturate-150 md:hidden" aria-label="Основна навігація">
      <ul className="mx-auto grid h-[58px] max-w-md grid-cols-5">
        {tabs.map((t) => {
          const active = isActive(path, t.href);
          return (
            <li key={t.href}>
              <Link href={t.href} className="pressable flex h-full flex-col items-center justify-center gap-0.5">
                {t.primary ? (
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-on-accent shadow-card">
                    <Icon name="plus" size={20} strokeWidth={2.4} />
                  </span>
                ) : (
                  <Icon name={t.icon} size={23} className={active ? "text-accent" : "text-muted"} strokeWidth={active ? 2.1 : 1.7} />
                )}
                <span className={`text-[10px] font-medium ${active || t.primary ? "text-ink" : "text-muted"}`}>{t.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register(`${basePath}/sw.js`, { scope: `${basePath}/` }).catch(() => {});
  }, []);
  return null;
}
