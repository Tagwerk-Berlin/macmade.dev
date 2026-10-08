import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function readExportedHtml(path = "index.html") {
  return readFile(new URL(`../dist/client/${path}`, import.meta.url), "utf8");
}

function decodeHtmlEntities(value) {
  const namedEntities = new Map([
    ["amp", "&"],
    ["apos", "'"],
    ["gt", ">"],
    ["lt", "<"],
    ["nbsp", " "],
    ["quot", '"'],
  ]);

  return value.replace(
    /&(?:#(\d+)|#x([\da-f]+)|([a-z]+));/gi,
    (entity, decimal, hexadecimal, named) => {
      if (decimal) return String.fromCodePoint(Number.parseInt(decimal, 10));
      if (hexadecimal) return String.fromCodePoint(Number.parseInt(hexadecimal, 16));
      return namedEntities.get(named.toLowerCase()) ?? entity;
    },
  );
}

function visibleText(html) {
  return decodeHtmlEntities(
    html
      // Gemeinsame Navigation beschreibt alle Stände, nicht den Archivinhalt.
      .replace(/<nav\b[^>]*class="snapshot-contents"[^>]*>[\s\S]*?<\/nav>/gi, " ")
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

test("exportiert die öffentliche technische Seite als statisches HTML", async () => {
  const html = await readExportedHtml();
  assert.match(html, /Werkzeuge für nachvollziehbare Entwicklungsarbeit/);
  assert.match(html, /CodexJournal/);
  assert.match(html, /Akasha/);
  assert.match(html, /devMCP/);
  assert.match(html, /docs-find/);
  assert.match(html, /Codex Workstation/);
  assert.match(html, /Grenze \/ Trade-off/);
  assert.match(html, /Keine Betriebsanleitung/);
  assert.match(html, /kanonische Auflösung aktiv/);
  assert.match(html, /Typen \+ TTL \+ Supersession/);
  assert.match(html, /fehlende Ziele bleiben dagegen diagnostisch sichtbar/);
  assert.match(html, /lokal und deterministisch/);
  assert.match(html, /im Einsatz · linear und verkleinert/);
  assert.match(html, /direkte Review-Session/);
  assert.match(html, /expliziter Ressourcenverbleib/);
  assert.match(html, /versioniertes Mapping/);
  assert.match(html, /kein Index oder Netzwerk-Fallback/);
  assert.match(html, /Lokale Originalquellen/);
  assert.doesNotMatch(html, /atomarer Lifecycle im Source|Integration und Deployment sind nicht Teil dieses Stands/);
  assert.match(html, /journal-review-2026-08-12\.jpg/);
  assert.match(html, /journal-rereview-result-2026-08-12\.jpg/);
  assert.match(html, /Change Control im Ausschnitt/);
  assert.match(html, /drei konkreten Befunden/);
  assert.match(html, /Session- und Slice-IDs/);
  assert.match(html, /Review-Ausschnitt in voller Größe öffnen/);
  assert.match(html, /Re-Review-Ausschnitt in voller Größe öffnen/);
  assert.match(html, /Ausschnitte realer Slices/);
  assert.doesNotMatch(html, /journal-slice-detail-2026-08-11\.jpg/);
  assert.doesNotMatch(html, /noch nicht ausgerollter Stand|Bis zum Deployment/);
  assert.match(html, /Werkzeugmuseum/);
  assert.match(html, /CodexSlicer/);
  assert.match(html, /Indexierte Quellennavigation/);
  assert.match(html, /retired/);
  assert.match(html, /Kein allgemeines Todesurteil/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Starter Project/);
});

test("zeichnet die Kernsysteme als im Einsatz aus", async () => {
  const html = await readExportedHtml();
  const statusCount = (html.match(/im Einsatz/g) ?? []).length;
  assert.ok(statusCount >= 3);
});

test("verwendet öffentliche kanonische Metadaten", async () => {
  const html = await readExportedHtml();
  assert.match(html, /<link rel="canonical" href="https:\/\/macmade\.dev\/?"/);
  assert.match(html, /<meta property="og:image" content="https:\/\/macmade\.dev\/og\.png"/);
  assert.doesNotMatch(html, /localhost|x-forwarded-host/i);
  assert.doesNotMatch(html, /(?:dashboard|journal)\.internal/i);
  assert.doesNotMatch(html, /data-(?:session|slice)-id=/i);
});

test("exportiert Chronik und alle datierten Momentaufnahmen", async () => {
  const current = await readExportedHtml();
  const chronicle = await readExportedHtml("chronik/index.html");
  const firstSnapshot = await readExportedHtml("chronik/2026-08-12/index.html");
  const firstLabSnapshot = await readExportedHtml("chronik/2026-08-13/index.html");
  const offlineLabSnapshot = await readExportedHtml("chronik/2026-08-16/index.html");
  const fixedLabsSnapshot = await readExportedHtml("chronik/2026-08-18/index.html");
  const linkabilitySnapshot = await readExportedHtml("chronik/2026-08-30/index.html");
  const docsFindSnapshot = await readExportedHtml("chronik/2026-09-01/index.html");
  const journalSnapshot = await readExportedHtml("chronik/2026-09-04/index.html");
  const currentSnapshot = await readExportedHtml("chronik/2026-10-06/index.html");
  const currentText = visibleText(current);
  const workstationSnapshotText = visibleText(currentSnapshot);
  const firstSnapshotText = visibleText(firstSnapshot);
  const firstLabSnapshotText = visibleText(firstLabSnapshot);
  const offlineLabSnapshotText = visibleText(offlineLabSnapshot);
  const fixedLabsSnapshotText = visibleText(fixedLabsSnapshot);
  const linkabilitySnapshotText = visibleText(linkabilitySnapshot);
  const docsFindSnapshotText = visibleText(docsFindSnapshot);
  const journalSnapshotText = visibleText(journalSnapshot);
  const currentSnapshotText = visibleText(currentSnapshot);

  assert.match(workstationSnapshotText, /Reproduzierbar wird nur, was portabel bleiben darf/);
  assert.match(workstationSnapshotText, /Technischer Stand/);
  assert.match(workstationSnapshotText, /Tatsächliche Nutzung/);
  assert.match(workstationSnapshotText, /Bewertung durch Codex/);
  assert.match(workstationSnapshotText, /Der Arbeitsplatz erhält eine begrenzte Source of Truth/);
  assert.match(workstationSnapshotText, /Installiert wird eine Auswahl, kein Benutzerverzeichnis/);
  assert.match(workstationSnapshotText, /einen unabhängigen Review nur nach Risiko, Auftrag oder bindender Regel einsetzen/);
  assert.match(workstationSnapshotText, /Explizite Lücken sind besser als falsche Maschinenparität/);
  assert.match(workstationSnapshotText, /Vollständige Parität ist nicht belegt/);
  assert.match(workstationSnapshotText, /read-only Abgleich macht Abweichungen sichtbar/);
  assert.match(workstationSnapshotText, /Sessions, Memories, Zugangsdaten, Trust-Entscheidungen/);
  assert.match(workstationSnapshotText, /Obsidian als mobile Leseschicht/);
  assert.match(workstationSnapshotText, /Versionierter Arbeitsplatz Codex Workstation/);
  assert.match(workstationSnapshotText, /lokales Mapping/);
  assert.match(workstationSnapshotText, /Review-Launcher und Shared Notes sind stillgelegt/);
  assert.match(workstationSnapshotText, /transportiert den Reviewer aber nicht mehr selbst/);
  assert.match(workstationSnapshotText, /CodexJournal 2c3cdbc · aktueller Quellenvertrag/);
  assert.match(workstationSnapshotText, /Akasha a83c9ee · aktueller Quellenvertrag/);
  assert.match(workstationSnapshotText, /Codex Workstation 356e12b · versionierter Vertragsstand/);
  assert.match(workstationSnapshotText, /dev-infra 89d238d · Dokumentations- und Laufzeitquellen/);
  assert.match(workstationSnapshotText, /devMCP ff5191d · retired im Standardworkflow/);
  assert.doesNotMatch(
    currentText,
    /(?:\d{1,3}\.){3}\d{1,3}|\/Users\/|\b(?:[a-z0-9-]+\.)+(?:internal|lan|local)\b|Mailcode:\s*\d+/i,
  );

  assert.match(currentText, /Systemnotizen · Stand 08\.10\.2026/);
  assert.match(currentText, /Korrektur · 08\.10\.2026/);
  assert.match(currentText, /Meine frühere Beschreibung versprach einen Schutz/);
  assert.match(currentText, /Der Publisher erzeugt keine Konfliktkopien oder eigene Historie/);
  assert.doesNotMatch(currentText, /Eine lokale Historie bewahrt konkurrierende/);
  assert.match(currentText, /Offene Arbeit bleibt vor langen Standmeldungen sichtbar/);
  assert.match(currentText, /Ein regelmäßiger Diagnoseeinsatz und ein nachgewiesener Qualitätsgewinn werden hier nicht behauptet/);
  assert.match(currentText, /CodexJournal 27fe720 · aktiver Dashboard-Stand/);
  assert.match(currentText, /deliberate f351dce · konfigurierter Pilot/);
  assert.match(workstationSnapshotText, /Eine lokale Historie bewahrt konkurrierende/);
  assert.doesNotMatch(workstationSnapshotText, /Korrektur · 08\.10\.2026|deliberate|27fe720/);

  assert.match(chronicle, /Technische Urteile mit Datum/);
  assert.match(chronicle, /href="\/chronik\/2026-10-08"/);
  assert.match(chronicle, /href="\/chronik\/2026-10-06"/);
  assert.doesNotMatch(chronicle, /href="\/chronik\/2026-10-01"/);
  assert.match(chronicle, /href="\/chronik\/2026-09-04"/);
  assert.match(chronicle, /href="\/chronik\/2026-09-01"/);
  assert.match(chronicle, /href="\/chronik\/2026-08-30"/);
  assert.match(chronicle, /href="\/chronik\/2026-08-18"/);
  assert.match(chronicle, /href="\/chronik\/2026-08-16"/);
  assert.match(chronicle, /href="\/chronik\/2026-08-13"/);
  assert.match(chronicle, /href="\/chronik\/2026-08-12"/);

  assert.match(firstSnapshotText, /Systemnotizen · Stand 12\.08\.2026/);
  assert.match(firstSnapshotText, /macmade\.dev ist eine technische Bestandsaufnahme/);
  assert.match(firstSnapshotText, /Nächster Stand · 13\.08\.2026/);
  assert.doesNotMatch(firstSnapshotText, /Parat-Lab|Ein echtes Lab ersetzt/);

  assert.match(firstLabSnapshotText, /Systemnotizen · Stand 13\.08\.2026/);
  assert.match(firstLabSnapshotText, /Älterer Stand · 12\.08\.2026/);
  assert.match(firstLabSnapshotText, /Ein echtes Lab ersetzt den kurzlebigen Versuchsaufbau/);
  assert.match(firstLabSnapshotText, /Nächster Stand · 16\.08\.2026/);
  assert.doesNotMatch(firstLabSnapshotText, /Nicht jedes Lab braucht einen Release-Apparat/);

  assert.match(offlineLabSnapshotText, /Systemnotizen · Stand 16\.08\.2026/);
  assert.match(offlineLabSnapshotText, /Älterer Stand · 13\.08\.2026/);
  assert.match(offlineLabSnapshotText, /Nicht jedes Lab braucht einen Release-Apparat/);
  assert.match(offlineLabSnapshotText, /Nächster Stand · 18\.08\.2026/);
  assert.doesNotMatch(offlineLabSnapshotText, /Feste Wiederholung ersetzt keine Mandantenplattform/);

  assert.match(fixedLabsSnapshotText, /Systemnotizen · Stand 18\.08\.2026/);
  assert.match(fixedLabsSnapshotText, /Älterer Stand · 16\.08\.2026/);
  assert.match(fixedLabsSnapshotText, /Feste Wiederholung ersetzt keine Mandantenplattform/);
  assert.match(fixedLabsSnapshotText, /Nächster Stand · 30\.08\.2026/);
  assert.match(fixedLabsSnapshotText, /CodexJournal e55e998 · lokaler Hook-Release/);
  assert.doesNotMatch(fixedLabsSnapshotText, /Exakte Verbindungen sind nützlicher|Obsidian als mobile Leseschicht/);

  assert.match(linkabilitySnapshotText, /Systemnotizen · Stand 30\.08\.2026/);
  assert.match(linkabilitySnapshotText, /Älterer Stand · 18\.08\.2026/);
  assert.match(linkabilitySnapshotText, /Exakte Verbindungen sind nützlicher als ein vorschneller Graph/);
  assert.match(linkabilitySnapshotText, /devMCP liefert den Einstiegspunkt/);
  assert.match(linkabilitySnapshotText, /Nächster Stand · 01\.09\.2026/);
  assert.doesNotMatch(linkabilitySnapshotText, /docs-find|devMCP ist nicht mehr der normale Einstiegspunkt/);

  assert.match(docsFindSnapshotText, /Systemnotizen · Stand 01\.09\.2026/);
  assert.match(docsFindSnapshotText, /Älterer Stand · 30\.08\.2026/);
  assert.match(docsFindSnapshotText, /Die Originalquelle braucht für diesen Workflow keinen Index/);
  assert.match(docsFindSnapshotText, /Ziel, Grenze und erforderliche Gates im Journal festlegen/);
  assert.match(docsFindSnapshotText, /Nächster Stand · 04\.09\.2026/);
  assert.doesNotMatch(docsFindSnapshotText, /Das Journal dokumentiert Arbeit, es steuert sie nicht/);

  assert.match(journalSnapshotText, /Systemnotizen · Stand 04\.09\.2026/);
  assert.match(journalSnapshotText, /Älterer Stand · 01\.09\.2026/);
  assert.match(journalSnapshotText, /Das Journal dokumentiert Arbeit, es steuert sie nicht/);
  assert.match(journalSnapshotText, /Nächster Stand · 06\.10\.2026/);
  assert.doesNotMatch(journalSnapshotText, /Reproduzierbar wird nur, was portabel bleiben darf/);
  assert.doesNotMatch(journalSnapshotText, /Review-Launcher und Shared Notes sind stillgelegt/);

  assert.match(currentSnapshotText, /Systemnotizen · Stand 06\.10\.2026/);
  assert.match(currentSnapshotText, /Älterer Stand · 04\.09\.2026/);
  assert.match(currentSnapshotText, /Reproduzierbar wird nur, was portabel bleiben darf/);
  assert.doesNotMatch(currentSnapshotText, /Change-Control verlässt die aktive Werkzeugfläche/);
  assert.match(currentSnapshotText, /Nächster Stand · 08\.10\.2026/);
});

test("bindet Canonical und Open Graph an jede konkrete Route", async () => {
  const routes = [
    ["chronik/index.html", "https://macmade.dev/chronik"],
    ["chronik/2026-08-12/index.html", "https://macmade.dev/chronik/2026-08-12"],
    ["chronik/2026-08-13/index.html", "https://macmade.dev/chronik/2026-08-13"],
    ["chronik/2026-08-16/index.html", "https://macmade.dev/chronik/2026-08-16"],
    ["chronik/2026-08-18/index.html", "https://macmade.dev/chronik/2026-08-18"],
    ["chronik/2026-08-30/index.html", "https://macmade.dev/chronik/2026-08-30"],
    ["chronik/2026-09-01/index.html", "https://macmade.dev/chronik/2026-09-01"],
    ["chronik/2026-09-04/index.html", "https://macmade.dev/chronik/2026-09-04"],
    ["chronik/2026-10-06/index.html", "https://macmade.dev/chronik/2026-10-06"],
    ["chronik/2026-10-08/index.html", "https://macmade.dev/chronik/2026-10-08"],
  ];

  for (const [path, url] of routes) {
    const html = await readExportedHtml(path);
    assert.match(html, new RegExp(`<link rel="canonical" href="${url}"`));
    assert.match(html, new RegExp(`<meta property="og:url" content="${url}"`));
    assert.match(html, /<meta property="og:image" content="https:\/\/macmade\.dev\/og\.png"/);
  }
});

test("liefert ein eigenständiges statisches 404-Dokument", async () => {
  const html = await readExportedHtml("404.html");
  const text = visibleText(html);
  assert.match(text, /404: This page could not be found/);
  assert.doesNotMatch(text, /Ein echtes Lab ersetzt/);
  assert.doesNotMatch(text, /Nicht jedes Lab braucht einen Release-Apparat/);
  assert.doesNotMatch(text, /Feste Wiederholung ersetzt keine Mandantenplattform/);
  assert.doesNotMatch(text, /Exakte Verbindungen sind nützlicher als ein vorschneller Graph/);
  assert.doesNotMatch(text, /Die Originalquelle braucht für diesen Workflow keinen Index/);
  assert.doesNotMatch(text, /Das Journal dokumentiert Arbeit, es steuert sie nicht/);
  assert.doesNotMatch(text, /Reproduzierbar wird nur, was portabel bleiben darf/);
});

test("liefert die datierten Journal-Momentaufnahmen als feste JPEGs aus", async () => {
  for (const filename of [
    "journal-review-2026-08-12.jpg",
    "journal-rereview-result-2026-08-12.jpg",
  ]) {
    const image = await readFile(new URL(`../dist/client/${filename}`, import.meta.url));

    assert.deepEqual([...image.subarray(0, 4)], [255, 216, 255, 224]);
    assert.ok(image.byteLength > 50_000);
  }
});

test("trennt die mobile Hauptüberschrift typografisch statt zeichenweise", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(css, /h1\s*{[^}]*hyphens:\s*auto/s);
  assert.match(css, /h1\s*{[^}]*overflow-wrap:\s*normal/s);
  assert.match(css, /\.change-grid article\s*{[^}]*min-width:\s*0/s);
  assert.match(css, /\.change-grid h3\s*{[^}]*overflow-wrap:\s*break-word/s);
  assert.doesNotMatch(css, /overflow-wrap:\s*anywhere/);
});
