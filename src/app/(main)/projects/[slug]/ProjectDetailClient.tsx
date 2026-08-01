"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { InternalProject } from "@/lib/data";
import { renderBlocks } from "@/lib/markdown";

interface ProjectDetailClientProps {
  project: InternalProject;
  /** Adjacent write-ups, for continuing to read at the end of the page. */
  previous?: Pick<InternalProject, "slug" | "title">;
  next?: Pick<InternalProject, "slug" | "title">;
}

const linkClass = `inline-flex items-center gap-2 px-4 py-2 rounded-lg
  bg-white/5 border border-white/10 text-slate-300
  hover:border-cyan-500/50 hover:text-cyan-400 transition-colors
  focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400`;

export default function ProjectDetailClient({
  project,
  previous,
  next,
}: ProjectDetailClientProps) {
  return (
    <div className="px-4 py-12">
      <article className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400
              transition-colors mb-8 group rounded-sm
              focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
          >
            <ArrowLeft
              className="w-4 h-4 transition-transform group-hover:-translate-x-1"
              aria-hidden="true"
            />
            Back to projects
          </Link>
        </motion.div>

        {/* Cover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8
            bg-white/5 border border-white/10"
        >
          <Image
            src={project.image}
            alt=""
            fill
            priority
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"
            aria-hidden="true"
          />
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <p className="font-mono text-sm uppercase tracking-widest text-cyan-400/70 mb-3">
            {project.period}
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-mono text-white mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-slate-400 mb-6">{project.description}</p>

          <ul className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="px-3 py-1 text-sm font-medium rounded-full
                  bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
              >
                {tag}
              </li>
            ))}
          </ul>

          {project.repo && (
            <div className="flex flex-wrap gap-4">
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                <Github className="w-4 h-4" aria-hidden="true" />
                Source code
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          )}
        </motion.header>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-8 rounded-2xl border border-cyan-500/20 p-6
            bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-lg"
        >
          <h2 className="font-mono text-sm uppercase tracking-widest text-cyan-300 mb-4">
            Highlights
          </h2>
          <ul className="space-y-3">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 text-slate-300">
                <span className="text-cyan-400 shrink-0" aria-hidden="true">
                  ▸
                </span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Write-up */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="prose-custom bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 md:p-8">
            {renderBlocks(project.content)}
          </div>
        </motion.div>

        {/* Adjacent write-ups */}
        {(previous || next) && (
          <nav
            className="mt-12 grid sm:grid-cols-2 gap-4"
            aria-label="More projects"
          >
            {previous ? (
              <Link
                href={`/projects/${previous.slug}`}
                className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors
                  hover:border-cyan-500/50
                  focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
              >
                <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">
                  <ArrowLeft className="w-3 h-3" aria-hidden="true" />
                  Previous
                </span>
                <span className="block font-mono text-white group-hover:text-cyan-400 transition-colors">
                  {previous.title}
                </span>
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}

            {next && (
              <Link
                href={`/projects/${next.slug}`}
                className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors
                  hover:border-cyan-500/50 sm:text-right
                  focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
              >
                <span className="flex items-center gap-2 sm:justify-end text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">
                  Next
                  <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </span>
                <span className="block font-mono text-white group-hover:text-cyan-400 transition-colors">
                  {next.title}
                </span>
              </Link>
            )}
          </nav>
        )}
      </article>
    </div>
  );
}
