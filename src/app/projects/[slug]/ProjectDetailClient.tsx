"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/data";

interface ProjectDetailClientProps {
  project: Project;
}

// Helper function to strip common leading indentation from code blocks
function stripCommonIndent(lines: string[]): string[] {
  if (lines.length === 0) return lines;

  // Find the minimum indentation (ignoring empty lines)
  const minIndent = lines
    .filter(line => line.trim().length > 0)
    .reduce((min, line) => {
      const match = line.match(/^(\s*)/);
      const indent = match ? match[1].length : 0;
      return Math.min(min, indent);
    }, Infinity);

  if (minIndent === Infinity || minIndent === 0) return lines;

  // Strip that amount from each line
  return lines.map(line => line.slice(minIndent));
}

// Simple markdown-like parser for basic formatting
function parseContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let codeBlockLang = "";
  let listItems: React.ReactNode[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="list-disc pl-6 mb-4 space-y-2">
          {listItems}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, index) => {
    // Trim leading/trailing whitespace for pattern matching
    const trimmedLine = line.trim();

    // Code block handling
    if (trimmedLine.startsWith("```")) {
      if (inCodeBlock) {
        // Strip common indentation from code block content
        const strippedCode = stripCommonIndent(codeBlockContent);
        elements.push(
          <pre key={`code-${index}`} className="my-4">
            <code>{strippedCode.join("\n")}</code>
          </pre>
        );
        codeBlockContent = [];
        inCodeBlock = false;
      } else {
        flushList(); // Flush any pending list items
        inCodeBlock = true;
        codeBlockLang = trimmedLine.slice(3);
      }
      return;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      return;
    }

    // Empty line
    if (!trimmedLine) {
      flushList(); // Empty line ends a list
      return;
    }

    // H2
    if (trimmedLine.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={index}>{trimmedLine.slice(3)}</h2>
      );
      return;
    }

    // H3
    if (trimmedLine.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={index}>{trimmedLine.slice(4)}</h3>
      );
      return;
    }

    // List item - collect into array
    if (trimmedLine.startsWith("- ")) {
      listItems.push(
        <li key={index}>{formatInlineText(trimmedLine.slice(2))}</li>
      );
      return;
    }

    // Table row
    if (trimmedLine.startsWith("|")) {
      flushList();
      // Skip separator rows
      if (trimmedLine.includes("---")) return;

      const cells = trimmedLine.split("|").filter(Boolean).map((cell) => cell.trim());
      const nextLine = lines[index + 1]?.trim();
      const prevLine = lines[index - 1]?.trim();
      const isHeader = nextLine?.includes("---");

      if (isHeader) {
        elements.push(
          <table key={`table-${index}`} className="my-4">
            <thead>
              <tr>
                {cells.map((cell, i) => (
                  <th key={i}>{cell}</th>
                ))}
              </tr>
            </thead>
          </table>
        );
      } else if (!prevLine?.includes("---") && !prevLine?.includes("|")) {
        // First data row after header
      } else {
        elements.push(
          <tr key={index}>
            {cells.map((cell, i) => (
              <td key={i}>{formatInlineText(cell)}</td>
            ))}
          </tr>
        );
      }
      return;
    }

    // Regular paragraph
    flushList();
    elements.push(
      <p key={index}>{formatInlineText(trimmedLine)}</p>
    );
  });

  // Flush any remaining list items
  flushList();

  return elements;
}

function formatInlineText(text: string): React.ReactNode {
  // Handle bold
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return <strong key={index}>{part}</strong>;
    }
    // Handle inline code
    const codeParts = part.split(/`([^`]+)`/g);
    return codeParts.map((codePart, codeIndex) => {
      if (codeIndex % 2 === 1) {
        return <code key={`${index}-${codeIndex}`}>{codePart}</code>;
      }
      return codePart;
    });
  });
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400
              transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8
            bg-white/5 border border-white/10"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-mono text-white mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-slate-400 mb-6">{project.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm font-medium rounded-full
                  bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                  bg-white/5 border border-white/10 text-slate-300
                  hover:border-cyan-500/50 hover:text-cyan-400 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                Live Site
              </a>
            )}
            <a
              href="#"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                bg-white/5 border border-white/10 text-slate-300
                hover:border-cyan-500/50 hover:text-cyan-400 transition-all"
            >
              <Github className="w-4 h-4" />
              Source Code
            </a>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose-custom"
        >
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8">
            {parseContent(project.content)}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

