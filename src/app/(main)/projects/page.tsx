import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Infrastructure, networking, embedded systems and software projects — a hybrid homelab on MikroTik and Proxmox, a DMX512 lighting node in C++, a guest captive portal, and more.",
  path: "/projects",
});

export default function ProjectsPage() {
  return <ProjectsClient />;
}
