"use client";

import { useRouter } from "next/navigation";
import CoachMarkTooltip from "@/shared/components/coach-mark/coach-mark-tooltip/coach-mark-tooltip";
import { COACH_MARK_HOME_NUDGE } from "@/shared/components/coach-mark/constants/coach-mark";
import { finishCoachMark } from "@/shared/components/coach-mark/coach-mark-store";
import { ROUTES } from "@/shared/constants/routes";
import * as s from "@/shared/components/coach-mark/home-nudge-step/home-nudge-step.css";

/**
 * 그래프까지 둘러본 뒤 홈으로 돌아가 직접 등록하도록 안내하는 마지막 단계.
 * 실제 FAB가 그대로 보이는 상태에서 그 옆에 말풍선만 띄운다.
 */
export const HomeNudgeStep = () => {
  const router = useRouter();

  const handleGoHome = () => {
    finishCoachMark();
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
