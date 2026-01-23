import clsx from "clsx";
import BarGraph02 from "@/shared/components/bar-graph/bar-graph-02/bar-graph-02";
import Icon from "@/shared/components/icon/icon";
import * as s from "@/shared/components/card-graph/card-graph-02/card-graph-02.css";

export type CardGraph02Item = {
  value: number;
  title: string;
  valueLabel?: string;
  tone?: "active" | "inactive";
};

type CardGraph02Props = {
  items: readonly CardGraph02Item[];
  className?: string;
  ariaLabel?: string;
};

const pad2 = (n: number) => String(n).padStart(2, "0");

const CardGraph02Empty = () => {
  return (
    <div className={s.emptyContent}>
      <Icon name="modal-icon" height={4} width={4.5} />
      <p className={s.emptyText}>
        문제 등록 버튼을 눌러
        <br />
        먼저 문제를 등록해주세요!
      </p>
    </div>
  );
};

export const CardGraph02 = ({
  items,
  className,
  ariaLabel = "card graph 02",
}: CardGraph02Props) => {
  const normalized: CardGraph02Item[] = Array.from({ length: 4 }).map(
    (_, i) =>
      items[i] ?? {
        value: 0,
        title: "",
        valueLabel: "0개",
        tone: "inactive",
      }
  );

  const maxInList = Math.max(0, ...normalized.map((x) => x.value));
  const allZero = maxInList <= 0;

  if (allZero) {
    return (
      <section
        className={clsx(s.root, s.emptyRoot, className)}
        aria-label={ariaLabel}
      >
        <CardGraph02Empty />
      </section>
    );
  }

  const maxValue = maxInList > 0 ? maxInList : 1;

  return (
    <section className={clsx(s.root, className)} aria-label={ariaLabel}>
      <div className={s.barsRow}>
        {normalized.map((item, i) => {
          const rank = pad2(i + 1);

          const inferredTone: "active" | "inactive" =
            item.value === maxInList ? "active" : "inactive";

          const tone = item.tone ?? inferredTone;
          const showTarget = item.value === maxInList;

          return (
            <div key={rank} className={s.barCol}>
              <div className={s.barWrap}>
                <BarGraph02
                  value={item.value}
                  maxValue={maxValue}
                  valueLabel={item.valueLabel ?? `${item.value}개`}
                  tone={tone}
                  showTarget={showTarget}
                />
              </div>

              <span className={s.rank}>{rank}</span>
            </div>
          );
        })}
      </div>

      <div className={s.list}>
        {normalized.map((item, i) => {
          const rank = pad2(i + 1);

          return (
            <div key={rank} className={s.listItem}>
              <span className={s.listRank}>{rank}</span>
              <span className={s.listText}>{item.title}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CardGraph02;
