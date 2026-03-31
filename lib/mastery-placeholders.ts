/**
 * Placeholder constants for the dashboard.
 *
 * These values are illustrative — they demonstrate the intended evidence model
 * (hints needed, time-on-prompt, certainty badges) without requiring an LLM or
 * real transcript analysis. Swap for real computed values when the analysis
 * pipeline is built.
 */

import type { CertaintyLevel } from "@/lib/types";

export const CERTAINTY_BY_SKILL: Record<string, CertaintyLevel> = {
  "2.NBT.ADD.1": "high",
  "2.NBT.ADD.2": "medium",
  "2.NBT.ADD.3": "medium",
  "2.NBT.ADD.7": "low",
};

export const HINTS_NEEDED: Record<string, number> = {
  "2.NBT.ADD.1": 0,
  "2.NBT.ADD.2": 1,
  "2.NBT.ADD.3": 3,
  "2.NBT.ADD.7": 1,
};

export const TIME_ON_PROMPT: Record<string, number> = {
  "2.NBT.ADD.3": 80,
  "2.NBT.ADD.2": 13,
  "2.NBT.ADD.7": 30,
};
