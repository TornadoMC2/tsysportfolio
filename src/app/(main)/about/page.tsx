import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import AboutClient from "./AboutClient";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: `${site.author} — networking and telecommunications student at Illinois State University, running a multi-node Proxmox cluster and a VLAN-segmented MikroTik network, and founder of Tornado Audio.`,
  path: "/about",
});

export default function AboutPage() {
  return <AboutClient />;
}
