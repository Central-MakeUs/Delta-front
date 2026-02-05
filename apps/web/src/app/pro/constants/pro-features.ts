export type ProFeatureCode =
  | "pro-01"
  | "pro-02"
  | "pro-03"
  | "pro-04"
  | "pro-05";

export type ProFeatureItem = {
  code: ProFeatureCode;
  proLabel: string; // PRO 01
  ribbonSide: "left" | "right";
  title: string;
  titleEn: string;
  desc: string;
  illustration: ProFeatureCode;
};

export const PRO_FEATURES: ProFeatureItem[] = [
  {
    code: "pro-01",
    proLabel: "PRO 01",
    ribbonSide: "left",
    title: "심층 리포트",
    titleEn: "Logic Analysis",
    desc: "오답을 유형이 아니라\n 왜 틀렸는지까지 파헤쳐서 보여줘요.",
    illustration: "pro-01",
  },
  {
    code: "pro-02",
    proLabel: "PRO 02",
    ribbonSide: "right",
    title: "Click 맞춤형\n문제 PDF 내보내기",
    titleEn: "Efficiency",
    desc: "필요한 오답만 쏙쏙!\n시험지 PDF로 만들어요.",
    illustration: "pro-02",
  },
  {
    code: "pro-03",
    proLabel: "PRO 03",
    ribbonSide: "left",
    title: "AI 과외",
    titleEn: "Personalized Solution",
    desc: "오답이 아닌 틀린 이유를\n명확히 알려줘요.",
    illustration: "pro-03",
  },
  {
    code: "pro-04",
    proLabel: "PRO 04",
    ribbonSide: "right",
    title: "취약점 집중\n유사 문항 제공",
    titleEn: "Expansion",
    desc: "유사 문제로 완전히\n익숙해질 때까지 풀어요.",
    illustration: "pro-04",
  },
  {
    code: "pro-05",
    proLabel: "PRO 05",
    ribbonSide: "left",
    title: "AI 성적\n예측 시뮬레이션",
    titleEn: "Analytics",
    desc: "현재 기준 예상 점수 및\n다음 학습 목표를 알려줘요.",
    illustration: "pro-05",
  },
];
