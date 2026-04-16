"use client";
import { useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCreateBulkWrongAnswerCardsMutation } from "@/shared/apis/problem-create/hooks/use-create-bulk-wrong-answer-cards-mutation";
import { useCreateCustomTypeMutation } from "@/shared/apis/problem-type/hooks/use-create-custom-type-mutation";
import { useProblemTypesQuery } from "@/shared/apis/problem-type/hooks/use-problem-types-query";
import { useUpdateCustomTypeMutation } from "@/shared/apis/problem-type/hooks/use-update-custom-type-mutation";
import type { ProblemTypeItem } from "@/shared/apis/problem-type/problem-type-types";
import {
  MATH_SUBJECT_TYPE_LABELS,
  type MathSubjectLabel,
} from "@/app/wrong/create/constants/option-labels";
import {
  readWrongCreateGroupContext,
  saveWrongCreateGroupContext,
  type WrongCreateGroupItem,
} from "@/app/wrong/create/utils/group-context";
import { normalize } from "@/app/wrong/create/utils/label-match";
import {
  getInitialScanState,
  resolveKnownTypeIds,
  resolveUnitId,
} from "@/app/wrong/scans/[id]/utils";
import {
  buildAnswerFields,
  buildBulkCreatePayload,
} from "@/app/wrong/scans/[id]/payload";
import { useScanAnswerActions } from "@/app/wrong/scans/[id]/hooks/use-scan-answer-actions";
import {
  buildMovedCustomTypes,
  submitDirectAddType,
} from "@/app/wrong/scans/[id]/type-actions";
import { ROUTES } from "@/shared/constants/routes";
import { toastError } from "@/shared/components/toast/toast";
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
  const initial = getInitialScanState(groupItem);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] =
    useState<MathSubjectLabel>(initial.subject);
  const [selectedUnit, setSelectedUnit] = useState<string>(initial.unit);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    groupItem?.typeNames ?? []
  );
  const [appliedSubject, setAppliedSubject] =
    useState<MathSubjectLabel>(initial.subject);
  const [appliedUnit, setAppliedUnit] = useState<string>(initial.unit);
  const [appliedTypes, setAppliedTypes] = useState<string[]>(
    groupItem?.typeNames ?? []
  );
  const [customTypeDraft, setCustomTypeDraft] = useState("");
  const [isDirectAddOpen, setIsDirectAddOpen] = useState(false);
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
  const prevItem = groupIndex > 0 ? groupItems[groupIndex - 1] : null;
  const nextItem =
    groupIndex >= 0 && groupIndex < groupItems.length - 1
      ? groupItems[groupIndex + 1]
      : null;
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
    const resolvedTypeIds = resolveKnownTypeIds(appliedTypes, problemTypes);
    return {
      ...groupItem,
      finalUnitId:
        resolveUnitId(appliedSubject, appliedUnit) ?? groupItem.finalUnitId,
      finalTypeIds:
        resolvedTypeIds.length > 0 ? resolvedTypeIds : groupItem.finalTypeIds,
      subjectName: appliedSubject,
      unitName: appliedUnit,
      typeNames: appliedTypes,
      title: `${appliedUnit} 문제`,
    } satisfies WrongCreateGroupItem;
  }, [appliedSubject, appliedTypes, appliedUnit, groupItem, problemTypes]);
  const {
    answerMode,
    answerChoice,
    answerText,
    handleAnswerModeChange,
    handleAnswerChoiceChange,
    handleAnswerTextChange,
  } = useScanAnswerActions({
    initialMode: initial.answerMode,
    initialChoice: groupItem?.answerChoiceNo ?? null,
    initialText: groupItem?.answerValue ?? "",
    displayItem,
    persistGroupItem,
  });
  const moveTo = (nextScanId: number) => {
    if (!groupId) return;
    router.push(
      `${ROUTES.WRONG.SCAN_DETAIL(nextScanId)}?group=${encodeURIComponent(groupId)}`
    );
  };

  const handleComplete = async () => {
    if (!groupItem || !displayItem) return;

    const latestGroup = readWrongCreateGroupContext(groupId);
    const result = await buildBulkCreatePayload({
      items: latestGroup?.items ?? [displayItem],
      currentItem: displayItem,
      answerMode,
      answerChoice,
      answerText,
      problemTypes,
      createType: (name) => createCustomTypeMutation.mutateAsync({ name }),
    });
    if (!result) return;

    persistGroupItem(result.nextCurrentItem);
    createProblemMutation.mutate(result.payloadItems, {
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

    const nextSubject = selectedSubject;
    const nextUnit = resolvedSelectedUnit;
    const nextTypes = [...selectedTypes];
    const nextTypeIds = resolveKnownTypeIds(nextTypes, problemTypes);

    setAppliedSubject(nextSubject);
    setAppliedUnit(nextUnit);
    setAppliedTypes(nextTypes);
    persistGroupItem({
      ...groupItem,
      finalUnitId: resolveUnitId(nextSubject, nextUnit) ?? groupItem.finalUnitId,
      finalTypeIds: nextTypeIds.length > 0 ? nextTypeIds : groupItem.finalTypeIds,
      subjectName: nextSubject,
      unitName: nextUnit,
      typeNames: nextTypes,
      title: `${nextUnit} 문제`,
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

  const handleCustomTypeMove = (draggedTypeId: string, targetTypeId: string) => {
    const moved = buildMovedCustomTypes({
      selectedTypes,
      customSelectedTypes,
      draggedTypeId,
      targetTypeId,
    });
    if (!moved) return;

    const previousSelectedTypes = [...selectedTypes];
    setSelectedTypes(moved.nextSelectedTypes);

    void Promise.all(
      moved.nextCustomIds.map((typeId, index) =>
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
    const nextType = await submitDirectAddType({
      draft: customTypeDraft,
      problemTypes,
      createType: (name) => createCustomTypeMutation.mutateAsync({ name }),
    }).catch((error) => {
      console.error("[wrong-scan-detail] Failed to create custom type", error);
      toastError("유형 추가에 실패했어요. 잠시 후 다시 시도해 주세요.");
      return undefined;
    });

    if (nextType) {
      setSelectedTypes((prev) =>
        prev.includes(nextType.name) ? prev : [...prev, nextType.name]
      );
    }

    setCustomTypeDraft("");
    setIsDirectAddOpen(false);
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
    handleTypeToggle: (typeName: string) => {
      setSelectedTypes((prev) =>
        prev.includes(typeName)
          ? prev.filter((name) => name !== typeName)
          : [...prev, typeName]
      );
    },
    handleCustomTypeRemove: (type: ProblemTypeItem) => {
      setSelectedTypes((prev) => prev.filter((name) => name !== type.name));
    },
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
