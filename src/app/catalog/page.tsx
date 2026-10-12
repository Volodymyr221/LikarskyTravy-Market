import type { Metadata } from "next";
import { Market } from "@/components/Market";
import { PageHead } from "@/components/ui";

export const metadata: Metadata = { title: "Каталог рослин", description: "Оголошення про продаж і купівлю лікарської сировини по всій Україні." };

export default function CatalogPage() {
  return (
    <>
      <PageHead title="Каталог рослин" sub="Хто продає і хто купує лікарську сировину. Ціни — за кілограм." />
      <div className="mx-auto max-w-6xl px-4"><Market title="Усі оголошення" /></div>
    </>
  );
}
