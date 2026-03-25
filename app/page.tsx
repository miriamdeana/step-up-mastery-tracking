import { getSeedContext } from "@/lib/store";

const starterMaterials = [
  "One seeded tutor, one seeded student, and one transcript-based session",
  "One Grade 2 priority cluster with sub-skills, sample problems, and tutor guidance",
  "Local report-style routes for latest, latest detailed, and generate",
  "A rough generator implementation that you can inspect, replace, or ignore",
];

const availableData = [
  "Tutor profile",
  "Student profile",
  "Session transcript",
  "Curriculum cluster, sub-skills, sample problems, and tutor moves",
  "Generated summary and detailed report responses from the local API",
];

const codeStartingPoints = [
  { label: "Seeded data", path: "lib/seed.ts" },
  { label: "Generator", path: "lib/generator.ts" },
  { label: "In-memory store", path: "lib/store.ts" },
  { label: "Routes", path: "app/api/..." },
];

export default function Home() {
  const { tutor, student, session, curriculum } = getSeedContext();
  const referenceRows = [
    {
      label: "Tutor",
      value: `${tutor.tutor_name} (${tutor.tutor_id})`,
    },
    {
      label: "Student",
      value: `${student.student_name} (${student.student_id})`,
    },
    {
      label: "Session",
      value: session.session_id,
    },
    {
      label: "Focus",
      value: `${student.grade_level} major work`,
    },
  ];
  const endpoints = [
    {
      method: "GET",
      path: `/api/public-reports/latest?tutor_id=${tutor.tutor_id}&student_id=${student.student_id}`,
    },
    {
      method: "GET",
      path: `/api/public-reports/latest/detailed?tutor_id=${tutor.tutor_id}&student_id=${student.student_id}`,
    },
    {
      method: "POST",
      path: "/api/internal-api/mastery-reports/generate",
    },
  ];
  const seededSummary = `${curriculum.sub_skills.length} sub-skills, ${curriculum.problems.length} sample problems, and ${curriculum.tutor_moves.scaffolds.length} scaffold ideas are already seeded.`;

  return (
    <main className="page-shell">
      <p className="page-label">Mastery Tracking Interview</p>

      <section className="shell-card shell-card--hero">
        <h1>Project Brief</h1>
        <p className="shell-copy">
          This repository gives you a seeded tutoring scenario, the supporting curriculum data, and
          the local report API surface. Use the sections below to understand what is available, then
          decide what kind of mastery-tracking experience you want to build.
        </p>

        <p className="context-note">
          The seeded scenario centers on tutor {tutor.tutor_name} working with{" "}
          {student.student_name}, a {student.grade_level} student, on the priority cluster &quot;
          {curriculum.cluster.cluster}.&quot;
        </p>
        <p className="context-note">
          The repo includes one tutoring transcript for that interaction, along with sub-skills,
          sample problems, tutor guidance, and starter report routes tied to the same tutor,
          student, and session.
        </p>
      </section>

      <section className="docs-grid">
        <article className="panel">
          <div className="panel__header">
            <h2>Starter materials</h2>
            <p className="panel__copy">
              The repo already includes these pieces for you to work from.
            </p>
          </div>

          <ul className="docs-list">
            {starterMaterials.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <div className="panel__header">
            <h2>Available data</h2>
            <p className="panel__copy">
              You can read these directly in code or through the local routes.
            </p>
          </div>

          <ul className="docs-list">
            {availableData.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <p className="meta-note">{seededSummary}</p>
        </article>

        <article className="panel">
          <div className="panel__header">
            <h2>Seeded IDs and context</h2>
            <p className="panel__copy">Use these exact values when calling the seeded endpoints.</p>
          </div>

          <dl className="meta-list">
            {referenceRows.map((row) => (
              <div className="meta-row" key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </article>

        <article className="panel">
          <div className="panel__header">
            <h2>Useful endpoints</h2>
            <p className="panel__copy">
              These routes expose the starter report flow and generated data.
            </p>
          </div>

          <div className="endpoint-list">
            {endpoints.map((endpoint) => (
              <article className="endpoint-row" key={endpoint.path}>
                <span className="endpoint-method">{endpoint.method}</span>
                <code>{endpoint.path}</code>
              </article>
            ))}
          </div>
        </article>

        <article className="panel panel--wide">
          <div className="panel__header">
            <h2>Code starting points</h2>
            <p className="panel__copy">
              These files are the fastest way to orient yourself in the codebase.
            </p>
          </div>

          <dl className="meta-list">
            {codeStartingPoints.map((item) => (
              <div className="meta-row" key={item.path}>
                <dt>{item.label}</dt>
                <dd>
                  <code>{item.path}</code>
                </dd>
              </div>
            ))}
          </dl>
        </article>
      </section>
    </main>
  );
}
