import type { ApiResponse } from "@/shared/apis/api-types";

export type AnswerFormat = "CHOICE" | "TEXT" | "NUMBER" | "EXPRESSION";

export type ProblemCreateRequest = {
  scanId: number;
  finalUnitId: string;
  finalTypeIds: string[];
  answerFormat: AnswerFormat;
  answerChoiceNo?: number | null;
  answerValue?: string | null;
  memoText: string | null;
};

export type ProblemCreateResponse = {
  problemId: number;
  scanId: number;
};

export type ApiResponseProblemCreateResponse =
  ApiResponse<ProblemCreateResponse>;
