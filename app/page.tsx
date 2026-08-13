import { createPageMetadata } from "./site-metadata";
import SnapshotPage from "./snapshot-page";

export const metadata = createPageMetadata({
  title: "macmade.dev — Werkzeuge für nachvollziehbare Entwicklungsarbeit",
  description:
    "Technische Notizen zu CodexJournal, Akasha, devMCP und einer nichtproduktiven Labumgebung.",
  path: "/",
});

/** Rendert die aktuell veröffentlichte technische Momentaufnahme. */
export default function Home() {
  return <SnapshotPage snapshotDate="2026-08-13" />;
}
