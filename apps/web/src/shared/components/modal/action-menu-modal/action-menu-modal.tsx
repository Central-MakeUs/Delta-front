"use client";

import { useEffect, useState } from "react";
import * as s from "@/shared/components/modal/action-menu-modal/action-menu-modal.css";
import CompleteModal from "@/shared/components/modal/complete-modal/complete-modal";
import type { ActionMenuItem } from "@/shared/components/app-bar/types/app-bar";

type Props = {
  isOpen: boolean;
  title?: string;
  items: readonly ActionMenuItem[];
  onClose: () => void;
};

const ActionMenuModal = ({ isOpen, title, items, onClose }: Props) => {
  const [pendingDangerItem, setPendingDangerItem] =
    useState<ActionMenuItem | null>(null);
  const isConfirmOpen = pendingDangerItem !== null;

  useEffect(() => {
    if (!isOpen && !isConfirmOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (isConfirmOpen) setPendingDangerItem(null);
      else onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, isConfirmOpen, onClose]);

  if (!isOpen && !isConfirmOpen) return null;

  const handleItemClick = (item: ActionMenuItem) => {
    if (item.tone === "danger") {
      setPendingDangerItem(item);
      onClose();
      return;
    }

    item.onClick();
    onClose();
  };

  const handleCloseConfirm = () => setPendingDangerItem(null);

  const handleConfirm = () => {
    const item = pendingDangerItem;
    setPendingDangerItem(null);
    item?.onClick();
  };

  return (
    <>
      {isOpen && (
        <div className={s.overlay} onMouseDown={onClose}>
          <div className={s.container}>
            <div
              className={s.menu}
              role="dialog"
              aria-modal="true"
              aria-label={title ?? "메뉴"}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <div className={s.list}>
                {items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={s.itemButton}
                    onClick={() => handleItemClick(item)}
                  >
                    <span className={s.itemText}>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <CompleteModal
        isOpen={isConfirmOpen}
        onClose={handleCloseConfirm}
        title={pendingDangerItem?.confirmTitle ?? "오답을 삭제할까요?"}
        description={pendingDangerItem?.confirmDescription}
        cancelLabel={pendingDangerItem?.cancelLabel ?? "취소"}
        confirmLabel={pendingDangerItem?.confirmLabel ?? "확인"}
        iconName={pendingDangerItem?.iconName ?? "trash-modal"}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default ActionMenuModal;
