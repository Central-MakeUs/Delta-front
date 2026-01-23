"use client";

import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ROUTES } from "@/shared/constants/routes";
import { useCreateWrongAnswerCardMutation } from "@/shared/apis/problem-create/hooks/use-create-wrong-answer-card-mutation";
import { ApiError } from "@/shared/apis/problem-create/problem-create-api";
import type {
  AnswerFormat,
  ProblemCreateRequest,
} from "@/shared/apis/problem-create/problem-create-types";

import {
  inferSubjectiveFormat,
  normalize,
} from "@/app/wrong/create/utils/answer-format";
import type { Step4FormState } from "@/app/wrong/create/hooks/use-step4-form";

type Params = {
  currentStep: number;
  scanId: number | null;
  unitId: string | null;
  typeIds: string | null;
  stepNextEnabled: boolean;
  step4Enabled: boolean;
  form: Step4FormState;
  goStep: (nextStep: number, extra?: Record<string, string | null>) => void;
  router: AppRouterInstance;
};

const parseTypeIds = (raw: string | null) => {
  return (raw ?? "")
    .split(",")
    .map((v) => normalize(v))
    .filter((v): v is string => Boolean(v));
};

export const useWrongCreateSubmit = ({
  currentStep,
  scanId,
  unitId,
  typeIds,
  stepNextEnabled,
  step4Enabled,
  form,
  goStep,
  router,
}: Params) => {
  const createMutation = useCreateWrongAnswerCardMutation();

  const canNext = currentStep === 4 ? step4Enabled : stepNextEnabled;

  const handleNext = async () => {
    if (!canNext) return;

    if (currentStep === 2) {
      goStep(3);
      return;
    }

    if (currentStep === 3) {
      goStep(4);
      return;
    }

    if (currentStep !== 4) return;

    if (createMutation.isPending) return;
    if (!scanId) return;

    const finalUnitId = normalize(unitId);
    const finalTypeIds = parseTypeIds(typeIds);
    const solutionText = normalize(form.solutionText);
    if (!finalUnitId) return;
    if (finalTypeIds.length === 0) return;

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
      finalTypeIds,
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
  };

  return {
    canNext,
    handleNext,
    isSubmitting: createMutation.isPending,
  };
};

export default useWrongCreateSubmit;
