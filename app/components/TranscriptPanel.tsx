import type { TranscriptLine } from "@/lib/types";
import styles from "./TranscriptPanel.module.css";

interface TranscriptPanelProps {
  title: string;
  sessionDate: string;
  lines: TranscriptLine[];
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function LineRow({ line }: { line: TranscriptLine }) {
  const highlightClass = line.highlight
    ? line.highlight.type === "misconception"
      ? styles.highlightMisconception
      : styles.highlightPositive
    : "";

  if (line.line_type === "problem_change") {
    const label = line.text.replace(/^\[PROBLEM CHANGE:\s*/, "").replace(/\]$/, "");
    return (
      <div className={styles.problemChange}>
        <span className={styles.problemLabel}>{label}</span>
      </div>
    );
  }

  if (line.line_type === "annotation") {
    return (
      <div className={`${styles.annotation} ${highlightClass}`}>
        {line.text}
      </div>
    );
  }

  return (
    <div className={`${styles.dialogueLine} ${highlightClass}`}>
      {line.highlight?.type === "misconception" && (
        <span className={styles.misconceptionTag}>misconception</span>
      )}
      <span className={styles.timestamp}>{line.timestamp}</span>
      <span
        className={
          line.speaker === "TUTOR" ? styles.speakerTutor : styles.speakerStudent
        }
      >
        {line.speaker}
      </span>
      <span className={styles.dialogueText}>{line.text}</span>
    </div>
  );
}

export default function TranscriptPanel({
  title,
  sessionDate,
  lines,
}: TranscriptPanelProps) {
  return (
    <aside className={styles.panel}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <time className={styles.date}>{formatDate(sessionDate)}</time>
      </header>
      <div className={styles.scrollArea}>
        {lines.map((line) => (
          <LineRow key={line.index} line={line} />
        ))}
      </div>
    </aside>
  );
}
