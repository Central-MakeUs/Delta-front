"use client";

import { useRef } from "react";
import clsx from "clsx";
import { useControllableState } from "@/shared/components/toggle/hooks/use-controllable-state";
import * as s from "@/shared/components/toggle/toggle.css";

type ToggleOption<T extends string> = {
  value: T;
  label: string;
  disabled?: boolean;
};

type ToggleProps<T extends string> = {
  options: readonly [ToggleOption<T>, ToggleOption<T>];
  value?: T;
  defaultValue?: T;
  onValueChange?: (next: T) => void;
  disabled?: boolean;
  name?: string;
  className?: string;
  ariaLabel?: string;
};

export const Toggle = <T extends string>({
  options,
  value,
  defaultValue,
  onValueChange,
  disabled = false,
  name,
  className,
  ariaLabel = "toggle",
}: ToggleProps<T>) => {
  const [left, right] = options;
  const fallbackDefault = (defaultValue ?? left.value) as T;

  const [current, setCurrent] = useControllableState<T>({
    value,
    defaultValue: fallbackDefault,
    onChange: onValueChange,
  });

  const leftOn = current === left.value;
  const rightOn = current === right.value;
  const leftRef = useRef<HTMLButtonElement | null>(null);
  const rightRef = useRef<HTMLButtonElement | null>(null);

  const select = (next: T) => {
    if (disabled) return;
    const opt = next === left.value ? left : right;
    if (opt.disabled) return;
    setCurrent(next);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    if (e.key === "ArrowLeft") {
      select(left.value);
      leftRef.current?.focus();
      return;
    }
    select(right.value);
    rightRef.current?.focus();
  };

  return (
    <div className={clsx(s.root, className)}>
      {name ? <input type="hidden" name={name} value={current} /> : null}

      <div
        role="radiogroup"
        aria-label={ariaLabel}
        className={clsx(s.row, rightOn ? s.rowRightActive : s.rowLeftActive)}
        onKeyDown={onKeyDown}
      >
        <button
          ref={leftRef}
          type="button"
          role="radio"
          aria-checked={leftOn}
          tabIndex={leftOn ? 0 : -1}
          disabled={disabled || left.disabled}
          className={leftOn ? s.pillButton : s.ghostButton}
          onClick={() => select(left.value)}
        >
          <span className={s.label}>{left.label}</span>
        </button>

        <button
          ref={rightRef}
          type="button"
          role="radio"
          aria-checked={rightOn}
          tabIndex={rightOn ? 0 : -1}
          disabled={disabled || right.disabled}
          className={rightOn ? s.pillButton : s.ghostButton}
          onClick={() => select(right.value)}
        >
          <span className={s.label}>{right.label}</span>
        </button>
      </div>
    </div>
  );
};
