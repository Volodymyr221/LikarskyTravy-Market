import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <div className="text-[64px] font-semibold tracking-tight text-accent">404</div>
      <h1 className="mt-2 text-[24px] font-semibold">Такої сторінки немає</h1>
      <Link href="/" className="pressable mt-6 inline-flex rounded-full bg-accent px-6 py-3 font-semibold text-on-accent">На головну</Link>
    </div>
  );
}
