"use client";

import clsx from "clsx";
import Icon from "@/shared/components/icon/icon";
import * as s from "@/shared/components/filter/filter.css";

type FilterProps = {
  label: string;
  background?: "transparent" | "filled";
  icon?: "filter" | "chevron";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
};

export const Filter = ({
  label,
  background = "filled",
  icon,
  disabled = false,
  onClick,
  className,
  ariaLabel,
}: FilterProps) => {
  const iconPosition = icon === "filter" ? "left" : "right";

  const iconNode = icon ? (
    <span className={s.icon} aria-hidden>
      {icon === "chevron" ? (
        <Icon size={2} name="chevron" rotate={90} />
      ) : (
        <Icon size={2} name="filter" />
      )}
    </span>
  ) : null;

  return (
    <button
      type="button"
      className={clsx(s.button({ background, iconPosition }), className)}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel ?? label}
    >
      {iconNode}
      <span className={s.label}>{label}</span>
    </button>
  );
};

export default Filter;
