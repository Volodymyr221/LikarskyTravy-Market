"use client";
// Блок дій продавця: показати номер, написати. Без логіки — веде на вхід.
import Link from "next/link";
import { useState } from "react";
import { Icon } from "./Icon";

export function ContactBox({ primary = "Написати продавцю" }: { primary?: string }) {
  const [shown, setShown] = useState(false);
  return (
    <div className="grid gap-2">
      <Link href="/login/" className="pressable flex items-center justify-center gap-2 rounded-full bg-accent py-3.5 text-[16px] font-semibold text-on-accent">
        <Icon name="chat" size={18} /> {primary}
      </Link>
      <button onClick={() => setShown(true)} className="pressable flex items-center justify-center gap-2 rounded-full bg-surface-2 py-3.5 text-[16px] font-semibold">
        <Icon name="phone" size={18} /> {shown ? "+380 67 ••• •• 12" : "Показати телефон"}
      </button>
      {shown && <p className="text-center text-[12px] text-muted">Повний номер — після входу (прототип)</p>}
    </div>
  );
}
