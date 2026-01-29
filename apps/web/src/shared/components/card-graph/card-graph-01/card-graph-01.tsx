"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import Icon from "@/shared/components/icon/icon";
import BarGraph01 from "@/shared/components/bar-graph/bar-graph-01/bar-graph-01";
import * as s from "@/shared/components/card-graph/card-graph-01/card-graph-01.css";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

type CardGraph01Props = {
  monthLabel: string;
  registeredCount: number;
  solvedCount: number;
  graphPercent: number;
  graphLabel: string;
  onActionClick?: () => void;
  className?: string;
  ariaLabel?: string;
  replayKey?: string | number;
};

export const CardGraph01 = ({
  monthLabel,
  registeredCount,
  solvedCount,
  graphPercent,
  graphLabel,
  onActionClick,
  className,
  ariaLabel = "card graph 01",
  replayKey,
}: CardGraph01Props) => {
  const pathname = usePathname();
  const safePercent = clamp(graphPercent, 0, 100);
  const percentLabel = `${Math.round(safePercent)}%`;
  const resolvedReplayKey = replayKey ?? pathname;

  const isSolvedZero = solvedCount === 0;

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

          <BarGraph01
            percent={safePercent}
            label={graphLabel}
            replayKey={resolvedReplayKey}
            showMinFillOnZero={isSolvedZero}
            showTip={!isSolvedZero}
          />
        </div>
      </div>
    </section>
  );
};

export default CardGraph01;
