import SnapshotPage from "../../snapshot-page";
import { createPageMetadata } from "../../site-metadata";

export const metadata = createPageMetadata({
  title: "Stand 22.10.2026 — macmade.dev",
  description:
    "Explizite Arbeitsbeziehungen und Mermaid im Journal; zusätzliche Modellbewertungen bleiben ein begrenzter Pilot.",
  path: "/chronik/2026-10-22",
});

/** Rendert die dauerhaft erreichbare Momentaufnahme vom 22. Oktober 2026. */
export default function Snapshot20261022() {
  return <SnapshotPage snapshotDate="2026-10-22" />;
}
