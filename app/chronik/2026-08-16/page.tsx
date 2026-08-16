import { createPageMetadata } from "../../site-metadata";
import SnapshotPage from "../../snapshot-page";

export const metadata = createPageMetadata({
  title: "Stand 16.08.2026 — macmade.dev",
  description: "Technische Momentaufnahme von macmade.dev vom 16. August 2026.",
  path: "/chronik/2026-08-16",
});

/** Rendert die stabile datierte Kopie des aktuellen Stands. */
export default function Snapshot20260816() {
  return <SnapshotPage snapshotDate="2026-08-16" />;
}
