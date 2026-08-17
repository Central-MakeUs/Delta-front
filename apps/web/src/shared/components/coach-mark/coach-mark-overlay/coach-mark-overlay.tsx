"use client";

import clsx from "clsx";
import { useRef, type ReactNode } from "react";
import { useDialogFocus } from "@/shared/hooks/use-dialog-focus";
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
  const containerRef = useRef<HTMLDivElement>(null);
  useDialogFocus(containerRef);

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      tabIndex={-1}
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
