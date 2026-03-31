import type { EvidenceBySubSkill, SurfacedMisconception, SubSkillPresentation } from "@/lib/types";
import styles from "./EvidenceCard.module.css";

interface EvidenceCardProps {
  evidence: EvidenceBySubSkill;
  presentation: SubSkillPresentation | undefined;
  misconceptions: SurfacedMisconception[];
}

const STATUS_LABEL: Record<string, string> = {
  secure: "Secure",
  developing: "Developing",
  not_assessed: "Not assessed",
};

export default function EvidenceCard({
  evidence,
  presentation,
  misconceptions,
}: EvidenceCardProps) {
  const statusClass =
    evidence.status === "secure"
      ? styles.statusSecure
      : evidence.status === "developing"
        ? styles.statusDeveloping
        : styles.statusNotAssessed;

  const relatedMisconceptions = misconceptions.filter(
    (m) => m.sub_skill_id === evidence.sub_skill_id
  );

  return (
    <article className={`${styles.card} ${statusClass}`}>
      <div className={styles.cardHeader}>
        <div>
          <span className={styles.skillId}>{evidence.sub_skill_id}</span>
          <h3 className={styles.skillName}>{evidence.sub_skill_name}</h3>
        </div>
        <span className={`${styles.statusBadge} ${statusClass}`}>
          {STATUS_LABEL[evidence.status]}
        </span>
      </div>

      {relatedMisconceptions.length > 0 && (
        <div className={styles.misconceptionSection}>
          {relatedMisconceptions.map((m) => (
            <div key={m.id} className={styles.misconceptionRow}>
              <span className={styles.misconceptionTag}>misconception</span>
              <span className={styles.misconceptionText}>{m.description}</span>
            </div>
          ))}
        </div>
      )}

      <div className={styles.quoteList}>
        {evidence.evidence.map((quote) => {
          const isMisconception = relatedMisconceptions.some(
            (m) => m.evidence_id === quote.id
          );
          return (
            <div
              key={quote.id}
              className={`${styles.quote} ${isMisconception ? styles.quoteMisconception : ""}`}
            >
              <blockquote className={styles.quoteText}>
                &ldquo;{quote.selected_text}&rdquo;
              </blockquote>
              <p className={styles.quoteNote}>{quote.note}</p>
            </div>
          );
        })}
      </div>

      {presentation && (presentation.hints_needed != null || presentation.time_on_prompt_sec != null) && (
        <div className={styles.metaRow}>
          {presentation.hints_needed != null && (
            <span className={styles.metaChip}>
              {presentation.hints_needed} hint{presentation.hints_needed !== 1 ? "s" : ""} needed
            </span>
          )}
          {presentation.time_on_prompt_sec != null && (
            <span className={styles.metaChip}>
              {presentation.time_on_prompt_sec}s on prompt
            </span>
          )}
          <span className={styles.metaChip}>
            Confidence: {presentation.certainty === "high" ? "high" : presentation.certainty === "medium" ? "moderate" : "low"}
          </span>
        </div>
      )}
    </article>
  );
}
