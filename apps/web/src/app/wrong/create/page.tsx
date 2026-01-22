"use client";

import { useState } from "react";
import TitleSection from "@/app/wrong/create/components/title-section/title-section";
import { WRONG_CREATE_STEP_COPY } from "@/app/wrong/create/constants/step-copy";
import Step1 from "@/app/wrong/create/components/steps/step-1";
import Step2 from "@/app/wrong/create/components/steps/step-2";
import Step3 from "@/app/wrong/create/components/steps/step-3";
import Step4 from "@/app/wrong/create/components/steps/step-4";
import AnalysisLoading from "@/app/wrong/create/components/analysis-loading/analysis-loading";
import { Button } from "@/shared/components/button/button/button";
import { ROUTES } from "@/shared/constants/routes";
import * as s from "@/app/wrong/create/create.css";
import { useStep4Form } from "@/app/wrong/create/hooks/use-step4-form";
import { useCreateWrongAnswerCardMutation } from "@/shared/apis/problem-create/hooks/use-create-wrong-answer-card-mutation";
import { ApiError } from "@/shared/apis/problem-create/problem-create-api";
import type {
  AnswerFormat,
  ProblemCreateRequest,
} from "@/shared/apis/problem-create/problem-create-types";
import { useWrongCreateRoute } from "@/app/wrong/create/hooks/use-wrong-create-route";
import { useStep1SummaryTransition } from "@/app/wrong/create/hooks/use-step1-summary-transition";
import {
  inferSubjectiveFormat,
  normalize,
} from "@/app/wrong/create/utils/answer-format";

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
    typeId,
    goStep,
  } = useWrongCreateRoute();

  const [stepNextEnabled, setStepNextEnabled] = useState(false);

  const copy =
    WRONG_CREATE_STEP_COPY[currentStep as keyof typeof WRONG_CREATE_STEP_COPY];
  const showNext = currentStep === 2 || currentStep === 3 || currentStep === 4;

  const { form, handlers, isNextEnabled: step4Enabled } = useStep4Form();

  const createMutation = useCreateWrongAnswerCardMutation();

  const { handleUploaded, isStep1Blocked } = useStep1SummaryTransition({
    currentStep,
    scanId,
    spString,
    pathname,
    router,
    goStep,
  });

  const canNext = currentStep === 4 ? step4Enabled : stepNextEnabled;

  const handleNext = async () => {
    if (!canNext) return;

    if (currentStep === 2) {
      setStepNextEnabled(false);
      goStep(3);
      return;
    }

    if (currentStep === 3) {
      setStepNextEnabled(false);
      goStep(4);
      return;
    }

    if (currentStep === 4) {
      if (createMutation.isPending) return;
      if (!scanId) return;

      const finalUnitId = normalize(unitId);
      const finalTypeId = normalize(typeId);
      const solutionText = normalize(form.solutionText);

      let answerFormat: AnswerFormat;
      let answerChoiceNo: number | null = null;
      let answerValue: string | null = null;

      if (form.type === "objective") {
        answerFormat = "CHOICE";
        answerChoiceNo = form.answerChoice;

        if (answerChoiceNo === null) return;
        if (answerChoiceNo < 1) return;
      } else {
        const v = normalize(form.answerText);
        if (!v) return;

        answerFormat = inferSubjectiveFormat(v);
        answerValue = v;
      }

      const payload: ProblemCreateRequest = {
        scanId,
        finalUnitId,
        finalTypeId,
        answerFormat,
        answerChoiceNo,
        answerValue,
        solutionText,
      };

      try {
        await createMutation.mutateAsync(payload);
        router.push(ROUTES.WRONG.CREATE_DONE);
      } catch (e) {
        const err = e as unknown;
        if (err instanceof ApiError && err.status === 409) {
          router.push(ROUTES.WRONG.CREATE_DONE);
          return;
        }
        return;
      }
    }
  };

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
          {currentStep === 1 && !isStep1Blocked ? (
            <Step1 onNext={handleUploaded} disabled={false} />
          ) : null}

          {currentStep === 2 ? (
            <Step2
              key={String(scanId ?? "none")}
              scanId={scanId}
              onNextEnabledChange={setStepNextEnabled}
            />
          ) : null}

          {currentStep === 3 ? (
            <Step3
              key={String(scanId ?? "none")}
              scanId={scanId}
              onNextEnabledChange={setStepNextEnabled}
            />
          ) : null}

          {currentStep === 4 ? (
            <Step4
              scanId={scanId}
              onNextEnabledChange={setStepNextEnabled}
              form={form}
              handlers={handlers}
            />
          ) : null}
        </div>

        {showNext ? (
          <div className={s.nextSection}>
            <Button
              size="60"
              fullWidth
              label="다음"
              tone={canNext ? "dark" : "surface"}
              disabled={!canNext || createMutation.isPending}
              tabIndex={canNext ? 0 : -1}
              onClick={handleNext}
              className={!canNext ? s.nextDisabled : undefined}
            />
          </div>
        ) : null}
      </div>

      {currentStep === 1 && isStep1Blocked ? (
        <AnalysisLoading onBack={handleLoadingBack} />
      ) : null}
    </div>
  );
};

export default WrongCreatePage;
