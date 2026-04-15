"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/shared/components/button/button/button";
import { useCreateBulkWrongAnswerCardsMutation } from "@/shared/apis/problem-create/hooks/use-create-bulk-wrong-answer-cards-mutation";
import { useCreateCustomTypeMutation } from "@/shared/apis/problem-type/hooks/use-create-custom-type-mutation";
import { useProblemTypesQuery } from "@/shared/apis/problem-type/hooks/use-problem-types-query";
import { useSetProblemTypeActiveMutation } from "@/shared/apis/problem-type/hooks/use-set-problem-type-active-mutation";
import { useUpdateCustomTypeMutation } from "@/shared/apis/problem-type/hooks/use-update-custom-type-mutation";
import type { ProblemTypeItem } from "@/shared/apis/problem-type/problem-type-types";
import type { ProblemCreateRequest } from "@/shared/apis/problem-create/problem-create-types";
import {
  readWrongCreateGroupContext,
  saveWrongCreateGroupContext,
  type WrongCreateGroupItem,
} from "@/app/wrong/create/utils/group-context";
import { inferSubjectiveFormat } from "@/app/wrong/create/utils/answer-format";
import AiSolutionText from "@/app/wrong/create/components/ai-solution-text/ai-solution-text";
import {
  MATH_SUBJECT_LABELS,
  MATH_SUBJECT_TYPE_LABELS,
  type MathSubjectLabel,
} from "@/app/wrong/create/constants/option-labels";
import { matchByLabel, normalize } from "@/app/wrong/create/utils/label-match";
import { ROUTES } from "@/shared/constants/routes";
import {
  CHAPTER_DROPDOWN_OPTIONS,
  CHAPTER_FILTERS,
} from "@/app/wrong/(list)/constants/wrong-filters";
import ScanAnswerSection, {
  type AnswerMode,
} from "@/app/wrong/scans/[id]/components/scan-answer-section";
import ScanBottomNav from "@/app/wrong/scans/[id]/components/scan-bottom-nav";
import ScanDetailHero from "@/app/wrong/scans/[id]/components/scan-detail-hero";
import ScanEditModal from "@/app/wrong/scans/[id]/components/scan-edit-modal";
import { toastError } from "@/shared/components/toast/toast";
import * as s from "@/app/wrong/scans/[id]/page.css";

const dedupe = (values: string[]) => Array.from(new Set(values.filter(Boolean)));

const reorder = <T,>(values: T[], fromIndex: number, toIndex: number) => {
  const next = values.slice();
  const [moved] = next.splice(fromIndex, 1);
  if (moved === undefined) return values;
  next.splice(toIndex, 0, moved);
  return next;
};

const isMathSubjectLabel = (
  value: string | null | undefined
): value is MathSubjectLabel => {
  return Boolean(
    value && MATH_SUBJECT_LABELS.includes(value as MathSubjectLabel)
  );
};

const resolveUnitId = (subjectName: string, unitName: string) => {
  const chapter = matchByLabel(CHAPTER_FILTERS, subjectName);
  if (!chapter) return null;

  const unit = matchByLabel(
    CHAPTER_DROPDOWN_OPTIONS[chapter.id] ?? [],
    unitName
  );
  return unit?.id ?? null;
};

const resolveKnownTypeIds = (
  typeNames: string[],
  problemTypes: { id: string; name: string }[]
) =>
  dedupe(
    typeNames
      .map(
        (typeName) =>
          problemTypes.find((type) => normalize(type.name) === normalize(typeName))
            ?.id ?? null
      )
      .filter((typeId): typeId is string => Boolean(typeId))
  );

const WrongScanDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const scanId = Number(params.id as string);
  const groupId = searchParams.get("group");
  const group = useMemo(() => readWrongCreateGroupContext(groupId), [groupId]);
  const groupItems = group?.items ?? [];
  const groupIndex = groupItems.findIndex((item) => item.scanId === scanId);
  const groupItem = groupIndex >= 0 ? groupItems[groupIndex] : null;
  const prevItem = groupIndex > 0 ? groupItems[groupIndex - 1] : null;
  const nextItem =
    groupIndex >= 0 && groupIndex < groupItems.length - 1
      ? groupItems[groupIndex + 1]
      : null;

  const createProblemMutation = useCreateBulkWrongAnswerCardsMutation();
  const createCustomTypeMutation = useCreateCustomTypeMutation();
  const setProblemTypeActiveMutation = useSetProblemTypeActiveMutation();
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
  const [answerMode, setAnswerMode] = useState<AnswerMode>("objective");
  const [answerChoice, setAnswerChoice] = useState<number | null>(
    groupItem?.answerChoiceNo ?? null
  );
  const [answerText, setAnswerText] = useState(groupItem?.answerValue ?? "");

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

  if (!groupItem || !Number.isFinite(scanId)) return null;

  const resolvedTypeIdsFromSelection = resolveKnownTypeIds(
    appliedTypes,
    problemTypes
  );

  const displayItem: WrongCreateGroupItem = {
    ...groupItem,
    finalUnitId: resolveUnitId(appliedSubject, appliedUnit) ?? groupItem.finalUnitId,
    finalTypeIds:
      resolvedTypeIdsFromSelection.length > 0
        ? resolvedTypeIdsFromSelection
        : groupItem.finalTypeIds,
    subjectName: appliedSubject,
    unitName: appliedUnit,
    typeNames: appliedTypes,
    title: `${appliedUnit} 문제`,
  };

  const moveTo = (nextScanId: number) => {
    if (!groupId) return;
    router.push(
      `${ROUTES.WRONG.SCAN_DETAIL(nextScanId)}?group=${encodeURIComponent(groupId)}`
    );
  };

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

  const buildCurrentProblemPayload = (
    item: WrongCreateGroupItem,
    finalUnitId: string,
    finalTypeIds: string[]
  ): ProblemCreateRequest => {
    const trimmedAnswerValue = answerText.trim();
    const answerFormat =
      answerMode === "objective"
        ? "CHOICE"
        : inferSubjectiveFormat(trimmedAnswerValue);

    return {
      scanId: item.scanId,
      finalUnitId,
      finalTypeIds,
      answerFormat,
      answerChoiceNo: answerMode === "objective" ? answerChoice : null,
      answerValue: answerMode === "subjective" ? trimmedAnswerValue : null,
    };
  };

  const persistCurrentAnswer = (
    nextAnswerMode: AnswerMode,
    nextAnswerChoice: number | null,
    nextAnswerText: string
  ) => {
    const nextAnswerValue = nextAnswerText.trim();

    persistGroupItem({
      ...displayItem,
      answerFormat:
        nextAnswerMode === "objective"
          ? "CHOICE"
          : inferSubjectiveFormat(nextAnswerValue),
      answerChoiceNo:
        nextAnswerMode === "objective" ? nextAnswerChoice : null,
      answerValue: nextAnswerMode === "subjective" ? nextAnswerValue : null,
    });
  };

  const handleComplete = async () => {
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
      answerFormat:
        answerMode === "objective"
          ? "CHOICE"
          : inferSubjectiveFormat(answerText.trim()),
      answerChoiceNo: answerMode === "objective" ? answerChoice : null,
      answerValue: answerMode === "subjective" ? answerText.trim() : null,
      typeNames: selectedTypes,
    };

    persistGroupItem(nextItem);

    const latestGroup = readWrongCreateGroupContext(groupId);
    const payloadItems = (latestGroup?.items ?? [nextItem]).map((item) => {
      if (item.scanId === nextItem.scanId) {
        return buildCurrentProblemPayload(nextItem, finalUnitId, finalTypeIds);
      }

      return {
        scanId: item.scanId,
        finalUnitId: item.finalUnitId,
        finalTypeIds: item.finalTypeIds,
        answerFormat: item.answerFormat,
        answerChoiceNo: item.answerChoiceNo ?? null,
        answerValue: item.answerValue ?? null,
      } satisfies ProblemCreateRequest;
    });

    createProblemMutation.mutate(
      payloadItems,
      {
        onSuccess: () => {
          router.push(
            groupId
              ? `${ROUTES.WRONG.CREATE_DONE}?group=${encodeURIComponent(groupId)}`
              : ROUTES.WRONG.CREATE_DONE
          );
        },
      }
    );
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
      answerFormat:
        answerMode === "objective"
          ? "CHOICE"
          : inferSubjectiveFormat(answerText.trim()),
      answerChoiceNo: answerMode === "objective" ? answerChoice : null,
      answerValue: answerMode === "subjective" ? answerText.trim() : null,
      subjectName: nextAppliedSubject,
      unitName: nextAppliedUnit,
      typeNames: nextAppliedTypes,
      title: `${nextAppliedUnit} 문제`,
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

  const handleCustomTypeRemove = async (type: ProblemTypeItem) => {
    setSelectedTypes((prev) => prev.filter((name) => name !== type.name));

    try {
      await setProblemTypeActiveMutation.mutateAsync({
        typeId: type.id,
        body: { active: false },
      });
    } catch (error) {
      console.error("[wrong-scan-detail] Failed to deactivate custom type", error);
      setSelectedTypes((prev) =>
        prev.includes(type.name) ? prev : [...prev, type.name]
      );
      toastError("유형 삭제에 실패했어요. 잠시 후 다시 시도해 주세요.");
    }
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

  return (
    <div className={s.page}>
      <div className={s.body}>
        <ScanDetailHero
          item={displayItem}
          onEditClick={() => setIsEditModalOpen(true)}
        />

        <ScanAnswerSection
          answerMode={answerMode}
          answerChoice={answerChoice}
          answerText={answerText}
          onAnswerModeChange={(value) => {
            setAnswerMode(value);

            if (value === "objective") {
              setAnswerText("");
              persistCurrentAnswer(value, answerChoice, "");
              return;
            }

            setAnswerChoice(null);
            persistCurrentAnswer(value, null, answerText);
          }}
          onAnswerChoiceChange={(value) => {
            setAnswerChoice(value);
            persistCurrentAnswer(answerMode, value, answerText);
          }}
          onAnswerTextChange={(value) => {
            setAnswerText(value);
            persistCurrentAnswer(answerMode, answerChoice, value);
          }}
        />

        <AiSolutionText />
      </div>

      <ScanBottomNav prevItem={prevItem} nextItem={nextItem} onMove={moveTo} />

      <div className={s.bottomAction}>
        <Button
          fullWidth
          size="48"
          tone="dark"
          label="완료"
          onClick={handleComplete}
          disabled={
            createProblemMutation.isPending || createCustomTypeMutation.isPending
          }
        />
      </div>

      <ScanEditModal
        isOpen={isEditModalOpen}
        selectedSubject={selectedSubject}
        availableUnits={availableUnits}
        selectedUnit={resolvedSelectedUnit}
        selectedTypes={selectedTypes}
        customSelectedTypes={customSelectedTypes}
        problemTypes={problemTypes}
        customTypeDraft={customTypeDraft}
        isDirectAddOpen={isDirectAddOpen}
        onClose={handleEditModalClose}
        onApply={handleEditApply}
        onSubjectChange={handleSubjectChange}
        onUnitChange={setSelectedUnit}
        onTypeToggle={handleTypeToggle}
        onCustomTypeRemove={handleCustomTypeRemove}
        onCustomTypeMove={handleCustomTypeMove}
        onCustomTypeDraftChange={setCustomTypeDraft}
        onDirectAddOpen={() => setIsDirectAddOpen(true)}
        onDirectAddClose={() => {
          setIsDirectAddOpen(false);
          setCustomTypeDraft("");
        }}
        onDirectAddSubmit={handleDirectAddSubmit}
      />
    </div>
  );
};

export default WrongScanDetailPage;
