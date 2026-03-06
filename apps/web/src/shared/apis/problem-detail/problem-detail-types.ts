export type AnswerFormat = "CHOICE" | "TEXT" | "NUMBER" | "EXPRESSION";

export type CurriculumItem = {
  id: string;
  name: string;
};

export type ProblemDetailOriginalImage = {
  assetId: number;
  viewUrl: string;
};

export type ProblemDetailResponse = {
  problemId: number;
  subject: CurriculumItem;
  unit: CurriculumItem;
  type: CurriculumItem;
  originalImage: ProblemDetailOriginalImage;
  answerFormat: AnswerFormat;
  answerChoiceNo: number | null;
  answerValue: string | null;
  memoText: string | null;
  completed: boolean;
  completedAt: string | null;
  createdAt: string;
};

export type UpdateProblemRequest = {
  answerChoiceNo?: number;
  answerValue?: string;
  answerFormat?: AnswerFormat;
  memoText?: string;
};

export type SolutionResponse = {
  solution: {
    plainText: string;
  };
};

export type AiSolutionTaskStatus = "PENDING" | "RUNNING" | "READY" | "FAILED";

export type AiSolutionTaskResponse = {
  taskId: number;
  status: AiSolutionTaskStatus;
  failureReason: string | null;
  requestedAt: string;
  startedAt: string | null;
  completedAt: string | null;
  solution: unknown | null;
};

type AiSolutionTask = {
  taskId: number;
  status: AiSolutionTaskStatus;
  failureReason: string | null;
  requestedAt: string;
  startedAt: string | null;
  completedAt: string | null;
  solution: unknown | null;
};

export type SolutionQueryData = {
  solution?: { plainText: string };
  aiSolutionTask?: AiSolutionTask;
};
