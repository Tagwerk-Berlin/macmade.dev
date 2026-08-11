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
  assert.match(html, /neuer, noch nicht ausgerollter Stand/);
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
});
