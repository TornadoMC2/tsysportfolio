"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, Mail, Terminal } from "lucide-react";
import Link from "next/link";

import GlassCard from "@/components/GlassCard";
import TechTicker from "@/components/TechTicker";
import { featuredProjects } from "@/lib/data";
import { formatNoteDate, publishedNotes, readingMinutes } from "@/lib/notes";
import { site } from "@/lib/site";

const latestNotes = publishedNotes.slice(0, 3);

const labStats = [
  { value: "3", label: "Proxmox nodes" },
  { value: "35+", label: "Containers in production" },
  { value: "40TB+", label: "TrueNAS-backed storage" },
  { value: "96+", label: "Managed switch ports" },
];

export default function HomeClient() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative min-h-[78vh] flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full
              bg-cyan-500/10 border border-cyan-500/30 font-mono text-xs sm:text-sm text-cyan-300">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
              </span>
              {site.availability}
            </p>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-mono mb-6">
              <span className="text-white">Network &amp; Systems</span>
              <br />
              <span className="text-cyan-400">Engineer</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg md:text-xl text-slate-400 mb-4 max-w-2xl mx-auto"
          >
            {site.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-sm md:text-base text-slate-500 mb-10 max-w-2xl mx-auto font-mono"
          >
            This site is statically compiled and served from that same rack.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/projects"
              className="group flex items-center gap-2 px-8 py-4 rounded-full
                bg-cyan-500 text-slate-950 font-semibold
                hover:bg-cyan-400 transition-colors duration-300
                shadow-lg shadow-cyan-500/25
                focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
            >
              See what I&apos;ve built
              <ArrowRight
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/contact"
              className="group flex items-center gap-2 px-8 py-4 rounded-full
                border border-white/20 text-white font-semibold
                hover:border-cyan-500/50 hover:text-cyan-400 transition-colors duration-300
                bg-white/5 backdrop-blur-sm
                focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
            >
              <Mail className="w-5 h-5" aria-hidden="true" />
              Get in touch
            </Link>
          </motion.div>
        </div>

        <div
          className="absolute top-1/4 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          aria-hidden="true"
        />
      </section>

      {/* Lab stats */}
      <section className="px-4 pb-16" aria-labelledby="lab-stats-heading">
        <div className="max-w-5xl mx-auto">
          <h2 id="lab-stats-heading" className="sr-only">
            Infrastructure at a glance
          </h2>
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {labStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-6 text-center"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block text-3xl md:text-4xl font-bold font-mono text-cyan-400">
                    {stat.value}
                  </span>
                  <span className="mt-2 block text-sm text-slate-400">
                    {stat.label}
                  </span>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </section>

      {/* Tech marquee */}
      <section className="py-12 border-y border-white/5" aria-labelledby="stack-heading">
        <div className="max-w-7xl mx-auto px-4">
          <h2
            id="stack-heading"
            className="text-center text-sm font-mono text-slate-500 uppercase tracking-widest mb-6"
          >
            Technologies I work with
          </h2>
          <TechTicker />
        </div>
      </section>

      {/* Featured work */}
      <section className="py-20 px-4" aria-labelledby="featured-heading">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-12"
          >
            <h2
              id="featured-heading"
              className="text-3xl md:text-4xl font-bold font-mono text-white mb-4"
            >
              Selected work
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Production infrastructure and hardware I designed, built and still
              operate — not tutorials followed to completion.
            </p>
          </motion.div>

          <div className="grid gap-8 mb-12">
            {featuredProjects.map((project, index) => (
              <GlassCard
                key={project.slug}
                project={project}
                featured
                priority={index === 0}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-cyan-400 font-medium
                hover:text-cyan-300 transition-colors group rounded-sm
                focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
            >
              View all projects
              <ArrowRight
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Latest notes */}
      {latestNotes.length > 0 && (
        <section
          className="pb-20 px-4 border-t border-white/5 pt-20"
          aria-labelledby="notes-heading"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              className="text-center mb-12"
            >
              <h2
                id="notes-heading"
                className="text-3xl md:text-4xl font-bold font-mono text-white mb-4"
              >
                From the notes
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                What broke, what I chose instead, and what I&apos;d do
                differently.
              </p>
            </motion.div>

            <ul className="grid md:grid-cols-3 gap-6 mb-10">
              {latestNotes.map((note, index) => (
                <motion.li
                  key={note.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="h-full"
                >
                  <Link
                    href={`/notes/${note.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-white/10
                      bg-white/5 backdrop-blur-lg p-6 transition-colors hover:border-cyan-500/50
                      focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
                  >
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-3 font-mono text-xs text-slate-500">
                      <time dateTime={note.date}>
                        {formatNoteDate(note.date)}
                      </time>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" aria-hidden="true" />
                        {readingMinutes(note.content)} min
                      </span>
                    </div>
                    <h3 className="font-mono text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {note.title}
                    </h3>
                    <p className="text-sm text-slate-400 line-clamp-3">
                      {note.description}
                    </p>
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Link
                href="/notes"
                className="inline-flex items-center gap-2 text-cyan-400 font-medium
                  hover:text-cyan-300 transition-colors group rounded-sm
                  focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
              >
                Read all notes
                <ArrowRight
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Closing CTA */}
      <section className="pb-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-4xl mx-auto rounded-2xl border border-cyan-500/20 p-8 md:p-12 text-center
            bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-lg"
        >
          <Terminal className="w-8 h-8 text-cyan-400 mx-auto mb-4" aria-hidden="true" />
          <h2 className="text-2xl md:text-3xl font-bold font-mono text-white mb-4">
            Looking for someone who has already broken it and fixed it?
          </h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            {site.availability}. I&apos;m most useful where networking, Linux and
            hardware meet — and I&apos;m happy to walk through any of the
            architecture here in detail.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full
              bg-cyan-500 text-slate-950 font-semibold
              hover:bg-cyan-400 transition-colors duration-300
              shadow-lg shadow-cyan-500/25
              focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
          >
            Start a conversation
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
