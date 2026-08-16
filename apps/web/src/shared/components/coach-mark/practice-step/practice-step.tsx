"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/button/button/button";
import Icon from "@/shared/components/icon/icon";
import ScanCard from "@/shared/components/scan-card/scan-card";
import CoachMarkOverlay from "@/shared/components/coach-mark/coach-mark-overlay/coach-mark-overlay";
import { COACH_MARK_PRACTICE } from "@/shared/components/coach-mark/constants/coach-mark";
import { COACH_MARK_PRACTICE_PROBLEMS } from "@/shared/components/coach-mark/constants/practice-problems";
import { toastSuccess } from "@/shared/components/toast/toast";
import { ROUTES } from "@/shared/constants/routes";
import * as s from "@/shared/components/coach-mark/practice-step/practice-step.css";

const TOAST_BOTTOM_OFFSET_REM = 6.5;
const TOAST_DELAY_MS = 1000;

export const PracticeStep = () => {
  const router = useRouter();
  const hasToastedRef = useRef(false);

  useEffect(() => {
    if (hasToastedRef.current) return;

    const timer = setTimeout(() => {
      hasToastedRef.current = true;
      toastSuccess(COACH_MARK_PRACTICE.TOAST, TOAST_BOTTOM_OFFSET_REM);
    }, TOAST_DELAY_MS);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleViewList = () => {
    router.replace(ROUTES.WRONG.ROOT);
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
        {COACH_MARK_PRACTICE_PROBLEMS.map((problem) => (
          <ScanCard
            key={problem.id}
            title={problem.title}
            subjectName={problem.subjectName}
            unitNames={[problem.unitName, ...problem.typeNames]}
            imageSrc={problem.imageSrc}
            imageAlt={problem.title}
          />
        ))}
      </div>
    </CoachMarkOverlay>
  );
};

export default PracticeStep;
