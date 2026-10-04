import type { Metadata } from "next";
import { CatalogView } from "@/components/CatalogView";
import { PageHead } from "@/components/ui";

export const metadata: Metadata = { title: "Каталог сировини", description: "Партії сушеної лікарської сировини від збирачів з усієї України." };

export default function CatalogPage() {
  return (
    <>
      <PageHead title="Каталог сировини" sub="Партії від збирачів і фермерських господарств. Ціна за кілограм сухої сировини." />
      <CatalogView />
    </>
  );
}
