import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { publishedNotes } from "@/lib/notes";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import NoteDetailClient from "./NoteDetailClient";

interface NotePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return publishedNotes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = publishedNotes.find((entry) => entry.slug === slug);

  if (!note) {
    return { title: "Note not found", robots: { index: false } };
  }

  return {
    ...pageMetadata({
      title: note.title,
      description: note.description,
      path: `/notes/${note.slug}`,
    }),
    openGraph: {
      type: "article",
      siteName: site.name,
      title: note.title,
      description: note.description,
      url: new URL(`/notes/${note.slug}`, site.url).toString(),
      publishedTime: note.date,
      authors: [site.author],
      tags: [...note.tags],
    },
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const index = publishedNotes.findIndex((entry) => entry.slug === slug);

  if (index === -1) {
    notFound();
  }

  const note = publishedNotes[index];
  // Sorted newest first, so the *next* entry in the array is the older post.
  const newer = publishedNotes[index - 1];
  const older = publishedNotes[index + 1];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: note.title,
    description: note.description,
    datePublished: note.date,
    url: new URL(`/notes/${note.slug}`, site.url).toString(),
    keywords: note.tags.join(", "),
    author: { "@type": "Person", name: site.author, url: site.url },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Values come from the local content module, not user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <NoteDetailClient
        note={note}
        newer={newer && { slug: newer.slug, title: newer.title }}
        older={older && { slug: older.slug, title: older.title }}
      />
    </>
  );
}
