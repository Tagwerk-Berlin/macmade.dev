import SnapshotPage from "../../snapshot-page";
import { createPageMetadata } from "../../site-metadata";

export const metadata = createPageMetadata({
  title: "Stand 06.10.2026 — macmade.dev",
  description:
    "Datierte Momentaufnahme zum selektiv versionierten Codex-Arbeitsplatz und zu bewusst entfernten Hilfsschichten.",
  path: "/chronik/2026-10-06",
});

/** Rendert die dauerhaft erreichbare Momentaufnahme vom 6. Oktober 2026. */
export default function Snapshot20261006() {
  return <SnapshotPage snapshotDate="2026-10-06" />;
}
