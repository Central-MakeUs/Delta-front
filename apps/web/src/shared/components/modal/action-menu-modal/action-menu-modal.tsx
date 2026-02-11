"use client";

import { useEffect } from "react";
import * as s from "@/shared/components/modal/action-menu-modal/action-menu-modal.css";

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
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleItemClick = (fn: () => void) => {
    fn();
    onClose();
  };

  return (
    <div
      className={s.overlay}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={s.menu}
        role="dialog"
        aria-modal="true"
        aria-label={title ?? "메뉴"}
      >
        <div className={s.list}>
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              className={s.itemButton}
              onClick={() => handleItemClick(item.onClick)}
            >
              <span className={s.itemText}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActionMenuModal;
