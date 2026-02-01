"use client";

import { useState } from "react";
import TitleSection from "@/app/wrong/create/components/title-section/title-section";
import { WRONG_CREATE_STEP_COPY } from "@/app/wrong/create/constants/step-copy";
import { Button } from "@/shared/components/button/button/button";
import Loading from "@/shared/components/loading/loading";
import * as s from "@/app/wrong/create/create.css";
import { useStep4Form } from "@/app/wrong/create/hooks/use-step4-form";
import { useWrongCreateRoute } from "@/app/wrong/create/hooks/use-wrong-create-route";
import { useStep1SummaryTransition } from "@/app/wrong/create/hooks/use-step1-summary-transition";
import { useWrongCreateSubmit } from "@/app/wrong/create/hooks/use-wrong-create-submit";
import WrongCreateSteps from "@/app/wrong/create/components/wrong-create-steps/wrong-create-steps";
import { LOADING_MESSAGES } from "@/shared/constants/loading-messages";

export type StepProps = {
  onNextEnabledChange?: (enabled: boolean) => void;
};

const WrongCreatePage = () => {
  const {
    router,
    pathname,
    spString,
    currentStep,
    scanId,
    unitId,
    typeIds,
    goStep,
  } = useWrongCreateRoute();

  const [stepNextEnabled, setStepNextEnabled] = useState(false);

  const copy =
    WRONG_CREATE_STEP_COPY[currentStep as keyof typeof WRONG_CREATE_STEP_COPY];
  const showNext = currentStep === 2 || currentStep === 3 || currentStep === 4;

  const { form, handlers, isNextEnabled: step4Enabled } = useStep4Form();

  const { handleUploaded, isStep1Blocked } = useStep1SummaryTransition({
    currentStep,
    scanId,
    spString,
    pathname,
    router,
    goStep,
  });

  const { canNext, handleNext, isSubmitting } = useWrongCreateSubmit({
    currentStep,
    scanId,
    unitId,
    typeIds,
    stepNextEnabled,
    step4Enabled,
    form,
    goStep,
    router,
  });

  const handleLoadingBack = () => {
    if (currentStep > 1) {
      goStep(currentStep - 1);
      return;
    }
    router.back();
  };

  return (
    <div className={s.page}>
      <TitleSection title={copy.title} subTitle={copy.subTitle} />

      <div className={s.stepShell}>
        <div className={s.stepContent}>
          <WrongCreateSteps
            currentStep={currentStep}
            scanId={scanId}
            isStep1Blocked={isStep1Blocked}
            onUploaded={handleUploaded}
            onNextEnabledChange={setStepNextEnabled}
            form={form}
            handlers={handlers}
          />
        </div>

        {showNext ? (
          <div className={s.nextSection}>
            <Button
              size="60"
              fullWidth
              label="다음"
              tone={canNext ? "dark" : "surface"}
              disabled={!canNext || isSubmitting}
              tabIndex={canNext ? 0 : -1}
              onClick={handleNext}
              className={!canNext ? s.nextDisabled : undefined}
            />
          </div>
        ) : null}
      </div>

      {currentStep === 1 && isStep1Blocked ? (
        <Loading
          variant="overlay"
          message={LOADING_MESSAGES.ANALYZE_UNIT_TYPE}
          onBack={handleLoadingBack}
        />
      ) : null}
    </div>
  );
};

export default WrongCreatePage;
