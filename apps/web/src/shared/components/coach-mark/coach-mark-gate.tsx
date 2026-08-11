"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { COACH_MARK_STEPS } from "@/shared/components/coach-mark/constants/coach-mark";
import {
  advanceCoachMark,
  finishCoachMark,
  useCoachMarkStep,
} from "@/shared/components/coach-mark/coach-mark-store";
import WelcomeStep from "@/shared/components/coach-mark/welcome-step/welcome-step";
import RegisterNudgeStep from "@/shared/components/coach-mark/register-nudge-step/register-nudge-step";
import PracticeStep from "@/shared/components/coach-mark/practice-step/practice-step";
import GraphNudgeStep from "@/shared/components/coach-mark/graph-nudge-step/graph-nudge-step";
import HomeNudgeStep from "@/shared/components/coach-mark/home-nudge-step/home-nudge-step";
import { ROUTES } from "@/shared/constants/routes";

export const CoachMarkGate = () => {
  const pathname = usePathname();
  const step = useCoachMarkStep();

  const isOnGraph = pathname.startsWith(ROUTES.GRAPH.ROOT);

  const shouldAdvanceToGraphNudge =
    step === COACH_MARK_STEPS.PRACTICE && pathname === ROUTES.WRONG.ROOT;

  const shouldAdvanceToHomeNudge =
    step === COACH_MARK_STEPS.GRAPH_NUDGE && isOnGraph;

  const shouldAdvance = shouldAdvanceToGraphNudge || shouldAdvanceToHomeNudge;

  const shouldFinish = step === COACH_MARK_STEPS.HOME_NUDGE && !isOnGraph;

  useEffect(() => {
    if (shouldAdvance) advanceCoachMark();
  }, [shouldAdvance]);

  useEffect(() => {
    if (shouldFinish) finishCoachMark();
  }, [shouldFinish]);

  if (!step || shouldAdvance || shouldFinish) return null;

  switch (step) {
    case COACH_MARK_STEPS.WELCOME:
      return pathname === ROUTES.HOME ? <WelcomeStep /> : null;

    case COACH_MARK_STEPS.REGISTER_NUDGE:
      return pathname === ROUTES.HOME ? <RegisterNudgeStep /> : null;

    case COACH_MARK_STEPS.PRACTICE:
      return pathname === ROUTES.WRONG.CREATE ? <PracticeStep /> : null;

    case COACH_MARK_STEPS.GRAPH_NUDGE:
      return pathname === ROUTES.WRONG.ROOT ? <GraphNudgeStep /> : null;

    case COACH_MARK_STEPS.HOME_NUDGE:
      return <HomeNudgeStep />;
  }
};

export default CoachMarkGate;
