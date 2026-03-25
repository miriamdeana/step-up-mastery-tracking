import { curriculumReference } from "@/lib/seed";
import type {
  DetailedMasteryReport,
  EvidenceBySubSkill,
  EvidenceQuote,
  LatestMasteryReport,
  SessionRecord,
  SubSkillSnapshot,
} from "@/lib/types";

function makeEvidence(id: string, selected_text: string, note: string): EvidenceQuote {
  return { id, selected_text, note };
}

function buildEvidenceBySubSkill(): EvidenceBySubSkill[] {
  return [
    {
      sub_skill_id: "2.NBT.ADD.3",
      sub_skill_name: "Add within 100 using place value strategies",
      status: "developing",
      evidence: [
        makeEvidence(
          "place-value-1",
          "713.",
          "Starter output notices a likely place value misconception."
        ),
        makeEvidence(
          "place-value-3",
          "50 and 9, so 59.",
          "Later work suggests the student can use a place value strategy."
        ),
      ],
    },
    {
      sub_skill_id: "2.NBT.ADD.7",
      sub_skill_name: "Explain strategies using place value language",
      status: "developing",
      evidence: [
        makeEvidence(
          "language-1",
          "Because each digit means tens or ones, not just the number by itself.",
          "The student articulates the strategy, but the tutor still asks for support."
        ),
      ],
    },
  ];
}

function buildSubSkillSnapshots(
  evidenceBySubSkill: EvidenceBySubSkill[]
): SubSkillSnapshot[] {
  return curriculumReference.sub_skills.map((subSkill) => {
    const match = evidenceBySubSkill.find(
      (entry) => entry.sub_skill_id === subSkill.id
    );

    return {
      id: subSkill.id,
      name: subSkill.name,
      status: match?.status ?? "not_assessed",
      evidence_count: match?.evidence.length ?? 0,
    };
  });
}

export function generateMasteryReport(session: SessionRecord): {
  summary: LatestMasteryReport;
  detailed: DetailedMasteryReport;
} {
  const createdAt = new Date().toISOString();
  const reportId = `report-${Date.now()}`;
  const evidenceBySubSkill = buildEvidenceBySubSkill();
  const subSkills = buildSubSkillSnapshots(evidenceBySubSkill);

  const summary: LatestMasteryReport = {
    report_id: reportId,
    tutor_id: session.tutor_id,
    student_id: session.student_id,
    session_count: 1,
    overall_summary:
      "Starter output is intentionally thin. It tags a couple of likely sub-skills and leaves most of the product and mastery decisions open.",
    created_at: createdAt,
    cluster: curriculumReference.cluster,
    sub_skills: subSkills,
  };

  const detailed: DetailedMasteryReport = {
    report_id: reportId,
    tutor_id: session.tutor_id,
    student_id: session.student_id,
    session_count: 1,
    overall_summary: summary.overall_summary,
    created_at: createdAt,
    cluster: curriculumReference.cluster,
    curriculum: curriculumReference,
    sessions: [
      {
        session_id: session.session_id,
        session_date: session.session_date,
        transcript: session.transcript,
        evidence_by_sub_skill: evidenceBySubSkill,
      },
    ],
  };

  return { summary, detailed };
}
