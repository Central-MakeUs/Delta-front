export type GraphItem = {
  id: string;
  label: string;
  rows: readonly [
    { value: number; tone: "active" | "inactive" },
    { value: number; tone: "active" | "inactive" },
  ];
};

export const mockList: readonly GraphItem[] = [
  {
    id: "u1",
    label: "공통수학1",
    rows: [
      { value: 8, tone: "active" },
      { value: 7, tone: "inactive" },
    ],
  },
  {
    id: "u2",
    label: "공통수학2",
    rows: [
      { value: 10, tone: "active" },
      { value: 7, tone: "inactive" },
    ],
  },
  {
    id: "u3",
    label: "대수",
    rows: [
      { value: 12, tone: "active" },
      { value: 11, tone: "inactive" },
    ],
  },
  {
    id: "u4",
    label: "도형",
    rows: [
      { value: 5, tone: "active" },
      { value: 11, tone: "inactive" },
    ],
  },
  {
    id: "u5",
    label: "도형",
    rows: [
      { value: 3, tone: "active" },
      { value: 1, tone: "inactive" },
    ],
  },
] as const;
