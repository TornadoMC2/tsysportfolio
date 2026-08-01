import type { MetadataRoute } from "next";
import { projects } from "@/lib/data";
import { publishedNotes } from "@/lib/notes";
import { site } from "@/lib/site";

/** Required for metadata routes under `output: "export"`. */
export const dynamic = "force-static";

/** Emitted as a static sitemap.xml at build time. */
export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();

    const staticRoutes = [
        { path: "/", priority: 1 },
        { path: "/projects", priority: 0.9 },
        { path: "/notes", priority: 0.9 },
        { path: "/about", priority: 0.8 },
        { path: "/contact", priority: 0.7 },
    ];

    const projectRoutes = projects
        .filter((project) => !project.isExternal)
        .map((project) => ({
            url: new URL(`/projects/${project.slug}`, site.url).toString(),
            lastModified,
            changeFrequency: "monthly" as const,
            priority: 0.8,
        }));

    const noteRoutes = publishedNotes.map((note) => ({
        url: new URL(`/notes/${note.slug}`, site.url).toString(),
        // Notes are dated content; use the post date rather than the build time.
        lastModified: new Date(`${note.date}T00:00:00Z`),
        changeFrequency: "yearly" as const,
        priority: 0.8,
    }));

    return [
        ...staticRoutes.map(({ path, priority }) => ({
            url: new URL(path, site.url).toString(),
            lastModified,
            changeFrequency: "monthly" as const,
            priority,
        })),
        ...projectRoutes,
        ...noteRoutes,
    ];
}
