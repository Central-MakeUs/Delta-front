"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import TitleSection from "@/app/wrong/create/components/title-section/title-section";
import { parseProgress } from "@/shared/components/app-bar/utils/app-bar-routing";
import { WRONG_CREATE_STEP_COPY } from "@/app/wrong/create/constants/step-copy";

import Step1 from "@/app/wrong/create/components/steps/step-1";
import Step2 from "@/app/wrong/create/components/steps/step-2";
import Step3 from "@/app/wrong/create/components/steps/step-3";
import Step4 from "@/app/wrong/create/components/steps/step-4";
import { Button } from "@/shared/components/button/button/button";

import * as s from "@/app/wrong/create/create.css";

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

const WrongCreatePage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const { total, currentStep } = parseProgress(
    new URLSearchParams(sp.toString())
  );

  const [isNextEnabled, setIsNextEnabled] = useState(false);

  const goStep = (nextStep: number) => {
    // ✅ effect 대신 여기서 리셋
    setIsNextEnabled(false);

    const safe = clamp(nextStep, 1, total);
    const params = new URLSearchParams(sp.toString());
    params.set("step", String(safe));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const copy =
    WRONG_CREATE_STEP_COPY[currentStep as keyof typeof WRONG_CREATE_STEP_COPY];

  const showNext = currentStep === 2 || currentStep === 3 || currentStep === 4;

  const handleNext = () => {
    if (!isNextEnabled) return;

    if (currentStep === 2) goStep(3);
    if (currentStep === 3) goStep(4);
    if (currentStep === 4) {
      setIsNextEnabled(false);
      router.push("/wrong");
    }
  };

  return (
    <div className={s.page}>
      <TitleSection title={copy.title} subTitle={copy.subTitle} />

      <div className={s.stepShell}>
        <div className={s.stepContent}>
          {currentStep === 1 ? <Step1 onNext={() => goStep(2)} /> : null}

          {currentStep === 2 ? (
            <Step2 onNextEnabledChange={setIsNextEnabled} />
          ) : null}

          {currentStep === 3 ? (
            <Step3 onNextEnabledChange={setIsNextEnabled} />
          ) : null}

          {currentStep === 4 ? (
            <Step4
              onPrev={() => goStep(3)}
              onComplete={() => router.push("/wrong")}
              onNextEnabledChange={setIsNextEnabled}
            />
          ) : null}
        </div>

        {showNext ? (
          <div className={s.nextSection}>
            <Button
              size="60"
              fullWidth
              label="다음"
              tone={isNextEnabled ? "dark" : "surface"}
              aria-disabled={!isNextEnabled}
              tabIndex={isNextEnabled ? 0 : -1}
              onClick={handleNext}
              className={!isNextEnabled ? s.nextDisabled : undefined}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default WrongCreatePage;
