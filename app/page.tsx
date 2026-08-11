const coreSystems = [
  {
    index: "01",
    name: "CodexJournal",
    status: "im Einsatz",
    purpose: "Operative Provenienz",
    lead: "Hält fest, was eine Arbeitseinheit erreichen soll, welche Entscheidungen gefallen sind und woran ihr Ergebnis geprüft wurde.",
    problem:
      "Git zeigt Änderungen, aber nicht zuverlässig Ziel, bewusste Nicht-Änderungen, Review-Gates oder den Grund für einen Abbruch. Bei längeren Agentenläufen fehlt dadurch ein belastbarer Arbeitsverlauf.",
    mechanism:
      "MCP-Werkzeuge schreiben semantische Ereignisse in ein append-only PostgreSQL-Journal. Technische Hooks ergänzen Session-Fakten über eine lokale, fehlertolerante Outbox. Eine getrennte Projektion macht offene Slices und ihren Status lesbar.",
    workflow:
      "Vor einer Änderung wird ein begrenzter Slice klassifiziert. Fortschritt bleibt sparsam; Entscheidungen, revisionsgebundene Verifikation und das Ergebnis werden explizit abgeschlossen. Ein Session-Ende beendet keinen Slice automatisch.",
    tradeoff:
      "Das ist zusätzliche Prozess- und Betriebsinfrastruktur. Sie lohnt sich erst, wenn Arbeit mehrere Sessions, Reviews oder Risikogrenzen überspannt. Für ein kleines Repository reichen Issue, Commit und Testprotokoll oft aus.",
    facts: ["append-only Ereignisse", "PostgreSQL", "MCP + lokale Hooks"],
  },
  {
    index: "02",
    name: "Akasha",
    status: "im Einsatz",
    purpose: "Kuratiertes Arbeitsgedächtnis",
    lead: "Bewahrt Entscheidungen, Fehlermuster und echten Wiederaufnahmekontext über einzelne Aufgaben hinweg auf.",
    problem:
      "Wiederverwendbare Erkenntnisse verschwinden in Chats und Notizen. Das Gegenextrem – jede Sitzung vollständig zu speichern – erzeugt jedoch ein lautes, widersprüchliches Gedächtnis.",
    mechanism:
      "Ein .NET-MCP-Server speichert kompakte Einträge in PostgreSQL mit pgvector. Semantische Suche wird mit Metadaten wie Projekt, Typ und Scope kombiniert. Temporärer Session-Kontext erhält standardmäßig eine TTL; Commit-Suche ist ein expliziter Sonderfall.",
    workflow:
      "Zu Beginn wird nach passendem Wissen gesucht. Gespeichert wird nur bestätigtes, außerhalb des aktuellen Slices nützliches Wissen – oder ein wirklich benötigter Übergabestand. Repository und aktuelle Dokumentation bleiben maßgeblich.",
    tradeoff:
      "Retrieval ist probabilistisch und Metadaten brauchen Pflege. Der aktuelle Default-Suchpfad kann abgelaufene Einträge nebenbei bereinigen; das spart Wartung, koppelt aber Lesen und Schreiben. Für wenige stabile Notizen ist eine versionierte Markdown-Datei einfacher.",
    facts: ["PostgreSQL + pgvector", "Typen + TTL", "semantische Suche"],
  },
  {
    index: "03",
    name: "devMCP",
    status: "im Einsatz",
    purpose: "Quellennavigation",
    lead: "Macht Dokumentation, DDL, Code und Endpoint-Kataloge repositoryübergreifend auffindbar, ohne sie zur neuen Wahrheit zu erklären.",
    problem:
      "Bei mehreren Repositories kostet schon das Finden der zuständigen Quelle Zeit. Freie Volltextsuche bevorzugt zudem häufig den zufällig passenden Text statt des kanonischen Vertrags.",
    mechanism:
      "Registrierte Quellen werden synchronisiert, in aktuelle Dokumente und Chunks zerlegt und über einen Worker indexiert. MCP bietet projektspezifische Suche sowie gezielte Werkzeuge für Dokumente, Tabellen und HTTP-Endpunkte.",
    workflow:
      "devMCP liefert den Einstiegspunkt. Bindende Aussagen werden anschließend im Original und bei Bedarf an einer konkreten Revision geprüft. Änderungen an indexierten Quellen benötigen einen bewussten Sync.",
    tradeoff:
      "Der Index kann hinter dem Repository zurückliegen oder einen plausiblen, aber falschen Treffer hoch ranken. Ein Golden Set hält bekannte Retrieval-Lücken sichtbar. In einem einzelnen kleinen Repo ist direkte Suche schneller und ehrlicher.",
    facts: ["registrierte Quellen", "Chunk-Index + Embeddings", "spezialisierte Suchtools"],
  },
];

