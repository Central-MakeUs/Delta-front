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

  // 각 단계는 예상 경로에 도착하면 다음 단계로 넘어가고,
  // 흐름을 벗어난 경로로 이동하면 투어를 완전히 종료한다.
  const action: GateAction = (() => {
    switch (step) {
      case null:
        return null;

      case COACH_MARK_STEPS.WELCOME:
        // 온보딩 제출 직후에는 아직 /login/info에 머물러 있다.
        return pathname === ROUTES.HOME ||
          pathname === ROUTES.AUTH.SIGNUP_INFO
          ? null
          : "finish";

      case COACH_MARK_STEPS.REGISTER_NUDGE:
        if (pathname === ROUTES.WRONG.CREATE) return "advance";
        return pathname === ROUTES.HOME ? null : "finish";

      // 안내를 닫으면(advance) 유저가 실제 등록 플로우를 직접 진행한다.
      case COACH_MARK_STEPS.PRACTICE:
        return pathname.startsWith(ROUTES.WRONG.CREATE) ? null : "finish";

      // 등록 플로우(/wrong 하위 경로)를 도는 동안에는 투어를 유지한다.
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
