"use client";

import { useRouter } from "next/navigation";
import CoachMarkTooltip from "@/shared/components/coach-mark/coach-mark-tooltip/coach-mark-tooltip";
import { COACH_MARK_HOME_NUDGE } from "@/shared/components/coach-mark/constants/coach-mark";
import { useDelayedVisible } from "@/shared/components/coach-mark/hooks/use-delayed-visible";
import { ROUTES } from "@/shared/constants/routes";
import * as s from "@/shared/components/coach-mark/home-nudge-step/home-nudge-step.css";

export const HomeNudgeStep = () => {
  const router = useRouter();
  const isVisible = useDelayedVisible(
    true,
    COACH_MARK_HOME_NUDGE.SHOW_DELAY_MS
  );

  const handleGoHome = () => {
    router.push(ROUTES.HOME);
  };

  if (!isVisible) return null;

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
