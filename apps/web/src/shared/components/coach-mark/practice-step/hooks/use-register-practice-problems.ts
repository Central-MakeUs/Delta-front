"use client";

import { useEffect, useRef } from "react";
import sampleImage from "@/shared/assets/images/wrong-sample.png";
import { problemScanApi } from "@/shared/apis/problem-scan/problem-scan-api";
import { useCreateBulkWrongAnswerCardsMutation } from "@/shared/apis/problem-create/hooks/use-create-bulk-wrong-answer-cards-mutation";
import { toastError, toastSuccess } from "@/shared/components/toast/toast";
import {
  COACH_MARK_PRACTICE,
  COACH_MARK_PRACTICE_SAMPLE,
} from "@/shared/components/coach-mark/constants/coach-mark";

const TOAST_BOTTOM_OFFSET_REM = 6.5;

const buildSampleFiles = async (count: number) => {
  const res = await fetch(sampleImage.src);
  const blob = await res.blob();

  return Array.from(
    { length: count },
    (_, index) =>
      new File(
        [blob],
        `${COACH_MARK_PRACTICE_SAMPLE.FILE_NAME_PREFIX}-${index + 1}.png`,
        { type: blob.type || "image/png" }
      )
  );
};

export const useRegisterPracticeProblems = () => {
  const bulkCreate = useCreateBulkWrongAnswerCardsMutation();
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    const register = async () => {
      try {
        const files = await buildSampleFiles(COACH_MARK_PRACTICE_SAMPLE.COUNT);
        const { scanIds } = await problemScanApi.createGroup({ files });

        await bulkCreate.mutateAsync(
          scanIds.map((scanId) => ({
            scanId,
            finalUnitId: COACH_MARK_PRACTICE_SAMPLE.UNIT_ID,
            finalTypeIds: [...COACH_MARK_PRACTICE_SAMPLE.TYPE_IDS],
            answerFormat: "CHOICE" as const,
            answerChoiceNo: COACH_MARK_PRACTICE_SAMPLE.ANSWER_CHOICE_NO,
          }))
        );

        toastSuccess(COACH_MARK_PRACTICE.TOAST, TOAST_BOTTOM_OFFSET_REM);
      } catch (e) {
        if (process.env.NODE_ENV !== "production") {
          console.error("[coach-mark] practice problems register failed", e);
        }
        toastError(COACH_MARK_PRACTICE.TOAST_FAIL, TOAST_BOTTOM_OFFSET_REM);
      }
    };

    void register();
  }, [bulkCreate]);
};

export default useRegisterPracticeProblems;
