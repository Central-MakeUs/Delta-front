"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/shared/components/button/button/button";
import { useCreateWrongAnswerCardMutation } from "@/shared/apis/problem-create/hooks/use-create-wrong-answer-card-mutation";
import { useProblemTypesQuery } from "@/shared/apis/problem-type/hooks/use-problem-types-query";
import { readWrongCreateGroupContext } from "@/app/wrong/create/utils/group-context";
import AiSolutionText from "@/app/wrong/create/components/ai-solution-text/ai-solution-text";
import {
  MATH_SUBJECT_LABELS,
  MATH_SUBJECT_TYPE_LABELS,
  type MathSubjectLabel,
} from "@/app/wrong/create/constants/option-labels";
import { ROUTES } from "@/shared/constants/routes";
import ScanAnswerSection, {
  type AnswerMode,
} from "@/app/wrong/scans/[id]/components/scan-answer-section";
import ScanBottomNav from "@/app/wrong/scans/[id]/components/scan-bottom-nav";
import ScanDetailHero from "@/app/wrong/scans/[id]/components/scan-detail-hero";
import ScanEditSheet from "@/app/wrong/scans/[id]/components/scan-edit-sheet";
import * as s from "@/app/wrong/scans/[id]/page.css";

const isMathSubjectLabel = (
  value: string | null | undefined
): value is MathSubjectLabel => {
  return Boolean(
    value && MATH_SUBJECT_LABELS.includes(value as MathSubjectLabel)
  );
};

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

  const createProblemMutation = useCreateWrongAnswerCardMutation();
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

  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] =
    useState<MathSubjectLabel>(initialSubject);
  const [selectedUnit, setSelectedUnit] = useState<string>(initialUnit);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    groupItem?.typeNames ?? []
  );
  const [answerMode, setAnswerMode] = useState<AnswerMode>("objective");
  const [answerChoice, setAnswerChoice] = useState<number | null>(null);
  const [answerText, setAnswerText] = useState("");

  const availableUnits = MATH_SUBJECT_TYPE_LABELS[selectedSubject];
  const resolvedSelectedUnit = availableUnits.includes(selectedUnit as never)
    ? selectedUnit
    : availableUnits[0];
  const customSelectedTypes = selectedTypes.filter(
    (typeName) => !problemTypes.some((type) => type.name === typeName)
  );

  if (!groupItem || !Number.isFinite(scanId)) return null;

  const moveTo = (nextScanId: number) => {
    if (!groupId) return;
    router.push(
      `${ROUTES.WRONG.SCAN_DETAIL(nextScanId)}?group=${encodeURIComponent(groupId)}`
    );
  };

  const handleComplete = () => {
    createProblemMutation.mutate(
      {
        scanId: groupItem.scanId,
        finalUnitId: groupItem.finalUnitId,
        finalTypeIds: groupItem.finalTypeIds,
        answerFormat: answerMode === "objective" ? "CHOICE" : "TEXT",
        answerChoiceNo: answerMode === "objective" ? answerChoice : null,
        answerValue: answerMode === "subjective" ? answerText : null,
      },
      {
        onSuccess: () => {
          router.push(ROUTES.WRONG.CREATE_DONE);
        },
      }
    );
  };

  const handleTypeToggle = (typeName: string) => {
    setSelectedTypes((prev) =>
      prev.includes(typeName)
        ? prev.filter((name) => name !== typeName)
        : [...prev, typeName]
    );
  };

  const handleCustomTypeRemove = (typeName: string) => {
    setSelectedTypes((prev) => prev.filter((name) => name !== typeName));
  };

  return (
    <div className={s.page}>
      <div className={s.body}>
        <ScanDetailHero
          item={groupItem}
          onEditClick={() => setIsEditSheetOpen(true)}
        />

        <ScanAnswerSection
          answerMode={answerMode}
          answerChoice={answerChoice}
          answerText={answerText}
          onAnswerModeChange={setAnswerMode}
          onAnswerChoiceChange={setAnswerChoice}
          onAnswerTextChange={setAnswerText}
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
          disabled={createProblemMutation.isPending}
        />
      </div>

      <ScanEditSheet
        isOpen={isEditSheetOpen}
        selectedSubject={selectedSubject}
        availableUnits={availableUnits}
        selectedUnit={resolvedSelectedUnit}
        selectedTypes={selectedTypes}
        customSelectedTypes={customSelectedTypes}
        problemTypes={problemTypes}
        onClose={() => setIsEditSheetOpen(false)}
        onSubjectChange={setSelectedSubject}
        onUnitChange={setSelectedUnit}
        onTypeToggle={handleTypeToggle}
        onCustomTypeRemove={handleCustomTypeRemove}
      />
    </div>
  );
};

export default WrongScanDetailPage;
