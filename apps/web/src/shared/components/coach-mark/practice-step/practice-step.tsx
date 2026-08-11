"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/button/button/button";
import Icon from "@/shared/components/icon/icon";
import { toastSuccess } from "@/shared/components/toast/toast";
import CoachMarkOverlay from "@/shared/components/coach-mark/coach-mark-overlay/coach-mark-overlay";
import SampleProblemCard from "@/shared/components/coach-mark/practice-step/components/sample-problem-card";
import {
  COACH_MARK_PRACTICE,
  COACH_MARK_PRACTICE_SAMPLE,
} from "@/shared/components/coach-mark/constants/coach-mark";
import { advanceCoachMark } from "@/shared/components/coach-mark/coach-mark-store";
import { ROUTES } from "@/shared/constants/routes";
import * as s from "@/shared/components/coach-mark/practice-step/practice-step.css";

/** 문제 등록 진입 시 연습 문제 10개로 시작하도록 안내하는 화면 */
export const PracticeStep = () => {
  const router = useRouter();
  const hasToastedRef = useRef(false);

  // TODO: 연습 문제 등록 API가 준비되면 여기서 호출하고, 성공 시 토스트를 띄운다.
  useEffect(() => {
    if (hasToastedRef.current) return;
    hasToastedRef.current = true;
    toastSuccess(COACH_MARK_PRACTICE.TOAST, 6.5);
  }, []);

  const handleViewList = () => {
    advanceCoachMark();
    router.push(ROUTES.WRONG.ROOT);
  };

  return (
    <CoachMarkOverlay
      ariaLabel={COACH_MARK_PRACTICE.ARIA_LABEL}
      bodyClassName={s.body}
      footerClassName={s.footer}
      footer={
        <Button
          fullWidth
          tone="complete"
          label={COACH_MARK_PRACTICE.CTA_LABEL}
          onClick={handleViewList}
        />
      }
    >
      <div className={s.banner}>
        <div className={s.bannerTitleRow}>
          <Icon name="ai-pencil" size={2.4} />
          <h2 className={s.bannerTitle}>{COACH_MARK_PRACTICE.TITLE}</h2>
        </div>
        <p className={s.bannerDescription}>
          {COACH_MARK_PRACTICE.DESCRIPTION}
        </p>
      </div>

      <div className={s.grid}>
        {Array.from(
          { length: COACH_MARK_PRACTICE_SAMPLE.PREVIEW_COUNT },
          (_, index) => (
            <SampleProblemCard key={index} />
          )
        )}
      </div>
    </CoachMarkOverlay>
  );
};

export default PracticeStep;
