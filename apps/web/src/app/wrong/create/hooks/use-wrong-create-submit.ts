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
import type { Step4FormState } from "@/app/wrong/create/hooks/step4/use-step4-form";

type Params = {
  currentStep: number;
  scanId: number | null;
  unitId: string | null;
  typeIds: string | null;
  stepNextEnabled: boolean;
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

const DEFAULT_SUBJECTIVE_FORMAT: AnswerFormat = "TEXT";

export const useWrongCreateSubmit = ({
  currentStep,
  scanId,
  unitId,
  typeIds,
  stepNextEnabled,
  form,
  goStep,
  router,
}: Params) => {
  const createMutation = useCreateWrongAnswerCardMutation();

  const canNext = currentStep === 4 ? true : stepNextEnabled;

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
    if (!finalUnitId) return;
    if (finalTypeIds.length === 0) return;

    const memoText = normalize(form.memoText);

    const normalizedAnswerText = normalize(form.answerText);

    const answerFormat: AnswerFormat =
      form.type === "objective"
        ? "CHOICE"
        : normalizedAnswerText
          ? inferSubjectiveFormat(normalizedAnswerText)
          : DEFAULT_SUBJECTIVE_FORMAT;

    const payload: ProblemCreateRequest = {
      scanId,
      finalUnitId,
      finalTypeIds,
      answerFormat,

      ...(form.type === "objective" &&
      form.answerChoice !== null &&
      form.answerChoice >= 1
        ? { answerChoiceNo: form.answerChoice }
        : {}),

      ...(form.type === "subjective" && normalizedAnswerText
        ? { answerValue: normalizedAnswerText }
        : {}),

      ...(memoText ? { memoText } : {}),
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
