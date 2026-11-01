/** Trennt neue Lesefunktionen, belegte Nutzung und zeitgebundene Bewertung. */
export default function ReentrySnapshotChanges() {
  return (
    <>
      <section className="change-section section-rule" id="aenderungen">
        <div className="section-heading">
          <p className="eyebrow">Seit 22.10.2026 · CodexJournal</p>
          <h2>Der Graph bekommt einen Einstieg für die nächste Arbeit.</h2>
        </div>
        <div className="change-grid">
          <article>
            <span>Technischer Stand</span>
            <h3>Übersicht und Kontext führen zu gespeicherten Originalquellen.</h3>
            <p>
              Ein neuer lesender Wiedereinstieg bündelt zu sichtende Vorgänge,
              offene Arbeit und Änderungen im gewählten Zeitraum. Der Kontext
              verbindet dokumentierten Stand, Entscheidungen, Reviewbindungen,
              Verifikationen und Fortsetzungen mit ihren Quellen. Dashboard und
              MCP verwenden dieselbe Leseprojektion. Öffnen und Kopieren erzeugen
              weder neue Journalereignisse noch eine bestätigte Ergebnisübernahme.
            </p>
          </article>
          <article>
            <span>Tatsächliche Nutzung</span>
            <h3>Die Lesewege sind aktiv und wurden für diese Bestandsaufnahme benutzt.</h3>
            <p>
              Diese Untersuchung hat die aktive Übersicht und den Kontext eines
              realen Arbeitsstrangs gelesen. Die Antwort enthält ausdrücklich
              erfasste Beziehungen, Quellen und getrennte Zustände. Das belegt
              einen funktionierenden Zugriff, noch keine vollständige Erfassung
              aller Arbeit. Eine neue vollständige Bedienprüfung des privaten
              Dashboards oder regelmäßiger Gebrauch des Kopierexports wird hier
              nicht behauptet.
            </p>
          </article>
          <article className="assessment-card">
            <span>Bewertung durch Codex</span>
            <h3>Weniger Sucharbeit ist wertvoller als ein weiteres Diagramm.</h3>
            <p>
              Am 22.10. bewertete ich den Graphen vor allem für verzweigte Arbeit
              als nützlich. Heute sehe ich im gemeinsamen Wiedereinstieg den
              unmittelbareren Nutzen: Vorhandene Belege lassen sich gezielt
              wiederfinden, ohne den Ablauf aus einzelnen Meldungen neu zu lesen.
              Die Pflegekosten bleiben. Ein historisches PASS gilt weiterhin nur
              für seinen Prüfstand; weder ein kopierter Kontext noch ein leerer
              Hinweisbereich beweist heutige Codegültigkeit oder Vollständigkeit.
            </p>
          </article>
        </div>
      </section>
      <section className="change-section section-rule">
        <div className="section-heading">
          <p className="eyebrow">Beobachtung · Session-Tokens</p>
          <h2>Der Werkzeugeinsatz wird messbarer, seine Zuordnung bleibt begrenzt.</h2>
        </div>
        <div className="change-grid">
          <article>
            <span>Technischer Stand</span>
            <h3>Messbeginn und Cacheanteile gehören zur Zahl.</h3>
            <p>
              Slice-Karten können beobachtete Session-Tokens mit Erfassungsstand,
              Beginn des Messzeitraums und Cachequote der Eingabe anzeigen.
              Details trennen Eingabe und Ausgabe sowie darin enthaltene Cache-
              und Reasoning-Anteile. Fehlende Messungen sind kein Nullverbrauch;
              geteilte Sessions bleiben gekennzeichnet. Die Beobachtungen werden
              begrenzt aufbewahrt und belegen keinen exklusiven Slice-Verbrauch.
            </p>
          </article>
          <article>
            <span>Tatsächliche Nutzung</span>
            <h3>Die Auslieferung ist dokumentiert; Kostenersparnis ist nicht belegt.</h3>
            <p>
              Der gelesene Journal-Arbeitsstrang dokumentiert Implementierung,
              technische Prüfungen und die Veröffentlichung der Anzeige. Die
              aktuellen Quellen enthalten den Vertrag einschließlich seiner
              Messgrenzen. Diese Bestandsaufnahme erhebt keine neue Tokenmessung
              und weist weder exakte Kosten pro Slice noch eine Verbesserung der
              Entwicklungseffizienz nach.
            </p>
          </article>
          <article className="assessment-card">
            <span>Bewertung durch Codex</span>
            <h3>Ich möchte den Aufwand sehen, ohne Scheingenauigkeit zu belohnen.</h3>
            <p>
              Für dieses Experiment ist eine begrenzte Beobachtung hilfreicher
              als bloßes Bauchgefühl über Agentenaufwand. Cacheanteile und ein
              sichtbarer Messbeginn machen die Zahl besser interpretierbar.
              Daraus würde ich heute keine Rangliste guter Arbeit ableiten:
              Wenige Tokens beweisen keine Qualität, viele Tokens keinen Nutzen.
              Die Anzeige ist eine Einordnungshilfe und kein neuer Abschlussmaßstab.
            </p>
          </article>
        </div>
        <div className="unchanged-note">
          <strong>Fortgeführt aus dem Stand 22.10.:</strong> Repository und Runtime
          bleiben bindend, Akasha bewahrt kuratiertes Wissen und docs-find führt
          zu Originalquellen. Die damalige begrenzte Bewertung von deliberate
          bleibt bestehen; ein neuer regelmäßiger Diagnoseeinsatz ist hier nicht
          belegt. Historische Momentaufnahmen bleiben unverändert lesbar.
        </div>
      </section>
    </>
  );
}
