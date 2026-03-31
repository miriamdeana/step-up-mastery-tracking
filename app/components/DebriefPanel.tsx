import type { DebriefItem } from "@/lib/types";
import styles from "./DebriefPanel.module.css";

interface DebriefPanelProps {
  items: DebriefItem[];
}

export default function DebriefPanel({ items }: DebriefPanelProps) {
  const completed = items.filter((i) => i.done).length;

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>Session Debrief</h2>
        <span className={styles.progress}>
          {completed} / {items.length} covered
        </span>
      </div>

      <ul className={styles.list}>
        {items.map((item) => (
          <li
            key={item.label}
            className={`${styles.item} ${item.done ? styles.itemDone : styles.itemPending}`}
          >
            <span className={styles.checkbox}>
              {item.done ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M3.5 7l2.5 2.5L10.5 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              )}
            </span>
            <div className={styles.itemContent}>
              <span className={styles.itemLabel}>{item.label}</span>
              {item.detail && (
                <span className={styles.itemDetail}>{item.detail}</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
