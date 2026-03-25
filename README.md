# Mastery Tracking Interview

## Background

**You have approximately two hours to explore a stronger mastery-tracking direction.**

This repo is best thought of as a bundle of starter materials, not a product you need to preserve. The current app exposes the seeded data, report flow, and a rough generator so you can decide what a better mastery-tracking experience should be.

## About Mastery Tracking

In this exercise, mastery tracking means using a tutoring session itself as evidence of what a student understands, what they can do with support, and what still seems shaky. This is in contrast to evaluating a student based on tests or quizzes.

The goal is to turn one session into something useful for a tutor: a view of likely sub-skill understanding, the evidence behind it, and a sensible next step.

## What You Have To Work With

- A small full-stack Next.js app
- One seeded tutor, one seeded student, and one tutoring transcript
- One Grade 2 priority-skills cluster with sub-skills, problems, and tutor guidance
- Local report-style routes for `generate`, `latest`, and `latest detailed`
- A sparse starter UI that documents the available data and routes
- A naive local generator implementation

## Suggested Direction

Use the starter materials to create a better tutor-facing mastery-tracking experience for one Grade 2 priority cluster.

- Keep, adapt, or discard the current UI as you see fit
- Decide how mastery should be represented
- Decide what evidence and next steps matter most for a tutor

## Process

You are encouraged to use AI tools during this exercise. Specifically, we are looking for:

- Code quality
- Product thinking
- Execution speed
- Use of tools

We will book a follow-up call to discuss your submission.

## Getting Started

### Run Locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Codebase Shape

- The landing page is a Server Component that documents the seeded data and route surface
- The report route handlers still exist as starter API surfaces if you want to build from them
- The mastery generator and in-memory store remain local and intentionally simple
- The homepage does not prescribe a mastery UI; it only points you at the materials

### Seeded References

- Tutor: `2025-t27049` (`Sasha Patel`)
- Student: `2025-s12123` (`Mia Rivera`)
- Session: `session-2025-04-24`

## Useful Endpoints

- `GET /api/public-reports/latest?tutor_id=2025-t27049&student_id=2025-s12123`
- `GET /api/public-reports/latest/detailed?tutor_id=2025-t27049&student_id=2025-s12123`
- `POST /api/internal-api/mastery-reports/generate`

Example payload:

```json
{
  "tutor_id": "2025-t27049",
  "student_id": "2025-s12123",
  "session_id": "session-2025-04-24"
}
```
