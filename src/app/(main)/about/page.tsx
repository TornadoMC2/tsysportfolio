"use client";

import { motion } from "framer-motion";
import {
    Server,
    Network,
    Cpu,
    Code2,
    GraduationCap,
    Briefcase,
    MapPin,
    Calendar
} from "lucide-react";
import { skills } from "@/lib/data";

const experience = [
    {
        title: "Founder & Audio Engineer",
        company: "Tornado Audio",
        period: "2023 - Present",
        description: "Operate a professional mixing and mastering service. Manage client deliverables, audio engineering workflows, and maintain the web infrastructure for the business.",
    },
    {
        title: "IT Student",
        company: "Illinois State University",
        period: "2023 - Present",
        description: "Pursuing a Bachelor's of Science in Computer Networking & Telecommunications. Focusing on Cloud Development, Networking, and Enterprise Infrastructure.",
    },
];

// Updated to reflect your academic status since specific certs weren't provided in context
const certifications = [
    "B.S. Computer Networking & Telecommunications (In Progress)",
    "Systems Development Coursework",
    "Network Infrastructure Coursework",
];

const interests = [
    { icon: Server, label: "Homelab & Virtualization" },
    { icon: Network, label: "Network Engineering" },
    { icon: Cpu, label: "Embedded Systems (Arduino)" },
    { icon: Code2, label: "Full Stack Development" },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen px-4 py-12">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold font-mono text-white mb-4">
                        About Me
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Systems Specialist and ISU Student passionate to build
                        robust, scalable infrastructure solutions.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Bio & Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-2 space-y-8"
                    >
                        {/* Bio Card */}
                        <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10">
                            <h2 className="text-2xl font-bold font-mono text-white mb-4">
                                Hello, I&apos;m Hunter
                            </h2>
                            <div className="space-y-4 text-slate-300 leading-relaxed">
                                <p>
                                    I&apos;m an IT student at Illinois State University with a deep passion for
                                    infrastructure, networking, and systems administration. Unlike the typical
                                    student, I maintain an enterprise-grade homelab that mirrors real-world
                                    production environments.
                                </p>
                                <p>
                                    My expertise lies in virtualization platforms like <strong>Proxmox VE</strong>,
                                    complex network segmentation using <strong>MikroTik</strong> and <strong>Dell</strong> hardware,
                                    and container orchestration with Docker. I bridge the gap between hardware and software,
                                    comfortable configuring VLANs on a switch CLI one minute and writing React code the next.
                                </p>
                                <p>
                                    When I&apos;m not optimizing my 10GbE network backbone, I run <strong>Tornado Audio</strong>,
                                    where I apply the same level of technical precision to audio engineering and mixing.
                                </p>
                            </div>

                            {/* Quick Info */}
                            <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap gap-6">
                                <div className="flex items-center gap-2 text-slate-400">
                                    <MapPin className="w-4 h-4 text-cyan-400" />
                                    <span>Illinois, USA</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-400">
                                    <Briefcase className="w-4 h-4 text-cyan-400" />
                                    <span>Open to Internships</span>
                                </div>
                            </div>
                        </div>

                        {/* Experience */}
                        <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10">
                            <h2 className="text-2xl font-bold font-mono text-white mb-6 flex items-center gap-3">
                                <Briefcase className="w-6 h-6 text-cyan-400" />
                                Experience & Education
                            </h2>
                            <div className="space-y-6">
                                {experience.map((job, index) => (
                                    <div
                                        key={index}
                                        className="relative pl-6 border-l-2 border-white/10 hover:border-cyan-500/50 transition-colors"
                                    >
                                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-900 border-2 border-cyan-500" />
                                        <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                                        <p className="text-cyan-400 text-sm font-mono">{job.company}</p>
                                        <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                                            <Calendar className="w-3 h-3" />
                                            {job.period}
                                        </div>
                                        <p className="text-slate-400 mt-2">{job.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Interests */}
                        <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10">
                            <h2 className="text-2xl font-bold font-mono text-white mb-6">
                                Areas of Focus
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {interests.map((interest, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50
                      border border-white/5 hover:border-cyan-500/30 transition-all group"
                                    >
                                        <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400
                      group-hover:bg-cyan-500/20 transition-colors">
                                            <interest.icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-slate-300 group-hover:text-white transition-colors">
                      {interest.label}
                    </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Skills & Certs */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="space-y-8"
                    >
                        {/* Skills */}
                        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10">
                            <h2 className="text-xl font-bold font-mono text-white mb-4">
                                Technical Skills
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-2 text-sm font-medium rounded-lg
                      bg-slate-800/50 text-slate-300 border border-white/5
                      hover:border-cyan-500/30 hover:text-cyan-400 transition-all cursor-default"
                                    >
                    {skill}
                  </span>
                                ))}
                            </div>
                        </div>

                        {/* Education / Certs */}
                        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10">
                            <h2 className="text-xl font-bold font-mono text-white mb-4 flex items-center gap-2">
                                <GraduationCap className="w-5 h-5 text-cyan-400" />
                                Education
                            </h2>
                            <div className="space-y-3">
                                {certifications.map((cert, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 p-3 rounded-lg
                      bg-slate-900/50 border border-white/5"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-cyan-400" />
                                        <span className="text-slate-300 text-sm">{cert}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Fun Stats - Updated to reflect your real hardware */}
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10
              backdrop-blur-lg border border-cyan-500/20">
                            <h2 className="text-xl font-bold font-mono text-white mb-4">
                                Lab Stats
                            </h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400">Proxmox Nodes</span>
                                    <span className="text-2xl font-bold font-mono text-cyan-400">3</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400">Docker Containers</span>
                                    <span className="text-2xl font-bold font-mono text-cyan-400">35+</span>
                                </div>
                                {/* 2x 48 port switches + router ports = ~100 */}
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400">Switch Ports</span>
                                    <span className="text-2xl font-bold font-mono text-cyan-400">96+</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400">Storage Capacity</span>
                                    <span className="text-2xl font-bold font-mono text-cyan-400">40TB+</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}