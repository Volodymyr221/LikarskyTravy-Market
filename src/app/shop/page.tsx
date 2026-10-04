import type { Metadata } from "next";
import { ShopGrid } from "@/components/ShopGrid";
import { PageHead } from "@/components/ui";

export const metadata: Metadata = { title: "Магазин", description: "Чаї, збори та послуги від родини засновника." };

export default function ShopPage() {
  return (
    <>
      <PageHead title="Магазин родини" sub="Ми збираємо й сушимо трави самі. Тут — наші чаї та збори, а також послуги для тих, хто тільки починає." />
      <ShopGrid />
    </>
  );
}
