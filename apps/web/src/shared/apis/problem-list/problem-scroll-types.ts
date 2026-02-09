export type ProblemScrollSort = "RECENT" | "OLDEST";
export type ProblemScrollStatus = "ALL" | "UNSOLVED" | "SOLVED";

/** 스크롤 API 응답의 문제 항목 (subject, unit, types 등 포함) */
export type ProblemScrollItem = {
  problemId: number;
  subject: { id: string; name: string };
  unit: { id: string; name: string };
  types: Array<{ id: string; name: string }>;
  previewImage?: { assetId: number; viewUrl: string };
  createdAt: string;
  isCompleted?: boolean;
};

export type GetProblemScrollParams = {
  subjectIds?: string[];
  unitIds?: string[];
  typeIds?: string[];
  sort?: ProblemScrollSort;
  status?: ProblemScrollStatus;
  lastId?: number;
  lastCreatedAt?: string;
  size?: number;
  includePreviewUrl?: boolean;
};

export type ProblemScrollNextCursor = {
  lastId: number;
  lastCreatedAt: string;
};

export type GetProblemScrollResponse = {
  content: ProblemScrollItem[];
  hasNext: boolean;
  nextCursor?: ProblemScrollNextCursor;
  totalElements?: number;
};
