import type { Metadata } from "next";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

/** Erzeugt vollständige kanonische Metadaten für eine statische Route. */
export function createPageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title,
      description,
      url: path,
      siteName: "macmade.dev",
      locale: "de_DE",
      images: [
        {
          url: "/og.png",
          width: 1731,
          height: 909,
          alt: "Werkzeuge für nachvollziehbare Entwicklungsarbeit",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  };
}
