import type { NextStep, NextStepKind } from "@/lib/types";
import styles from "./NextStepsPanel.module.css";

interface NextStepsPanelProps {
  steps: NextStep[];
}

const SECTION_ORDER: NextStepKind[] = [
  "student_practice",
  "tutor_research",
  "question",
  "intervention",
];

const SECTION_META: Record<NextStepKind, { label: string; icon: string }> = {
  student_practice: { label: "Student Homework / Reinforcement", icon: "pencil" },
  tutor_research: { label: "Tutor Homework / Research", icon: "book" },
  question: { label: "Questions for Next Session", icon: "chat" },
  intervention: { label: "Intervention Strategy", icon: "target" },
};

function StepIcon({ kind }: { kind: string }) {
  switch (kind) {
    case "pencil":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M11.5 1.5l3 3L5 14H2v-3L11.5 1.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "book":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 2.5h4.5a1.5 1.5 0 011.5 1.5v10a1 1 0 00-1-1H2V2.5zM14 2.5H9.5A1.5 1.5 0 008 4v10a1 1 0 011-1h5V2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "chat":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M14 10a1.33 1.33 0 01-1.33 1.33H4.67L2 14V3.33A1.33 1.33 0 013.33 2h9.34A1.33 1.33 0 0114 3.33V10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "target":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="8" cy="8" r="0.5" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}

function StepRow({ step }: { step: NextStep }) {
  return (
    <div className={styles.stepRow}>
      <p className={styles.stepContent}>{step.content}</p>
      <p className={styles.stepRationale}>{step.rationale}</p>
      <div className={styles.stepMeta}>
        {step.source && (
          <span className={styles.sourceChip}>{step.source}</span>
        )}
        {step.sub_skill_id && (
          <span className={styles.skillChip}>{step.sub_skill_id}</span>
        )}
      </div>
    </div>
  );
}

export default function NextStepsPanel({ steps }: NextStepsPanelProps) {
  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>Plan for Next Session</h2>

      {SECTION_ORDER.map((kind) => {
        const sectionSteps = steps.filter((s) => s.kind === kind);
        if (sectionSteps.length === 0) return null;
        const meta = SECTION_META[kind];

        return (
          <div key={kind} className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIcon}>
                <StepIcon kind={meta.icon} />
              </span>
              <h3 className={styles.sectionTitle}>{meta.label}</h3>
              <span className={styles.stepCount}>{sectionSteps.length}</span>
            </div>
            <div className={styles.stepList}>
              {sectionSteps.map((step, i) => (
                <StepRow key={`${kind}-${i}`} step={step} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
