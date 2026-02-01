"use client";

import type { ButtonHTMLAttributes } from "react";
import * as s from "@/app/wrong/create/components/type-card/type-card.css";

export type TypeCardHitButtonProps = {
  labelId: string;
  pressed: boolean;
  disabled?: boolean;
  onClick: () => void;
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, "onPointerDown">;

const TypeCardHitButton = ({
  labelId,
  pressed,
  disabled = false,
  onClick,
  onPointerDown,
}: TypeCardHitButtonProps) => {
  return (
    <button
      type="button"
      className={s.typeCardHitArea}
      aria-pressed={pressed}
      aria-labelledby={labelId}
      disabled={disabled}
      onPointerDown={onPointerDown}
      onClick={() => {
        if (disabled) return;
        onClick();
      }}
    />
  );
};

export default TypeCardHitButton;
