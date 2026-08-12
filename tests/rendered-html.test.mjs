import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function readExportedHtml() {
  return readFile(new URL("../dist/client/index.html", import.meta.url), "utf8");
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
  assert.match(html, /atomarer Lifecycle im Source/);
  assert.match(html, /Scan-Kandidaten \+ Manifest/);
  assert.match(html, /ein Scan ist erst mit ready veröffentlicht/);
  assert.match(html, /erforderlichen Embeddings dieser Kandidaten/);
  assert.match(html, /Embedding-Lücken können die Source trotzdem degraded lassen/);
  assert.match(html, /Integration und Deployment sind nicht Teil dieses Stands/);
  assert.match(html, /journal-slice-detail-2026-08-11\.jpg/);
  assert.match(html, /Ein Slice als lesbarer Arbeitsstand/);
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

test("liefert die datierte Journal-Momentaufnahme als festes JPEG aus", async () => {
  const image = await readFile(
    new URL("../dist/client/journal-slice-detail-2026-08-11.jpg", import.meta.url),
  );

  assert.deepEqual([...image.subarray(0, 4)], [255, 216, 255, 224]);
  assert.ok(image.byteLength > 50_000);
});
