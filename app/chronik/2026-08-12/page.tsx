import { createPageMetadata } from "../../site-metadata";
import SnapshotPage from "../../snapshot-page";

export const metadata = createPageMetadata({
  title: "Stand 12.08.2026 — macmade.dev",
  description: "Archivierte technische Momentaufnahme von macmade.dev vom 12. August 2026.",
  path: "/chronik/2026-08-12",
});

/** Rendert den archivierten Originalstand vom 12. August 2026. */
export default function Snapshot20260812() {
  return <SnapshotPage snapshotDate="2026-08-12" />;
}
