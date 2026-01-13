import SampleImg from "@/shared/assets/images/wrong-sample.png";
import type { WrongCardProps } from "@/app/wrong/(list)/components/wrong-card";

export type WrongCardData = {
  id: string;
  title: string;
  date: string;
  imageSrc: WrongCardProps["imageSrc"];
  imageAlt: string;
  chips: { primary: string; secondary: string[] };
  href: string;
  chapterId: string;
  dropdownIds: string[];
  typeIds: string[];
  isCompleted: boolean;
};

export const WRONG_CARDS: WrongCardData[] = [
  {
    id: "1",
    title: "공통수학1 문제",
    date: "2026.01.06",
    imageSrc: SampleImg,
    imageAlt: "오답 문제 이미지",
    chips: { primary: "공통수학1", secondary: ["다항식", "절댓값"] },
    href: "/wrong/1",
    chapterId: "common-math-1",
    dropdownIds: ["polynomial"],
    typeIds: ["absolute-value"],
    isCompleted: false,
  },
  {
    id: "2",
    title: "다항식 계산 실수",
    date: "2026.01.05",
    imageSrc: SampleImg,
    imageAlt: "오답 문제 이미지",
    chips: { primary: "공통수학1", secondary: ["다항식", "방정식"] },
    href: "/wrong/2",
    chapterId: "common-math-1",
    dropdownIds: ["polynomial", "equation-inequality"],
    typeIds: ["equation"],
    isCompleted: true,
  },
  {
    id: "3",
    title: "절댓값 그래프",
    date: "2026.01.04",
    imageSrc: SampleImg,
    imageAlt: "오답 문제 이미지",
    chips: { primary: "공통수학1", secondary: ["절댓값", "그래프"] },
    href: "/wrong/3",
    chapterId: "common-math-1",
    dropdownIds: ["polynomial"],
    typeIds: ["absolute-value", "graph"],
    isCompleted: false,
  },
  {
    id: "4",
    title: "방정식 풀이",
    date: "2026.01.03",
    imageSrc: SampleImg,
    imageAlt: "오답 문제 이미지",
    chips: { primary: "공통수학2", secondary: ["함수", "그래프"] },
    href: "/wrong/4",
    chapterId: "common-math-2",
    dropdownIds: ["function-graph"],
    typeIds: ["graph"],
    isCompleted: true,
  },
];
