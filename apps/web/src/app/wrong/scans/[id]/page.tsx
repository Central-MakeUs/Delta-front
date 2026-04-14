"use client";

import clsx from "clsx";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/shared/components/button/button/button";
import { Toggle } from "@/shared/components/toggle/toggle";
import { NumberChoice } from "@/shared/components/number-choice/number-choice";
import TextField from "@/shared/components/text-field/text-field";
import Icon from "@/shared/components/icon/icon";
import { useCreateWrongAnswerCardMutation } from "@/shared/apis/problem-create/hooks/use-create-wrong-answer-card-mutation";
import { useProblemTypesQuery } from "@/shared/apis/problem-type/hooks/use-problem-types-query";
import { readWrongCreateGroupContext } from "@/app/wrong/create/utils/group-context";
import AiSolutionText from "../../create/components/ai-solution-text/ai-solution-text";
import {
  MATH_SUBJECT_LABELS,
  MATH_SUBJECT_TYPE_LABELS,
  TOGGLE_OPTIONS,
  type MathSubjectLabel,
} from "@/app/wrong/create/constants/option-labels";
import { ROUTES } from "@/shared/constants/routes";
import * as s from "./page.css";

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

  const [isProblemMenuOpen, setIsProblemMenuOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] =
    useState<MathSubjectLabel>(initialSubject);
  const [selectedUnit, setSelectedUnit] = useState<string>(initialUnit);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    groupItem?.typeNames ?? []
  );
  const [answerMode, setAnswerMode] = useState<"objective" | "subjective">(
    groupItem?.answerFormat === "CHOICE" ? "objective" : "subjective"
  );
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

  const title = `문제 (${groupIndex + 1}/${groupItems.length})`;

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

  return (
    <div className={s.page}>
      <div className={s.header}>
        <div className={s.headerSide}>
          <button
            type="button"
            className={s.iconButton}
            onClick={() =>
              router.push(
                `${ROUTES.WRONG.CREATE_SCANS}?group=${encodeURIComponent(groupId ?? "")}`
              )
            }
          >
            <Icon name="chevron" size={2.4} rotate={180} />
          </button>
        </div>

        <div className={s.headerTitleWrap}>
          <button
            type="button"
            className={s.headerTitleButton}
            onClick={() => setIsProblemMenuOpen((prev) => !prev)}
          >
            {title}
          </button>

          {isProblemMenuOpen ? (
            <div className={s.dropdown}>
              {groupItems.map((item, index) => (
                <button
                  key={item.scanId}
                  type="button"
                  onClick={() => moveTo(item.scanId)}
                  className={clsx(
                    s.dropdownItem,
                    index === groupIndex && s.dropdownItemActive
                  )}
                >
                  {`${index + 1}) ${item.unitName}`}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className={s.headerSkip}>건너뛰기</div>
      </div>

      <div className={s.body}>
        <div className={s.heroHeader}>
          <div className={s.heroMeta}>
            <div className={s.chipRow}>
              <div className={s.subjectChip}>{groupItem.subjectName}</div>
              {groupItem.typeNames.map((typeName) => (
                <div key={typeName} className={s.typeChip}>
                  {typeName}
                </div>
              ))}
            </div>
            <div className={s.heroTitle}>{groupItem.title}</div>
          </div>

          <button
            type="button"
            className={s.editButton}
            onClick={() => setIsEditSheetOpen(true)}
          >
            <Icon name="edit" size={2} />단원 수정하기
          </button>
        </div>

        <div className={s.imageWrap}>
          <Image
            src={groupItem.imageUrl}
            alt={groupItem.title}
            fill
            unoptimized
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className={s.section}>
          <div className={s.sectionHeader}>
            <div className={s.sectionTitle}>정답</div>
            <Toggle
              value={answerMode}
              onValueChange={(value) =>
                setAnswerMode(value as "objective" | "subjective")
              }
              options={TOGGLE_OPTIONS}
            />
          </div>

          {answerMode === "objective" ? (
            <NumberChoice value={answerChoice} onValueChange={setAnswerChoice} />
          ) : (
            <TextField
              value={answerText}
              onChange={(event) => setAnswerText(event.target.value)}
              placeholder="정답을 입력해 주세요."
              fullWidth
            />
          )}
        </div>

        <AiSolutionText />
      </div>

      <div className={s.bottomNav}>
        <button
          type="button"
          className={s.navButton}
          disabled={!prevItem}
          onClick={() => prevItem && moveTo(prevItem.scanId)}
        >
          <Icon name="chevron" size={1.6} rotate={180} />
          이전 문제
        </button>
        <button
          type="button"
          className={s.navButton}
          disabled={!nextItem}
          onClick={() => nextItem && moveTo(nextItem.scanId)}
        >
          다음 문제
          <Icon name="chevron" size={1.6} />
        </button>
      </div>

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

      {isEditSheetOpen ? (
        <div
          className={s.overlay}
          onClick={(e) =>
            e.target === e.currentTarget && setIsEditSheetOpen(false)
          }
        >
          <div className={s.sheet}>
            <div className={s.sheetHeader}>유형 & 단원 분류 수정</div>

            <div className={s.sheetBody}>
              <div className={s.sheetSection}>
                <div className={s.sheetSectionTitle}>단원</div>
                <div className={s.chipGroup}>
                  {MATH_SUBJECT_LABELS.map((subject) => (
                    <button
                      key={subject}
                      type="button"
                      onClick={() => setSelectedSubject(subject)}
                      className={clsx(
                        s.chipButton,
                        selectedSubject === subject
                          ? s.chipButtonTone.selected
                          : s.chipButtonTone.default
                      )}
                    >
                      {subject}
                    </button>
                  ))}
                </div>
              </div>

              <div className={s.sheetSection}>
                <div className={s.subjectUnitHeader}>
                  <Icon name="triangle" size={1.6} rotate={90} />
                  <span>{selectedSubject}</span>
                </div>
                <div className={s.chipGroup}>
                  {availableUnits.map((unit) => (
                    <button
                      key={unit}
                      type="button"
                      onClick={() => setSelectedUnit(unit)}
                      className={clsx(
                        s.chipButton,
                        resolvedSelectedUnit === unit
                          ? s.chipButtonTone.selected
                          : s.chipButtonTone.default
                      )}
                    >
                      {unit}
                    </button>
                  ))}
                </div>
              </div>

              <div className={s.divider} />

              <div className={s.sheetSection}>
                <div className={s.sheetSectionTitle}>유형</div>
                <div className={s.chipGroup}>
                  {problemTypes.map((type) => {
                    const active = selectedTypes.includes(type.name);

                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() =>
                          setSelectedTypes((prev) =>
                            prev.includes(type.name)
                              ? prev.filter((name) => name !== type.name)
                              : [...prev, type.name]
                          )
                        }
                        className={clsx(
                          s.chipButton,
                          active
                            ? s.chipButtonTone.selected
                            : s.chipButtonTone.default
                        )}
                      >
                        {type.name}
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    className={s.addTypeChip}
                    onClick={() => undefined}
                  >
                    <Icon name="plus-circle" size={2} />
                    직접 추가하기
                  </button>

                  {customSelectedTypes.map((typeName) => (
                    <button
                      key={`custom-${typeName}`}
                      type="button"
                      className={s.customTypeChip}
                      onClick={() =>
                        setSelectedTypes((prev) =>
                          prev.filter((name) => name !== typeName)
                        )
                      }
                    >
                      <span>{typeName}</span>
                      <Icon name="multiple" size={2} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={s.sheetFooter}>
              <Button
                fullWidth
                size="48"
                tone="dark"
                label="수정 완료"
                onClick={() => setIsEditSheetOpen(false)}
              />
              <button
                type="button"
                className={s.closeButton}
                onClick={() => setIsEditSheetOpen(false)}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default WrongScanDetailPage;

