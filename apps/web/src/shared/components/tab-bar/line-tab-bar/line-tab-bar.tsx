"use client";

import clsx from "clsx";
import { useRef } from "react";

import * as s from "@/shared/components/tab-bar/line-tab-bar/line-tab-bar.css";
import { typo } from "@/shared/styles/typography.css";
import { color } from "@/shared/styles/color.css";
import { useControllableState } from "@/shared/components/toggle/hooks/use-controllable-state";

export type TabItem<T extends string> = {
  value: T;
  label: string;
  disabled?: boolean;
};

export type LineTabBarProps<T extends string> = {
  items: readonly [TabItem<T>, ...TabItem<T>[]];
  value?: T;
  defaultValue?: T;
  onValueChange?: (next: T) => void;
  size?: "lg";
  className?: string;
  ariaLabel?: string;
};

export const LineTabBar = <T extends string>({
  items,
  value,
  defaultValue,
  onValueChange,
  size = "lg",
  className,
  ariaLabel = "tab bar",
}: LineTabBarProps<T>) => {
  const fallbackDefaultValue = (defaultValue ?? items[0].value) as T;

  const [current, setCurrent] = useControllableState<T>({
    value,
    defaultValue: fallbackDefaultValue,
    onChange: onValueChange,
  });

  const btnRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;

    e.preventDefault();

    const currentIndex = items.findIndex((it) => it.value === current);
    if (currentIndex < 0) return;

    const dir = e.key === "ArrowRight" ? 1 : -1;

    let nextIndex = currentIndex;
    for (let step = 0; step < items.length; step += 1) {
      nextIndex = (nextIndex + dir + items.length) % items.length;
      if (!items[nextIndex]?.disabled) break;
    }

    const next = items[nextIndex];
    if (!next || next.disabled) return;

    setCurrent(next.value);
    btnRefs.current[nextIndex]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={clsx(s.tabBar({ size }), className)}
      onKeyDown={onKeyDown}
    >
      {items.map((it, idx) => {
        const isActive = it.value === current;

        return (
          <button
            key={it.value}
            ref={(el) => {
              btnRefs.current[idx] = el;
            }}
            type="button"
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            disabled={it.disabled}
            className={clsx(
              s.tabButton({ state: isActive ? "active" : "inactive" }),
              isActive
                ? clsx(typo.body1.bold, color["grayscale-900"])
                : clsx(typo.body1.medium, color["grayscale-500"])
            )}
            onClick={() => setCurrent(it.value)}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
};

export default LineTabBar;
