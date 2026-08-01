import type { Metadata } from "next";
import { site } from "@/lib/site";

interface PageMetadataOptions {
    title: string;
    description: string;
    /** Route path, e.g. "/projects". Used for the canonical URL. */
    path: string;
}

/**
 * Builds per-route metadata with a canonical URL and Open Graph / Twitter tags
 * so a link pasted into Slack, LinkedIn or iMessage renders a real preview.
 *
 * The card image itself comes from the `opengraph-image` file convention, which
 * renders it at build time — this helper deliberately does not set `images` so
 * it never overrides the per-route generated card.
 */
export function pageMetadata({
    title,
    description,
    path,
}: PageMetadataOptions): Metadata {
    const url = new URL(path, site.url).toString();

    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: {
            type: "website",
            siteName: site.name,
            title,
            description,
            url,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}
