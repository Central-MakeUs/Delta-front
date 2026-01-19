import type { ApiResponse } from "@/shared/apis/api-types";

export type AnswerFormat = "CHOICE" | "TEXT" | "NUMBER" | "EXPRESSION";

export type ProblemCreateRequest = {
  scanId: number;
  finalUnitId: string;
  finalTypeId: string;

  answerFormat: AnswerFormat;
  answerChoiceNo?: number | null;
  answerValue?: string | null;

  solutionText: string;
};

export type ProblemCreateResponse = {
  problemId: number;
  scanId: number;
};

export type ApiResponseProblemCreateResponse =
  ApiResponse<ProblemCreateResponse>;
