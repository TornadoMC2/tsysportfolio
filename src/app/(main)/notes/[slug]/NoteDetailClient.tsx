"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { renderBlocks } from "@/lib/markdown";
import { formatNoteDate, readingMinutes, type Note } from "@/lib/notes";

interface NoteDetailClientProps {
  note: Note;
  newer?: Pick<Note, "slug" | "title">;
  older?: Pick<Note, "slug" | "title">;
}

const adjacentClass = `group rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors
  hover:border-cyan-500/50
  focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400`;

export default function NoteDetailClient({
  note,
  newer,
  older,
}: NoteDetailClientProps) {
  return (
    <div className="px-4 py-12">
      <article className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/notes"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400
              transition-colors mb-8 group rounded-sm
              focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
          >
            <ArrowLeft
              className="w-4 h-4 transition-transform group-hover:-translate-x-1"
              aria-hidden="true"
            />
            All notes
          </Link>
        </motion.div>

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4 font-mono text-sm text-slate-500">
            <time dateTime={note.date}>{formatNoteDate(note.date)}</time>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              {readingMinutes(note.content)} min read
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-mono text-white mb-4">
            {note.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-6">
            {note.description}
          </p>

          <ul className="flex flex-wrap gap-2">
            {note.tags.map((tag) => (
              <li
                key={tag}
                className="px-3 py-1 text-sm font-medium rounded-full
                  bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
              >
                {tag}
              </li>
            ))}
          </ul>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="prose-custom bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 md:p-8">
            {renderBlocks(note.content)}
          </div>
        </motion.div>

        {(newer || older) && (
          <nav className="mt-12 grid sm:grid-cols-2 gap-4" aria-label="More notes">
            {newer ? (
              <Link href={`/notes/${newer.slug}`} className={adjacentClass}>
                <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">
                  <ArrowLeft className="w-3 h-3" aria-hidden="true" />
                  Newer
                </span>
                <span className="block font-mono text-white group-hover:text-cyan-400 transition-colors">
                  {newer.title}
                </span>
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}

            {older && (
              <Link
                href={`/notes/${older.slug}`}
                className={`${adjacentClass} sm:text-right`}
              >
                <span className="flex items-center gap-2 sm:justify-end text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">
                  Older
                  <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </span>
                <span className="block font-mono text-white group-hover:text-cyan-400 transition-colors">
                  {older.title}
                </span>
              </Link>
            )}
          </nav>
        )}
      </article>
    </div>
  );
}
