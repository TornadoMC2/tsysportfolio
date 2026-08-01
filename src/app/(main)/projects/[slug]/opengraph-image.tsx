import { ImageResponse } from "next/og";
import { projects, type InternalProject } from "@/lib/data";
import { site } from "@/lib/site";

export const alt = "Project write-up";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Required for metadata routes under `output: "export"`. */
export const dynamic = "force-static";

const internalProjects = projects.filter(
  (project): project is InternalProject => !project.isExternal,
);

export function generateStaticParams() {
  return internalProjects.map((project) => ({ slug: project.slug }));
}

/** Per-project social card, rendered to PNG at build time. */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = internalProjects.find((entry) => entry.slug === slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #020617 0%, #0b1220 55%, #083344 100%)",
          padding: "72px 80px",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{ width: 14, height: 14, borderRadius: 999, background: "#22d3ee" }}
          />
          <div style={{ fontSize: 26, color: "#22d3ee", letterSpacing: 4 }}>
            {`${site.name.toUpperCase()} / PROJECT`}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontSize: 66, color: "#f8fafc", lineHeight: 1.1 }}>
            {project?.title ?? "Project"}
          </div>
          <div style={{ fontSize: 30, color: "#94a3b8", lineHeight: 1.4 }}>
            {(project?.description ?? "").slice(0, 150)}
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {(project?.tags ?? []).slice(0, 5).map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                fontSize: 22,
                color: "#67e8f9",
                border: "1px solid #155e75",
                borderRadius: 999,
                padding: "8px 20px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
