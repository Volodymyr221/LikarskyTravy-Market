"use client";
// Вхід за номером телефону (без логіки — прототип).
import Link from "next/link";
import { useState } from "react";
import { Icon, Logo } from "./Icon";
import { brand } from "@/lib/brand";

export function LoginForm() {
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [phone, setPhone] = useState("");
  return (
    <div className="mx-auto max-w-sm px-4 pt-12 md:pt-20">
      <div className="text-center">
        <div className="inline-block"><Logo size={56} /></div>
        <h1 className="mt-5 text-[32px] font-semibold tracking-tight">Вхід у {brand.name}</h1>
        <p className="mt-2 text-muted">Один акаунт — щоб продавати й купувати.</p>
      </div>

      {step === "phone" ? (
        <form onSubmit={(e) => { e.preventDefault(); setStep("code"); }} className="mt-8 space-y-3">
          <label className="flex items-center gap-2 rounded-2xl bg-surface px-4 shadow-card">
            <span className="font-medium text-muted">+380</span>
            <input value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 9))} inputMode="tel" placeholder="67 123 45 67"
              aria-label="Номер телефону" className="min-w-0 flex-1 bg-transparent py-4 text-[17px] outline-none placeholder:text-muted" />
          </label>
          <button className="pressable w-full rounded-full bg-accent py-4 text-[17px] font-semibold text-on-accent">Отримати код</button>
        </form>
      ) : (
        <div className="rise mt-8 space-y-3">
          <p className="text-center text-[15px] text-muted">Код надіслано на +380 {phone || "•• ••• •• ••"}</p>
          <div className="flex justify-center gap-2">
            {[0, 1, 2, 3].map((i) => <div key={i} className="grid h-14 w-12 place-items-center rounded-2xl bg-surface text-[22px] font-semibold shadow-card">•</div>)}
          </div>
          <Link href="/cabinet/" className="pressable block w-full rounded-full bg-accent py-4 text-center text-[17px] font-semibold text-on-accent">Увійти (демо)</Link>
          <button onClick={() => setStep("phone")} className="w-full py-2 text-[15px] font-medium text-accent">Змінити номер</button>
        </div>
      )}

      <div className="my-6 flex items-center gap-3 text-[13px] text-muted"><span className="h-px flex-1 bg-line" /> або <span className="h-px flex-1 bg-line" /></div>
      <div className="space-y-2">
        <Link href="/cabinet/" className="pressable flex w-full items-center justify-center gap-2 rounded-full bg-surface py-3.5 font-semibold shadow-card">
          <Icon name="google" size={18} /> Продовжити з Google
        </Link>
        <Link href="/cabinet/" className="pressable flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3.5 font-semibold text-bg">
          Продовжити з Apple
        </Link>
      </div>
      <p className="mt-6 text-center text-[12px] text-muted">Прототип: вхід не працює, кнопки ведуть у демо-кабінет.</p>
    </div>
  );
}
