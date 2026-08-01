import type { Metadata } from "next";
import Link from "next/link";
import { fontVariables } from "@/lib/fonts";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "404 — No route to host",
  robots: { index: false, follow: false },
};

/**
 * Rendered through the pass-through root layout, so it supplies its own
 * document shell. Exported statically as `out/404.html`.
 */
export default function NotFound() {
  return (
    <html lang="en" className="dark">
      <body
        className={`${fontVariables} antialiased bg-slate-950 text-slate-100`}
      >
        <main className="min-h-screen bg-grid-pattern flex items-center justify-center px-4">
          <div className="max-w-lg w-full text-center">
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-cyan-400 mb-6">
              Error 404
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold font-mono text-white mb-6">
              No route to host
            </h1>

            <div className="text-left rounded-xl border border-white/10 bg-white/5 p-5 font-mono text-sm text-slate-400 mb-8 overflow-x-auto">
              <p>
                <span className="text-cyan-400">$</span> traceroute {site.name}
                <span className="text-slate-600">/…</span>
              </p>
              <p className="mt-2">1 &nbsp;edge &nbsp;&nbsp;&nbsp;0.4 ms</p>
              <p>2 &nbsp;core &nbsp;&nbsp;&nbsp;0.9 ms</p>
              <p className="text-slate-500">3 &nbsp;* * * &nbsp;destination unreachable</p>
            </div>

            <p className="text-slate-400 mb-8">
              That page isn&apos;t in the routing table. It may have been moved,
              or the link may be wrong.
            </p>

            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                bg-cyan-500 text-slate-950 font-semibold
                hover:bg-cyan-400 transition-colors
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
            >
              Return home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
