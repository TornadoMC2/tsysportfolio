"use client";

import { motion } from "framer-motion";
import {
    Briefcase,
    Calendar,
    Cpu,
    Code2,
    GraduationCap,
    MapPin,
    Network,
    Server,
} from "lucide-react";
import Link from "next/link";
import { skillGroups } from "@/lib/data";
import { contact, site } from "@/lib/site";

const timeline = [
    {
        title: "B.S. Computer Networking & Telecommunications",
        org: "Illinois State University",
        period: "2023 — 2028 (expected)",
        description:
            "Coursework across enterprise networking, systems development and cloud infrastructure. Most of what I know operationally comes from running the lab described on this site alongside it.",
    },
    {
        title: "Founder & Audio Engineer",
        org: "Tornado Audio",
        period: "2023 — Present",
        description:
            "Founded and run a mixing and mastering studio: client intake, engineering, revisions and delivery — plus every piece of technical infrastructure the business depends on.",
        href: contact.business,
    },
    {
        title: "Homelab & Network Operator",
        org: "Self-directed",
        period: "2025 — Present",
        description:
            "Designed and operate a VLAN-segmented network on MikroTik and Dell hardware with a 3-node Proxmox cluster, 35+ containerized services and a WireGuard-tunneled VPS ingress that publishes them past CGNAT.",
        href: "/projects/homelab-infrastructure",
    },
];

const focusAreas = [
    {
        icon: Network,
        title: "Network Engineering",
        detail: "VLAN design, firewall policy, routing and tunneling on production hardware.",
    },
    {
        icon: Server,
        title: "Systems & Virtualization",
        detail: "Proxmox clustering, Linux administration, containers, storage and backups.",
    },
    {
        icon: Cpu,
        title: "Embedded Systems",
        detail: "C++ firmware against real protocols and real electrical constraints.",
    },
    {
        icon: Code2,
        title: "Full-Stack Development",
        detail: "TypeScript and React for the tooling and interfaces on top of the infrastructure.",
    },
];

const labStats = [
    { label: "Proxmox nodes", value: "3" },
    { label: "Containers in production", value: "35+" },
    { label: "Managed switch ports", value: "96+" },
    { label: "Storage capacity", value: "40TB+" },
];

const cardClass =
    "rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10";

