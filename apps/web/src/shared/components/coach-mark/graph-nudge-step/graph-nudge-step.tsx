"use client";

import { useRouter } from "next/navigation";
import CoachMarkTooltip from "@/shared/components/coach-mark/coach-mark-tooltip/coach-mark-tooltip";
import { COACH_MARK_GRAPH_NUDGE } from "@/shared/components/coach-mark/constants/coach-mark";
import { advanceCoachMark } from "@/shared/components/coach-mark/coach-mark-store";
import { GRAPH_TABS, ROUTES } from "@/shared/constants/routes";
import * as s from "@/shared/components/coach-mark/graph-nudge-step/graph-nudge-step.css";

/**
 * 오답 목록에서 그래프 탭으로 안내하는 단계.
 * 바텀 내비게이션의 그래프 아이템 강조는 BottomNav가 코치마크 단계를 읽어 처리한다.
 * 바텀 내비게이션으로 직접 이동하는 경우는 게이트가 그래프 도착을 감지해 다음 단계로 넘긴다.
 */
export const GraphNudgeStep = () => {
  const router = useRouter();

  const handleGoGraph = () => {
    advanceCoachMark();
    router.push(ROUTES.GRAPH.tab(GRAPH_TABS.UNIT));
  };

  return (
    <div className={s.dock}>
      <CoachMarkTooltip
        className={s.tooltip}
        message={COACH_MARK_GRAPH_NUDGE.TOOLTIP}
        onClick={handleGoGraph}
      />
    </div>
  );
};

export default GraphNudgeStep;
