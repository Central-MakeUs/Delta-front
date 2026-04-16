"use client";

import type { ProblemCreateRequest } from "@/shared/apis/problem-create/problem-create-types";
import type { ProblemTypeItem } from "@/shared/apis/problem-type/problem-type-types";
import { inferSubjectiveFormat } from "@/app/wrong/create/utils/answer-format";
import type { WrongCreateGroupItem } from "@/app/wrong/create/utils/group-context";
import { normalize } from "@/app/wrong/create/utils/label-match";
import type { AnswerMode } from "@/app/wrong/scans/[id]/components/scan-answer-section";
import { dedupe, resolveUnitId } from "@/app/wrong/scans/[id]/utils";

export const buildAnswerFields = (
  answerMode: AnswerMode,
  answerChoice: number | null,
  answerText: string
) => {
  const trimmedAnswerValue = answerText.trim();

  return {
    answerFormat:
      answerMode === "objective"
        ? ("CHOICE" as const)
        : inferSubjectiveFormat(trimmedAnswerValue),
    answerChoiceNo: answerMode === "objective" ? answerChoice : null,
    answerValue: answerMode === "subjective" ? trimmedAnswerValue : null,
  };
};

export const resolveItemFinalUnitId = (item: WrongCreateGroupItem) => {
  return resolveUnitId(item.subjectName, item.unitName) ?? item.finalUnitId;
};

export const resolveFinalTypeIds = async ({
  typeNames,
  fallbackTypeIds,
  problemTypes,
  createType,
}: {
  typeNames: string[];
  fallbackTypeIds: string[];
  problemTypes: ProblemTypeItem[];
  createType: (name: string) => Promise<ProblemTypeItem>;
}) => {
  if (typeNames.length === 0) return fallbackTypeIds;

  return dedupe(
    await Promise.all(
      typeNames.map(async (typeName) => {
        const existing = problemTypes.find(
          (type) => normalize(type.name) === normalize(typeName)
        );

        if (existing?.id) return existing.id;

        const created = await createType(typeName.trim());
        return created.id;
      })
    )
  );
};

export const buildProblemPayload = (
  item: WrongCreateGroupItem,
  finalUnitId: string,
  finalTypeIds: string[],
  answerMode: AnswerMode,
  answerChoice: number | null,
  answerText: string
): ProblemCreateRequest => ({
  scanId: item.scanId,
  finalUnitId,
  finalTypeIds,
  ...buildAnswerFields(answerMode, answerChoice, answerText),
});

export const buildStoredProblemPayload = (
  item: WrongCreateGroupItem,
  finalUnitId: string,
  finalTypeIds: string[]
): ProblemCreateRequest => ({
  scanId: item.scanId,
  finalUnitId,
  finalTypeIds,
  answerFormat: item.answerFormat,
  answerChoiceNo: item.answerChoiceNo ?? null,
  answerValue: item.answerValue ?? null,
});

export const buildBulkCreatePayload = async ({
  items,
  currentItem,
  answerMode,
  answerChoice,
  answerText,
  problemTypes,
  createType,
}: {
  items: WrongCreateGroupItem[];
  currentItem: WrongCreateGroupItem;
  answerMode: AnswerMode;
  answerChoice: number | null;
  answerText: string;
  problemTypes: ProblemTypeItem[];
  createType: (name: string) => Promise<ProblemTypeItem>;
}) => {
  const currentFinalUnitId = resolveItemFinalUnitId(currentItem);
  if (!currentFinalUnitId) return null;

  const currentFinalTypeIds = await resolveFinalTypeIds({
    typeNames: currentItem.typeNames,
    fallbackTypeIds: currentItem.finalTypeIds,
    problemTypes,
    createType,
  });
  if (currentFinalTypeIds.length === 0) return null;

  const nextCurrentItem: WrongCreateGroupItem = {
    ...currentItem,
    finalUnitId: currentFinalUnitId,
    finalTypeIds: currentFinalTypeIds,
    ...buildAnswerFields(answerMode, answerChoice, answerText),
  };

  const payloadItems = await Promise.all(
    items.map(async (item) => {
      const effectiveItem =
        item.scanId === nextCurrentItem.scanId ? nextCurrentItem : item;

      if (effectiveItem.scanId === nextCurrentItem.scanId) {
        return buildProblemPayload(
          nextCurrentItem,
          currentFinalUnitId,
          currentFinalTypeIds,
          answerMode,
          answerChoice,
          answerText
        );
      }

      const finalUnitId = resolveItemFinalUnitId(effectiveItem);
      const finalTypeIds = await resolveFinalTypeIds({
        typeNames: effectiveItem.typeNames,
        fallbackTypeIds: effectiveItem.finalTypeIds,
        problemTypes,
        createType,
      });

      return buildStoredProblemPayload(effectiveItem, finalUnitId, finalTypeIds);
    })
  );

  return { nextCurrentItem, payloadItems };
};
