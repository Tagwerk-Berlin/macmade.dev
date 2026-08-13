import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function readExportedHtml(path = "index.html") {
  return readFile(new URL(`../dist/client/${path}`, import.meta.url), "utf8");
}

test("exportiert die öffentliche technische Seite als statisches HTML", async () => {
  const html = await readExportedHtml();
  assert.match(html, /Werkzeuge für nachvollziehbare Entwicklungsarbeit/);
  assert.match(html, /CodexJournal/);
  assert.match(html, /Akasha/);
  assert.match(html, /devMCP/);
  assert.match(html, /Grenze \/ Trade-off/);
  assert.match(html, /Keine Betriebsanleitung/);
  assert.match(html, /kanonische Auflösung aktiv/);
  assert.match(html, /Typen \+ TTL \+ Supersession/);
  assert.match(html, /fehlende Ziele bleiben dagegen diagnostisch sichtbar/);
  assert.match(html, /atomarer Lifecycle aktiv/);
  assert.match(html, /Scan-Kandidaten \+ Manifest/);
  assert.match(html, /ein Scan ist erst mit ready veröffentlicht/);
  assert.match(html, /erforderlichen Embeddings dieser Kandidaten/);
  assert.match(html, /Embedding-Lücken können die Source trotzdem degraded lassen/);
  assert.match(html, /Historische Generationen verschwinden nicht automatisch/);
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
  assert.doesNotMatch(html, /codexdashboard\.macmade\.dev|019ff[0-9a-f-]{20,}/i);
});

test("exportiert Chronik und beide datierten Momentaufnahmen", async () => {
  const current = await readExportedHtml();
  const chronicle = await readExportedHtml("chronik.html");
  const firstSnapshot = await readExportedHtml("chronik/2026-08-12.html");
  const currentSnapshot = await readExportedHtml("chronik/2026-08-13.html");

  assert.match(current, /Ein echtes Lab ersetzt den kurzlebigen Versuchsaufbau/);
  assert.match(current, /Technischer Stand/);
  assert.match(current, /Tatsächliche Nutzung/);
  assert.match(current, /Bewertung durch Codex/);
  assert.match(current, /laufende Arbeit/);
  assert.match(current, /dev-infra 40f7f6a/);

  assert.match(chronicle, /Technische Urteile mit Datum/);
  assert.match(chronicle, /href="\/chronik\/2026-08-13"/);
  assert.match(chronicle, /href="\/chronik\/2026-08-12"/);

  assert.match(firstSnapshot, /Systemnotizen · Stand (?:<!-- -->)?12\.08\.2026/);
  assert.match(firstSnapshot, /macmade\.dev ist eine technische Bestandsaufnahme/);
  assert.match(firstSnapshot, /Nächster Stand · 13\.08\.2026/);
  assert.doesNotMatch(firstSnapshot, /Parat-Lab|Ein echtes Lab ersetzt/);

  assert.match(currentSnapshot, /Systemnotizen · Stand (?:<!-- -->)?13\.08\.2026/);
  assert.match(currentSnapshot, /Älterer Stand · 12\.08\.2026/);
  assert.match(currentSnapshot, /Ein echtes Lab ersetzt den kurzlebigen Versuchsaufbau/);
});

test("bindet Canonical und Open Graph an jede konkrete Route", async () => {
  const routes = [
    ["chronik.html", "https://macmade.dev/chronik"],
    ["chronik/2026-08-12.html", "https://macmade.dev/chronik/2026-08-12"],
    ["chronik/2026-08-13.html", "https://macmade.dev/chronik/2026-08-13"],
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
  assert.match(html, /404: This page could not be found/);
  assert.doesNotMatch(html, /Ein echtes Lab ersetzt/);
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
  assert.doesNotMatch(css, /overflow-wrap:\s*anywhere/);
});
