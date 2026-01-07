import clsx from "clsx";
import BarGraph02 from "@/shared/components/bar-graph/bar-graph-02/bar-graph-02";
import * as s from "@/shared/components/card-graph/card-graph-02/card-graph-02.css";

export type CardGraph02Item = {
  value: number; // 막대 값
  title: string; // 아래 단원명
  valueLabel?: string; // "10개" 같은 텍스트 (미지정 시 `${value}개`)
  tone?: "active" | "inactive"; // 미지정 시 1등 active, 나머지 inactive
};

type CardGraph02Props = {
  items: readonly CardGraph02Item[]; // 상위 4개 사용 (부족하면 빈값으로 채움)
  className?: string;
  ariaLabel?: string;
};

const pad2 = (n: number) => String(n).padStart(2, "0");

export const CardGraph02 = ({
  items,
  className,
  ariaLabel = "card graph 02",
}: CardGraph02Props) => {
  const normalized: CardGraph02Item[] = Array.from({ length: 4 }).map(
    (_, i) => {
      const item = items[i];
      return (
        item ?? {
          value: 0,
          title: "",
          valueLabel: "0개",
          tone: "inactive",
        }
      );
    }
  );

  const maxValue = normalized[0]?.value > 0 ? normalized[0].value : 1;

  return (
    <section className={clsx(s.root, className)} aria-label={ariaLabel}>
      <div className={s.barsRow}>
        {normalized.map((item, i) => {
          const rank = pad2(i + 1);
          const tone = item.tone ?? (i === 0 ? "active" : "inactive");

          return (
            <div key={rank} className={s.barCol}>
              <div className={s.barWrap}>
                <BarGraph02
                  value={item.value}
                  maxValue={maxValue}
                  valueLabel={item.valueLabel ?? `${item.value}개`}
                  tone={tone}
                  showCrown={i === 0}
                />
              </div>

              <span className={s.rank}>{rank}</span>
            </div>
          );
        })}
      </div>

      <div className={s.list}>
        {normalized.map((item, i) => (
          <div key={i} className={s.listItem}>
            <span className={s.listRank}>{pad2(i + 1)}</span>
            <span className={s.listText}>{item.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardGraph02;
