export type ProblemListSort =
  | "RECENT"
  | "OLDEST"
  | "UNIT_MOST"
  | "UNIT_LEAST"
  | "TYPE_MOST"
  | "TYPE_LEAST";

export type ProblemListStatus = "ALL" | "UNSOLVED" | "SOLVED";

export type GetProblemListParams = {
  subjectId?: string;
  unitId?: string;
  typeId?: string;
  sort?: ProblemListSort;
  status?: ProblemListStatus;
  page?: number;
  size?: number;
};

export type ProblemListItem = {
  problemId: number;
  subject: {
    id: string;
    name: string;
  };
  unit: {
    id: string;
    name: string;
  };
  types: Array<{
    id: string;
    name: string;
  }>;
  previewImage: {
    assetId: number;
    viewUrl: string;
  };
  createdAt: string;
  isCompleted?: boolean;
};

export type ProblemListPage = {
  content: ProblemListItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export type GetProblemListResponse = ProblemListPage;
