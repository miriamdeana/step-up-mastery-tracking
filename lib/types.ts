export type SubSkillStatus = "not_assessed" | "developing" | "secure";

export interface TutorProfile {
  tutor_id: string;
  tutor_name: string;
}

export interface StudentProfile {
  student_id: string;
  student_name: string;
  grade_level: string;
}

export interface PriorityCluster {
  grade: number;
  cluster: string;
  priority_level: string;
}

export interface SubSkill {
  id: string;
  name: string;
  description: string;
}

export interface ProblemBankItem {
  id: string;
  sub_skill: string;
  type: string;
  prompt: string;
  source: string;
}

export interface TutorMoves {
  common_misconceptions: string[];
  questions_to_ask: string[];
  scaffolds: string[];
  when_to_advance: string[];
}

export interface CurriculumReference {
  cluster: PriorityCluster;
  sub_skills: SubSkill[];
  problems: ProblemBankItem[];
  tutor_moves: TutorMoves;
}

export interface SessionRecord {
  session_id: string;
  tutor_id: string;
  student_id: string;
  session_date: string;
  title: string;
  transcript: string;
}

export interface EvidenceQuote {
  id: string;
  selected_text: string;
  note: string;
}

export interface SubSkillSnapshot {
  id: string;
  name: string;
  status: SubSkillStatus;
  evidence_count: number;
}

export interface EvidenceBySubSkill {
  sub_skill_id: string;
  sub_skill_name: string;
  status: SubSkillStatus;
  evidence: EvidenceQuote[];
}

export interface LatestMasteryReport {
  report_id: string;
  tutor_id: string;
  student_id: string;
  session_count: number;
  overall_summary: string;
  created_at: string;
  cluster: PriorityCluster;
  sub_skills: SubSkillSnapshot[];
}

export interface DetailedMasterySession {
  session_id: string;
  session_date: string;
  transcript: string;
  evidence_by_sub_skill: EvidenceBySubSkill[];
}

export interface DetailedMasteryReport {
  report_id: string;
  tutor_id: string;
  student_id: string;
  session_count: number;
  overall_summary: string;
  created_at: string;
  cluster: PriorityCluster;
  curriculum: CurriculumReference;
  sessions: DetailedMasterySession[];
}

export interface GenerateMasteryRequest {
  tutor_id: string;
  student_id: string;
  session_id: string;
}

export interface GenerateMasteryResponse {
  success: boolean;
  report: LatestMasteryReport;
  detailed_report: DetailedMasteryReport;
}

// ---------------------------------------------------------------------------
// Presentation-layer types (assembled from generator output + placeholders)
// ---------------------------------------------------------------------------

export type EvidenceType = "misconception" | "positive" | "neutral";

export type TranscriptLineType = "dialogue" | "problem_change" | "annotation";

export interface TranscriptLine {
  index: number;
  timestamp?: string;
  speaker?: "TUTOR" | "STUDENT";
  text: string;
  line_type: TranscriptLineType;
  highlight?: {
    evidence_id: string;
    sub_skill_id: string;
    type: EvidenceType;
  };
}

export interface SurfacedMisconception {
  id: string;
  description: string;
  evidence_id: string;
  sub_skill_id: string;
}

export type NextStepKind = "student_practice" | "tutor_research" | "question" | "intervention";

export interface NextStep {
  kind: NextStepKind;
  content: string;
  source?: string;
  sub_skill_id?: string;
  rationale: string;
}

export type CertaintyLevel = "low" | "medium" | "high";

export interface SubSkillPresentation extends SubSkillSnapshot {
  certainty: CertaintyLevel;
  hints_needed?: number;
  time_on_prompt_sec?: number;
}

export interface DebriefItem {
  label: string;
  done: boolean;
  detail?: string;
}

export interface DashboardData {
  tutor: TutorProfile;
  student: StudentProfile;
  session: {
    session_id: string;
    session_date: string;
    title: string;
  };
  cluster: PriorityCluster;
  overall_summary: string;
  sub_skills: SubSkillPresentation[];
  evidence_by_sub_skill: EvidenceBySubSkill[];
  transcript_lines: TranscriptLine[];
  misconceptions: SurfacedMisconception[];
  next_steps: NextStep[];
  debrief: DebriefItem[];
}
