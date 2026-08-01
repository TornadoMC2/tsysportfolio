import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  ...pageMetadata({
    title: `${site.author} — ${site.role}`,
    description: site.description,
    path: "/",
  }),
  // `absolute` opts out of the layout's "%s | tsys.dev" template so the home
  // page doesn't end up titled "… | tsys.dev | tsys.dev".
  title: { absolute: `${site.name} | ${site.author} — ${site.role}` },
};

export default function Home() {
  return <HomeClient />;
}
