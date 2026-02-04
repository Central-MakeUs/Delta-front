"use client";

import clsx from "clsx";
import Icon from "@/shared/components/icon/icon";
import * as s from "@/app/wrong/create/components/type-card/type-card.css";

export type TypeCardDeleteButtonProps = {
  label: string;
  selected: boolean;
  disabled?: boolean;
  onDelete: () => void;
};

const TypeCardDeleteButton = ({
  label,
  selected,
  disabled = false,
  onDelete,
}: TypeCardDeleteButtonProps) => {
  return (
    <button
      type="button"
      className={clsx(
        s.typeCardAction,
        selected ? s.typeCardActionOnDark : s.typeCardActionOnSurface,
        disabled && s.typeCardActionDisabled
      )}
      disabled={disabled}
      aria-label={`${label} 삭제`}
      onPointerDown={(e) => {
        e.stopPropagation();
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (disabled) return;
        onDelete();
      }}
    >
      <Icon name="multiple" size={2.4} />
    </button>
  );
};

export default TypeCardDeleteButton;
