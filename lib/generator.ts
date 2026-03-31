import { CERTAINTY_BY_SKILL, HINTS_NEEDED, TIME_ON_PROMPT } from "@/lib/mastery-placeholders";
import { curriculumReference, seededStudent, seededTutor } from "@/lib/seed";
import { parseTranscript } from "@/lib/transcript-parser";
import type {
  CertaintyLevel,
  DashboardData,
  DebriefItem,
  EvidenceBySubSkill,
  EvidenceQuote,
  NextStep,
  SessionRecord,
  SubSkillPresentation,
  SurfacedMisconception,
  TranscriptLine,
} from "@/lib/types";

// ---------------------------------------------------------------------------
// Evidence (hand-crafted from transcript analysis)
// ---------------------------------------------------------------------------

function makeEvidence(id: string, selected_text: string, note: string): EvidenceQuote {
  return { id, selected_text, note };
}

function buildEvidenceBySubSkill(): EvidenceBySubSkill[] {
  return [
    {
      sub_skill_id: "2.NBT.ADD.1",
      sub_skill_name: "Understand hundreds, tens, and ones as units",
      status: "secure",
      evidence: [
        makeEvidence(
          "units-1",
          "4 tens and 7 ones.",
          "Correctly identified place-value components of 47 when prompted."
        ),
        makeEvidence(
          "units-2",
          "3 tens and 6 ones.",
          "Repeated place-value identification for 36 without hesitation."
        ),
      ],
    },
    {
      sub_skill_id: "2.NBT.ADD.2",
      sub_skill_name: "Compose and decompose numbers",
      status: "developing",
      evidence: [
        makeEvidence(
          "decompose-1",
          "30 and 4. Then 20 and 5.",
          "Decomposed both numbers correctly when tutor directed the strategy."
        ),
        makeEvidence(
          "decompose-2",
          "Make 1 more ten and 3 ones.",
          "Regrouped 13 ones into 1 ten and 3 ones with scaffolding."
        ),
      ],
    },
    {
      sub_skill_id: "2.NBT.ADD.3",
      sub_skill_name: "Add within 100 using place value strategies",
      status: "developing",
      evidence: [
        makeEvidence(
          "place-value-1",
          "713.",
          "Initial answer concatenated digits — place-value misconception."
        ),
        makeEvidence(
          "place-value-2",
          "83.",
          "Self-corrected with scaffolding after decomposing into tens and ones."
        ),
        makeEvidence(
          "place-value-3",
          "50 and 9, so 59.",
          "Applied place-value strategy independently on second problem."
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
          "Articulated place-value reasoning in own words, but only after prompting."
        ),
      ],
    },
  ];
}

// ---------------------------------------------------------------------------
// Sub-skill snapshots with placeholder enrichment
// ---------------------------------------------------------------------------

function buildSubSkillPresentations(
  evidenceBySubSkill: EvidenceBySubSkill[]
): SubSkillPresentation[] {
  return curriculumReference.sub_skills.map((subSkill) => {
    const match = evidenceBySubSkill.find(
      (entry) => entry.sub_skill_id === subSkill.id
    );

    return {
      id: subSkill.id,
      name: subSkill.name,
      status: match?.status ?? "not_assessed",
      evidence_count: match?.evidence.length ?? 0,
      certainty: (CERTAINTY_BY_SKILL[subSkill.id] ?? "high") as CertaintyLevel,
      hints_needed: HINTS_NEEDED[subSkill.id],
      time_on_prompt_sec: TIME_ON_PROMPT[subSkill.id],
    };
  });
}

// ---------------------------------------------------------------------------
// Transcript highlights
// ---------------------------------------------------------------------------

interface HighlightSpec {
  text_match: string;
  speaker_filter?: "TUTOR" | "STUDENT";
  evidence_id: string;
  sub_skill_id: string;
  type: "misconception" | "positive" | "neutral";
}

const HIGHLIGHT_SPECS: HighlightSpec[] = [
  {
    text_match: "713.",
    speaker_filter: "STUDENT",
    evidence_id: "place-value-1",
    sub_skill_id: "2.NBT.ADD.3",
    type: "misconception",
  },
  {
    text_match: "50 and 9, so 59",
    evidence_id: "place-value-3",
    sub_skill_id: "2.NBT.ADD.3",
    type: "positive",
  },
  {
    text_match: "each digit means tens or ones",
    evidence_id: "language-1",
    sub_skill_id: "2.NBT.ADD.7",
    type: "positive",
  },
];

function applyHighlights(lines: TranscriptLine[]): TranscriptLine[] {
  return lines.map((line) => {
    const spec = HIGHLIGHT_SPECS.find(
      (s) =>
        line.text.includes(s.text_match) &&
        (!s.speaker_filter || line.speaker === s.speaker_filter)
    );
    if (!spec) return line;
    return {
      ...line,
      highlight: {
        evidence_id: spec.evidence_id,
        sub_skill_id: spec.sub_skill_id,
        type: spec.type,
      },
    };
  });
}

