import type { ApiResponse } from "@/shared/apis/api-types";

export type ProblemStatsSort = "DEFAULT" | "MAX" | "MIN";

export type ProblemStatsRequest = {
  subjectId?: string | null;
  unitId?: string | null;
  typeId?: string | null;
};

export type UnitRef = { id: string; name: string };
export type TypeRef = { id: string; name: string };

export type ProblemUnitStatsItem = {
  subject: UnitRef;
  unit: UnitRef;
  solvedCount: number;
  unsolvedCount: number;
  totalCount: number;
};

export type ProblemTypeStatsItem = {
  type: TypeRef;
  solvedCount: number;
  unsolvedCount: number;
  totalCount: number;
};

export type ProblemStatsData<TItem> = { items: TItem[] };

export type ApiResponseUnitStats = ApiResponse<
  ProblemStatsData<ProblemUnitStatsItem>
>;
export type ApiResponseTypeStats = ApiResponse<
  ProblemStatsData<ProblemTypeStatsItem>
>;

export type GraphRowTone = "active" | "inactive";

export type GraphRow = {
  id: string;
  label: string;
  tone?: GraphRowTone;
  value: number;
};

export type GraphGroup = {
  id: string;
  label: string;
  rows: GraphRow[];
};
