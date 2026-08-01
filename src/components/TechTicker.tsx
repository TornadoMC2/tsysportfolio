import { skills } from "@/lib/data";

/**
 * Server-rendered marquee. The track holds two identical copies of the list and
 * the CSS animation translates it by exactly -50%, so the loop is seamless for
 * any number of skills — no hardcoded pixel width to re-tune when the list
 * changes. Pauses on hover and is disabled entirely under reduced-motion.
 */
export default function TechTicker() {
  return (
    <div className="relative overflow-hidden py-8 marquee">
      {/* Edge fades */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10
          bg-gradient-to-r from-slate-950 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10
          bg-gradient-to-l from-slate-950 to-transparent"
        aria-hidden="true"
      />

      <ul className="marquee-track flex w-max gap-8">
        {[0, 1].map((copy) => (
          <li key={copy} className="flex gap-8" aria-hidden={copy === 1}>
            {skills.map((skill) => (
              <span
                key={`${copy}-${skill}`}
                className="flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap
                  bg-white/5 backdrop-blur-sm border border-white/10
                  text-slate-300 font-mono text-sm"
              >
                <span className="text-cyan-400" aria-hidden="true">
                  ◆
                </span>
                {skill}
              </span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
