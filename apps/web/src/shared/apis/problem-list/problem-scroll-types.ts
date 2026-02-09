export type ProblemScrollSort = "RECENT" | "OLDEST";
export type ProblemScrollStatus = "ALL" | "UNSOLVED" | "SOLVED";

export type ProblemListItem = {
  id: string;
  title: string;
  imageSrc: string;
  typeIds: string[];
  dropdownIds: string[];
  chapterId: string;
  createdAt: string;
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
  content: ProblemListItem[];
  hasNext: boolean;
  nextCursor?: ProblemScrollNextCursor;
  totalElements?: number;
};
