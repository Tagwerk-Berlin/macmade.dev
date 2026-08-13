# macmade.dev

Kleine öffentliche technische Seite über die im Entwicklungsworkflow eingesetzten Werkzeuge und Infrastrukturkomponenten.

Der erste Stand beschreibt CodexJournal, Akasha und devMCP sowie zwei kleinere Praxisbeispiele. Das Werkzeugmuseum hält zusätzlich Systeme fest, die real eingesetzt, später aber aus dem Workflow entfernt wurden. Die Seite bleibt bewusst statisch, benötigt keine Datenbank und veröffentlicht keine Betriebsdetails.

Die Seite ist eine versionierte Momentaufnahme, kein zeitloser Produktkatalog. Spätere Revisionen sollen sichtbar machen, wann Werkzeuge hinzukommen oder entfallen und wie sich ihre Grenzen durch konkrete Änderungen verschieben. Aussagen über Source, ausgerollte Versionen und laufenden Betrieb werden dabei getrennt behandelt.

## Chronik

Die Startseite zeigt den neuesten veröffentlichten Stand. `/chronik` listet alle Momentaufnahmen neueste zuerst; `/chronik/YYYY-MM-DD` hält jeden Stand dauerhaft unter seinem Datum erreichbar. Aktuelle und historische Seiten verwenden dieselbe Darstellung. Historische Aussagen bleiben unverändert, während Navigation, gemeinsame Darstellung und ausdrücklich gekennzeichnete Sicherheitskorrekturen später gepflegt werden dürfen.

Jeder neue Stand trennt technischen Zustand, tatsächliche Nutzung und die zeitgebundene Bewertung durch Codex. Laufende oder ungeprüfte Arbeit wird nicht als bestehende Realität übernommen.

## Lokal ausführen

```bash
npm install
npm run dev
```

## Prüfen

```bash
npm test
```

## Statischer Export

`npm run build` erzeugt die veröffentlichbaren Dateien unter `dist/client`. Auf dem Zielsystem wird nur dieser Export ausgeliefert; eine Node-Laufzeit, Datenbank oder Verbindung zu den beschriebenen Werkzeugen ist nicht erforderlich.

Eine Veröffentlichung erfolgt bewusst getrennt vom Build. Vor dem Umschalten werden Export, öffentliche Inhalte und die bestehende Webserver-Konfiguration geprüft.
