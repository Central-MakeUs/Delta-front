"use client";

import { useCallback, useState } from "react";
import clsx from "clsx";
import Icon from "@/shared/components/icon/icon";
import { Button } from "@/shared/components/button/button/button";
import DirectAddButton from "@/app/wrong/create/components/direct-add-button/direct-add-button";
import * as s from "@/app/wrong/create/components/steps/step.css";
import type { StepProps } from "@/app/wrong/create/page";
import { useStep3Selection } from "@/app/wrong/create/hooks/use-step-3-selection";
import { useCustomTypeOrder } from "@/app/wrong/create/hooks/use-custom-type-order";
import { useAsyncIdLock } from "@/app/wrong/create/hooks/use-async-id-lock";
import Modal from "@/shared/components/modal/modal/modal";

type Step3Props = StepProps & {
  scanId?: number | string | null;
};

type DeleteTarget = { id: string; label: string };

const Step3 = ({ onNextEnabledChange, scanId = null }: Step3Props) => {
  const {
    isTypeLoading,
    viewItems,
    viewSelectedTypeIds,
    suggestedNames,
    addSuggested,
    isAdding,
    draft,
    setDraft,
    openAdd,
    closeAdd,
    commitAdd,
    toggleType,
    removeType,
    updateSortOrder,
  } = useStep3Selection({ scanId, onNextEnabledChange });

  const { lockedId: removingId, run: runRemove } = useAsyncIdLock();

  const { orderedItems, draggingId, isReordering, getSortableProps } =
    useCustomTypeOrder({
      items: viewItems,
      updateSortOrder,
    });

  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);

  const closeDeleteModal = useCallback(() => {
    setDeleteTarget(null);
  }, []);

  const openDeleteModal = useCallback((target: DeleteTarget) => {
    setDeleteTarget(target);
  }, []);

  const handleRemove = useCallback(
    async (typeId: string) => {
      if (isReordering) return;
      await runRemove(typeId, async () => {
        await removeType(typeId);
      });
    },
    [isReordering, removeType, runRemove]
  );

  const confirmDelete = useCallback(() => {
    if (!deleteTarget) return;
    void handleRemove(deleteTarget.id);
  }, [deleteTarget, handleRemove]);

  if (isTypeLoading) return null;

  return (
    <>
      <div className={s.container}>
        {suggestedNames.length > 0 ? (
          <div className={s.buttonGrid}>
            {suggestedNames.map((name) => (
              <Button
                key={name}
                size="56"
                label={`${name} 추가`}
                tone="surface"
                onClick={() => void addSuggested(name)}
              />
            ))}
          </div>
        ) : null}

        <div className={s.buttonGrid}>
          {orderedItems.map((item) => {
            const isSelected = viewSelectedTypeIds.includes(item.id);
            const sortableProps = getSortableProps(item);

            const deletingOrLocked =
              (removingId === item.id && item.custom) || isReordering;

            return (
              <div
                key={item.id}
                className={clsx(
                  s.typeButtonWrap,
                  item.custom && s.typeDraggableArea,
                  draggingId === item.id && s.typeDragging
                )}
                {...sortableProps}
                onContextMenuCapture={(e) => {
                  if (!item.custom) return;
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <div
                  role="button"
                  tabIndex={deletingOrLocked ? -1 : 0}
                  aria-pressed={isSelected}
                  aria-disabled={deletingOrLocked || undefined}
                  className={s.typeCard({
                    tone: isSelected ? "dark" : "surface",
                    disabled: deletingOrLocked,
                  })}
                  onClick={() => {
                    if (deletingOrLocked) return;
                    toggleType(item);
                  }}
                  onKeyDown={(e) => {
                    if (deletingOrLocked) return;
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleType(item);
                    }
                  }}
                >
                  <div className={s.typeCardRow}>
                    <span className={s.typeCardLabel}>{item.label}</span>

                    {item.custom ? (
                      <button
                        type="button"
                        className={clsx(
                          s.typeCardAction,
                          isSelected
                            ? s.typeCardActionOnDark
                            : s.typeCardActionOnSurface,
                          deletingOrLocked && s.typeCardActionDisabled
                        )}
                        disabled={deletingOrLocked}
                        aria-label={`${item.label} 삭제`}
                        onPointerDown={(e) => {
                          // 드래그 시작/버튼 클릭 버블링 방지
                          e.stopPropagation();
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (deletingOrLocked) return;
                          openDeleteModal({ id: item.id, label: item.label });
                        }}
                      >
                        <Icon name="multiple" size={2.4} />
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}

          <DirectAddButton
            mode={isAdding ? "input" : "button"}
            value={draft}
            onValueChange={setDraft}
            onSubmit={() => void commitAdd()}
            onCancel={closeAdd}
            onClick={openAdd}
          />
        </div>
      </div>
      <Modal
        isOpen={Boolean(deleteTarget)}
        onClose={closeDeleteModal}
        title="유형 삭제"
        description="정말 유형을 삭제하시겠어요?"
        cancelLabel="취소"
        confirmLabel="삭제"
        onCancel={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default Step3;
