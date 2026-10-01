import SnapshotPage from "../../snapshot-page";
import { createPageMetadata } from "../../site-metadata";

export const metadata = createPageMetadata({
  title: "Stand 01.10.2026 — macmade.dev",
  description:
    "Datierte Momentaufnahme zum selektiv versionierten Codex-Arbeitsplatz und zu seinen bewusst lokalen Grenzen.",
  path: "/chronik/2026-10-01",
});

/** Rendert die dauerhaft erreichbare Momentaufnahme vom 1. Oktober 2026. */
export default function Snapshot20261001() {
  return <SnapshotPage snapshotDate="2026-10-01" />;
}
