"use client";

import clsx from "clsx";
import Icon from "@/shared/components/icon/icon";
import BarGraph01 from "@/shared/components/bar-graph/bar-graph-01/bar-graph-01";
import * as s from "@/shared/components/card-graph/card-graph-01/card-graph-01.css";

type CardGraph01Props = {
  monthLabel: string; // 1월
  registeredCount: number; // 등록한 문제 수
  graphPercent: number; // 0~100 (BarGraph01에 그대로 전달)
  graphLabel: string; // "16/24"
  onActionClick?: () => void;
  className?: string;
  ariaLabel?: string;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const CardGraph01 = ({
  monthLabel,
  registeredCount,
  graphPercent,
  graphLabel,
  onActionClick,
  className,
  ariaLabel = "card graph 01",
}: CardGraph01Props) => {
  const safePercent = clamp(graphPercent, 0, 100);
  const percentLabel = `${Math.round(safePercent)}%`;

  return (
    <section className={clsx(s.root, className)} aria-label={ariaLabel}>
      <div className={s.vector} aria-hidden />

      <div className={s.content}>
        <div className={s.topRow}>
          <div className={s.chip}>{`${monthLabel} 수학 오답 현황`}</div>
          <span
            className={s.caption}
          >{`등록한 문제 | ${registeredCount}개`}</span>
        </div>

        <div className={s.bottom}>
          <div className={s.bottomTopRow}>
            <span className={s.percent}>{percentLabel}</span>

            <button type="button" className={s.action} onClick={onActionClick}>
              <span className={s.actionText}>남은 문제 오답하기</span>
              <Icon size={2} name="chevron" className={s.actionIcon} />
            </button>
          </div>

          <BarGraph01 percent={safePercent} label={graphLabel} />
        </div>
      </div>
    </section>
  );
};

export default CardGraph01;
