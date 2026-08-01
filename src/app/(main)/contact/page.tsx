import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import ContactClient from "./ContactClient";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `Get in touch with ${site.author} about internships, co-ops, infrastructure work or audio engineering.`,
  path: "/contact",
});

export default function ContactPage() {
  return <ContactClient />;
}
