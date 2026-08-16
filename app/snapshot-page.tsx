import Link from "next/link";

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
    status: "im Einsatz · kanonische Auflösung aktiv",
    purpose: "Kuratiertes Arbeitsgedächtnis",
    lead: "Bewahrt Entscheidungen, Fehlermuster und echten Wiederaufnahmekontext über einzelne Aufgaben hinweg auf.",
    problem:
      "Wiederverwendbare Erkenntnisse verschwinden in Chats und Notizen. Das Gegenextrem – jede Sitzung vollständig zu speichern – erzeugt jedoch ein lautes, widersprüchliches Gedächtnis.",
    mechanism:
      "Ein .NET-MCP-Server speichert kompakte Einträge in PostgreSQL mit pgvector. Semantische Suche wird mit Metadaten wie Projekt, Typ und Scope kombiniert. Temporärer Session-Kontext erhält standardmäßig eine TTL; explizite Supersession-Beziehungen lösen Treffer zu kanonischen Einträgen auf.",
    workflow:
      "Zu Beginn wird nach passendem Wissen gesucht. Gespeichert wird nur bestätigtes, außerhalb des aktuellen Slices nützliches Wissen – oder ein wirklich benötigter Übergabestand. Repository und aktuelle Dokumentation bleiben maßgeblich.",
    tradeoff:
      "Suche und Query bleiben strikt lesend; abgelaufene Einträge werden nur durch eine explizite Bereinigung gelöscht. Supersession löst Widersprüche dennoch nicht allgemein: Ersetzungen müssen ausdrücklich referenziert werden. Zyklen, ungültige Beziehungen und konkurrierende terminale Nachfolger werden fail-closed als Konflikt behandelt; fehlende Ziele bleiben dagegen diagnostisch sichtbar und erzeugen keinen Platzhalter. Retrieval bleibt probabilistisch und Metadaten brauchen Pflege. Für wenige stabile Notizen ist eine versionierte Markdown-Datei einfacher.",
    facts: ["PostgreSQL + pgvector", "Typen + TTL + Supersession", "semantische Suche"],
  },
  {
    index: "03",
    name: "devMCP",
    status: "im Einsatz · atomarer Lifecycle aktiv",
    purpose: "Quellennavigation",
    lead: "Macht Dokumentation, DDL, Code und Endpoint-Kataloge repositoryübergreifend auffindbar, ohne sie zur neuen Wahrheit zu erklären.",
    problem:
      "Bei mehreren Repositories kostet schon das Finden der zuständigen Quelle Zeit. Freie Volltextsuche bevorzugt zudem häufig den zufällig passenden Text statt des kanonischen Vertrags.",
    mechanism:
      "Registrierte Quellen werden synchronisiert, in Dokumente und Chunks zerlegt und über einen Worker indexiert. Ein neuer Source-Stand hält geänderte Dokumente als unveröffentlichte Scan-Kandidaten zurück. Persistente Läufe und ein digestgebundenes Manifest erlauben den atomaren Wechsel erst, wenn die Pflichtjobs und erforderlichen Embeddings dieser Kandidaten vollständig sind.",
    workflow:
      "devMCP liefert den Einstiegspunkt. Bindende Aussagen werden anschließend im Original und bei Bedarf an einer konkreten Revision geprüft. Im aktiven Lifecycle gelten Full- und Delta-Scans getrennt; ein Scan ist erst mit ready veröffentlicht. Ältere Embedding-Lücken können die Source trotzdem degraded lassen. Eine read-only Readiness-Sicht trennt diesen Zustand vom servierten Stand sowie von legacy_unverified und unavailable.",
    tradeoff:
      "Atomare Publikation verhindert unvollständige neue Source-Stände, aber weder veraltete Eingaben noch semantisch falsche Treffer. Dafür entstehen mehr persistenter Zustand, Schema-Rollforward, Polling und explizite Repair- sowie Maintenance-Pfade. Fehlgeschlagene Scans lassen den alten Stand unangetastet, müssen aber als eigene Readiness-Dimension beobachtet werden. Historische Generationen verschwinden nicht automatisch; ihre Bereinigung bleibt ein separater, geschützter Betriebsakt. In einem einzelnen kleinen Repo ist direkte Suche einfacher.",
    facts: ["Scan-Kandidaten + Manifest", "atomare Publikation", "Readiness + Repair"],
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

type SnapshotDate = "2026-08-12" | "2026-08-13" | "2026-08-16";

type SnapshotPageProps = {
  snapshotDate: SnapshotDate;
};

const snapshotLabels: Record<SnapshotDate, string> = {
  "2026-08-12": "12.08.2026",
  "2026-08-13": "13.08.2026",
  "2026-08-16": "16.08.2026",
};

/** Rendert einen aktuellen oder archivierten Stand aus derselben Darstellung. */
export default function SnapshotPage({ snapshotDate }: SnapshotPageProps) {
  const isFirstLabSnapshot = snapshotDate === "2026-08-13";
  const isCurrentSnapshot = snapshotDate === "2026-08-16";

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Zum Seitenanfang">
          macmade<span>.dev</span>
        </a>
        <nav aria-label="Seitennavigation">
          {(isFirstLabSnapshot || isCurrentSnapshot) && (
            <a href="#aenderungen">Änderungen</a>
          )}
          <a href="#system">System</a>
          <a href="#werkzeuge">Werkzeuge</a>
          <a href="#praxis">Praxis</a>
          <a href="#museum">Museum</a>
          <Link href="/chronik">Chronik</Link>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Systemnotizen · Stand {snapshotLabels[snapshotDate]}</p>
          <h1>Werkzeuge für nachvollziehbare Entwicklungsarbeit.</h1>
          {isCurrentSnapshot ? (
            <p className="hero-intro">
              Die drei Kernwerkzeuge bleiben unverändert. Hinzu kommt eine
              zweite Laborform, die absichtlich weniger Deploymentapparat
              trägt: erwartbar offline, manuell neu aufbaubar und näher an
              einer kleinen eigenständigen Kundenumgebung als an einem
              Produktionsklon.
            </p>
          ) : isFirstLabSnapshot ? (
            <p className="hero-intro">
              Die drei kleinen Werkzeuge bleiben im Kern unverändert. Neu ist
              eine eng begrenzte, nichtproduktive Labumgebung: Sie macht reale
              Browser-, Vertrauens- und Rollbackgrenzen prüfbar, erhöht aber
              zugleich den Betriebsaufwand, den dieser Workflow rechtfertigen
              muss.
            </p>
          ) : (
            <p className="hero-intro">
              macmade.dev ist eine technische Bestandsaufnahme selbst gebauter
              Infrastruktur: nicht als Produktportfolio, sondern als Erklärung
              dafür, warum drei kleine Systeme entstanden sind – und welchen
              Preis ihre Trennung hat. Jeder Stand ist eine versionierte
              Momentaufnahme; spätere Änderungen sollen auch zeigen, welche
              Trade-offs kleiner wurden, neu entstanden oder ganz verschwanden.
            </p>
          )}
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

      {isFirstLabSnapshot && (
        <section className="change-section section-rule" id="aenderungen">
          <div className="section-heading">
            <p className="eyebrow">Seit 12.08.2026</p>
            <h2>Ein echtes Lab ersetzt den kurzlebigen Versuchsaufbau.</h2>
          </div>

          <div className="change-grid">
            <article>
              <span>Technischer Stand</span>
              <h3>Nichtproduktiv, aber dauerhaft nutzbar.</h3>
              <p>
                Eine revisionsgebundene Parat-Labumgebung verbindet Frontend,
                Backend und eine persistente, bereinigte Datenbank mit
                realistisch großen Fachdaten hinter einem schmalen öffentlichen
                Webzugang. Anwendungen und Datenbank bleiben intern; rohe
                Identitäten, Produktionszugänge und Produktionsverantwortung
                gehören ausdrücklich nicht dazu.
              </p>
            </article>
            <article>
              <span>Tatsächliche Nutzung</span>
              <h3>Der Browser ist jetzt ein Release-Gate.</h3>
              <p>
                Anmeldung, Kennwortwechsel, Frontend-zu-Backend-zu-Datenbank,
                WebSocket und negative Zugriffsgrenzen wurden am realen
                Zielsystem geprüft. Hinzu kommen ein restore-geprüftes Backup,
                vollständiger Rollback, zustandserhaltender Wiederanlauf und
                ein Reboot-Nachweis. Noch laufende Erweiterungen sind nicht Teil
                dieses Stands.
              </p>
            </article>
            <article className="assessment-card">
              <span>Bewertung durch Codex</span>
              <h3>Mehr Apparatur – diesmal mit enger Begründung.</h3>
              <p>
                Für reine Anwendungslogik bleibt ein lokaler Test einfacher.
                Realistisch große Fachdaten erhöhen den diagnostischen Wert,
                aber auch Datenschutzrisiko, Wiederherstellungsaufwand und die
                Zahl harter Annahmen. Vertretbar ist das nur, weil Bereinigung,
                isolierter Restore, Browserprüfung und Rollback als gemeinsame
                Kette belegt sind. Jeder zusätzliche Dienst bleibt eine eigene
                Vertrauensentscheidung.
              </p>
            </article>
          </div>

          <div className="unchanged-note">
            <strong>Unverändert:</strong> Repository und Runtime bleiben
            bindend; devMCP navigiert, CodexJournal dokumentiert den operativen
            Verlauf, Akasha bewahrt kuratiertes Wissen. CodexSlicer bleibt für
            diesen Workflow ersetzt, SimpleDisplay bleibt ein enges
            macOS-Experiment.
          </div>
        </section>
      )}

      {isCurrentSnapshot && (
        <section className="change-section section-rule" id="aenderungen">
          <div className="section-heading">
            <p className="eyebrow">Seit 13.08.2026</p>
            <h2>Nicht jedes Lab braucht einen Release-Apparat.</h2>
          </div>

          <div className="change-grid">
            <article>
              <span>Technischer Stand</span>
              <h3>Eine zweite, erwartbar offline betriebene Umgebung.</h3>
              <p>
                Eine kleine Parat-Runtime verbindet die benötigten
                Anwendungs- und Datenbankprozesse hinter einem engen
                HTTPS-Zugang. Direkte App- und Datenbankports bleiben außen
                geschlossen. Der Aufbau ist bewusst kein Produktionsklon und
                besitzt weder Releasebäume noch Manifeste oder eine eigene
                automatische Rollbackstrecke.
              </p>
            </article>
            <article>
              <span>Tatsächliche Nutzung</span>
              <h3>Mehr als ein Healthcheck, weniger als ein voller E2E-Beweis.</h3>
              <p>
                Für die öffentliche API sind Anmeldung, Mailcode, Auftragslese,
                Logout, negative Identität und Session-Fortbestand nach einem
                Containerersatz belegt. Für das Frontend sind Loginseite,
                Assets, API-Ping und ein fehlerfreier warmer Browser belegt;
                echter Login, Fachnavigation und Accessibility bleiben offen.
              </p>
            </article>
            <article className="assessment-card">
              <span>Bewertung durch Codex</span>
              <h3>Weniger Nachweisapparat kann die ehrlichere Grenze sein.</h3>
              <p>
                Die revisionsgebundene Umgebung vom 13. August bleibt für
                kontrollierte Releases sinnvoll. Für einen erwartbar
                ausgeschalteten, physisch kontrollierten Simulationshost ist
                manueller Neuaufbau jedoch plausibler als eine zweite
                Releaseplattform. Der Preis sind schwächere
                Artefakt-Reproduzierbarkeit und sichtbare manuelle Wartung.
              </p>
            </article>
          </div>

          <div className="unchanged-note">
            <strong>Unverändert:</strong> Repository und Runtime bleiben
            bindend; devMCP navigiert, CodexJournal dokumentiert den operativen
            Verlauf und Akasha bewahrt kuratiertes Wissen. Laufende Geo- und
            Datenbankerweiterungen sind nicht Teil dieses Stands.
          </div>
        </section>
      )}

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

                {tool.name === "CodexJournal" && (
                  <figure className="journal-snapshot">
                    <div className="snapshot-copy">
                      <p className="tool-purpose">
                        Oberfläche · <time dateTime="2026-08-12">12.08.2026</time>
                      </p>
                      <h4>Change Control im Ausschnitt.</h4>
                      <p>
                        Zwei reale Slices derselben devMCP-Änderung zeigen den
                        entscheidenden Übergang: Das erste revisionsgebundene
                        Review endet mit drei konkreten Befunden. Der spätere
                        Implementierungsslice weist die korrigierte Revision,
                        das bestandene Re-Review und die erfüllten Gates aus.
                        Integration und Deployment bleiben dort noch bewusst
                        ein eigener Schritt.
                      </p>
                      <p className="snapshot-caveat">
                        Kontrollierte, datierte Ausschnitte: Session- und
                        Slice-IDs, Links, Live-Telemetrie sowie konkrete
                        sicherheitsrelevante Betriebsdetails wurden durch die
                        Auswahl weggelassen. Die Bilder belegen eine Projektion,
                        nicht den heutigen Runtime-Zustand oder ein festes
                        UI-Versprechen.
                      </p>
                    </div>
                    <div className="snapshot-sequence" aria-label="Review und Re-Review im CodexJournal">
                      <div className="snapshot-frame">
                        <span className="snapshot-label">01 · Review · Vollbild ↗</span>
                        <a
                          href="/journal-review-2026-08-12.jpg"
                          aria-label="Review-Ausschnitt in voller Größe öffnen"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element -- statisches öffentliches Belegbild ohne Bildoptimierungs-Route im Export */}
                          <img
                            src="/journal-review-2026-08-12.jpg"
                            width="620"
                            height="357"
                            loading="lazy"
                            decoding="async"
                            alt="CodexJournal-Ausschnitt eines nicht bestandenen revisionsgebundenen Reviews mit drei endlichen Befunden"
                          />
                        </a>
                      </div>
                      <div className="snapshot-frame">
                        <span className="snapshot-label">02 · Re-Review · Vollbild ↗</span>
                        <a
                          href="/journal-rereview-result-2026-08-12.jpg"
                          aria-label="Re-Review-Ausschnitt in voller Größe öffnen"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element -- statisches öffentliches Belegbild ohne Bildoptimierungs-Route im Export */}
                          <img
                            src="/journal-rereview-result-2026-08-12.jpg"
                            width="620"
                            height="922"
                            loading="lazy"
                            decoding="async"
                            alt="CodexJournal-Ausschnitt der korrigierten Revision mit bestandenem Re-Review, erfüllten Gates und letztem Stand"
                          />
                        </a>
                      </div>
                    </div>
                    <figcaption>
                      CodexDashboard · zwei kontrollierte Ausschnitte vom 12.08.2026
                    </figcaption>
                  </figure>
                )}
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

          {(isFirstLabSnapshot || isCurrentSnapshot) && (
            <article className="practice-card lab-card">
              <p className="eyebrow">Nichtproduktive Infrastruktur</p>
              <h3>Parat-Lab</h3>
              <p>
                Ein kleiner, revisionsgebundener Zielaufbau prüft die
                Anwendung als zusammenhängendes System: statische
                Release-Artefakte, bereinigte realistische Persistenz, echter
                Browser, Restore und ein endlicher Aktivierungs- und
                Rollbackpfad.
              </p>
              <div className="lab-flow" aria-label="Prüffluss der Labumgebung">
                <span>Browser</span><b>→</b><span>Frontend</span><b>→</b><span>Backend</span><b>→</b><span>Testdaten</span>
              </div>
              <p className="card-limit">
                <strong>Grenze:</strong> Die Umgebung ist kein
                Produktionsklon. Datenrealismus ist nur mit reproduzierbarer
                Bereinigung, Negativprüfungen und belegtem Wiederanlauf
                vertretbar; weitere Erweiterungen benötigen eigene Gates.
              </p>
            </article>
          )}

          {isCurrentSnapshot && (
            <article className="practice-card lab-card">
              <p className="eyebrow">Erwartbar offline</p>
              <h3>Kleine Systemsimulation</h3>
              <p>
                Eine zweite Umgebung prüft reale Fachgrenzen mit einer
                begrenzten App-Topologie, intern gehaltenen Datenbanken und
                einem schmalen Webzugang. Images werden bewusst direkt
                übertragen; ein Quellcheckout oder Releasearchiv entsteht auf
                dem Ziel nicht.
              </p>
              <div className="lab-flow" aria-label="Prüffluss der kleinen Systemsimulation">
                <span>Browser</span><b>→</b><span>Webkante</span><b>→</b><span>Apps</span><b>→</b><span>Persistenz</span>
              </div>
              <p className="card-limit">
                <strong>Grenze:</strong> Erwartbar offline ist ein gültiger
                Zustand. Manueller Neuaufbau spart dauerhafte Apparatur, macht
                Updates und Wiederherstellung aber stärker vom Runbook und von
                erneut ausgeführten Smokes abhängig.
              </p>
            </article>
          )}
        </div>
      </section>

      <section className="museum-section section-rule" id="museum">
        <div className="section-heading museum-heading">
          <p className="eyebrow">Werkzeugmuseum</p>
          <h2>Nicht jede hilfreiche Schicht muss bleiben.</h2>
          <p>
            Hier landen Werkzeuge, die real gebaut und verwendet wurden, deren
            Aufgabe im aktuellen Workflow aber entfallen ist.
          </p>
        </div>

        <article className="museum-card">
          <div className="museum-meta">
            <span className="retired-status">retired</span>
            <span>12.08.2026</span>
            <span>erstes Exponat</span>
          </div>

          <div className="museum-title">
            <p className="tool-purpose">Externe Slice-Orchestrierung</p>
            <h3>CodexSlicer</h3>
            <p>
              Zerlegte größere Arbeiten in kontrollierbare Codex-Runs, als der
              Agent diese Struktur, ihre Gates und ihre Übergaben noch nicht
              zuverlässig selbst halten konnte.
            </p>
          </div>

          <div className="museum-transition" aria-label="Ablösung von CodexSlicer">
            <div>
              <span>damals</span>
              <strong>CLI als Zustandsmaschine</strong>
              <small>Plan · Preflight · Attempts · Checks · Scope-Gates</small>
            </div>
            <b aria-hidden="true">→</b>
            <div>
              <span>heute</span>
              <strong>Orchestrierung im Agenten</strong>
              <small>Slice · Quellen · Revision · Review · Ergebnis</small>
            </div>
          </div>

          <div className="museum-details">
            <div>
              <h4>Was tatsächlich gebaut war</h4>
              <p>
                Eine .NET-10-CLI plante Modellversuche, prüfte benötigte
                MCP-Server, startete <code>codex exec</code>, schrieb
                Laufartefakte und bewertete Checks sowie neue Git-Änderungen
                gegen explizite Scope-Grenzen.
              </p>
            </div>
            <div>
              <h4>Warum sie gehen konnte</h4>
              <p>
                Im heutigen interaktiven Workflow führt Codex diese
                Orchestrierung, Revisionsbindung und Verifikation selbst. Die
                zusätzliche CLI verdoppelte Planung, Zustand und mögliche
                Fehlerpfade, ohne hier noch denselben Sicherheitsgewinn zu
                liefern.
              </p>
            </div>
            <div>
              <h4>Was geblieben ist</h4>
              <p>
                Begrenzte Slices, explizite Voraussetzungen, harte
                Scope-Grenzen und reproduzierbare Checks. Verschwunden ist die
                zusätzliche Laufzeit, nicht die dahinterliegende Disziplin.
              </p>
            </div>
            <div className="museum-caveat">
              <h4>Kein allgemeines Todesurteil</h4>
              <p>
                Für unbeaufsichtigte oder streng deterministische
                Batch-Pipelines kann ein externer Runner weiterhin sinnvoll
                sein. Retired bedeutet hier: für diesen Workflow ersetzt.
              </p>
            </div>
          </div>
        </article>
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
              <li>
                dass ein von Akasha als aktuell aufgelöster Treffer die
                kanonische Repository-Quelle ersetzt
              </li>
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
            <p>
              Die gezeigten Journal-Bilder sind kontrollierte, datierte
              Ausschnitte realer Slices. Interne Kennungen und Live-Daten sind
              nicht enthalten; die Bilder belegen eine Oberfläche, nicht den
              aktuellen Zustand eines privaten Systems.
            </p>
          </aside>
        </div>
        <div className="snapshot-provenance" aria-label="Revisionsstand der Momentaufnahme">
          <span>Chronik-Vertrag v1</span>
          {isCurrentSnapshot ? (
            <>
              <span>MiniUbuntu-Vertrag fad0dce</span>
              <span>CodexJournal fd084b7</span>
              <span>Akasha 5d219db</span>
              <span>devMCP a4fe8e1</span>
              <span>SimpleDisplay c576ccb</span>
              <span>CodexSlicer fc68381</span>
            </>
          ) : isFirstLabSnapshot ? (
            <>
              <span>dev-infra 0989c78</span>
              <span>Lab-Runtime 9b73321</span>
              <span>CodexJournal fd084b7</span>
              <span>Akasha 5d219db</span>
              <span>devMCP a4fe8e1</span>
              <span>SimpleDisplay c576ccb</span>
              <span>CodexSlicer fc68381</span>
            </>
          ) : (
            <span>veröffentlichter Originalstand d792569</span>
          )}
        </div>
      </section>

      <nav className="snapshot-navigation" aria-label="Navigation zwischen Momentaufnahmen">
        {isCurrentSnapshot ? (
          <Link href="/chronik/2026-08-13">← Älterer Stand · 13.08.2026</Link>
        ) : isFirstLabSnapshot ? (
          <Link href="/chronik/2026-08-12">← Älterer Stand · 12.08.2026</Link>
        ) : (
          <span>Erster veröffentlichter Stand · 12.08.2026</span>
        )}
        <Link href="/chronik">Chronik</Link>
        <Link href="/" aria-current={isCurrentSnapshot ? "page" : undefined}>Aktueller Stand · 16.08.2026</Link>
        {snapshotDate === "2026-08-12" && (
          <Link href="/chronik/2026-08-13">Nächster Stand · 13.08.2026 →</Link>
        )}
        {isFirstLabSnapshot && (
          <Link href="/chronik/2026-08-16">Nächster Stand · 16.08.2026 →</Link>
        )}
      </nav>

      <footer>
        <p>macmade.dev</p>
        <p>Technische Notizen aus einem spezialisierten Entwicklungsworkflow.</p>
        <a href="#top">Nach oben ↑</a>
      </footer>
    </main>
  );
}
