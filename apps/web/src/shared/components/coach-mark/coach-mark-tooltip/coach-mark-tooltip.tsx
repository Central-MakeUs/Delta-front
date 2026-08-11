"use client";

import clsx from "clsx";
import * as s from "@/shared/components/coach-mark/coach-mark-tooltip/coach-mark-tooltip.css";

type CoachMarkTooltipProps = {
  message: string;
  onClick?: () => void;
  className?: string;
};

export const CoachMarkTooltip = ({
  message,
  onClick,
  className,
}: CoachMarkTooltipProps) => {
  return (
    <button
      type="button"
      className={clsx(s.tooltip, className)}
      onClick={onClick}
    >
      {message}
    </button>
  );
};

export default CoachMarkTooltip;
