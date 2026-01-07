"use client";

import clsx from "clsx";
import * as styles from "@/shared/components/progress-bar/progress-bar.css";

type BaseProps = {
  total: number;
  className?: string;
  ariaLabel?: string;
  onStepChange?: (nextStep: number) => void;
};

type StepProps =
  | (BaseProps & { currentStep: number; currentIndex?: never })
  | (BaseProps & { currentIndex: number; currentStep?: never });

const clamp = (value: number, min: number, max: number) => {
  if (Number.isNaN(value)) return min;
  return Math.min(Math.max(value, min), max);
};

const hasCurrentIndex = (
  props: StepProps
): props is BaseProps & { currentIndex: number; currentStep?: never } => {
  return typeof (props as { currentIndex?: unknown }).currentIndex === "number";
};

export const ProgressBar = (props: StepProps) => {
  const { total, className, ariaLabel = "progress", onStepChange } = props;

  if (total <= 0) return null;

  const activeIndex = hasCurrentIndex(props)
    ? clamp(props.currentIndex, 0, total - 1)
    : clamp(props.currentStep - 1, 0, total - 1);

  const ariaNow = hasCurrentIndex(props)
    ? activeIndex + 1
    : clamp(props.currentStep, 1, total);

  const isInteractive = typeof onStepChange === "function";

  return (
    <div
      className={clsx(styles.progressBar(), className)}
      role={isInteractive ? "group" : "progressbar"}
      aria-label={ariaLabel}
      aria-valuemin={isInteractive ? undefined : 1}
      aria-valuemax={isInteractive ? undefined : total}
      aria-valuenow={isInteractive ? undefined : ariaNow}
    >
      {Array.from({ length: total }).map((_, i) => {
        const state = i === activeIndex ? "active" : "inactive";
        const commonClass = styles.segment({ state });

        if (!isInteractive) {
          return <span key={i} className={commonClass} aria-hidden />;
        }

        return (
          <button
            key={i}
            type="button"
            className={commonClass}
            aria-label={`${i + 1} / ${total}`}
            aria-current={i === activeIndex ? "step" : undefined}
            onClick={() => onStepChange(i + 1)}
          />
        );
      })}
    </div>
  );
};

export default ProgressBar;
