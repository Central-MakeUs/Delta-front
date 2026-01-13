export interface ChipData {
    label: string;
  }
  
  export interface WrongDetailData {
    title: string;
    subjectChip: string;
    answer: string;
    chips: ChipData[];
  }

  
export const DUMMY_DATA: WrongDetailData = {
  title: "공통수학1 문제",
  subjectChip: "공통수학1",
  answer: "5번",
  chips: [
    {
      label: "다항식",
    },
    {
      label: "수열",
    },
  ],
};
