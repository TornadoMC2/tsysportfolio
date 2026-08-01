import { Github, Linkedin, Mail } from "lucide-react";
import { contact, site } from "@/lib/site";

/**
 * Evaluated during `next build` — this is a static export, so both values are
 * baked into the HTML and refresh on the next deploy rather than on page view.
 */
const buildDate = new Date();
const buildYear = buildDate.getFullYear();
const buildStamp = buildDate.toISOString().slice(0, 10);

const socials = [
  { href: contact.github, label: "GitHub", Icon: Github },
  { href: contact.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: `mailto:${contact.email}`, label: "Email", Icon: Mail },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-slate-400 text-sm">
              © {buildYear} {site.author} · {site.name}
            </p>
            <p className="mt-1 font-mono text-xs text-slate-600">
              Static build {buildStamp} · self-hosted
            </p>
          </div>

          <ul className="flex items-center gap-4">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  aria-label={label}
                  className="flex p-2 rounded-full bg-white/5 border border-white/10 text-slate-400
                    hover:text-cyan-400 hover:border-cyan-500/50 transition-colors
                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
