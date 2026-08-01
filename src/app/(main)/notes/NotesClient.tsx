"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import Link from "next/link";
import { formatNoteDate, publishedNotes, readingMinutes } from "@/lib/notes";

export default function NotesClient() {
  return (
    <div className="px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-mono text-white mb-4">
            Notes
          </h1>
          <p className="text-slate-400 text-lg">
            Working notes from running infrastructure I depend on — what broke,
            what I chose instead, and what I&apos;d do differently.
          </p>
        </motion.div>

        {publishedNotes.length === 0 ? (
          <p className="text-slate-500">Nothing published yet.</p>
        ) : (
          <ul className="space-y-4">
            {publishedNotes.map((note, index) => (
              <motion.li
                key={note.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: Math.min(index, 6) * 0.07 }}
              >
                <Link
                  href={`/notes/${note.slug}`}
                  className="group block rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg
                    p-6 transition-colors hover:border-cyan-500/50
                    focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3 font-mono text-xs text-slate-500">
                    <time dateTime={note.date}>{formatNoteDate(note.date)}</time>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3 h-3" aria-hidden="true" />
                      {readingMinutes(note.content)} min read
                    </span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-bold font-mono text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {note.title}
                  </h2>
                  <p className="text-slate-400 mb-4">{note.description}</p>

                  <div className="flex flex-wrap items-center gap-2">
                    {note.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs font-medium rounded-full
                          bg-slate-800/50 text-slate-300 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="ml-auto inline-flex items-center gap-1 text-sm text-cyan-400">
                      Read
                      <ArrowUpRight
                        className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
