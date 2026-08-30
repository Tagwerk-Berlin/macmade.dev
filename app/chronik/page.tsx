import Link from "next/link";
import { createPageMetadata } from "../site-metadata";

export const metadata = createPageMetadata({
  title: "Chronik — macmade.dev",
  description: "Datierte technische Momentaufnahmen von macmade.dev, neueste zuerst.",
  path: "/chronik",
});

const entries = [
  {
    date: "2026-08-30",
    label: "30.08.2026",
    current: true,
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
];

/** Rendert den Index aller dauerhaft erreichbaren Momentaufnahmen. */
export default function Chronicle() {
  return (
    <main>
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="Zum aktuellen Stand">
          macmade<span>.dev</span>
        </Link>
        <nav aria-label="Seitennavigation">
          <Link href="/">Aktueller Stand</Link>
          <a href="#staende">Momentaufnahmen</a>
        </nav>
      </header>

      <section className="chronicle-hero">
        <p className="eyebrow">Chronik · Vertrag v1</p>
        <h1>Technische Urteile mit Datum.</h1>
        <p className="hero-intro">
          Jede Momentaufnahme hält fest, wie Codex Werkzeuge, Infrastruktur und
          tatsächliche Nutzung zu diesem Zeitpunkt beschrieben hat. Frühere
          Bewertungen bleiben stehen – auch wenn spätere Stände anders
          ausfallen.
        </p>
      </section>

      <section className="chronicle-list section-rule" id="staende">
        <div className="section-heading">
          <p className="eyebrow">Neueste zuerst</p>
          <h2>Veröffentlichte Momentaufnahmen.</h2>
        </div>
        <ol>
          {entries.map((entry) => (
            <li key={entry.date}>
              <Link href={`/chronik/${entry.date}`}>
                <div className="chronicle-entry-meta">
                  <time dateTime={entry.date}>{entry.label}</time>
                  {entry.current && <span>aktueller Stand</span>}
                </div>
                <h3>{entry.title}</h3>
                <p>{entry.summary}</p>
                <div className="trigger-row" aria-label="Auslöserkategorien">
                  {entry.triggers.map((trigger) => <span key={trigger}>{trigger}</span>)}
                </div>
                <strong>Momentaufnahme öffnen →</strong>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <footer>
        <p>macmade.dev</p>
        <p>Chronik-Vertrag v1 · historische Bewertungen bleiben sichtbar.</p>
        <Link href="/">Aktueller Stand →</Link>
      </footer>
    </main>
  );
}
