"use client";

import { useRouter } from "next/navigation";
import Icon from "@/shared/components/icon/icon";
import * as fabStyles from "@/shared/components/button/fab-button/fab-button.css";
import CoachMarkTooltip from "@/shared/components/coach-mark/coach-mark-tooltip/coach-mark-tooltip";
import { COACH_MARK_REGISTER_NUDGE } from "@/shared/components/coach-mark/constants/coach-mark";
import { advanceCoachMark } from "@/shared/components/coach-mark/coach-mark-store";
import { ROUTES } from "@/shared/constants/routes";
import { buildWrongCreateHref } from "@/shared/utils/wrong-create-href";
import * as s from "@/shared/components/coach-mark/register-nudge-step/register-nudge-step.css";

export const RegisterNudgeStep = () => {
  const router = useRouter();

  const handleRegister = () => {
    advanceCoachMark();
    router.push(buildWrongCreateHref(ROUTES.HOME));
  };

  return (
    <div role="dialog" aria-modal="true" aria-label={COACH_MARK_REGISTER_NUDGE.ARIA_LABEL}>
      <div className={s.dim} />

      <div className={s.dock}>
        <CoachMarkTooltip
          className={s.tooltip}
          message={COACH_MARK_REGISTER_NUDGE.TOOLTIP}
          onClick={handleRegister}
        />

        <div className={s.fabWrap}>
          <button
            type="button"
            className={fabStyles.fabButton}
            aria-label="오답 등록하기"
            onClick={handleRegister}
          >
            <Icon name="file" size={2.4} className={fabStyles.icon} />
          </button>
          <Icon name="coach-hand" size={3.6} className={s.hand} />
        </div>
      </div>
    </div>
  );
};

export default RegisterNudgeStep;
