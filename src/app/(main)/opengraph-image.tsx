import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.author} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Required for metadata routes under `output: "export"`. */
export const dynamic = "force-static";

/** Site-wide social card, rendered to PNG at build time. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #020617 0%, #0b1220 55%, #083344 100%)",
          padding: "72px 80px",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#22d3ee",
            }}
          />
          <div style={{ fontSize: 30, color: "#22d3ee", letterSpacing: 4 }}>
            {site.name.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 82, color: "#f8fafc", lineHeight: 1.05 }}>
            {site.author}
          </div>
          <div style={{ fontSize: 46, color: "#67e8f9" }}>{site.role}</div>
        </div>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {["MikroTik", "Proxmox VE", "WireGuard", "Docker", "Embedded C++"].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  fontSize: 24,
                  color: "#94a3b8",
                  border: "1px solid #1e293b",
                  borderRadius: 999,
                  padding: "10px 22px",
                }}
              >
                {tag}
              </div>
            ),
          )}
        </div>
      </div>
    ),
    size,
  );
}
