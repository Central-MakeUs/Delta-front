"use client";

import clsx from "clsx";
import type { ReactNode } from "react";
import * as s from "@/shared/components/coach-mark/coach-mark-overlay/coach-mark-overlay.css";

type CoachMarkOverlayProps = {
  ariaLabel: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  bodyClassName?: string;
  footerClassName?: string;
};

export const CoachMarkOverlay = ({
  ariaLabel,
  children,
  footer,
  className,
  bodyClassName,
  footerClassName,
}: CoachMarkOverlayProps) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      className={clsx(s.overlay, className)}
    >
      <div className={clsx(s.body, bodyClassName)}>{children}</div>
      {footer ? (
        <div className={clsx(s.footer, footerClassName)}>{footer}</div>
      ) : null}
    </div>
  );
};

export default CoachMarkOverlay;
