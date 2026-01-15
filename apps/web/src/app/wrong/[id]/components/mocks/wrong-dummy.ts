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
  answer: string;
  chips: ChipData[];
  isCompleted: boolean;
}

export const DUMMY_DATA_LIST: WrongDetailData[] = [
  {
    id: "1",
    title: "공통수학1 문제",
    subjectChip: "공통수학1",
    imagePath: SampleImg,
    answer: "5번",
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
    answer: "3번",
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
    answer: "2번",
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
    answer: "4번",
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
    answer: "1번",
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

// id로 데이터를 찾는 헬퍼 함수
export const getWrongDetailDataById = (
  id: string
): WrongDetailData | undefined => {
  return DUMMY_DATA_LIST.find((data) => data.id === id);
};

// 기존 호환성을 위한 기본 데이터 (id가 "1"인 데이터)
export const DUMMY_DATA: WrongDetailData = DUMMY_DATA_LIST[0];
