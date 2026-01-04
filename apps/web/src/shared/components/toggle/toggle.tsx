"use client";

import { useMemo, useRef } from "react";
import type { ReactNode } from "react";
import { useControllableState } from "@/shared/components/toggle/hooks/use-controllable-state";
import * as s from "./toggle.css";

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

  const activeSide = useMemo(() => {
    return current === right.value ? "right" : "left";
  }, [current, right.value]);

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
    select(activeSide === "left" ? right.value : left.value);
  };

  return (
    <div className={[s.root, className].filter(Boolean).join(" ")}>
      {name ? <input type="hidden" name={name} value={current} /> : null}

      <div
        role="radiogroup"
        aria-label={ariaLabel}
        className={s.track}
        data-active={activeSide}
        onKeyDown={onKeyDown}
      >
        <div aria-hidden className={s.indicator} />

        <button
          ref={(el) => {
            btnRefs.current[0] = el;
          }}
          type="button"
          role="radio"
          aria-checked={current === left.value}
          tabIndex={current === left.value ? 0 : -1}
          disabled={disabled || left.disabled}
          data-state={current === left.value ? "on" : "off"}
          className={s.button}
          onClick={() => select(left.value)}
        >
          {left.label}
        </button>

        <button
          ref={(el) => {
            btnRefs.current[1] = el;
          }}
          type="button"
          role="radio"
          aria-checked={current === right.value}
          tabIndex={current === right.value ? 0 : -1}
          disabled={disabled || right.disabled}
          data-state={current === right.value ? "on" : "off"}
          className={s.button}
          onClick={() => select(right.value)}
        >
          {right.label}
        </button>
      </div>
    </div>
  );
};
