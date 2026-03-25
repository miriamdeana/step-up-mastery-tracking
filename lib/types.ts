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
