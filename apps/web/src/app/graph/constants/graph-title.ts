import { GRAPH_TABS, type GraphTab } from "@/shared/constants/routes";

export const TITLE_BY_TAB: Record<GraphTab, string> = {
  [GRAPH_TABS.UNIT]: "단원별 분석 그래프",
  [GRAPH_TABS.WRONG]: "유형별 분석 그래프",
};
