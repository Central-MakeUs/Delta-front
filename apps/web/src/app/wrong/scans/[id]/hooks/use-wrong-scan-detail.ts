"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import type { ProblemCreateRequest } from "@/shared/apis/problem-create/problem-create-types";
import { useCreateBulkWrongAnswerCardsMutation } from "@/shared/apis/problem-create/hooks/use-create-bulk-wrong-answer-cards-mutation";
import { useCreateCustomTypeMutation } from "@/shared/apis/problem-type/hooks/use-create-custom-type-mutation";
import { useProblemTypesQuery } from "@/shared/apis/problem-type/hooks/use-problem-types-query";
import { useUpdateCustomTypeMutation } from "@/shared/apis/problem-type/hooks/use-update-custom-type-mutation";
import type { ProblemTypeItem } from "@/shared/apis/problem-type/problem-type-types";
import { inferSubjectiveFormat } from "@/app/wrong/create/utils/answer-format";
import {
  MATH_SUBJECT_LABELS,
  MATH_SUBJECT_TYPE_LABELS,
  type MathSubjectLabel,
} from "@/app/wrong/create/constants/option-labels";
import {
  readWrongCreateGroupContext,
  saveWrongCreateGroupContext,
  type WrongCreateGroupItem,
} from "@/app/wrong/create/utils/group-context";
import { normalize } from "@/app/wrong/create/utils/label-match";
import type { AnswerMode } from "@/app/wrong/scans/[id]/components/scan-answer-section";
import {
  dedupe,
  isMathSubjectLabel,
  reorder,
  resolveKnownTypeIds,
  resolveUnitId,
} from "@/app/wrong/scans/[id]/utils";
import { ROUTES } from "@/shared/constants/routes";
import { toastError } from "@/shared/components/toast/toast";

