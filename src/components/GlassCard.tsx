"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/data";

interface GlassCardProps {
  project: Project;
  featured?: boolean;
}

export default function GlassCard({ project, featured = false }: GlassCardProps) {
  const CardWrapper = project.isExternal ? "a" : Link;
  const cardProps = project.isExternal
    ? { href: project.link || "#", target: "_blank", rel: "noopener noreferrer" }
    : { href: `/projects/${project.slug}` };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group"
    >
      <CardWrapper
        {...cardProps}
        className={`block relative overflow-hidden rounded-2xl 
          bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl
          transition-all duration-300 hover:border-cyan-500/50 hover:shadow-cyan-500/10
          ${featured ? "h-full" : ""}
          ${project.isExternal ? "ring-1 ring-cyan-500/20" : ""}`}
      >
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent z-10" />
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {project.isExternal && (
            <div className="absolute top-3 right-3 z-20 p-2 rounded-full bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30">
              <ExternalLink className="w-4 h-4 text-cyan-400" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2 font-mono group-hover:text-cyan-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-slate-400 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium rounded-full
                  bg-slate-800/50 text-slate-300 border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>

          {project.isExternal && (
            <div className="mt-4 flex items-center gap-2 text-cyan-400 text-sm font-medium">
              <span>Visit Site</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          )}
        </div>
      </CardWrapper>
    </motion.div>
  );
}

