"use client";

import { useState } from "react";
import type {
  EvidenceBySubSkill,
  PriorityCluster,
  StudentProfile,
  SubSkillPresentation,
  SurfacedMisconception,
} from "@/lib/types";
import EvidenceModal from "./EvidenceModal";
import styles from "./MasteryOverview.module.css";

interface MasteryOverviewProps {
  student: StudentProfile;
  cluster: PriorityCluster;
  subSkills: SubSkillPresentation[];
  overallSummary: string;
  evidenceBySubSkill: EvidenceBySubSkill[];
  misconceptions: SurfacedMisconception[];
}

const STATUS_LABEL: Record<string, string> = {
  secure: "Secure",
  developing: "Developing",
  not_assessed: "Not assessed",
};

function SubSkillPill({
  skill,
  hasEvidence,
  onClick,
}: {
  skill: SubSkillPresentation;
  hasEvidence: boolean;
  onClick: () => void;
}) {
  const statusClass =
    skill.status === "secure"
      ? styles.statusSecure
      : skill.status === "developing"
        ? styles.statusDeveloping
        : styles.statusNotAssessed;

  const certaintyClass =
    skill.certainty === "high"
      ? styles.certaintyHigh
      : skill.certainty === "medium"
        ? styles.certaintyMedium
        : "";

  const interactive = hasEvidence;

  return (
    <div
      className={`${styles.pill} ${statusClass} ${interactive ? styles.pillClickable : ""}`}
      onClick={interactive ? onClick : undefined}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={interactive ? (e) => { if (e.key === "Enter" || e.key === " ") onClick(); } : undefined}
    >
      <div className={styles.pillHeader}>
        <span className={styles.pillId}>{skill.id}</span>
        {skill.certainty !== "low" && (
          <span
            className={`${styles.certaintyBadge} ${certaintyClass}`}
            title={`Confidence: ${skill.certainty === "high" ? "low" : "moderate"} — limited evidence`}
          >
            {skill.certainty === "high" ? "?" : "~"}
          </span>
        )}
      </div>
      <p className={styles.pillName}>{skill.name}</p>
      <div className={styles.pillFooter}>
        <span className={`${styles.statusDot} ${statusClass}`} />
        <span className={styles.statusLabel}>{STATUS_LABEL[skill.status]}</span>
        {skill.evidence_count > 0 && (
          <span className={styles.evidenceCount}>
            {skill.evidence_count} quote{skill.evidence_count !== 1 ? "s" : ""}
          </span>
        )}
      </div>
      {(skill.hints_needed != null || skill.time_on_prompt_sec != null) && (
        <div className={styles.pillMeta}>
          {skill.hints_needed != null && (
            <span className={styles.metaItem}>
              {skill.hints_needed} hint{skill.hints_needed !== 1 ? "s" : ""}
            </span>
          )}
          {skill.time_on_prompt_sec != null && (
            <span className={styles.metaItem}>
              {skill.time_on_prompt_sec}s on prompt
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default function MasteryOverview({
  student,
  cluster,
  subSkills,
  overallSummary,
  evidenceBySubSkill,
  misconceptions,
}: MasteryOverviewProps) {
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);

  const assessed = subSkills.filter((s) => s.status !== "not_assessed").length;

  const selectedEvidence = selectedSkillId
    ? evidenceBySubSkill.find((e) => e.sub_skill_id === selectedSkillId)
    : null;

  return (
    <>
      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h1 className={styles.studentName}>{student.student_name}</h1>
            <p className={styles.clusterLabel}>
              {student.grade_level} &middot; {cluster.cluster}
            </p>
          </div>
          <div className={styles.assessedBadge}>
            <span className={styles.assessedCount}>{assessed}</span>
            <span className={styles.assessedTotal}>/ {subSkills.length} assessed</span>
          </div>
        </div>

        <div className={styles.sampleNote}>
          Hints, timing, and confidence data shown below are illustrative placeholders.
        </div>

        <div className={styles.pillGrid}>
          {subSkills.map((skill) => (
            <SubSkillPill
              key={skill.id}
              skill={skill}
              hasEvidence={evidenceBySubSkill.some(
                (e) => e.sub_skill_id === skill.id && e.evidence.length > 0
              )}
              onClick={() => setSelectedSkillId(skill.id)}
            />
          ))}
        </div>

        <div className={styles.legend}>
          <span className={styles.legendItem}>
            <span className={`${styles.statusDot} ${styles.statusSecure}`} /> Secure
          </span>
          <span className={styles.legendItem}>
            <span className={`${styles.statusDot} ${styles.statusDeveloping}`} /> Developing
          </span>
          <span className={styles.legendItem}>
            <span className={`${styles.statusDot} ${styles.statusNotAssessed}`} /> Not assessed
          </span>
          <span className={styles.legendItem}>
            <span className={styles.certaintyBadge} style={{ position: "static", fontSize: "0.7rem" }}>?</span> Low confidence
          </span>
        </div>
      </section>

      {selectedEvidence && (
        <EvidenceModal
          evidence={selectedEvidence}
          presentation={subSkills.find((s) => s.id === selectedSkillId)}
          misconceptions={misconceptions}
          onClose={() => setSelectedSkillId(null)}
        />
      )}
    </>
  );
}
