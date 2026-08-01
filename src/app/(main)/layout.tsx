import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import { fontVariables } from "@/lib/fonts";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.author} — ${site.role}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.author, url: site.url }],
  creator: site.author,
  keywords: [
    "Network Engineer",
    "Systems Administrator",
    "Homelab",
    "Proxmox VE",
    "MikroTik RouterOS",
    "Docker",
    "WireGuard",
    "Embedded Systems",
    "Hunter Johanson",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.url,
    title: `${site.author} — ${site.role}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.author} — ${site.role}`,
    description: site.description,
  },
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${fontVariables} antialiased bg-slate-950 text-slate-100`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]
            focus:rounded-lg focus:bg-cyan-500 focus:px-4 focus:py-2 focus:font-semibold focus:text-slate-950"
        >
          Skip to content
        </a>
        <MotionProvider>
          <div className="min-h-screen flex flex-col bg-grid-pattern">
            <Navbar />
            <main id="main-content" className="flex-1 pt-24">
              {children}
            </main>
            <Footer />
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
