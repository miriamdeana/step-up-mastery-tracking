import { getDetailedReport } from "@/lib/store";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const tutorId = searchParams.get("tutor_id");
  const studentId = searchParams.get("student_id");

  if (!tutorId || !studentId) {
    return Response.json(
      { detail: "tutor_id and student_id are required" },
      { status: 400 }
    );
  }

  const report = getDetailedReport(tutorId, studentId);
  if (!report) {
    return Response.json(
      { detail: "No starter detailed report found for the provided tutor/student." },
      { status: 404 }
    );
  }

  return Response.json(report);
}


// {
//   "report_id": "report-1774801795628",
//   "tutor_id": "2025-t27049",
//   "student_id": "2025-s12123",
//   "session_count": 1,
//   "overall_summary": "Starter output is intentionally thin. It tags a couple of likely sub-skills and leaves most of the product and mastery decisions open.",
//   "created_at": "2026-03-29T16:29:55.628Z",
//   "cluster": {
//     "grade": 2,
//     "cluster": "Use place value understanding and properties of operations to add and subtract",
//     "priority_level": "Major Work"
//   },
//   "curriculum": {
//     "cluster": {
//       "grade": 2,
//       "cluster": "Use place value understanding and properties of operations to add and subtract",
//       "priority_level": "Major Work"
//     },
//     "sub_skills": [
//       {
//         "id": "2.NBT.ADD.1",
//         "name": "Understand hundreds, tens, and ones as units",
//         "description": "Student identifies and represents numbers using base-ten structure."
//       },
//       {
//         "id": "2.NBT.ADD.2",
//         "name": "Compose and decompose numbers",
//         "description": "Student breaks numbers into tens and ones."
//       },
//       {
//         "id": "2.NBT.ADD.3",
//         "name": "Add within 100 using place value strategies",
//         "description": "Student adds by breaking apart tens and ones."
//       },
//       {
//         "id": "2.NBT.ADD.4",
//         "name": "Subtract within 100 using place value strategies",
//         "description": "Student subtracts using decomposition."
//       },
//       {
//         "id": "2.NBT.ADD.5",
//         "name": "Add within 200 using place value reasoning",
//         "description": "Student extends strategies to larger numbers."
//       },
//       {
//         "id": "2.NBT.ADD.6",
//         "name": "Subtract within 200 with regrouping",
//         "description": "Student understands regrouping conceptually."
//       },
//       {
//         "id": "2.NBT.ADD.7",
//         "name": "Explain strategies using place value language",
//         "description": "Student justifies reasoning using math language."
//       }
//     ],
//     "problems": [
//       {
//         "id": "P1",
//         "sub_skill": "2.NBT.ADD.3",
//         "type": "concrete",
//         "prompt": "Use drawings or blocks to solve 34 + 25.",
//         "source": "Eureka Math"
//       },
//       {
//         "id": "P2",
//         "sub_skill": "2.NBT.ADD.3",
//         "type": "representational",
//         "prompt": "34 + 25 = (30 + 20) + (4 + 5).",
//         "source": "Illustrative Mathematics"
//       },
//       {
//         "id": "P3",
//         "sub_skill": "2.NBT.ADD.3",
//         "type": "abstract",
//         "prompt": "47 + 36 = ?",
//         "source": "Both"
//       },
//       {
//         "id": "P4",
//         "sub_skill": "2.NBT.ADD.3",
//         "type": "application",
//         "prompt": "A student has 47 stickers and gets 36 more. How many now?",
//         "source": "Adapted"
//       }
//     ],
//     "tutor_moves": {
//       "common_misconceptions": [
//         "Student concatenates digits (47 + 36 = 713).",
//         "Student adds ones or tens without attending to place value."
//       ],
//       "questions_to_ask": [
//         "What is 47 made of?",
//         "How many tens do we have?",
//         "How many ones do we have?"
//       ],
//       "scaffolds": [
//         "Break numbers into tens and ones.",
//         "Use drawings or base-ten blocks."
//       ],
//       "when_to_advance": [
//         "Student consistently adds using place value correctly.",
//         "Student can explain the strategy in place value language."
//       ]
//     }
//   },
//   "sessions": [
//     {
//       "session_id": "session-2025-04-24",
//       "session_date": "2025-04-24T16:30:00.000Z",
//       "transcript": "[PROBLEM CHANGE: p1 - \"47 + 36 = ?\" (start)]\n// Whiteboard shows 47 + 36 with space to break numbers into tens and ones.\n00:04 TUTOR: Try it any way that makes sense to you.\n00:11 STUDENT: 713.\n00:15 TUTOR: Can you show me how you got 713?\n00:22 STUDENT: I put the 7 and the 3 together, and then the 4 and the 6.\n00:30 TUTOR: Let's slow down. What is 47 made of?\n00:36 STUDENT: 4 tens and 7 ones.\n00:42 TUTOR: What about 36?\n00:46 STUDENT: 3 tens and 6 ones.\n00:53 TUTOR: So how many tens do we have? How many ones?\n01:00 STUDENT: 7 tens and 13 ones.\n01:07 TUTOR: What could we do with 13 ones?\n01:12 STUDENT: Make 1 more ten and 3 ones.\n01:18 TUTOR: So the total is?\n01:20 STUDENT: 83.\n\n[PROBLEM CHANGE: p2 - \"34 + 25\" (start)]\n// Tutor asks the student to solve it by breaking apart each number first.\n01:32 TUTOR: This time, start by breaking both numbers apart.\n01:38 STUDENT: 30 and 4. Then 20 and 5.\n01:45 STUDENT: 50 and 9, so 59.\n\n[PROBLEM CHANGE: p3 - \"A student has 47 stickers and gets 36 more. How many now?\" (start)]\n// Tutor points back to the earlier tens-and-ones work.\n01:58 TUTOR: What would you do first?\n02:04 STUDENT: Add the tens, then the ones.\n02:10 TUTOR: Can you explain why that works?\n02:18 STUDENT: Because each digit means tens or ones, not just the number by itself.\n02:28 TUTOR: Good. Next time I want you to set that up without my help.",
//       "evidence_by_sub_skill": [
//         {
//           "sub_skill_id": "2.NBT.ADD.3",
//           "sub_skill_name": "Add within 100 using place value strategies",
//           "status": "developing",
//           "evidence": [
//             {
//               "id": "place-value-1",
//               "selected_text": "713.",
//               "note": "Starter output notices a likely place value misconception."
//             },
//             {
//               "id": "place-value-3",
//               "selected_text": "50 and 9, so 59.",
//               "note": "Later work suggests the student can use a place value strategy."
//             }
//           ]
//         },
//         {
//           "sub_skill_id": "2.NBT.ADD.7",
//           "sub_skill_name": "Explain strategies using place value language",
//           "status": "developing",
//           "evidence": [
//             {
//               "id": "language-1",
//               "selected_text": "Because each digit means tens or ones, not just the number by itself.",
//               "note": "The student articulates the strategy, but the tutor still asks for support."
//             }
//           ]
//         }
//       ]
//     }
//   ]
// }

// what's a word that best describes the sub_skill builds on the previous one?
// time spent on any given skill/sub-skill, number of attempts/nudges, can be useful info
// why is the source important in this report?  and what does "Both" mean?
// what's the difference between "curriculum" and "cluster"?