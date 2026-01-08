"use client";

import clsx from "clsx";
import * as s from "@/app/graph/components/wrong-status/wrong-status.css";

type WrongStatusItem = {
  state: "done" | "before";
  label: string;
};

type WrongStatusProps = {
  className?: string;
  ariaLabel?: string;
  items?: readonly WrongStatusItem[];
};

export const WrongStatus = ({
  className,
  ariaLabel = "wrong status",
  items = [
    { state: "done", label: "오답 완료" },
    { state: "before", label: "오답 전" },
  ],
}: WrongStatusProps) => {
  return (
    <div
      className={clsx(s.root, className)}
      role="group"
      aria-label={ariaLabel}
    >
      {items.map((it) => (
        <div key={it.state} className={s.item}>
          <span className={s.swatch({ state: it.state })} aria-hidden />
          <span className={s.label}>{it.label}</span>
        </div>
      ))}
    </div>
  );
};

export default WrongStatus;
