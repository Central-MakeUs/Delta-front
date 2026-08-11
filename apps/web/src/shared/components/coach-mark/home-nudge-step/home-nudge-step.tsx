"use client";

import { useRouter } from "next/navigation";
import CoachMarkTooltip from "@/shared/components/coach-mark/coach-mark-tooltip/coach-mark-tooltip";
import { COACH_MARK_HOME_NUDGE } from "@/shared/components/coach-mark/constants/coach-mark";
import { ROUTES } from "@/shared/constants/routes";
import * as s from "@/shared/components/coach-mark/home-nudge-step/home-nudge-step.css";

export const HomeNudgeStep = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push(ROUTES.HOME);
  };

  return (
    <div className={s.dock}>
      <CoachMarkTooltip
        className={s.tooltip}
        message={COACH_MARK_HOME_NUDGE.TOOLTIP}
        onClick={handleGoHome}
      />
    </div>
  );
};

export default HomeNudgeStep;
