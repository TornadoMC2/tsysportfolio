import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, type InternalProject } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import ProjectDetailClient from "./ProjectDetailClient";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

/** Only projects with a write-up hosted here get a route. */
const internalProjects = projects.filter(
  (project): project is InternalProject => !project.isExternal,
);

export function generateStaticParams() {
  return internalProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = internalProjects.find((entry) => entry.slug === slug);

  if (!project) {
    return { title: "Project not found", robots: { index: false } };
  }

  return pageMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const index = internalProjects.findIndex((entry) => entry.slug === slug);

  if (index === -1) {
    notFound();
  }

  const project = internalProjects[index];
  const previous = internalProjects[index - 1];
  const next = internalProjects[index + 1];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: new URL(`/projects/${project.slug}`, site.url).toString(),
    keywords: project.tags.join(", "),
    author: {
      "@type": "Person",
      name: site.author,
      url: site.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Values come from the local content module, not user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ProjectDetailClient
        project={project}
        previous={
          previous && { slug: previous.slug, title: previous.title }
        }
        next={next && { slug: next.slug, title: next.title }}
      />
    </>
  );
}
