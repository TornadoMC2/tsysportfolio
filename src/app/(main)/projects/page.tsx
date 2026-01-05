"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import { projects } from "@/lib/data";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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
            A collection of my work in systems administration, networking,
            embedded systems, and more.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