export default function AboutClient() {
    return (
        <div className="px-4 py-12">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold font-mono text-white mb-4">
                        About
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        I learn infrastructure by running it in production, with real
                        users and real consequences.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left column */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-2 space-y-8"
                    >
                        <div className={`${cardClass} p-8`}>
                            <h2 className="text-2xl font-bold font-mono text-white mb-4">
                                Hello, I&apos;m Hunter
                            </h2>
                            <div className="space-y-4 text-slate-300 leading-relaxed">
                                <p>
                                    I&apos;m a Computer Networking &amp; Telecommunications student
                                    at Illinois State University, and I run an enterprise-grade
                                    network and virtualization stack out of my own rack. Not a lab
                                    in the toy sense — it hosts services people actually use, so
                                    the uptime, the backups and the 2am failures are all mine.
                                </p>
                                <p>
                                    That environment is where I got fluent in the things that are
                                    hard to learn from a textbook: VLAN segmentation and firewall
                                    policy ordering on <strong>MikroTik</strong> and{" "}
                                    <strong>Dell</strong> hardware, clustering and capacity
                                    planning on <strong>Proxmox VE</strong>, container
                                    orchestration with <strong>Docker</strong>, and how to publish
                                    a service to the public internet from behind a CGNAT
                                    residential link without opening a single inbound port.
                                </p>
                                <p>
                                    I move comfortably up and down the stack. In one week I&apos;ll
                                    tag a trunk port on a switch CLI, write C++ firmware that
                                    decodes a lighting protocol off an RS-485 bus, and ship the
                                    TypeScript front end that sits on top of it — this site
                                    included.
                                </p>
                                <p>
                                    Away from the rack I run <strong>Tornado Audio</strong>, a
                                    mixing and mastering studio I founded. It is the same
                                    discipline pointed at a different medium: careful listening,
                                    reproducible process, and a deliverable that has to be right
                                    the first time.
                                </p>
                            </div>

                            <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap gap-x-6 gap-y-3">
                                <span className="flex items-center gap-2 text-slate-400">
                                    <MapPin className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                                    {site.location}
                                </span>
                                <span className="flex items-center gap-2 text-slate-400">
                                    <Briefcase className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                                    {site.availability}
                                </span>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className={`${cardClass} p-8`}>
                            <h2 className="text-2xl font-bold font-mono text-white mb-6 flex items-center gap-3">
                                <Briefcase className="w-6 h-6 text-cyan-400" aria-hidden="true" />
                                Experience &amp; Education
                            </h2>
                            <ol className="space-y-6">
                                {timeline.map((entry) => (
                                    <li
                                        key={entry.title}
                                        className="relative pl-6 border-l-2 border-white/10 hover:border-cyan-500/50 transition-colors"
                                    >
                                        <span
                                            className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-slate-900 border-2 border-cyan-500"
                                            aria-hidden="true"
                                        />
                                        <h3 className="text-lg font-semibold text-white">
                                            {entry.title}
                                        </h3>
                                        <p className="text-cyan-400 text-sm font-mono">{entry.org}</p>
                                        <p className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                                            <Calendar className="w-3 h-3" aria-hidden="true" />
                                            {entry.period}
                                        </p>
                                        <p className="text-slate-400 mt-2">{entry.description}</p>
                                        {entry.href && (
                                            <Link
                                                href={entry.href}
                                                {...(entry.href.startsWith("http")
                                                    ? { target: "_blank", rel: "noopener noreferrer" }
                                                    : {})}
                                                className="inline-block mt-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors rounded-sm
                                                    focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
                                            >
                                                Read more →
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ol>
                        </div>

                        {/* Focus areas */}
                        <div className={`${cardClass} p-8`}>
                            <h2 className="text-2xl font-bold font-mono text-white mb-6">
                                Areas of Focus
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {focusAreas.map((area, index) => (
                                    <motion.div
                                        key={area.title}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.08 }}
                                        viewport={{ once: true }}
                                        className="flex gap-4 p-4 rounded-xl bg-slate-900/50
                                            border border-white/5 hover:border-cyan-500/30 transition-colors group"
                                    >
                                        <span
                                            className="h-fit p-3 rounded-lg bg-cyan-500/10 text-cyan-400
                                                group-hover:bg-cyan-500/20 transition-colors"
                                        >
                                            <area.icon className="w-5 h-5" aria-hidden="true" />
                                        </span>
                                        <span>
                                            <span className="block text-slate-200 font-medium">
                                                {area.title}
                                            </span>
                                            <span className="block mt-1 text-sm text-slate-400">
                                                {area.detail}
                                            </span>
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right column */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="space-y-8"
                    >
                        <div className={`${cardClass} p-6`}>
                            <h2 className="text-xl font-bold font-mono text-white mb-5">
                                Technical Skills
                            </h2>
                            <div className="space-y-5">
                                {skillGroups.map((group) => (
                                    <div key={group.title}>
                                        <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400/70 mb-3">
                                            {group.title}
                                        </h3>
                                        <ul className="flex flex-wrap gap-2">
                                            {group.skills.map((skill) => (
                                                <li
                                                    key={skill}
                                                    className="px-3 py-1.5 text-sm rounded-lg
                                                        bg-slate-800/50 text-slate-300 border border-white/5"
                                                >
                                                    {skill}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={`${cardClass} p-6`}>
                            <h2 className="text-xl font-bold font-mono text-white mb-4 flex items-center gap-2">
                                <GraduationCap className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                                Education
                            </h2>
                            <p className="text-slate-200 font-medium">
                                B.S. Computer Networking &amp; Telecommunications
                            </p>
                            <p className="text-sm text-cyan-400 font-mono mt-1">
                                Illinois State University
                            </p>
                            <p className="text-sm text-slate-500 mt-1">
                                2023 — 2028 (expected)
                            </p>
                            <ul className="mt-4 space-y-2 text-sm text-slate-400">
                                {[
                                    "Enterprise networking & telecommunications",
                                    "Systems development",
                                    "Cloud infrastructure",
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        <span
                                            className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0"
                                            aria-hidden="true"
                                        />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div
                            className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10
                                backdrop-blur-lg border border-cyan-500/20"
                        >
                            <h2 className="text-xl font-bold font-mono text-white mb-4">
                                Lab Stats
                            </h2>
                            <dl className="space-y-4">
                                {labStats.map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="flex justify-between items-center gap-4"
                                    >
                                        <dt className="text-slate-400 text-sm">{stat.label}</dt>
                                        <dd className="text-2xl font-bold font-mono text-cyan-400">
                                            {stat.value}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
