import type { AnswerFormat } from "@/shared/apis/problem-create/problem-create-types";

export const normalize = (v: string | null | undefined) => (v ?? "").trim();

export const isPureNumber = (v: string) => {
  const s = normalize(v);
  if (!s) return false;
  return /^[+-]?(?:\d+\.?\d*|\.\d+)$/.test(s);
};

export const looksLikeExpression = (v: string) => {
  const s = normalize(v);
  if (!s) return false;

  if (/[=^/\\{}]/.test(s)) return true;
  if (/(\\frac|\\sqrt|sqrt|frac)/i.test(s)) return true;
  if (/[+\-*]/.test(s)) return true;
  if (/[()]/.test(s)) return true;

  return false;
};

export const inferSubjectiveFormat = (answerValue: string): AnswerFormat => {
  const v = normalize(answerValue);
  if (!v) return "TEXT";
  if (isPureNumber(v)) return "NUMBER";
  if (looksLikeExpression(v)) return "EXPRESSION";
  return "TEXT";
};
