"use client";

import { useEffect, useState } from "react";
import * as s from "@/shared/components/modal/action-menu-modal/action-menu-modal.css";
import CompleteModal from "@/shared/components/modal/complete-modal/complete-modal";

type Item = {
  label: string;
  tone?: "default" | "danger";
  onClick: () => void;
};

type Props = {
  isOpen: boolean;
  title?: string;
  items: readonly Item[];
  onClose: () => void;
};

const ActionMenuModal = ({ isOpen, title, items, onClose }: Props) => {
  const [pendingDangerAction, setPendingDangerAction] = useState<
    null | (() => void)
  >(null);
  const isConfirmOpen = pendingDangerAction !== null;

  useEffect(() => {
    if (!isOpen && !isConfirmOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (isConfirmOpen) setPendingDangerAction(null);
      else onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, isConfirmOpen, onClose]);

  if (!isOpen && !isConfirmOpen) return null;

  const handleItemClick = (item: Item) => {
    if (item.tone === "danger") {
      setPendingDangerAction(() => item.onClick);
      onClose();
      return;
    }

    item.onClick();
    onClose();
  };

  const handleCloseConfirm = () => setPendingDangerAction(null);

  const handleConfirm = () => {
    pendingDangerAction?.();
    setPendingDangerAction(null);
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
                    key={item.label}
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
        title="오답을 삭제할까요?"
        description="문제를 삭제하면 되돌릴 수 없어요."
        cancelLabel="아니요"
        confirmLabel="삭제"
        iconName="trash-modal"
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default ActionMenuModal;
