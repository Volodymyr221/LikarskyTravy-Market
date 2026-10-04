import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header, TabBar, ServiceWorker } from "@/components/Chrome";
import { Footer } from "@/components/Footer";
import { brand, asset } from "@/lib/brand";

export const metadata: Metadata = {
  title: { default: `${brand.name} — ${brand.tagline}`, template: `%s · ${brand.name}` },
  description: brand.description,
  applicationName: brand.name,
  appleWebApp: { capable: true, title: brand.name, statusBarStyle: "default" },
  icons: { icon: asset("/icons/icon.svg"), apple: asset("/icons/apple-touch-icon.png") },
  openGraph: { title: brand.name, description: brand.description, locale: "uk_UA", type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#f6f5f1",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Тема до першого малювання — без «спалаху» світлої теми в темному режимі.
const themeInit = `try{var t=localStorage.getItem('theme');if(!t)t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t;if(t==='dark')document.querySelector('meta[name="theme-color"]')?.setAttribute('content','#0b0c0b')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-dvh">
        <Header />
        <main>{children}</main>
        <Footer />
        <TabBar />
        <ServiceWorker />
      </body>
    </html>
  );
}
