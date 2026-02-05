import type { ProblemListItem } from "@/shared/apis/problem-list/problem-list-types";

export type ProblemScrollSort = "RECENT" | "OLDEST";
export type ProblemScrollStatus = "ALL" | "UNSOLVED" | "SOLVED";

export type GetProblemScrollParams = {
  subjectId?: string;
  unitId?: string;
  typeId?: string;
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
  content: ProblemListItem[];
  hasNext: boolean;
  nextCursor?: ProblemScrollNextCursor;
  totalElements?: number;
};
