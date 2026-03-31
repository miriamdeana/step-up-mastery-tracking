import { generateDashboard } from "@/lib/generator";
import { curriculumReference, seededSession, seededStudent, seededTutor } from "@/lib/seed";
import type {
  DashboardData,
  DetailedMasteryReport,
  GenerateMasteryRequest,
  LatestMasteryReport,
} from "@/lib/types";

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

let dashboardState: DashboardData = generateDashboard(seededSession);
let reportId = `report-${Date.now()}`;
let createdAt = new Date().toISOString();

// ---------------------------------------------------------------------------
// Dashboard (used by the page)
// ---------------------------------------------------------------------------

export function getDashboardData(): DashboardData {
  return dashboardState;
}

// ---------------------------------------------------------------------------
// Legacy API types (derived from DashboardData for backward compatibility)
// ---------------------------------------------------------------------------

function deriveLatestReport(): LatestMasteryReport {
  const d = dashboardState;
  return {
    report_id: reportId,
    tutor_id: d.tutor.tutor_id,
    student_id: d.student.student_id,
    session_count: 1,
    overall_summary: d.overall_summary,
    created_at: createdAt,
    cluster: d.cluster,
    sub_skills: d.sub_skills.map(({ id, name, status, evidence_count }) => ({
      id,
      name,
      status,
      evidence_count,
    })),
  };
}

function deriveDetailedReport(): DetailedMasteryReport {
  const d = dashboardState;
  return {
    report_id: reportId,
    tutor_id: d.tutor.tutor_id,
    student_id: d.student.student_id,
    session_count: 1,
    overall_summary: d.overall_summary,
    created_at: createdAt,
    cluster: d.cluster,
    curriculum: curriculumReference,
    sessions: [
      {
        session_id: d.session.session_id,
        session_date: d.session.session_date,
        transcript: seededSession.transcript,
        evidence_by_sub_skill: d.evidence_by_sub_skill,
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// Public accessors (used by API routes)
// ---------------------------------------------------------------------------

export function getSeedContext() {
  return {
    tutor: seededTutor,
    student: seededStudent,
    session: seededSession,
    curriculum: curriculumReference,
  };
}

function ensureIdentityMatch(tutorId: string, studentId: string) {
  return tutorId === seededTutor.tutor_id && studentId === seededStudent.student_id;
}

export function getLatestReport(tutorId: string, studentId: string) {
  if (!ensureIdentityMatch(tutorId, studentId)) return null;
  return deriveLatestReport();
}

export function getDetailedReport(tutorId: string, studentId: string) {
  if (!ensureIdentityMatch(tutorId, studentId)) return null;
  return deriveDetailedReport();
}

export function regenerateReport(input: GenerateMasteryRequest) {
  if (
    !ensureIdentityMatch(input.tutor_id, input.student_id) ||
    input.session_id !== seededSession.session_id
  ) {
    return null;
  }

  dashboardState = generateDashboard(seededSession);
  reportId = `report-${Date.now()}`;
  createdAt = new Date().toISOString();

  return {
    latest: deriveLatestReport(),
    detailed: deriveDetailedReport(),
  };
}
