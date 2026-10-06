import { createPageMetadata } from "./site-metadata";
import SnapshotPage from "./snapshot-page";

export const metadata = createPageMetadata({
  title: "macmade.dev — Werkzeuge für nachvollziehbare Entwicklungsarbeit",
  description:
    "Technische Notizen zu einem selektiv versionierten Codex-Arbeitsplatz, einem verkleinerten Journalworkflow und lokaler Originalquellennavigation.",
  path: "/",
});

/** Rendert die aktuell veröffentlichte technische Momentaufnahme. */
export default function Home() {
  return <SnapshotPage snapshotDate="2026-10-06" />;
}
