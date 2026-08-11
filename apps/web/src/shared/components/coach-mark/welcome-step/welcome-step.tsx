"use client";

import { Button } from "@/shared/components/button/button/button";
import CoachMarkOverlay from "@/shared/components/coach-mark/coach-mark-overlay/coach-mark-overlay";
import WelcomeHero from "@/shared/components/coach-mark/welcome-step/components/welcome-hero";
import WelcomeFeatureList from "@/shared/components/coach-mark/welcome-step/components/welcome-feature-list";
import {
  COACH_MARK_WELCOME,
  COACH_MARK_WELCOME_FEATURES,
} from "@/shared/components/coach-mark/constants/coach-mark";
import { advanceCoachMark } from "@/shared/components/coach-mark/coach-mark-store";
import * as s from "@/shared/components/coach-mark/welcome-step/welcome-step.css";

export const WelcomeStep = () => {
  const handleStart = () => {
    advanceCoachMark();
  };

  return (
    <CoachMarkOverlay
      ariaLabel={COACH_MARK_WELCOME.ARIA_LABEL}
      footer={
        <Button
          fullWidth
          tone="complete"
          label={COACH_MARK_WELCOME.CTA_LABEL}
          onClick={handleStart}
        />
      }
    >
      <header className={s.header}>
        <h2 className={s.title}>{COACH_MARK_WELCOME.TITLE}</h2>
        <p className={s.description}>{COACH_MARK_WELCOME.DESCRIPTION}</p>
      </header>

      <WelcomeHero />

      <WelcomeFeatureList items={COACH_MARK_WELCOME_FEATURES} />
    </CoachMarkOverlay>
  );
};

export default WelcomeStep;
