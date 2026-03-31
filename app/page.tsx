import { getDashboardData } from "@/lib/store";
import DebriefPanel from "./components/DebriefPanel";
import MasteryOverview from "./components/MasteryOverview";
import NextStepsPanel from "./components/NextStepsPanel";
import TranscriptPanel from "./components/TranscriptPanel";

export default function Home() {
  const data = getDashboardData();

  return (
    <div className="dashboard">
      <div className="dashboard__transcript">
        <TranscriptPanel
          title={data.session.title}
          sessionDate={data.session.session_date}
          lines={data.transcript_lines}
        />
      </div>

      <main className="dashboard__insights">
        <header className="insights-header">
          <p className="insights-label">Mastery Tracking</p>
          <span className="session-chip">
            Session {data.session.session_id.replace("session-", "")}
          </span>
        </header>

        <div className="overview-debrief-row">
          <MasteryOverview
            student={data.student}
            cluster={data.cluster}
            subSkills={data.sub_skills}
            overallSummary={data.overall_summary}
            evidenceBySubSkill={data.evidence_by_sub_skill}
            misconceptions={data.misconceptions}
          />
          <div className="right-column">
            <section className="summary-card">
              <h2 className="summary-card__title">Session Summary</h2>
              <p className="summary-card__text">{data.overall_summary}</p>
            </section>
            <DebriefPanel items={data.debrief} />
          </div>
        </div>

        <NextStepsPanel steps={data.next_steps} />
      </main>
    </div>
  );
}
