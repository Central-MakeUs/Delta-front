import type { StaticImageData } from "next/image";
import sample1 from "@/shared/assets/images/sample1.png";
import sample2 from "@/shared/assets/images/sample2.png";
import sample3 from "@/shared/assets/images/sample3.png";
import sample4 from "@/shared/assets/images/sample4.png";
import sample5 from "@/shared/assets/images/sample5.png";
import sample6 from "@/shared/assets/images/sample6.png";
import sample7 from "@/shared/assets/images/sample7.png";
import sample8 from "@/shared/assets/images/sample8.png";
import sample9 from "@/shared/assets/images/sample9.png";
import sample10 from "@/shared/assets/images/sample10.png";
import type { GraphGroup } from "@/shared/apis/graph/graph-types";
import {
  SUBJECT_NAME_BY_ID,
  UNIT_BY_ID,
  UNIT_NAME_BY_ID,
  type UnitId,
} from "@/shared/constants/math-curriculum";

export type CoachMarkPracticeProblem = {
  id: string;
  imageSrc: StaticImageData;
  title: string;
  subjectName: string;
  unitId: UnitId;
  unitName: string;
  typeNames: readonly string[];
  isCompleted: boolean;
};

type PracticeProblemSeed = {
  imageSrc: StaticImageData;
  unitId: UnitId;
  typeNames: readonly string[];
  isCompleted?: boolean;
};

const SEEDS: readonly PracticeProblemSeed[] = [
  {
    imageSrc: sample1,
    unitId: "U_C1_POLY",
    typeNames: ["ㄱ, ㄴ, ㄷ", "문장형", "복합 개념"],
  },
  {
    imageSrc: sample2,
    unitId: "U_C1_EQ_INEQ",
    typeNames: ["그래프/도형", "복합 개념", "문장형"],
    isCompleted: true,
  },
  {
    imageSrc: sample3,
    unitId: "U_C2_FUNC_GRAPH",
    typeNames: ["그래프/도형", "문장형", "복합 개념"],
  },
  {
    imageSrc: sample4,
    unitId: "U_C1_POLY",
    typeNames: ["문장형", "복합 개념", "다항식"],
  },
  {
    imageSrc: sample5,
    unitId: "U_C2_FUNC_GRAPH",
    typeNames: ["그래프/도형", "문장형", "복합 개념"],
  },
  {
    imageSrc: sample6,
    unitId: "U_C2_FUNC_GRAPH",
    typeNames: ["ㄱ, ㄴ, ㄷ", "복합 개념", "문장형"],
  },
  {
    imageSrc: sample7,
    unitId: "U_C2_FUNC_GRAPH",
    typeNames: ["절댓값", "문장형", "그래프/도형"],
    isCompleted: true,
  },
  {
    imageSrc: sample8,
    unitId: "U_C2_FUNC_GRAPH",
    typeNames: ["그래프/도형", "문장형", "복합 개념"],
  },
  {
    imageSrc: sample9,
    unitId: "U_C2_GEO_EQ",
    typeNames: ["문장형", "그래프/도형", "복합 개념"],
  },
  {
    imageSrc: sample10,
    unitId: "U_C2_SET_PROP",
    typeNames: ["문장형", "조건별 상황 나누기", "복합 개념"],
  },
];

const subjectNameOfUnit = (unitId: UnitId) => {
  const subjectId = UNIT_BY_ID[unitId]?.subjectId;
  return (subjectId && SUBJECT_NAME_BY_ID[subjectId]) || unitId;
};

export const COACH_MARK_PRACTICE_PROBLEMS: readonly CoachMarkPracticeProblem[] =
  SEEDS.map((seed, index) => ({
    id: `practice-${index + 1}`,
    imageSrc: seed.imageSrc,
    title: `${subjectNameOfUnit(seed.unitId)} 문제`,
    subjectName: subjectNameOfUnit(seed.unitId),
    unitId: seed.unitId,
    unitName: UNIT_NAME_BY_ID[seed.unitId] ?? seed.unitId,
    typeNames: seed.typeNames,
    isCompleted: seed.isCompleted ?? false,
  }));

type StatCounts = { solved: number; unsolved: number };

const toGraphGroup = (
  id: string,
  label: string,
  counts: StatCounts
): GraphGroup => ({
  id,
  label,
  rows: [
    { id: "unsolved", label: "오답 전", value: counts.unsolved, tone: "inactive" },
    { id: "solved", label: "오답 완료", value: counts.solved, tone: "active" },
  ],
});

const collectCounts = (
  keysOf: (problem: CoachMarkPracticeProblem) => readonly string[]
) => {
  const counts = new Map<string, StatCounts>();

  COACH_MARK_PRACTICE_PROBLEMS.forEach((problem) => {
    keysOf(problem).forEach((key) => {
      const current = counts.get(key) ?? { solved: 0, unsolved: 0 };
      if (problem.isCompleted) {
        current.solved += 1;
      } else {
        current.unsolved += 1;
      }
      counts.set(key, current);
    });
  });

  return counts;
};

const buildUnitGraphGroups = (): GraphGroup[] => {
  const counts = collectCounts((problem) => [problem.unitId]);

  return Array.from(counts.entries()).map(([unitId, stat]) =>
    toGraphGroup(unitId, UNIT_NAME_BY_ID[unitId] ?? unitId, stat)
  );
};

const buildTypeGraphGroups = (): GraphGroup[] => {
  const counts = collectCounts((problem) => problem.typeNames);

  return Array.from(counts.entries()).map(([typeName, stat]) =>
    toGraphGroup(typeName, typeName, stat)
  );
};

export const COACH_MARK_PRACTICE_UNIT_GRAPH_GROUPS: readonly GraphGroup[] =
  buildUnitGraphGroups();

export const COACH_MARK_PRACTICE_TYPE_GRAPH_GROUPS: readonly GraphGroup[] =
  buildTypeGraphGroups();
