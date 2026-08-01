import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import NotesClient from "./NotesClient";

export const metadata: Metadata = pageMetadata({
  title: "Notes",
  description:
    "Write-ups from running production infrastructure: publishing services from behind CGNAT, migrating routing off the hypervisor, and segmenting a flat network without downtime.",
  path: "/notes",
});

export default function NotesPage() {
  return <NotesClient />;
}
