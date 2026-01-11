import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";
import * as s from "@/shared/components/chip/chip.css";

export type ChipSize = "xs" | "md" | "lg";
export type ChipShape = "pill" | "square";
export type ChipState = "default" | "active";
export type ChipTone =
  | "auto"
  | "surface"
  | "soft"
  | "solid"
  | "white"
  | "white-accent";

type ChipProps = {
  label: string;
  size?: ChipSize;
  shape?: ChipShape;
  state?: ChipState;
  /** state 기반 말고 강제 톤 (ex. md solid / xs white) */
  tone?: ChipTone;
  /** 기본 false: padding으로만 크기. true면 width:100% */
  fullWidth?: boolean;
  className?: string;
  ariaLabel?: string;
} & Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "disabled" | "onClick" | "type"
>;

export const Chip = ({
  label,
  size = "lg",
  shape = "pill",
  state = "default",
  tone = "auto",
  fullWidth = false,
  disabled = false,
  onClick,
  type = "button",
  className,
  ariaLabel,
}: ChipProps) => {
  return (
    <button
      type={type}
      className={clsx(
        s.chip({ size, shape, state, tone, fullWidth }),
        className
      )}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel ?? label}
      aria-pressed={state === "active"}
      data-state={state}
      data-tone={tone}
    >
      <span className={s.label}>{label}</span>
    </button>
  );
};

export default Chip;
