"use client";

import clsx from "clsx";
import * as s from "@/shared/components/number-choice/number-choice.css";

type Props = {
  value: number;
  selected?: boolean;
  disabled?: boolean;
  label?: string;
  className?: string;
  onSelect?: (value: number) => void;
  ariaLabel?: string;
};

export const NumberChoice = ({
  value,
  selected = false,
  disabled = false,
  label,
  className,
  onSelect,
  ariaLabel,
}: Props) => {
  const text = label ?? `${value}번`;

  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={selected}
      aria-label={ariaLabel ?? text}
      data-state={selected ? "on" : "off"}
      className={clsx(
        s.buttonBase,
        selected ? s.active : s.inactive,
        className
      )}
      onClick={() => {
        if (disabled) return;
        onSelect?.(value);
      }}
    >
      <span className={s.label}>{text}</span>
    </button>
  );
};
