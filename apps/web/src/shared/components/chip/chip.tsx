import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";
import * as s from "@/shared/components/chip/chip.css";

type ChipProps = {
  label: string;
  shape?: "pill" | "square";
  state?: "default" | "active";
  className?: string;
  ariaLabel?: string;
} & Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "disabled" | "onClick" | "type"
>;

export const Chip = ({
  label,
  shape = "pill",
  state = "default",
  disabled = false,
  onClick,
  type = "button",
  className,
  ariaLabel,
}: ChipProps) => {
  return (
    <button
      type={type}
      className={clsx(s.chip({ shape, state }), className)}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel ?? label}
      aria-pressed={state === "active"}
    >
      <span>{label}</span>
    </button>
  );
};

export default Chip;