// ---------------------------------------------------------------------------
// Misconceptions
// ---------------------------------------------------------------------------

function buildMisconceptions(
  evidenceBySubSkill: EvidenceBySubSkill[]
): SurfacedMisconception[] {
  const misconceptions: SurfacedMisconception[] = [];

  for (const entry of evidenceBySubSkill) {
    for (const quote of entry.evidence) {
      if (quote.selected_text === "713.") {
        misconceptions.push({
          id: "misconception-concat",
          description: "Student concatenates digits (47 + 36 = 713).",
          evidence_id: quote.id,
          sub_skill_id: entry.sub_skill_id,
        });
      }
    }
  }

  return misconceptions;
}

// ---------------------------------------------------------------------------
// Next steps
// ---------------------------------------------------------------------------

function buildNextSteps(): NextStep[] {
  return [
    {
      kind: "student_practice",
      content: "Use drawings or blocks to solve 34 + 25.",
      source: "Eureka Math",
      sub_skill_id: "2.NBT.ADD.3",
      rationale:
        "Mia succeeded with abstract addition when scaffolded but hasn't tried concrete representations independently.",
    },
    {
      kind: "student_practice",
      content:
        "A student has 47 stickers and gets 36 more. How many now? (solve without help)",
      source: "Adapted",
      sub_skill_id: "2.NBT.ADD.3",
      rationale:
        "She solved this with prompting — repeating it independently tests retention.",
    },
    {
      kind: "tutor_research",
      content:
        "Review whether Mia's digit-concatenation error also appears in subtraction contexts.",
      sub_skill_id: "2.NBT.ADD.4",
      rationale:
        "The same place-value misconception often transfers. Not yet assessed for subtraction.",
    },
    {
      kind: "question",
      content: "Can you show me what 52 is made of without my help?",
      sub_skill_id: "2.NBT.ADD.2",
      rationale:
        "Tests whether decomposition is internalized or still dependent on scaffolding.",
    },
    {
      kind: "question",
      content:
        "Why does breaking numbers into tens and ones help us add? Explain to me like I'm a friend.",
      sub_skill_id: "2.NBT.ADD.7",
      rationale:
        "She articulated place-value language once with prompting — checking for independent explanation.",
    },
    {
      kind: "intervention",
      content:
        "If concatenation reappears, use base-ten blocks side by side so the student physically combines groups.",
      sub_skill_id: "2.NBT.ADD.3",
      rationale:
        "Concrete manipulation directly addresses the digit-concatenation misconception.",
    },
  ];
}

// ---------------------------------------------------------------------------
// Debrief checklist
// ---------------------------------------------------------------------------

function buildDebrief(): DebriefItem[] {
  return [
    {
      label: "Digit-concatenation misconception surfaced and corrected",
      done: true,
      detail: "Mia initially answered 713 for 47 + 36, then self-corrected to 83 with scaffolding.",
    },
    {
      label: "Place-value decomposition practiced",
      done: true,
      detail: "Successfully broke apart 34 + 25 into tens and ones on second problem.",
    },
    {
      label: "Student explained strategy in own words",
      done: true,
      detail: '"Each digit means tens or ones, not just the number by itself."',
    },
    {
      label: "Independent problem-solving (no scaffolding)",
      done: false,
      detail: "All correct answers still required tutor prompting. Target for next session.",
    },
    {
      label: "Subtraction skills assessed",
      done: false,
      detail: "Not covered this session — consider introducing next time.",
    },
  ];
}

// ---------------------------------------------------------------------------
// Main entry point
// ---------------------------------------------------------------------------

export function generateDashboard(session: SessionRecord): DashboardData {
  const evidenceBySubSkill = buildEvidenceBySubSkill();
  const rawLines = parseTranscript(session.transcript);
  const transcriptLines = applyHighlights(rawLines);

  return {
    tutor: seededTutor,
    student: seededStudent,
    session: {
      session_id: session.session_id,
      session_date: session.session_date,
      title: session.title,
    },
    cluster: curriculumReference.cluster,
    overall_summary:
      "Mia showed a digit-concatenation misconception on her first attempt but self-corrected with scaffolding. She can decompose numbers and apply place-value addition when prompted, though independent problem-solving was not yet demonstrated.",
    sub_skills: buildSubSkillPresentations(evidenceBySubSkill),
    evidence_by_sub_skill: evidenceBySubSkill,
    transcript_lines: transcriptLines,
    misconceptions: buildMisconceptions(evidenceBySubSkill),
    next_steps: buildNextSteps(),
    debrief: buildDebrief(),
  };
}