const workflow = [
  ["01", "Kontext", "Akasha nach wiederverwendbarem Wissen durchsuchen."],
  ["02", "Quelle", "Mit devMCP navigieren, dann das kanonische Original lesen."],
  ["03", "Slice", "Ziel, Grenze und erforderliche Gates im Journal festlegen."],
  ["04", "Arbeit", "Implementieren, prüfen und Abweichungen sichtbar halten."],
  ["05", "Abschluss", "Ergebnis und Verifikation im Journal dokumentieren."],
  ["06", "Promotion", "Nur dauerhaftes Wissen bewusst nach Akasha übernehmen."],
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="macmade.dev Startseite">
          macmade<span>.dev</span>
        </a>
        <nav aria-label="Seitennavigation">
          <a href="#system">System</a>
          <a href="#werkzeuge">Werkzeuge</a>
          <a href="#praxis">Praxis</a>
          <a href="#quellen">Quellenlage</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Systemnotizen · Stand 11.08.2026</p>
          <h1>Werkzeuge für nachvollziehbare Entwicklungsarbeit.</h1>
          <p className="hero-intro">
            macmade.dev ist eine technische Bestandsaufnahme selbst gebauter
            Infrastruktur: nicht als Produktportfolio, sondern als Erklärung
            dafür, warum drei kleine Systeme entstanden sind – und welchen
            Preis ihre Trennung hat.
          </p>
        </div>
        <aside className="hero-note" aria-label="Einordnung">
          <span className="note-mark" aria-hidden="true">*</span>
          <p>
            Beschrieben wird nur, was sich im aktuellen Code, in kanonischer
            Dokumentation oder in der tatsächlichen Werkzeugoberfläche belegen
            lässt.
          </p>
          <p className="muted">Kein Live-Systemstatus. Keine Betriebsanleitung.</p>
        </aside>
      </section>

      <section className="system-section section-rule" id="system">
        <div className="section-heading">
          <p className="eyebrow">Das System</p>
          <h2>Drei Arten von Zustand, bewusst nicht vermischt.</h2>
        </div>

        <div className="system-map" aria-label="Zusammenspiel der drei Kernsysteme">
          <div className="map-node source-node">
            <span className="node-kicker">bindend</span>
            <strong>Repository &amp; Runtime</strong>
            <small>aktuelle technische Wahrheit</small>
          </div>
          <span className="map-arrow" aria-hidden="true">→</span>
          <div className="map-node">
            <span className="node-kicker">finden</span>
            <strong>devMCP</strong>
            <small>indexierte Navigation</small>
          </div>
          <span className="map-arrow" aria-hidden="true">→</span>
          <div className="map-node">
            <span className="node-kicker">arbeiten</span>
            <strong>CodexJournal</strong>
            <small>operativer Verlauf</small>
          </div>
          <span className="map-arrow dashed" aria-hidden="true">⇢</span>
          <div className="map-node memory-node">
            <span className="node-kicker">kuratiert</span>
            <strong>Akasha</strong>
            <small>wiederverwendbares Wissen</small>
          </div>
        </div>
        <p className="map-caption">
          Der letzte Übergang ist absichtlich manuell. Ein abgeschlossenes
          Journal-Ereignis wird nicht automatisch zu dauerhaftem Wissen.
        </p>

        <div className="principles-grid">
          <article>
            <span>01</span>
            <h3>Original vor Index</h3>
            <p>
              Suche beschleunigt das Finden. Sie autorisiert keine Aussage und
              ersetzt weder Code noch DDL oder Laufzeitbeleg.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Ereignis vor Erzählung</h3>
            <p>
              Das Journal speichert kleine, typisierte Nachweise statt eines
              vollständigen Transkripts der Arbeit.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Kuratiert vor vollständig</h3>
            <p>
              Ein leises Gedächtnis mit Lücken ist nützlicher als eine große
              Sammlung unbestätigter Zusammenfassungen.
            </p>
          </article>
        </div>
      </section>

      <section className="tools-section section-rule" id="werkzeuge">
        <div className="section-heading tools-heading">
          <p className="eyebrow">Kernwerkzeuge</p>
          <h2>Was sie lösen – und was sie kosten.</h2>
          <p>
            Alle drei Werkzeuge laufen im aktuellen Entwicklungsworkflow. Keines
            davon ist als allgemeine Plattform gedacht.
          </p>
        </div>

        <div className="tool-list">
          {coreSystems.map((tool) => (
            <article className="tool-card" key={tool.name}>
              <div className="tool-index">{tool.index}</div>
              <div className="tool-main">
                <div className="tool-title-row">
                  <div>
                    <p className="tool-purpose">{tool.purpose}</p>
                    <h3>{tool.name}</h3>
                  </div>
                  <span className="status">{tool.status}</span>
                </div>
                <p className="tool-lead">{tool.lead}</p>
                <div className="fact-row" aria-label={`${tool.name} technische Merkmale`}>
                  {tool.facts.map((fact) => <span key={fact}>{fact}</span>)}
                </div>
                <div className="tool-detail-grid">
                  <div>
                    <h4>Auslöser</h4>
                    <p>{tool.problem}</p>
                  </div>
                  <div>
                    <h4>Mechanik</h4>
                    <p>{tool.mechanism}</p>
                  </div>
                  <div>
                    <h4>Im Ablauf</h4>
                    <p>{tool.workflow}</p>
                  </div>
                  <div className="tradeoff">
                    <h4>Grenze / Trade-off</h4>
                    <p>{tool.tradeoff}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="workflow-section section-rule" id="praxis">
        <div className="section-heading">
          <p className="eyebrow">Tatsächlicher Ablauf</p>
          <h2>Ein kleiner Kontrollkreis, kein autonomes Wissenssystem.</h2>
        </div>
        <ol className="workflow-list">
          {workflow.map(([number, label, text]) => (
            <li key={number}>
              <span className="workflow-number">{number}</span>
              <strong>{label}</strong>
              <p>{text}</p>
            </li>
          ))}
        </ol>

        <div className="practice-grid">
          <article className="practice-card observability-card">
            <p className="eyebrow">Lokale Infrastruktur</p>
            <h3>Aspire + OpenTelemetry</h3>
            <p>
              Ein versioniertes, nur lokal gebundenes Aspire Dashboard sammelt
              Entwicklungslogs, Traces und Metriken mehrerer Anwendungen über
              OTLP/HTTP. Das hilft bei verteilten Fehlern, ohne daraus ein
              Produktions-Monitoring zu machen.
            </p>
            <div className="mini-diagram" aria-label="Lokaler Telemetriefluss">
              <span>Anwendungen</span><b>→</b><span>OTLP</span><b>→</b><span>Aspire</span>
            </div>
            <p className="card-limit">
              <strong>Grenze:</strong> Container, Exportkonfiguration und
              Datenvolumen sind zusätzlicher lokaler Betrieb. Für eine einzelne
              Anwendung ist strukturiertes Logging oft ausreichend.
            </p>
          </article>

          <article className="practice-card display-card">
            <p className="eyebrow">Weiterentwickeltes Experiment</p>
            <h3>SimpleDisplay</h3>
            <p>
              Eine kleine macOS-Menüleisten-App verwaltet Displays und erzeugt
              virtuelle Monitore für Remote-Arbeit und UI-Tests. Persistierte
              Seriennummern halten virtuelle Display-Identitäten über Neustarts
              stabiler als flüchtige Laufzeit-IDs.
            </p>
            <div className="display-shape" aria-hidden="true">
              <span></span><span></span><span></span>
            </div>
            <p className="card-limit">
              <strong>Grenze:</strong> Die Lösung verwendet private Apple-APIs,
              ist nicht App-Store-tauglich und kann durch ein macOS-Update
              brechen. Das ist eine bewusste Plattformwette, kein allgemeines
              Display-Framework.
            </p>
          </article>
        </div>
      </section>

      <section className="sources-section section-rule" id="quellen">
        <div className="section-heading">
          <p className="eyebrow">Quellenlage</p>
          <h2>Was dieser Stand behauptet – und was nicht.</h2>
        </div>
        <div className="sources-grid">
          <div>
            <h3>Belegt durch</h3>
            <ul>
              <li>aktuelle Repository-Dokumentation und Architekturentscheidungen</li>
              <li>Implementierung, Tests und veröffentlichte Werkzeugverträge</li>
              <li>Live-Navigation über die tatsächlich erreichbaren MCP-Werkzeuge</li>
              <li>Journal nur für Entstehung, Nutzung und Prozessgrenzen</li>
            </ul>
          </div>
          <div>
            <h3>Bewusst nicht behauptet</h3>
            <ul>
              <li>dass jeder dokumentierte Plan bereits implementiert ist</li>
              <li>dass ein Index synchron oder ein Suchtreffer kanonisch ist</li>
              <li>dass Journal und Akasha automatisch gekoppelt sind</li>
              <li>dass lokale Infrastruktur ein übertragbares Produkt darstellt</li>
            </ul>
          </div>
          <aside>
            <p className="eyebrow">Öffentliche Grenze</p>
            <p>
              Konkrete Hosts, Netzpfade, Credentials, interne Adressen,
              Inventare und operative Schutzmechanismen sind absichtlich nicht
              Teil dieser Seite. Sie erklären die Konzepte nicht besser, würden
              aber die Angriffsfläche beschreiben.
            </p>
          </aside>
        </div>
      </section>

      <footer>
        <p>macmade.dev</p>
        <p>Technische Notizen aus einem spezialisierten Entwicklungsworkflow.</p>
        <a href="#top">Nach oben ↑</a>
      </footer>
    </main>
  );
}
