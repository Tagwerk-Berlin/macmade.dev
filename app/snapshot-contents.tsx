import Link from "next/link";
import { chronicleEntries, type SnapshotDate } from "./chronicle-entries";

type SnapshotContentsProps = {
  snapshotDate?: SnapshotDate;
};

/** Öffnet eine Inhaltsangabe aller veröffentlichten Momentaufnahmen. */
export default function SnapshotContents({ snapshotDate }: SnapshotContentsProps) {
  const selected = chronicleEntries.find((entry) => entry.date === snapshotDate);

  return (
    <nav className="snapshot-contents" aria-label="Inhaltsangabe aller Chronikläufe">
      <details>
        <summary>
          <span className="contents-heading">
            <span>Chronik des Experiments</span>
            <strong>Alle {chronicleEntries.length} Läufe</strong>
          </span>
          <span className="contents-selection">
            {selected ? `Stand ${selected.label}` : "Neueste zuerst"}
          </span>
          <span className="contents-toggle" aria-hidden="true">+</span>
        </summary>
        <ol>
          {chronicleEntries.map((entry) => (
            <li key={entry.date}>
              <Link
                href={`/chronik/${entry.date}`}
                aria-current={entry.date === snapshotDate ? "page" : undefined}
              >
                <span className="contents-entry-meta">
                  <time dateTime={entry.date}>{entry.label}</time>
                  <span>
                    {entry.date === snapshotDate
                      ? "Dieser Stand"
                      : entry.current ? "Neuester Stand" : "→"}
                  </span>
                </span>
                <strong>{entry.title}</strong>
                <span className="contents-description">{entry.summary}</span>
              </Link>
            </li>
          ))}
        </ol>
      </details>
    </nav>
  );
}
