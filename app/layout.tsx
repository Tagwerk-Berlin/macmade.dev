import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "macmade.dev — Werkzeuge für nachvollziehbare Entwicklungsarbeit";
const description =
  "Technische Notizen zu CodexJournal, Akasha, devMCP und lokaler Entwicklungsinfrastruktur.";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "macmade.dev";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const baseUrl = new URL(`${protocol}://${host}`);
  const socialImage = new URL("/og.png", baseUrl);

  return {
    metadataBase: baseUrl,
    title,
    description,
    openGraph: {
      type: "website",
      title,
      description,
      url: baseUrl,
      siteName: "macmade.dev",
      locale: "de_DE",
      images: [
        {
          url: socialImage,
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
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
