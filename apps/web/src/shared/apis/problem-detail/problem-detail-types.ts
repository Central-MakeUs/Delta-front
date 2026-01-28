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
  solutionText: string | null;
  completed: boolean;
  completedAt: string | null;
  createdAt: string;
};

export type UpdateProblemRequest = {
  answerChoiceNo?: number;
  answerValue?: string;
  solutionText?: string;
};
