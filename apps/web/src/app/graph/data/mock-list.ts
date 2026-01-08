export type GraphItem = {
  id: string;
  label: string;
  rows: readonly [
    { id: string; value: number; tone: "active" | "inactive" },
    { id: string; value: number; tone: "active" | "inactive" },
  ];
};

export const MOCK_LIST: readonly GraphItem[] = [
  {
    id: "u1",
    label: "공통수학1",
    rows: [
      { id: "u1-active", value: 8, tone: "active" },
      { id: "u1-inactive", value: 7, tone: "inactive" },
    ],
  },
  {
    id: "u2",
    label: "공통수학2",
    rows: [
      { id: "u2-active", value: 10, tone: "active" },
      { id: "u2-inactive", value: 7, tone: "inactive" },
    ],
  },
  {
    id: "u3",
    label: "대수",
    rows: [
      { id: "u3-active", value: 12, tone: "active" },
      { id: "u3-inactive", value: 11, tone: "inactive" },
    ],
  },
  {
    id: "u4",
    label: "도형",
    rows: [
      { id: "u4-active", value: 5, tone: "active" },
      { id: "u4-inactive", value: 11, tone: "inactive" },
    ],
  },
  {
    id: "u5",
    label: "도형",
    rows: [
      { id: "u5-active", value: 3, tone: "active" },
      { id: "u5-inactive", value: 1, tone: "inactive" },
    ],
  },
] as const;
