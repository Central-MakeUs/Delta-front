import SampleImg from "@/shared/assets/images/wrong-sample.png";
import { StaticImageData } from "next/image";

export interface ChipData {
  label: string;
}

export interface WrongDetailData {
  id: string;
  title: string;
  subjectChip: string;
  imagePath: StaticImageData | string;
  questionType: "objective" | "subjective";
  answerChoice: number | null;
  answerText: string | null;
  chips: ChipData[];
  isCompleted: boolean;
}

export const DUMMY_DATA_LIST: WrongDetailData[] = [
  {
    id: "1",
    title: "공통수학1 문제",
    subjectChip: "공통수학1",
    imagePath: SampleImg,
    questionType: "subjective",
    answerChoice: null,
    answerText: "x^2 + 2x - 3 = 0",
    chips: [
      {
        label: "다항식",
      },
      {
        label: "수열",
      },
    ],
    isCompleted: false,
  },
  {
    id: "2",
    title: "미적분 문제",
    subjectChip: "미적분",
    imagePath: SampleImg,
    questionType: "objective",
    answerChoice: 3,
    answerText: null,
    chips: [
      {
        label: "극한",
      },
      {
        label: "미분",
      },
      {
        label: "적분",
      },
    ],
    isCompleted: true,
  },
  {
    id: "3",
    title: "확률과 통계 문제",
    subjectChip: "확률과 통계",
    imagePath: SampleImg,
    questionType: "subjective",
    answerChoice: null,
    answerText: "2x^2 + 4x - 6 = 0",
    chips: [
      {
        label: "조합",
      },
      {
        label: "확률",
      },
    ],
    isCompleted: false,
  },
  {
    id: "4",
    title: "기하 문제",
    subjectChip: "기하",
    imagePath: SampleImg,
    questionType: "objective",
    answerChoice: 4,
    answerText: null,
    chips: [
      {
        label: "평면기하",
      },
      {
        label: "입체기하",
      },
      {
        label: "벡터",
      },
    ],
    isCompleted: false,
  },
  {
    id: "5",
    title: "이차방정식 문제",
    subjectChip: "공통수학1",
    imagePath: SampleImg,
    questionType: "subjective",
    answerChoice: null,
    answerText: "x^2 + 2x - 3 = 0",
    chips: [
      {
        label: "이차방정식",
      },
      {
        label: "근의 공식",
      },
    ],
    isCompleted: true,
  },
];
// 이후 지울 예정
export const getWrongDetailDataById = (
  id: string
): WrongDetailData | undefined => {
  return DUMMY_DATA_LIST.find((data) => data.id === id);
};

export const DUMMY_DATA: WrongDetailData = DUMMY_DATA_LIST[0];
