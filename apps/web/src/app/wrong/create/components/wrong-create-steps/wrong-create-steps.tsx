"use client";

import Step1 from "@/app/wrong/create/components/steps/step-1";
import Step2 from "@/app/wrong/create/components/steps/step-2";
import Step3 from "@/app/wrong/create/components/steps/step-3";
import Step4 from "@/app/wrong/create/components/steps/step-4";
import type { ProblemScanCreateResponse } from "@/shared/apis/problem-scan/problem-scan-types";
import type { StepProps } from "@/app/wrong/create/page";
import type {
  Step4FormState,
  Step4Handlers,
} from "@/app/wrong/create/hooks/use-step4-form";

type WrongCreateStepsProps = {
  currentStep: number;
  scanId: number | null;
  isStep1Blocked: boolean;
  onUploaded: (res: ProblemScanCreateResponse) => void;
  onNextEnabledChange: NonNullable<StepProps["onNextEnabledChange"]>;
  form: Step4FormState;
  handlers: Step4Handlers;
};

const WrongCreateSteps = ({
  currentStep,
  scanId,
  isStep1Blocked,
  onUploaded,
  onNextEnabledChange,
  form,
  handlers,
}: WrongCreateStepsProps) => {
  return (
    <>
      {currentStep === 1 && !isStep1Blocked ? (
        <Step1 onNext={onUploaded} disabled={false} />
      ) : null}

      {currentStep === 2 ? (
        <Step2
          key={String(scanId ?? "none")}
          scanId={scanId}
          onNextEnabledChange={onNextEnabledChange}
        />
      ) : null}

      {currentStep === 3 ? (
        <Step3
          key={String(scanId ?? "none")}
          scanId={scanId}
          onNextEnabledChange={onNextEnabledChange}
        />
      ) : null}

      {currentStep === 4 ? (
        <Step4
          scanId={scanId}
          onNextEnabledChange={onNextEnabledChange}
          form={form}
          handlers={handlers}
        />
      ) : null}
    </>
  );
};

export default WrongCreateSteps;
