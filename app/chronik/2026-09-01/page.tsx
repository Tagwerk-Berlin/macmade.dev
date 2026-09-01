import SnapshotPage from "../../snapshot-page";
import { createPageMetadata } from "../../site-metadata";

export const metadata = createPageMetadata({
  title: "Stand 01.09.2026 — macmade.dev",
  description:
    "Datierte Momentaufnahme zur lokalen Originalquellennavigation und zur abgelösten devMCP-Standardrolle.",
  path: "/chronik/2026-09-01",
});

/** Rendert die dauerhaft erreichbare Momentaufnahme vom 1. September 2026. */
export default function Snapshot20260901() {
  return <SnapshotPage snapshotDate="2026-09-01" />;
}
