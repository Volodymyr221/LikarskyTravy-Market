import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BidPanel } from "@/components/BidPanel";
import { HerbArt } from "@/components/HerbArt";
import { BackLink, Fact, SellerLine } from "@/components/ui";
import { herbById } from "@/data/herbs";
import { auctions, findAuction } from "@/data/market";
import { uah, weight } from "@/lib/format";

export const dynamicParams = false;
export const generateStaticParams = () => auctions.map((a) => ({ id: a.id }));
type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = findAuction((await params).id);
  return { title: a ? `Аукціон: ${herbById(a.herbId).name} ${weight(a.volumeKg)}` : "Аукціон" };
}

export default async function AuctionPage({ params }: Props) {
  const a = findAuction((await params).id);
  if (!a) notFound();
  const herb = herbById(a.herbId);
  return (
    <div className="mx-auto max-w-6xl px-4 pt-6">
      <BackLink href="/auctions/" label="Аукціони" />
      <div className="mt-4 grid gap-8 md:grid-cols-[1.2fr_1fr]">
        <div className="min-w-0 md:col-start-1">
          <HerbArt herbId={a.herbId} className="aspect-[4/3] rounded-[28px]" />
          <div className="mt-6 text-[14px] text-muted">{herb.latin} · лот №{a.id.replace("a-", "")}</div>
          <h1 className="mt-1 text-[32px] font-semibold leading-tight tracking-tight md:text-[40px]">{herb.name}, {weight(a.volumeKg)}</h1>
        </div>
        <aside className="min-w-0 md:col-start-2 md:row-span-2 md:row-start-1 md:sticky md:top-24 md:self-start"><BidPanel a={a} /></aside>
        <div className="min-w-0 md:col-start-1">
          <p className="text-[16px] leading-relaxed">{a.description}</p>
          <div className="mt-6 rounded-[22px] bg-surface px-5 shadow-card">
            <div className="divide-y divide-line">
              <Fact icon="pin" label="Де" value={`${a.village}, ${a.region} обл.`} />
              <Fact icon="calendar" label="Збір" value={a.harvest} />
              <Fact icon="drop" label="Вологість" value={`${a.moisture}%`} />
              <Fact icon="trend" label="Стартова ціна" value={`${uah(a.startPrice)}/кг`} />
            </div>
          </div>
          <div className="mt-4 rounded-[22px] bg-surface p-5 shadow-card"><SellerLine seller={a.seller} /></div>
        </div>
      </div>
    </div>
  );
}
