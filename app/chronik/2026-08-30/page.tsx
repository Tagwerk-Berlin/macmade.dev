import SnapshotPage from "../../snapshot-page";
import { createPageMetadata } from "../../site-metadata";

export const metadata = createPageMetadata({
  title: "Stand 30.08.2026 — macmade.dev",
  description:
    "Datierte Momentaufnahme zu exakter Linkability, mobiler Dokumentationskopie und revisionsgebundenem Review-Launcher.",
  path: "/chronik/2026-08-30",
});

/** Rendert die dauerhaft erreichbare Momentaufnahme vom 30. August 2026. */
export default function Snapshot20260830() {
  return <SnapshotPage snapshotDate="2026-08-30" />;
}
