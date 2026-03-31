import type { TranscriptLine, TranscriptLineType } from "@/lib/types";

const PROBLEM_CHANGE_RE = /^\[PROBLEM CHANGE:.*\]$/;
const ANNOTATION_RE = /^\/\//;
const DIALOGUE_RE = /^(\d{2}:\d{2})\s+(TUTOR|STUDENT):\s+(.*)$/;

function classifyLine(raw: string): {
  line_type: TranscriptLineType;
  timestamp?: string;
  speaker?: "TUTOR" | "STUDENT";
  text: string;
} {
  const trimmed = raw.trim();

  if (PROBLEM_CHANGE_RE.test(trimmed)) {
    return { line_type: "problem_change", text: trimmed };
  }

  if (ANNOTATION_RE.test(trimmed)) {
    return { line_type: "annotation", text: trimmed.replace(/^\/\/\s*/, "") };
  }

  const dialogueMatch = trimmed.match(DIALOGUE_RE);
  if (dialogueMatch) {
    return {
      line_type: "dialogue",
      timestamp: dialogueMatch[1],
      speaker: dialogueMatch[2] as "TUTOR" | "STUDENT",
      text: dialogueMatch[3],
    };
  }

  return { line_type: "annotation", text: trimmed };
}

export function parseTranscript(raw: string): TranscriptLine[] {
  return raw
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .map((line, i) => {
      const classified = classifyLine(line);
      return { index: i, ...classified };
    });
}
