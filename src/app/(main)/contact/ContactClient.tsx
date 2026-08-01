"use client";

import { motion } from "framer-motion";
import { Check, Copy, Github, Linkedin, Mail } from "lucide-react";
import { useState } from "react";
import { contact, site } from "@/lib/site";

const channels = [
  {
    href: contact.github,
    Icon: Github,
    label: "GitHub",
    value: "github.com/TornadoMC2",
    detail: "Code, configs and whatever I'm currently breaking.",
  },
  {
    href: contact.linkedin,
    Icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/hjohanson",
    detail: "The formal version, for recruiters and referrals.",
  },
];

export default function ContactClient() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be denied; the mailto link beside this still works.
    }
  };

  return (
    <div className="px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-mono text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-slate-400 text-lg">
            {site.availability}. Always happy to talk networking, virtualization
            or anything else in the rack.
          </p>
        </motion.div>

        {/* Primary: email */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="rounded-2xl border border-cyan-500/20 p-6 sm:p-8 mb-8
            bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-lg"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="p-3 rounded-lg bg-cyan-500/15 text-cyan-400">
              <Mail className="w-6 h-6" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-xl font-bold font-mono text-white">Email me</h2>
              <p className="text-sm text-slate-400">
                The fastest way to reach me.
              </p>
            </div>
          </div>

          <p className="font-mono text-lg sm:text-xl text-cyan-300 break-all mb-6">
            {contact.email}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`mailto:${contact.email}`}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg
                bg-cyan-500 text-slate-950 font-semibold
                hover:bg-cyan-400 transition-colors
                focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              Open mail client
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg
                border border-white/15 bg-white/5 text-slate-200 font-semibold
                hover:border-cyan-500/50 hover:text-cyan-300 transition-colors
                focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
            >
              {copied ? (
                <Check className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Copy className="w-4 h-4" aria-hidden="true" />
              )}
              {copied ? "Copied" : "Copy address"}
            </button>
          </div>
          <p className="sr-only" role="status">
            {copied ? "Email address copied to clipboard" : ""}
          </p>
        </motion.div>

        {/* Secondary channels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <h2 className="text-sm font-mono uppercase tracking-widest text-slate-500 mb-4">
            Elsewhere
          </h2>
          <ul className="grid sm:grid-cols-2 gap-4">
            {channels.map(({ href, Icon, label, value, detail }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full gap-4 p-5 rounded-xl
                    bg-white/5 backdrop-blur-lg border border-white/10
                    hover:border-cyan-500/50 transition-colors group
                    focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
                >
                  <span className="h-fit p-3 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm text-slate-400">{label}</span>
                    <span className="block truncate text-white group-hover:text-cyan-400 transition-colors">
                      {value}
                    </span>
                    <span className="block mt-1 text-sm text-slate-500">
                      {detail}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-sm text-slate-500 text-center">
            For anything academic or recruiting-related you can also reach me at{" "}
            <a
              href={`mailto:${contact.academicEmail}`}
              className="text-slate-400 underline underline-offset-4 hover:text-cyan-400 transition-colors
                focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400 rounded-sm"
            >
              {contact.academicEmail}
            </a>
            .
          </p>
        </motion.div>
      </div>
    </div>
  );
}
