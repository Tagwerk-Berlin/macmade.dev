import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://macmade.dev"),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title,
    description,
    url: "/",
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
