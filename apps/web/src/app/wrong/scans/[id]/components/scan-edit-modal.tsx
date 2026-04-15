"use client";
import { useRef } from "react";
import { Button } from "@/shared/components/button/button/button";
import DirectAddButton from "@/app/wrong/create/components/direct-add-button/direct-add-button";
import Divider from "@/shared/components/divider/divider";
import Icon from "@/shared/components/icon/icon";
import type { ProblemTypeItem } from "@/shared/apis/problem-type/problem-type-types";
import {
  MATH_SUBJECT_LABELS,
  type MathSubjectLabel,
} from "@/app/wrong/create/constants/option-labels";
import * as s from "@/app/wrong/scans/[id]/page.css";

type ScanEditModalProps = {
  isOpen: boolean;
  selectedSubject: MathSubjectLabel;
  availableUnits: readonly string[];
  selectedUnit: string;
  selectedTypes: string[];
  customSelectedTypes: ProblemTypeItem[];
  problemTypes: ProblemTypeItem[];
  customTypeDraft: string;
  isDirectAddOpen: boolean;
  onClose: () => void;
  onApply: () => void;
  onSubjectChange: (subject: MathSubjectLabel) => void;
  onUnitChange: (unit: string) => void;
  onTypeToggle: (typeName: string) => void;
  onCustomTypeRemove: (type: ProblemTypeItem) => void | Promise<void>;
  onCustomTypeMove: (draggedTypeId: string, targetTypeId: string) => void;
  onCustomTypeDraftChange: (value: string) => void;
  onDirectAddOpen: () => void;
  onDirectAddClose: () => void;
  onDirectAddSubmit: () => void | Promise<void>;
};

const ScanEditModal = ({
  isOpen,
  selectedSubject,
  availableUnits,
  selectedUnit,
  selectedTypes,
  customSelectedTypes,
  problemTypes,
  customTypeDraft,
  isDirectAddOpen,
  onClose,
  onApply,
  onSubjectChange,
  onUnitChange,
  onTypeToggle,
  onCustomTypeRemove,
  onCustomTypeMove,
  onCustomTypeDraftChange,
  onDirectAddOpen,
  onDirectAddClose,
  onDirectAddSubmit,
}: ScanEditModalProps) => {
  const draggedTypeIdRef = useRef<string | null>(null);

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
                  className={s.chip({
                    kind: "button",
                    tone: selectedSubject === subject ? "selected" : "default",
                  })}
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
                  className={s.chip({
                    kind: "button",
                    tone: selectedUnit === unit ? "selected" : "default",
                  })}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>

          <Divider tone="grayscale-50" className={s.divider} />

          <div className={s.sheetSection}>
            <div className={s.sheetSectionTitle}>유형</div>
            <div className={s.chipGroup}>
              {problemTypes
                .filter((type) => !type.custom)
                .map((type) => {
                const active = selectedTypes.includes(type.name);

                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => onTypeToggle(type.name)}
                    className={s.chip({
                      kind: "button",
                      tone: active ? "selected" : "default",
                    })}
                  >
                    {type.name}
                  </button>
                );
              })}

              {customSelectedTypes.map((type) => (
                <div
                  key={type.id}
                  className={s.customTypeItem}
                  draggable
                  onDragStart={() => {
                    draggedTypeIdRef.current = type.id;
                  }}
                  onDragOver={(event) => {
                    event.preventDefault();
                  }}
                  onDrop={() => {
                    if (
                      !draggedTypeIdRef.current ||
                      draggedTypeIdRef.current === type.id
                    ) {
                      return;
                    }
                    onCustomTypeMove(draggedTypeIdRef.current, type.id);
                    draggedTypeIdRef.current = null;
                  }}
                  onDragEnd={() => {
                    draggedTypeIdRef.current = null;
                  }}
                >
                  <div className={s.chip({ kind: "custom" })}>
                    <span>{type.name}</span>
                    <button
                      type="button"
                      className={s.customTypeRemoveButton}
                      onClick={() => {
                        void onCustomTypeRemove(type);
                      }}
                      aria-label={`${type.name} 삭제`}
                    >
                      <Icon name="multiple" size={2} />
                    </button>
                  </div>
                </div>
              ))}

              {isDirectAddOpen ? (
                <DirectAddButton
                  mode="input"
                  value={customTypeDraft}
                  onValueChange={onCustomTypeDraftChange}
                  onSubmit={onDirectAddSubmit}
                  onCancel={onDirectAddClose}
                  className={s.chip({ kind: "add" })}
                />
              ) : (
                <DirectAddButton
                  className={s.chip({ kind: "add" })}
                  onClick={onDirectAddOpen}
                />
              )}
            </div>
          </div>
        </div>

        <div className={s.sheetFooter}>
          <Button
            fullWidth
            size="48"
            tone="dark"
            label="수정 완료"
            onClick={onApply}
          />
          <button type="button" className={s.closeButton} onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScanEditModal;
