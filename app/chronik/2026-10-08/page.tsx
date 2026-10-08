import SnapshotPage from "../../snapshot-page";
import { createPageMetadata } from "../../site-metadata";

export const metadata = createPageMetadata({
  title: "Stand 08.10.2026 — macmade.dev",
  description:
    "Datierte Obsidian-Korrektur, lesbarere Journal-Meldungen und ein begrenzter Pilot für zusätzliche Modellbewertungen.",
  path: "/chronik/2026-10-08",
});

/** Rendert die dauerhaft erreichbare Momentaufnahme vom 8. Oktober 2026. */
export default function Snapshot20261008() {
  return <SnapshotPage snapshotDate="2026-10-08" />;
}
