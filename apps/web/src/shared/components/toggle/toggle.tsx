"use client";

import { useMemo, useRef } from "react";
import type { ReactNode } from "react";
import clsx from "clsx";
import { useControllableState } from "@/shared/components/toggle/hooks/use-controllable-state";
import * as s from "@/shared/components/toggle/toggle.css";

type ToggleOption<T extends string> = {
  value: T;
  label: ReactNode;
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

  const isRightActive = useMemo(
    () => current === right.value,
    [current, right.value]
  );

  const btnRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const select = (next: T) => {
    if (disabled) return;
    const opt = next === left.value ? left : right;
    if (opt.disabled) return;
    setCurrent(next);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();

    const next = isRightActive ? left.value : right.value;
    select(next);

    const idx = next === left.value ? 0 : 1;
    btnRefs.current[idx]?.focus();
  };

  return (
    <div className={clsx(s.root, className)}>
      {name ? <input type="hidden" name={name} value={current} /> : null}

      <div
        role="radiogroup"
        aria-label={ariaLabel}
        className={clsx(
          s.row,
          isRightActive ? s.rowRightActive : s.rowLeftActive
        )}
        onKeyDown={onKeyDown}
      >
        {isRightActive ? (
          <>
            <button
              ref={(el) => {
                btnRefs.current[0] = el;
              }}
              type="button"
              role="radio"
              aria-checked={false}
              tabIndex={-1}
              disabled={disabled || left.disabled}
              className={s.ghostButton}
              onClick={() => select(left.value)}
            >
              <span className={s.label}>{left.label}</span>
            </button>

            <button
              ref={(el) => {
                btnRefs.current[1] = el;
              }}
              type="button"
              role="radio"
              aria-checked
              tabIndex={0}
              disabled={disabled || right.disabled}
              className={s.pillButton}
              onClick={() => select(right.value)}
            >
              <span className={s.label}>{right.label}</span>
            </button>
          </>
        ) : (
          <>
            <button
              ref={(el) => {
                btnRefs.current[0] = el;
              }}
              type="button"
              role="radio"
              aria-checked
              tabIndex={0}
              disabled={disabled || left.disabled}
              className={s.pillButton}
              onClick={() => select(left.value)}
            >
              <span className={s.label}>{left.label}</span>
            </button>

            <button
              ref={(el) => {
                btnRefs.current[1] = el;
              }}
              type="button"
              role="radio"
              aria-checked={false}
              tabIndex={-1}
              disabled={disabled || right.disabled}
              className={s.ghostButton}
              onClick={() => select(right.value)}
            >
              <span className={s.label}>{right.label}</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
