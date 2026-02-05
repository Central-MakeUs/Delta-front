export type SubjectId =
  | "U_COMMON_1"
  | "U_COMMON_2"
  | "U_ALGEBRA"
  | "U_CALC_1"
  | "U_PROBSTAT"
  | "U_CALC_2"
  | "U_GEOM";

export type UnitId =
  | "U_C1_POLY"
  | "U_C1_EQ_INEQ"
  | "U_C1_COUNTING"
  | "U_C1_MATRIX"
  | "U_C2_GEO_EQ"
  | "U_C2_SET_PROP"
  | "U_C2_FUNC_GRAPH"
  | "U_ALG_EXP_LOG"
  | "U_ALG_TRIG"
  | "U_ALG_SEQ"
  | "U_CALC1_LIMIT"
  | "U_CALC1_DIFF"
  | "U_CALC1_INT"
  | "U_PS_COUNTING"
  | "U_PS_PROB"
  | "U_PS_STAT"
  | "U_CALC2_SEQ_LIMIT"
  | "U_CALC2_DIFF"
  | "U_CALC2_INT"
  | "U_GM_CONIC"
  | "U_GM_SPACE"
  | "U_GM_VECTOR";

export type ProblemTypeId =
  | "T_SENTENCE"
  | "T_GRAPH_FIGURE"
  | "T_COMPLEX"
  | "T_ABS"
  | "T_CASE_SPLIT"
  | "T_GNKND";

export type SubjectItem = { id: SubjectId; name: string };
export type UnitItem = { id: UnitId; name: string; subjectId: SubjectId };
export type ProblemTypeItem = { id: ProblemTypeId; name: string };

export const SUBJECTS: readonly SubjectItem[] = [
  { id: "U_COMMON_1", name: "공통수학 I" },
  { id: "U_COMMON_2", name: "공통수학 II" },
  { id: "U_ALGEBRA", name: "대수" },
  { id: "U_CALC_1", name: "미적분 I" },
  { id: "U_PROBSTAT", name: "확률과 통계" },
  { id: "U_CALC_2", name: "미적분 II" },
  { id: "U_GEOM", name: "기하" },
] as const;

export const UNITS: readonly UnitItem[] = [
  { id: "U_C1_POLY", name: "다항식", subjectId: "U_COMMON_1" },
  { id: "U_C1_EQ_INEQ", name: "방정식과 부등식", subjectId: "U_COMMON_1" },
  { id: "U_C1_COUNTING", name: "경우의 수", subjectId: "U_COMMON_1" },
  { id: "U_C1_MATRIX", name: "행렬", subjectId: "U_COMMON_1" },

  { id: "U_C2_GEO_EQ", name: "도형의 방정식", subjectId: "U_COMMON_2" },
  { id: "U_C2_SET_PROP", name: "집합과 명제", subjectId: "U_COMMON_2" },
  { id: "U_C2_FUNC_GRAPH", name: "함수와 그래프", subjectId: "U_COMMON_2" },

  { id: "U_ALG_EXP_LOG", name: "지수함수와 로그함수", subjectId: "U_ALGEBRA" },
  { id: "U_ALG_TRIG", name: "삼각함수", subjectId: "U_ALGEBRA" },
  { id: "U_ALG_SEQ", name: "수열", subjectId: "U_ALGEBRA" },

  { id: "U_CALC1_LIMIT", name: "함수의 극한과 연속", subjectId: "U_CALC_1" },
  { id: "U_CALC1_DIFF", name: "미분", subjectId: "U_CALC_1" },
  { id: "U_CALC1_INT", name: "적분", subjectId: "U_CALC_1" },

  { id: "U_PS_COUNTING", name: "경우의 수", subjectId: "U_PROBSTAT" },
  { id: "U_PS_PROB", name: "확률", subjectId: "U_PROBSTAT" },
  { id: "U_PS_STAT", name: "통계", subjectId: "U_PROBSTAT" },

  { id: "U_CALC2_SEQ_LIMIT", name: "수열의 극한", subjectId: "U_CALC_2" },
  { id: "U_CALC2_DIFF", name: "미분법", subjectId: "U_CALC_2" },
  { id: "U_CALC2_INT", name: "적분법", subjectId: "U_CALC_2" },

  { id: "U_GM_CONIC", name: "이차곡선", subjectId: "U_GEOM" },
  { id: "U_GM_SPACE", name: "공간도형과 공간좌표", subjectId: "U_GEOM" },
  { id: "U_GM_VECTOR", name: "벡터", subjectId: "U_GEOM" },
] as const;

export const PROBLEM_TYPES: readonly ProblemTypeItem[] = [
  { id: "T_SENTENCE", name: "문장형" },
  { id: "T_GRAPH_FIGURE", name: "그래프/도형" },
  { id: "T_COMPLEX", name: "복합 개념" },
  { id: "T_ABS", name: "절댓값" },
  { id: "T_CASE_SPLIT", name: "조건별 상황 나누기" },
  { id: "T_GNKND", name: "ㄱ, ㄴ, ㄷ" },
] as const;

export const UNIT_BY_ID = UNITS.reduce<Record<string, UnitItem>>(
  (acc, v) => ((acc[v.id] = v), acc),
  {}
);

export const formatUnitGraphLabel = (subjectId: string, unitId: string) =>
  `${subjectId} / ${unitId}`;

export const formatTypeGraphLabel = (typeId: string) => typeId;

export const SUBJECT_NAME_BY_ID = SUBJECTS.reduce<Record<string, string>>(
  (acc, v) => ((acc[v.id] = v.name), acc),
  {}
);

export const UNIT_NAME_BY_ID = UNITS.reduce<Record<string, string>>(
  (acc, v) => ((acc[v.id] = v.name), acc),
  {}
);

export const TYPE_NAME_BY_ID = PROBLEM_TYPES.reduce<Record<string, string>>(
  (acc, v) => ((acc[v.id] = v.name), acc),
  {}
);

const normalize = (v?: string | null) => (v ?? "").trim();

export const resolveUnitLabel = (unit: {
  id?: string | null;
  name?: string | null;
}) => {
  const name = normalize(unit.name);
  if (name) return name;

  const id = normalize(unit.id);
  if (!id) return "";

  return UNIT_NAME_BY_ID[id] ?? id;
};

export const resolveTypeLabel = (type: {
  id?: string | null;
  name?: string | null;
}) => {
  const name = normalize(type.name);
  if (name) return name;

  const id = normalize(type.id);
  if (!id) return "";

  return TYPE_NAME_BY_ID[id] ?? id;
};
