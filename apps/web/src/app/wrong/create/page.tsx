"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import TitleSection from "@/app/wrong/create/components/title-section/title-section";
import { WRONG_CREATE_STEP_COPY } from "@/app/wrong/create/constants/step-copy";
import { Button } from "@/shared/components/button/button/button";
import Loading from "@/shared/components/loading/loading";
import * as s from "@/app/wrong/create/create.css";
import { useStep4Form } from "@/app/wrong/create/hooks/step4/use-step4-form";
import { useWrongCreateRoute } from "@/app/wrong/create/hooks/use-wrong-create-route";
import { useStep1SummaryTransition } from "@/app/wrong/create/hooks/step1/use-step1-summary-transition";
import { useWrongCreateSubmit } from "@/app/wrong/create/hooks/use-wrong-create-submit";
import WrongCreateSteps from "@/app/wrong/create/components/wrong-create-steps/wrong-create-steps";
import { LOADING_MESSAGES } from "@/shared/constants/loading-messages";
import { ROUTES } from "@/shared/constants/routes";

export type StepProps = {
  onNextEnabledChange?: (enabled: boolean) => void;
};

const isValidInternalPath = (path: string) => {
  if (!path.startsWith("/")) return false;
  if (path.startsWith("//")) return false;
  return true;
};

const parseFrom = (raw: string | null) => {
  if (!raw) return null;
  try {
    const decoded = decodeURIComponent(raw);
    return isValidInternalPath(decoded) ? decoded : null;
  } catch {
    return null;
  }
};

const WrongCreatePage = () => {
  const {
    router,
    pathname,
    spString,
    params,
    currentStep,
    scanId,
    unitId,
    typeIds,
    goStep,
  } = useWrongCreateRoute();

  const scanKey = scanId ? String(scanId) : "scan-none";

  const [nextState, setNextState] = useState<{
    key: string;
    enabled: boolean;
  }>(() => ({ key: scanKey, enabled: false }));

  const stepNextEnabled = nextState.key === scanKey ? nextState.enabled : false;

  const handleNextEnabledChange = useCallback(
    (enabled: boolean) => {
      setNextState({ key: scanKey, enabled });
    },
    [scanKey]
  );

  useEffect(() => {
    if (currentStep > 1 && !scanId) {
      goStep(1, { scanId: null, unitId: null, typeIds: null });
    }
  }, [currentStep, scanId, goStep, unitId, typeIds]);

  const copy =
    WRONG_CREATE_STEP_COPY[currentStep as keyof typeof WRONG_CREATE_STEP_COPY];
  const showNext = currentStep === 2 || currentStep === 3 || currentStep === 4;

  const { form, handlers } = useStep4Form();

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
    form,
    goStep,
    router,
  });

  const from = useMemo(
    () => parseFrom(params.get("from")) ?? ROUTES.WRONG.ROOT,
    [params]
  );

  const handleLoadingBack = () => {
    router.replace(from);
  };

  return (
    <div className={s.page}>
      <TitleSection title={copy.title} subTitle={copy.subTitle} />

      <div className={s.stepShell}>
        <div className={s.stepContent}>
          <WrongCreateSteps
            key={scanKey}
            currentStep={currentStep}
            scanId={scanId}
            isStep1Blocked={isStep1Blocked}
            onUploaded={handleUploaded}
            onNextEnabledChange={handleNextEnabledChange}
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
