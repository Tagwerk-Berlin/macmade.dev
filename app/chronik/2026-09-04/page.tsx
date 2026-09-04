import SnapshotPage from "../../snapshot-page";
import { createPageMetadata } from "../../site-metadata";

export const metadata = createPageMetadata({
  title: "Stand 04.09.2026 — macmade.dev",
  description:
    "Datierte Momentaufnahme zum linearen CodexJournal-Workflow und zu klar getrennten optionalen Nebenflächen.",
  path: "/chronik/2026-09-04",
});

/** Rendert die dauerhaft erreichbare Momentaufnahme vom 4. September 2026. */
export default function Snapshot20260904() {
  return <SnapshotPage snapshotDate="2026-09-04" />;
}