const buildAnswerFields = (
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

export const useWrongScanDetail = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const scanId = Number(params.id as string);
  const groupId = searchParams.get("group");
  const group = useMemo(() => readWrongCreateGroupContext(groupId), [groupId]);
  const groupItems = group?.items ?? [];
  const groupIndex = groupItems.findIndex((item) => item.scanId === scanId);
  const groupItem = groupIndex >= 0 ? groupItems[groupIndex] : null;

  const createProblemMutation = useCreateBulkWrongAnswerCardsMutation();
  const createCustomTypeMutation = useCreateCustomTypeMutation();
  const updateCustomTypeMutation = useUpdateCustomTypeMutation();
  const { data: problemTypes = [] } = useProblemTypesQuery();

  const initialSubject = isMathSubjectLabel(groupItem?.subjectName)
    ? groupItem.subjectName
    : MATH_SUBJECT_LABELS[0];
  const initialUnits = MATH_SUBJECT_TYPE_LABELS[initialSubject];
  const initialUnit = initialUnits.includes(
    (groupItem?.unitName ?? "") as never
  )
    ? (groupItem?.unitName as (typeof initialUnits)[number])
    : initialUnits[0];
  const initialAnswerMode: AnswerMode =
    groupItem?.answerFormat === "CHOICE" ? "objective" : "subjective";

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] =
    useState<MathSubjectLabel>(initialSubject);
  const [selectedUnit, setSelectedUnit] = useState<string>(initialUnit);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    groupItem?.typeNames ?? []
  );
  const [appliedSubject, setAppliedSubject] =
    useState<MathSubjectLabel>(initialSubject);
  const [appliedUnit, setAppliedUnit] = useState<string>(initialUnit);
  const [appliedTypes, setAppliedTypes] = useState<string[]>(
    groupItem?.typeNames ?? []
  );
  const [customTypeDraft, setCustomTypeDraft] = useState("");
  const [isDirectAddOpen, setIsDirectAddOpen] = useState(false);
  const [answerMode, setAnswerMode] = useState<AnswerMode>(initialAnswerMode);
  const [answerChoice, setAnswerChoice] = useState<number | null>(
    groupItem?.answerChoiceNo ?? null
  );
  const [answerText, setAnswerText] = useState(groupItem?.answerValue ?? "");

  const prevItem = groupIndex > 0 ? groupItems[groupIndex - 1] : null;
  const nextItem =
    groupIndex >= 0 && groupIndex < groupItems.length - 1
      ? groupItems[groupIndex + 1]
      : null;
  const availableUnits = MATH_SUBJECT_TYPE_LABELS[selectedSubject];
  const resolvedSelectedUnit = availableUnits.includes(selectedUnit as never)
    ? selectedUnit
    : availableUnits[0];
  const customSelectedTypes = selectedTypes
    .map((typeName) =>
      problemTypes.find(
        (type) =>
          type.custom && normalize(type.name) === normalize(typeName)
      ) ?? null
    )
    .filter((type): type is ProblemTypeItem => Boolean(type));

  const isReady = Boolean(groupItem) && Number.isFinite(scanId);

  const persistGroupItem = (nextItem: WrongCreateGroupItem) => {
    if (!groupId) return;

    const latestGroup = readWrongCreateGroupContext(groupId);
    if (!latestGroup) return;

    saveWrongCreateGroupContext({
      ...latestGroup,
      items: latestGroup.items.map((item) =>
        item.scanId === nextItem.scanId ? nextItem : item
      ),
    });
  };

  const displayItem = useMemo(() => {
    if (!groupItem) return null;

    const resolvedTypeIdsFromSelection = resolveKnownTypeIds(
      appliedTypes,
      problemTypes
    );

    return {
      ...groupItem,
      finalUnitId:
        resolveUnitId(appliedSubject, appliedUnit) ?? groupItem.finalUnitId,
      finalTypeIds:
        resolvedTypeIdsFromSelection.length > 0
          ? resolvedTypeIdsFromSelection
          : groupItem.finalTypeIds,
      subjectName: appliedSubject,
      unitName: appliedUnit,
      typeNames: appliedTypes,
      title: `${appliedUnit} 문제`,
    } satisfies WrongCreateGroupItem;
  }, [appliedSubject, appliedTypes, appliedUnit, groupItem, problemTypes]);

  const persistCurrentAnswer = (
    nextAnswerMode: AnswerMode,
    nextAnswerChoice: number | null,
    nextAnswerText: string
  ) => {
    if (!displayItem) return;

    persistGroupItem({
      ...displayItem,
      ...buildAnswerFields(nextAnswerMode, nextAnswerChoice, nextAnswerText),
    });
  };

  const buildCurrentProblemPayload = (
    item: WrongCreateGroupItem,
    finalUnitId: string,
    finalTypeIds: string[]
  ): ProblemCreateRequest => ({
    scanId: item.scanId,
    finalUnitId,
    finalTypeIds,
    ...buildAnswerFields(answerMode, answerChoice, answerText),
  });

  const moveTo = (nextScanId: number) => {
    if (!groupId) return;
    router.push(
      `${ROUTES.WRONG.SCAN_DETAIL(nextScanId)}?group=${encodeURIComponent(groupId)}`
    );
  };

  const handleComplete = async () => {
    if (!groupItem || !displayItem) return;

    const finalUnitId =
      resolveUnitId(selectedSubject, resolvedSelectedUnit) ??
      groupItem.finalUnitId;
    if (!finalUnitId) return;

    const finalTypeIds =
      selectedTypes.length > 0
        ? dedupe(
            await Promise.all(
              selectedTypes.map(async (typeName) => {
                const existing = problemTypes.find(
                  (type) => normalize(type.name) === normalize(typeName)
                );

                if (existing?.id) return existing.id;

                const created = await createCustomTypeMutation.mutateAsync({
                  name: typeName.trim(),
                });
                return created.id;
              })
            )
          )
        : groupItem.finalTypeIds;

    if (finalTypeIds.length === 0) return;

    const nextItem: WrongCreateGroupItem = {
      ...displayItem,
      finalUnitId,
      finalTypeIds,
      typeNames: selectedTypes,
      ...buildAnswerFields(answerMode, answerChoice, answerText),
    };

    persistGroupItem(nextItem);

    const latestGroup = readWrongCreateGroupContext(groupId);
    const payloadItems = (latestGroup?.items ?? [nextItem]).map((item) =>
      item.scanId === nextItem.scanId
        ? buildCurrentProblemPayload(nextItem, finalUnitId, finalTypeIds)
        : {
            scanId: item.scanId,
            finalUnitId: item.finalUnitId,
            finalTypeIds: item.finalTypeIds,
            answerFormat: item.answerFormat,
            answerChoiceNo: item.answerChoiceNo ?? null,
            answerValue: item.answerValue ?? null,
          }
    );

    createProblemMutation.mutate(payloadItems, {
      onSuccess: () => {
        router.push(
          groupId
            ? `${ROUTES.WRONG.CREATE_DONE}?group=${encodeURIComponent(groupId)}`
            : ROUTES.WRONG.CREATE_DONE
        );
      },
    });
  };

  const handleEditModalClose = () => {
    setSelectedSubject(appliedSubject);
    setSelectedUnit(appliedUnit);
    setSelectedTypes(appliedTypes);
    setIsDirectAddOpen(false);
    setCustomTypeDraft("");
    setIsEditModalOpen(false);
  };

  const handleEditApply = () => {
    if (!groupItem) return;

    const nextAppliedSubject = selectedSubject;
    const nextAppliedUnit = resolvedSelectedUnit;
    const nextAppliedTypes = [...selectedTypes];
    const nextResolvedTypeIds = resolveKnownTypeIds(nextAppliedTypes, problemTypes);

    setAppliedSubject(nextAppliedSubject);
    setAppliedUnit(nextAppliedUnit);
    setAppliedTypes(nextAppliedTypes);

    persistGroupItem({
      ...groupItem,
      finalUnitId:
        resolveUnitId(nextAppliedSubject, nextAppliedUnit) ?? groupItem.finalUnitId,
      finalTypeIds:
        nextResolvedTypeIds.length > 0
          ? nextResolvedTypeIds
          : groupItem.finalTypeIds,
      subjectName: nextAppliedSubject,
      unitName: nextAppliedUnit,
      typeNames: nextAppliedTypes,
      title: `${nextAppliedUnit} 문제`,
      ...buildAnswerFields(answerMode, answerChoice, answerText),
    });

    setIsDirectAddOpen(false);
    setCustomTypeDraft("");
    setIsEditModalOpen(false);
  };

  const handleSubjectChange = (subject: MathSubjectLabel) => {
    const nextUnits = MATH_SUBJECT_TYPE_LABELS[subject];
    setSelectedSubject(subject);
    setSelectedUnit((prev) =>
      nextUnits.includes(prev as never) ? prev : nextUnits[0]
    );
  };

  const handleTypeToggle = (typeName: string) => {
    setSelectedTypes((prev) =>
      prev.includes(typeName)
        ? prev.filter((name) => name !== typeName)
        : [...prev, typeName]
    );
  };

  const handleCustomTypeRemove = (type: ProblemTypeItem) => {
    setSelectedTypes((prev) => prev.filter((name) => name !== type.name));
  };

  const handleCustomTypeMove = (draggedTypeId: string, targetTypeId: string) => {
    const customTypesById = new Map(customSelectedTypes.map((type) => [type.id, type]));
    const currentCustomIds = customSelectedTypes.map((type) => type.id);
    const fromIndex = currentCustomIds.indexOf(draggedTypeId);
    const toIndex = currentCustomIds.indexOf(targetTypeId);

    if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return;

    const nextCustomIds = reorder(currentCustomIds, fromIndex, toIndex);
    const regularSelectedTypes = selectedTypes.filter(
      (typeName) =>
        !customSelectedTypes.some(
          (customType) => normalize(customType.name) === normalize(typeName)
        )
    );
    const nextSelectedTypes = [
      ...regularSelectedTypes,
      ...nextCustomIds
        .map((typeId) => customTypesById.get(typeId)?.name ?? null)
        .filter((typeName): typeName is string => Boolean(typeName)),
    ];

    const previousSelectedTypes = [...selectedTypes];
    setSelectedTypes(nextSelectedTypes);

    void Promise.all(
      nextCustomIds.map((typeId, index) =>
        updateCustomTypeMutation.mutateAsync({
          typeId,
          body: { sortOrder: index + 1 },
        })
      )
    ).catch((error) => {
      console.error("[wrong-scan-detail] Failed to reorder custom types", error);
      setSelectedTypes(previousSelectedTypes);
      toastError("유형 순서 변경에 실패했어요. 잠시 후 다시 시도해 주세요.");
    });
  };

  const handleDirectAddSubmit = async () => {
    const nextTypeName = customTypeDraft.trim();
    if (!nextTypeName) {
      setIsDirectAddOpen(false);
      setCustomTypeDraft("");
      return;
    }

    const existingType = problemTypes.find(
      (type) => normalize(type.name) === normalize(nextTypeName)
    );

    if (existingType) {
      setSelectedTypes((prev) =>
        prev.includes(existingType.name) ? prev : [...prev, existingType.name]
      );
      setCustomTypeDraft("");
      setIsDirectAddOpen(false);
      return;
    }

    try {
      const createdType = await createCustomTypeMutation.mutateAsync({
        name: nextTypeName,
      });

      setSelectedTypes((prev) =>
        prev.includes(createdType.name) ? prev : [...prev, createdType.name]
      );
      setCustomTypeDraft("");
      setIsDirectAddOpen(false);
    } catch (error) {
      console.error("[wrong-scan-detail] Failed to create custom type", error);
      toastError("유형 추가에 실패했어요. 잠시 후 다시 시도해 주세요.");
    }
  };

  const handleAnswerModeChange = (value: AnswerMode) => {
    setAnswerMode(value);

    if (value === "objective") {
      setAnswerText("");
      persistCurrentAnswer(value, answerChoice, "");
      return;
    }

    setAnswerChoice(null);
    persistCurrentAnswer(value, null, answerText);
  };

  const handleAnswerChoiceChange = (value: number | null) => {
    setAnswerChoice(value);
    persistCurrentAnswer(answerMode, value, answerText);
  };

  const handleAnswerTextChange = (value: string) => {
    setAnswerText(value);
    persistCurrentAnswer(answerMode, answerChoice, value);
  };

  return {
    isReady,
    displayItem,
    prevItem,
    nextItem,
    availableUnits,
    resolvedSelectedUnit,
    customSelectedTypes,
    problemTypes,
    selectedSubject,
    selectedTypes,
    customTypeDraft,
    isDirectAddOpen,
    isEditModalOpen,
    answerMode,
    answerChoice,
    answerText,
    isCompleteDisabled:
      createProblemMutation.isPending || createCustomTypeMutation.isPending,
    moveTo,
    handleComplete,
    handleEditModalClose,
    handleEditApply,
    handleSubjectChange,
    handleTypeToggle,
    handleCustomTypeRemove,
    handleCustomTypeMove,
    handleDirectAddSubmit,
    handleAnswerModeChange,
    handleAnswerChoiceChange,
    handleAnswerTextChange,
    openEditModal: () => setIsEditModalOpen(true),
    setSelectedUnit,
    setCustomTypeDraft,
    openDirectAdd: () => setIsDirectAddOpen(true),
    closeDirectAdd: () => {
      setIsDirectAddOpen(false);
      setCustomTypeDraft("");
    },
  };
};
