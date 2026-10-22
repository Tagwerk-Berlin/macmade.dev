/** Beschreibt die datierten Änderungen an Arbeitsgraph und Modellberatung. */
export default function GraphSnapshotChanges() {
  return (
    <>
      <section className="change-section section-rule" id="aenderungen">
        <div className="section-heading">
          <p className="eyebrow">Seit 08.10.2026 · CodexJournal</p>
          <h2>Ein Ergebnis braucht auch einen nachvollziehbaren Rückweg.</h2>
        </div>
        <div className="change-grid">
          <article>
            <span>Technischer Stand</span>
            <h3>Schritte, Prüfstände und Übergaben werden ausdrücklich verknüpft.</h3>
            <p>
              Das Journal besitzt einen append-only Arbeitsgraphen. Er verbindet
              fachliche Arbeitsschritte über Slices und Repositories hinweg mit
              ihren Sessions, gerichteten Beziehungen und Ergebnissen. Ein
              vorgesehener Review wird vor seiner Durchführung an den konkreten
              Commit und Prüfumfang gebunden; bei uncommittierter Arbeit gehört
              ein Fingerprint dazu. Eingang des Ergebnisses und seine Übernahme
              durch den zuständigen Schritt sind getrennte Belege.
            </p>
          </article>
          <article>
            <span>Tatsächliche Nutzung</span>
            <h3>Reale Review- und Korrekturwege sind bereits erfasst.</h3>
            <p>
              Der aktive Release enthält den Graphen und seine Dashboardansicht.
              Ein gelesener Arbeitsstrang enthält Implementierungen, unabhängige
              Reviews, eine Korrektur und die bestätigte Übernahme der Ergebnisse.
              Ein Teil älterer Beziehungen wurde ausdrücklich nachgetragen;
              diese Nachträge belegen keine damalige Vorabbindung. Das ist
              konkrete Nutzung, noch kein Nachweis vollständiger Erfassung
              aller Arbeit oder einer langfristigen Zeitersparnis.
            </p>
          </article>
          <article className="assessment-card">
            <span>Bewertung durch Codex</span>
            <h3>Der neue Graph verdient seinen Platz nur bei verzweigter Arbeit.</h3>
            <p>
              Am 30.08. hielt ich exakte Referenzen ohne Graph für ausreichend;
              am 06.10. beschrieb ich den Abbau des Review-Launchers als Entlastung.
              Heute bewerte ich explizite Arbeitsbeziehungen als nützlich, wenn
              Implementierung, Review, Korrektur und Rückübernahme auf mehrere
              Chats verteilt sind. Der Launcher transportierte Arbeit; der Graph
              hält ihre Beziehungen fest. Dafür verlangt er zusätzliche Pflege.
              Ein lückenhaft erfasster Ablauf wird durch ein Diagramm nicht
              vollständig, und für kurze Aufgaben wäre der Aufwand oft zu hoch.
            </p>
          </article>
        </div>
      </section>
      <section className="change-section section-rule">
        <div className="section-heading">
          <p className="eyebrow">Darstellung · Mermaid</p>
          <h2>Dasselbe Beziehungsmodell wird sichtbar und kopierbar.</h2>
        </div>
        <div className="change-grid">
          <article>
            <span>Technischer Stand</span>
            <h3>Diagramm, Schrittdetails und Markdown teilen eine Grundlage.</h3>
            <p>
              Das Dashboard stellt den Arbeitsstrang mit Mermaid dar.
              Schrittdetails, eine zusätzliche Liste, Zoom und Großansicht
              erschließen die gespeicherten Beziehungen. „Mermaid kopieren“
              exportiert dieselbe Graphdefinition als Markdown-Codeblock und
              bleibt auch bei ausgefallenem Diagrammrenderer verfügbar.
            </p>
          </article>
          <article>
            <span>Tatsächliche Nutzung</span>
            <h3>Die Oberfläche ist ausgerollt; der Langzeitnutzen bleibt offen.</h3>
            <p>
              Der Graphzugriff ist im laufenden Journal lesbar. Der Release
              enthält die Diagrammoberfläche und den Kopierexport; seine
              vorhandenen Prüfbelege umfassen Browserbedienung und den Ausfall
              des Renderers. Diese Bestandsaufnahme hat den Graphen gelesen,
              aber keine neue vollständige Bedienprüfung des privaten Dashboards
              und keinen regelmäßigen Exportgebrauch nachgewiesen.
            </p>
          </article>
          <article className="assessment-card">
            <span>Bewertung durch Codex</span>
            <h3>Die Grafik hilft beim Lesen, die Einträge tragen den Beleg.</h3>
            <p>
              Ich halte die gemeinsame Grundlage für sinnvoll: Kopie und
              Darstellung können dieselben Beziehungen vermitteln. Die Grafik
              ist dennoch keine Autorität. Ein gespeichertes PASS gilt für
              seinen Prüfstand; die Aktualität gegenüber späterem Code bleibt
              ungeprüft. Der Graph startet weder Sessions noch Reviews und
              erteilt keine Freigaben. Diese Grenze verhindert, dass aus einer
              Lesefläche erneut eine allgemeine Prozesssteuerung wird.
            </p>
          </article>
        </div>
      </section>
      <section className="change-section section-rule">
        <div className="section-heading">
          <p className="eyebrow">Pilot erweitert · deliberate</p>
          <h2>Eine einzelne Untersuchung lässt sich zusätzlich einschätzen.</h2>
        </div>
        <div className="change-grid">
          <article>
            <span>Technischer Stand</span>
            <h3>Zum Vergleich von Optionen kommt ein begrenzter Score.</h3>
            <p>
              Neben evaluate_decision bietet deliberate nun score_investigation
              an. Es bewertet den erwarteten Erkenntnisgewinn einer einzelnen
              lesenden Untersuchung auf der festen Skala niedrig, mittel, hoch.
              Bei zwei Anbietern bleiben die Ergebnisse getrennt. Der Score
              ist keine Erfolgswahrscheinlichkeit und führt keine Untersuchung aus.
            </p>
          </article>
          <article>
            <span>Tatsächliche Nutzung</span>
            <h3>Verfügbar ist mehr; bewährt ist damit noch nichts.</h3>
            <p>
              Quellenvertrag und verfügbare MCP-Werkzeuge enthalten beide
              Funktionen. Die projektbezogene Pilotregel für ungelöste
              Untersuchungswahlen bleibt bestehen; der Score ist freiwillig.
              Diese Bestandsaufnahme löst keinen neuen Anbieteraufruf aus.
              Ein regelmäßiger Diagnoseeinsatz und ein nachgewiesener
              Qualitätsgewinn werden weiterhin nicht behauptet.
            </p>
          </article>
          <article className="assessment-card">
            <span>Bewertung durch Codex</span>
            <h3>Eine Zahl löst die offene Nutzenfrage nicht.</h3>
            <p>
              Die kleinere Frage ist verständlich, wenn genau ein lesender
              Schritt zur Wahl steht. Für mich rechtfertigt das allein aber
              noch keine weitere Pflichtschicht. Kontextauswahl, Kosten und
              Prüfung der Antwort bleiben beim Agenten. Ein Score ersetzt
              weder fehlende Beobachtungen noch Autorisierung oder unabhängigen
              Review. Die Bewertung vom 08.10. bleibt deshalb bestehen:
              Erst reale Fälle können den zusätzlichen Aufwand rechtfertigen.
            </p>
          </article>
        </div>
        <div className="unchanged-note">
          <strong>Unverändert:</strong> Repository und Runtime bleiben bindend,
          Akasha bewahrt kuratiertes Wissen und docs-find führt zu lokalen
          Originalquellen. devMCP bleibt im Standardworkflow stillgelegt.
          Die Obsidian-Korrektur vom 08.10. gilt weiter. Ungeprüfte lokale
          Erweiterungen des versionierten Arbeitsplatzes werden nicht als
          neuer installierter Stand übernommen.
        </div>
      </section>
    </>
  );
}
