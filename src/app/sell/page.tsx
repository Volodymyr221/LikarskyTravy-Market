import type { Metadata } from "next";
import { SellForm } from "@/components/SellForm";
import { PageHead } from "@/components/ui";

export const metadata: Metadata = { title: "Продати сировину" };

export default function SellPage() {
  return (
    <>
      <PageHead title="Нове оголошення" sub="Продайте за фіксованою ціною, виставте на аукціон або розмістіть заявку на закупівлю." />
      <SellForm />
    </>
  );
}
