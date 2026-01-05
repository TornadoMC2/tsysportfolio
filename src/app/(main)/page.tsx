"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

import GlassCard from "@/components/GlassCard";
import TechTicker from "@/components/TechTicker";
import { projects } from "@/lib/data";

export default function Home() {
  const featuredProjects = projects.filter((p) => !p.isExternal).slice(0, 2);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-mono mb-6">
              <span className="text-white">Systems Specialist</span>
              <br />
              <span className="text-cyan-400">&amp; Network Engineer</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 mb-8 max-w-2xl mx-auto"
          >
            Specializing in Homelab Infrastructure, Networking, and Embedded Systems.
            Building robust solutions from the ground up.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/projects"
              className="group flex items-center gap-2 px-8 py-4 rounded-full
                bg-cyan-500 text-slate-950 font-semibold
                hover:bg-cyan-400 transition-all duration-300
                shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40"
            >
              View Projects
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="group flex items-center gap-2 px-8 py-4 rounded-full
                border border-white/20 text-white font-semibold
                hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300
                bg-white/5 backdrop-blur-sm"
            >
              <Mail className="w-5 h-5" />
              Contact Me
            </Link>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </section>

      {/* Tech Stack Ticker */}
      <section className="py-12 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm font-mono text-slate-500 uppercase tracking-widest mb-6"
          >
            Technologies I Work With
          </motion.h2>
          <TechTicker />
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-mono text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              A selection of my recent work in infrastructure, networking, and embedded systems.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {featuredProjects.map((project) => (
              <GlassCard key={project.slug} project={project} featured />
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
                hover:text-cyan-300 transition-colors group"
            >
              View All Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
