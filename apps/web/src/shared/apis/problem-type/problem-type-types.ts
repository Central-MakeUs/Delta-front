export type ProblemTypeItem = {
  id: string;
  name: string;
  custom: boolean;
  active: boolean;
  sortOrder: number;
};

export type ProblemTypeListResponse = {
  types: ProblemTypeItem[];
};

export type ProblemTypeCreateRequest = {
  name: string;
};

export type ProblemTypeUpdateRequest = {
  name?: string;
  sortOrder?: number;
};

export type ProblemTypeSetActiveRequest = {
  active: boolean;
};
