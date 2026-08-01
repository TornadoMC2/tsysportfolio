"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/data";

interface GlassCardProps {
  project: Project;
  featured?: boolean;
  /** Set on cards above the fold so their cover art is not lazy-loaded. */
  priority?: boolean;
}

export default function GlassCard({
  project,
  featured = false,
  priority = false,
}: GlassCardProps) {
  const href = project.isExternal ? project.link : `/projects/${project.slug}`;
  const externalProps = project.isExternal
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -5 }}
      className="group h-full"
    >
      <Link
        href={href}
        {...externalProps}
        className={`flex h-full flex-col relative overflow-hidden rounded-2xl
          bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl
          transition-colors duration-300 hover:border-cyan-500/50
          focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400
          ${featured ? "md:flex-row" : ""}
          ${project.isExternal ? "ring-1 ring-cyan-500/20" : ""}`}
      >
        {/* Cover art */}
        <div
          className={`relative overflow-hidden shrink-0
            ${featured ? "h-48 md:h-auto md:w-2/5" : "h-48"}`}
        >
          <div
            className={`absolute inset-0 z-10 bg-gradient-to-t from-slate-950 to-transparent
              ${featured ? "md:bg-gradient-to-r" : ""}`}
            aria-hidden="true"
          />
          <Image
            src={project.image}
            alt=""
            fill
            priority={priority}
            sizes={featured ? "(max-width: 768px) 100vw, 40vw" : "(max-width: 768px) 100vw, 33vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {project.isExternal && (
            <div className="absolute top-3 right-3 z-20 p-2 rounded-full bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30">
              <ExternalLink className="w-4 h-4 text-cyan-400" aria-hidden="true" />
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-6">
          <p className="text-xs font-mono uppercase tracking-widest text-cyan-400/70 mb-2">
            {project.period}
          </p>
          <h3 className="text-xl font-bold text-white mb-2 font-mono group-hover:text-cyan-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-slate-400 text-sm mb-4 line-clamp-3">
            {project.description}
          </p>

          {featured && (
            <ul className="space-y-2 mb-5 text-sm text-slate-400">
              {project.highlights.slice(0, 2).map((highlight) => (
                <li key={highlight} className="flex gap-2">
                  <span className="text-cyan-400 shrink-0" aria-hidden="true">
                    ▸
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto flex flex-wrap gap-2">
            {project.tags.slice(0, featured ? 6 : 4).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium rounded-full
                  bg-slate-800/50 text-slate-300 border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>

          <span className="mt-4 flex items-center gap-2 text-cyan-400 text-sm font-medium">
            {project.isExternal ? "Visit site" : "Read the write-up"}
            {project.isExternal ? (
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <ArrowUpRight
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            )}
            {project.isExternal && <span className="sr-only">(opens in a new tab)</span>}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
