export const chronicleEntries = [
  {
    date: "2026-10-08",
    label: "08.10.2026",
    current: true,
    title: "Eine falsche Kopiergarantie fällt; das Journal wird lesbarer.",
    summary:
      "Datierte Obsidian-Korrektur, sichtbare nächste Schritte im Journal und deliberate als konfigurierter, noch nicht bewährter Pilot.",
    triggers: ["Korrektur", "Technischer Stand", "Tatsächliche Nutzung", "Bewertung durch Codex"],
  },
  {
    date: "2026-10-06",
    label: "06.10.2026",
    current: false,
    title: "Der Arbeitsplatz wird selektiv reproduzierbar – und das Journal wieder kleiner.",
    summary:
      "Portable Regeln und Laufzeitverträge werden gezielt installiert; ungenutzte Journal-Hilfsschichten wurden entfernt.",
    triggers: ["Technischer Stand", "Tatsächliche Nutzung", "Bewertung durch Codex"],
  },
  {
    date: "2026-09-04",
    label: "04.09.2026",
    current: false,
    title: "CodexJournal kehrt zum linearen Arbeitsablauf zurück.",
    summary:
      "Pflichtklassifikation und allgemeine Gates entfallen; optionale Signale und Shared Notes bleiben klar getrennte Nebenflächen.",
    triggers: ["Technischer Stand", "Tatsächliche Nutzung", "Bewertung durch Codex"],
  },
  {
    date: "2026-09-01",
    label: "01.09.2026",
    current: false,
    title: "Lokale Originalquellen ersetzen den Standardindex.",
    summary:
      "docs-find übernimmt die deterministische Navigation; devMCP bleibt als deaktivierter Rückfall erhalten und wandert für diesen Workflow ins Museum.",
    triggers: ["Technischer Stand", "Tatsächliche Nutzung", "Bewertung durch Codex"],
  },
  {
    date: "2026-08-30",
    label: "30.08.2026",
    current: false,
    title: "Exakte Provenienz, mobile Dokumente und ein enger Review-Launcher.",
    summary:
      "Linkability v1 verbindet belegte Identitäten ohne Graph; mobile Leseschicht und Review-Intent bleiben abgeleitete, eng begrenzte Hilfen.",
    triggers: ["Technischer Stand", "Tatsächliche Nutzung", "Bewertung durch Codex"],
  },
  {
    date: "2026-08-18",
    label: "18.08.2026",
    current: false,
    title: "Feste Lab-Installationen und ein manueller Journal-Checkpoint.",
    summary:
      "Explizite Wiederholung bleibt kleiner als eine Mandantenplattform; der neue Compaction-Checkpoint bleibt eine schmale, noch nicht regelmäßig genutzte Fähigkeit.",
    triggers: ["Technischer Stand", "Tatsächliche Nutzung", "Bewertung durch Codex"],
  },
  {
    date: "2026-08-16",
    label: "16.08.2026",
    current: false,
    title: "Eine kleinere, erwartbar offline betriebene Laborform kommt hinzu.",
    summary:
      "Manueller Neuaufbau ersetzt einen zweiten Release-Apparat. Reale Smokes bleiben nötig, ihre noch offenen Grenzen werden ausdrücklich benannt.",
    triggers: ["Technischer Stand", "Tatsächliche Nutzung", "Bewertung durch Codex"],
  },
  {
    date: "2026-08-13",
    label: "13.08.2026",
    current: false,
    title: "Eine dauerhafte, nichtproduktive Labumgebung kommt hinzu.",
    summary:
      "Reale Browser-, Vertrauens- und Rollbackgrenzen werden prüfbar. Die drei Kernwerkzeuge und ihre Rollen bleiben unverändert.",
    triggers: ["Technischer Stand", "Tatsächliche Nutzung", "Bewertung durch Codex"],
  },
  {
    date: "2026-08-12",
    label: "12.08.2026",
    current: false,
    title: "Drei getrennte Systeme und ein erstes Werkzeugmuseum.",
    summary:
      "CodexJournal, Akasha und devMCP werden als getrennte Zustandsarten beschrieben; CodexSlicer erscheint als retired.",
    triggers: ["Technischer Stand", "Tatsächliche Nutzung", "Bewertung durch Codex"],
  },
] as const;

export type SnapshotDate = (typeof chronicleEntries)[number]["date"];
