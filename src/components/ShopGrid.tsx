"use client";
// Магазин родини засновника: кошик лише на екрані (прототип).
import { useState } from "react";
import { HerbArt } from "./HerbArt";
import { Icon } from "./Icon";
import { shop } from "@/data/content";
import { uah } from "@/lib/format";

export function ShopGrid() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = shop.reduce((s, i) => s + (cart[i.id] ?? 0) * i.price, 0);
  const add = (id: string) => setCart({ ...cart, [id]: (cart[id] ?? 0) + 1 });
  const goods = shop.filter((s) => s.kind !== "Послуга");
  const services = shop.filter((s) => s.kind === "Послуга");

  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {goods.map((s) => (
          <div key={s.id} className="overflow-hidden rounded-[22px] bg-surface shadow-card">
            <HerbArt herbId={s.herbId} label={false} className="aspect-square" />
            <div className="p-4">
              <div className="text-[12px] font-semibold uppercase tracking-wider text-accent">{s.kind}</div>
              <div className="mt-0.5 font-semibold leading-snug">{s.title}</div>
              <div className="text-[13px] text-muted">{s.detail}</div>
              <p className="mt-2 line-clamp-2 text-[13px] text-muted">{s.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[18px] font-semibold">{uah(s.price)}</span>
                <button onClick={() => add(s.id)} aria-label={`Додати ${s.title} в кошик`}
                  className="pressable grid h-10 w-10 place-items-center rounded-full bg-accent text-on-accent">
                  {cart[s.id] ? <span className="text-[14px] font-semibold">{cart[s.id]}</span> : <Icon name="plus" size={18} strokeWidth={2.4} />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[13px] text-muted">Чаї — харчовий продукт, не лікарський засіб. Перед застосуванням трав проконсультуйтесь з лікарем.</p>

      <section id="services" className="mt-14 scroll-mt-24">
        <h2 className="text-[26px] font-semibold tracking-tight md:text-[32px]">Послуги для збирачів</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {services.map((s) => (
            <div key={s.id} className="flex flex-col rounded-[22px] bg-surface p-6 shadow-card">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent-soft text-accent">
                <Icon name={s.id === "s-5" ? "sun" : s.id === "s-6" ? "truck" : "drop"} size={22} />
              </span>
              <div className="mt-4 text-[18px] font-semibold">{s.title}</div>
              <div className="text-[13px] text-muted">{s.detail}</div>
              <p className="mt-2 flex-1 text-[15px] text-muted">{s.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-semibold">{s.price ? `${uah(s.price)} / ${s.unit}` : "Ціна договірна"}</span>
                <a href="#services" className="pressable rounded-full bg-surface-2 px-4 py-2 text-[14px] font-semibold">Замовити</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {count > 0 && (
        <div className="rise fixed inset-x-4 bottom-[76px] z-30 mx-auto flex max-w-md items-center justify-between rounded-full bg-ink py-2 pl-5 pr-2 text-bg shadow-float md:bottom-6">
          <span className="font-semibold">{count} шт · {uah(total)}</span>
          <button className="pressable rounded-full bg-accent px-5 py-2.5 font-semibold text-on-accent">Оформити</button>
        </div>
      )}
    </div>
  );
}
