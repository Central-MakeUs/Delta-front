"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { COACH_MARK_STEPS } from "@/shared/components/coach-mark/constants/coach-mark";
import {
  finishCoachMark,
  useCoachMarkStep,
} from "@/shared/components/coach-mark/coach-mark-store";
import WelcomeStep from "@/shared/components/coach-mark/welcome-step/welcome-step";
import RegisterNudgeStep from "@/shared/components/coach-mark/register-nudge-step/register-nudge-step";
import PracticeStep from "@/shared/components/coach-mark/practice-step/practice-step";
import GraphNudgeStep from "@/shared/components/coach-mark/graph-nudge-step/graph-nudge-step";
import { ROUTES } from "@/shared/constants/routes";

/**
 * 현재 코치마크 단계와 경로를 보고 해당 단계 화면을 띄운다.
 * 코치마크는 온보딩을 마친 직후에만 시작되며, 각 단계는 자신의 대상 경로에서만 렌더링된다.
 */
export const CoachMarkGate = () => {
  const pathname = usePathname();
  const step = useCoachMarkStep();

  // 마지막 단계에서 그래프에 도달하면(말풍선이든 탭이든) 코치마크를 종료한다.
  const shouldFinish =
    step === COACH_MARK_STEPS.GRAPH_NUDGE &&
    pathname.startsWith(ROUTES.GRAPH.ROOT);

  useEffect(() => {
    if (shouldFinish) finishCoachMark();
  }, [shouldFinish]);

  if (!step || shouldFinish) return null;

  switch (step) {
    case COACH_MARK_STEPS.WELCOME:
      return pathname === ROUTES.HOME ? <WelcomeStep /> : null;

    case COACH_MARK_STEPS.REGISTER_NUDGE:
      return pathname === ROUTES.HOME ? <RegisterNudgeStep /> : null;

    case COACH_MARK_STEPS.PRACTICE:
      return pathname === ROUTES.WRONG.CREATE ? <PracticeStep /> : null;

    case COACH_MARK_STEPS.GRAPH_NUDGE:
      return pathname === ROUTES.WRONG.ROOT ? <GraphNudgeStep /> : null;
  }
};

export default CoachMarkGate;
