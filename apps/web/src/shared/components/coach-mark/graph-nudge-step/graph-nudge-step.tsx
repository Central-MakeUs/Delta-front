"use client";

import { useRouter } from "next/navigation";
import CoachMarkTooltip from "@/shared/components/coach-mark/coach-mark-tooltip/coach-mark-tooltip";
import { COACH_MARK_GRAPH_NUDGE } from "@/shared/components/coach-mark/constants/coach-mark";
import { advanceCoachMark } from "@/shared/components/coach-mark/coach-mark-store";
import { GRAPH_TABS, ROUTES } from "@/shared/constants/routes";
import * as s from "@/shared/components/coach-mark/graph-nudge-step/graph-nudge-step.css";

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
