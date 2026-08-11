"use client";

import clsx from "clsx";
import type { ReactNode } from "react";
import * as s from "@/shared/components/coach-mark/coach-mark-overlay/coach-mark-overlay.css";

type CoachMarkOverlayProps = {
  ariaLabel: string;
  children: ReactNode;
  /** 하단 고정 영역 (CTA 버튼 등) */
  footer?: ReactNode;
  className?: string;
  bodyClassName?: string;
  footerClassName?: string;
};

/**
 * 코치마크 단계 공통 레이아웃.
 * 앱바 아래부터 화면 전체를 덮고, 본문 영역과 하단 고정 영역을 나눠 갖는다.
 */
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
