import SampleImg from "@/shared/assets/images/wrong-sample.png";

export const WRONG_CARDS = [
  {
    id: "1",
    title: "공통수학1 문제",
    date: "2026.01.06",
    imageSrc: SampleImg,
    imageAlt: "오답 문제 이미지",
    chips: { primary: "공통수학1", secondary: ["다항식", "절댓값"] },
    href: "/wrong/1",
  },
  {
    id: "2",
    title: "다항식 계산 실수",
    date: "2026.01.05",
    imageSrc: SampleImg,
    imageAlt: "오답 문제 이미지",
    chips: {
      primary: "공통수학1",
      secondary: ["다항식", "인수분해"],
    },
    href: "/wrong/2",
  },
  {
    id: "3",
    title: "절댓값 그래프",
    date: "2026.01.04",
    imageSrc: SampleImg,
    imageAlt: "오답 문제 이미지",
    chips: { primary: "공통수학1", secondary: ["절댓값", "그래프"] },
    href: "/wrong/3",
    onClick: () => {},
  },
  {
    id: "4",
    title: "방정식 풀이",
    date: "2026.01.03",
    imageSrc: SampleImg,
    imageAlt: "오답 문제 이미지",
    chips: { primary: "공통수학1", secondary: ["방정식", "계산"] },
    href: "/wrong/4",
    onClick: () => {},
  },
];
