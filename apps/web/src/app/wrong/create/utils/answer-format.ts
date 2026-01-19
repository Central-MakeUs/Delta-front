import type { AnswerFormat } from "@/shared/apis/problem-create/problem-create-types";

const normalize = (v: string) => v.trim();

export const inferAnswerFormat = (raw: string): AnswerFormat => {
  const v = normalize(raw);
  if (!v) return "TEXT";

  if (/^[+-]?\d+(\.\d+)?$/.test(v)) return "NUMBER";

  if (
    /\\[a-zA-Z]+/.test(v) ||
    /[\^_]/.test(v) ||
    /^[+-]?\d+\s*\/\s*[+-]?\d+$/.test(v) ||
    /[+*/]/.test(v) ||
    /[(){}\[\]]/.test(v)
  ) {
    return "EXPRESSION";
  }

  return "TEXT";
};
