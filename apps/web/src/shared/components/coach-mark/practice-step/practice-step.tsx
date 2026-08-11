"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/button/button/button";
import Icon from "@/shared/components/icon/icon";
import WrongCard from "@/shared/components/wrong-card/wrong-card";
import sampleImage from "@/shared/assets/images/wrong-sample.png";
import CoachMarkOverlay from "@/shared/components/coach-mark/coach-mark-overlay/coach-mark-overlay";
import {
  COACH_MARK_PRACTICE,
  COACH_MARK_PRACTICE_SAMPLE,
} from "@/shared/components/coach-mark/constants/coach-mark";
import { useRegisterPracticeProblems } from "@/shared/components/coach-mark/practice-step/hooks/use-register-practice-problems";
import { ROUTES } from "@/shared/constants/routes";
import * as s from "@/shared/components/coach-mark/practice-step/practice-step.css";

export const PracticeStep = () => {
  const router = useRouter();

  useRegisterPracticeProblems();

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
        {COACH_MARK_PRACTICE_SAMPLE.PREVIEW_CARD_IDS.map((id) => (
          <WrongCard
            key={id}
            className={s.sampleCard}
            title={COACH_MARK_PRACTICE_SAMPLE.TITLE}
            imageSrc={sampleImage}
            imageAlt={COACH_MARK_PRACTICE_SAMPLE.TITLE}
            chips={{
              primary: COACH_MARK_PRACTICE_SAMPLE.TAG,
              secondary: COACH_MARK_PRACTICE_SAMPLE.CHIPS,
            }}
          />
        ))}
      </div>
    </CoachMarkOverlay>
  );
};

export default PracticeStep;
