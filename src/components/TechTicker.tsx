"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";

export default function TechTicker() {
  return (
    <div className="relative overflow-hidden py-8">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10" />

      <motion.div
        animate={{ x: [0, -1920] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
        className="flex gap-8 whitespace-nowrap"
      >
        {/* Duplicate skills for seamless loop */}
        {[...skills, ...skills, ...skills, ...skills].map((skill, index) => (
          <div
            key={`${skill}-${index}`}
            className="flex items-center gap-2 px-6 py-3 rounded-full
              bg-white/5 backdrop-blur-sm border border-white/10
              text-slate-300 font-mono text-sm"
          >
            <span className="text-cyan-400">◆</span>
            {skill}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

