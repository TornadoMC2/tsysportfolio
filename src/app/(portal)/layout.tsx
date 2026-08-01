import type { Metadata, Viewport } from "next";
import "../globals.css";
import { fontVariables } from "@/lib/fonts";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Captive-portal webviews handle pinch-zoom poorly and can leave the layout
  // stranded off-screen; the page is sized for small screens instead.
  maximumScale: 1,
  userScalable: false,
  themeColor: "#020617",
};

export const metadata: Metadata = {
  title: "Welcome to Guest WiFi",
  description: "Welcome to the guest network - enjoy your stay!",
  // A captive portal splash has no business in a search index.
  robots: { index: false, follow: false },
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${fontVariables} antialiased bg-slate-950 text-slate-100 overflow-x-hidden`}
      >
        <div className="min-h-screen bg-grid-pattern overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
