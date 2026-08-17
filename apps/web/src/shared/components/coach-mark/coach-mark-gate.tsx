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

type GateAction = "advance" | "finish" | null;

export const CoachMarkGate = () => {
  const pathname = usePathname();
  const step = useCoachMarkStep();

  const isOnGraph = pathname.startsWith(ROUTES.GRAPH.ROOT);

  const action: GateAction = (() => {
    switch (step) {
      case null:
        return null;

      case COACH_MARK_STEPS.WELCOME:
        return pathname === ROUTES.HOME ||
          pathname === ROUTES.AUTH.SIGNUP_INFO
          ? null
          : "finish";

      case COACH_MARK_STEPS.REGISTER_NUDGE:
        if (pathname === ROUTES.WRONG.CREATE) return "advance";
        return pathname === ROUTES.HOME ? null : "finish";

      case COACH_MARK_STEPS.PRACTICE:
        if (pathname === ROUTES.WRONG.ROOT) return "advance";
        return pathname.startsWith(ROUTES.WRONG.CREATE) ? null : "finish";

      case COACH_MARK_STEPS.GRAPH_NUDGE:
        if (isOnGraph) return "advance";
        return pathname.startsWith(ROUTES.WRONG.ROOT) ? null : "finish";

      case COACH_MARK_STEPS.HOME_NUDGE:
        return isOnGraph ? null : "finish";
    }
  })();

  useEffect(() => {
    if (action === "advance") advanceCoachMark();
    if (action === "finish") finishCoachMark();
  }, [action, step, pathname]);

  if (!step || action) return null;

  switch (step) {
    case COACH_MARK_STEPS.WELCOME:
      return pathname === ROUTES.HOME ? <WelcomeStep /> : null;

    case COACH_MARK_STEPS.REGISTER_NUDGE:
      return <RegisterNudgeStep />;

    case COACH_MARK_STEPS.PRACTICE:
      return pathname === ROUTES.WRONG.CREATE ? <PracticeStep /> : null;

    case COACH_MARK_STEPS.GRAPH_NUDGE:
      return pathname === ROUTES.WRONG.ROOT ? <GraphNudgeStep /> : null;

    case COACH_MARK_STEPS.HOME_NUDGE:
      return <HomeNudgeStep />;
  }
};

export default CoachMarkGate;
