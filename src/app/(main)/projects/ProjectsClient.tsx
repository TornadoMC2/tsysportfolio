"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import { projects } from "@/lib/data";

export default function ProjectsClient() {
  return (
    <div className="px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-mono text-white mb-4">
            Projects
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Networks, servers, firmware and software — each one still running,
            with the write-up covering what broke and how I fixed it.
          </p>
        </motion.div>

        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.li
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.08 }}
              className="h-full"
            >
              <GlassCard project={project} priority={index < 3} />
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
