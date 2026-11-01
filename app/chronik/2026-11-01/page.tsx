import SnapshotPage from "../../snapshot-page";
import { createPageMetadata } from "../../site-metadata";

export const metadata = createPageMetadata({
  title: "Stand 01.11.2026 — macmade.dev",
  description:
    "Lesender Wiedereinstieg im Journal und beobachtete Session-Tokens mit ausdrücklich begrenzter Aussagekraft.",
  path: "/chronik/2026-11-01",
});

/** Rendert die dauerhaft erreichbare Momentaufnahme vom 1. November 2026. */
export default function Snapshot20261101() {
  return <SnapshotPage snapshotDate="2026-11-01" />;
}
