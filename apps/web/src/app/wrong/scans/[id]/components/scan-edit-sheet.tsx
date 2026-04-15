"use client";

import clsx from "clsx";
import { Button } from "@/shared/components/button/button/button";
import Divider from "@/shared/components/divider/divider";
import Icon from "@/shared/components/icon/icon";
import type { ProblemTypeItem } from "@/shared/apis/problem-type/problem-type-types";
import {
  MATH_SUBJECT_LABELS,
  type MathSubjectLabel,
} from "@/app/wrong/create/constants/option-labels";
import * as s from "@/app/wrong/scans/[id]/page.css";

type ScanEditSheetProps = {
  isOpen: boolean;
  selectedSubject: MathSubjectLabel;
  availableUnits: readonly string[];
  selectedUnit: string;
  selectedTypes: string[];
  customSelectedTypes: string[];
  problemTypes: ProblemTypeItem[];
  onClose: () => void;
  onSubjectChange: (subject: MathSubjectLabel) => void;
  onUnitChange: (unit: string) => void;
  onTypeToggle: (typeName: string) => void;
  onCustomTypeRemove: (typeName: string) => void;
};

const ScanEditSheet = ({
  isOpen,
  selectedSubject,
  availableUnits,
  selectedUnit,
  selectedTypes,
  customSelectedTypes,
  problemTypes,
  onClose,
  onSubjectChange,
  onUnitChange,
  onTypeToggle,
  onCustomTypeRemove,
}: ScanEditSheetProps) => {
  if (!isOpen) return null;

  return (
    <div
      className={s.overlay}
      onClick={(event) => event.target === event.currentTarget && onClose()}
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
                  onClick={() => onSubjectChange(subject)}
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
              <Icon name="triangle" size={1.6} />
              <span>{selectedSubject}</span>
            </div>
            <div className={s.chipGroup}>
              {availableUnits.map((unit) => (
                <button
                  key={unit}
                  type="button"
                  onClick={() => onUnitChange(unit)}
                  className={clsx(
                    s.chipButton,
                    selectedUnit === unit
                      ? s.chipButtonTone.selected
                      : s.chipButtonTone.default
                  )}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>

          <Divider className={s.divider} />

          <div className={s.sheetSection}>
            <div className={s.sheetSectionTitle}>유형</div>
            <div className={s.chipGroup}>
              {problemTypes.map((type) => {
                const active = selectedTypes.includes(type.name);

                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => onTypeToggle(type.name)}
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
                  onClick={() => onCustomTypeRemove(typeName)}
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
            onClick={onClose}
          />
          <button type="button" className={s.closeButton} onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScanEditSheet;
