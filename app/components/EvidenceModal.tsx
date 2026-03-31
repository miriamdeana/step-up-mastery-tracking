"use client";

import { useEffect, useCallback } from "react";
import type { EvidenceBySubSkill, SurfacedMisconception, SubSkillPresentation } from "@/lib/types";
import EvidenceCard from "./EvidenceCard";
import styles from "./EvidenceModal.module.css";

interface EvidenceModalProps {
  evidence: EvidenceBySubSkill;
  presentation: SubSkillPresentation | undefined;
  misconceptions: SurfacedMisconception[];
  onClose: () => void;
}

export default function EvidenceModal({
  evidence,
  presentation,
  misconceptions,
  onClose,
}: EvidenceModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Evidence for ${evidence.sub_skill_name}`}
      >
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M4.5 4.5l9 9M13.5 4.5l-9 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <EvidenceCard
          evidence={evidence}
          presentation={presentation}
          misconceptions={misconceptions}
        />
      </div>
    </div>
  );
}
