import * as s from "@/app/wrong/wrong.css";
import Filter from "@/shared/components/filter/filter";
import WrongCard from "@/app/wrong/components/wrong-card";
import { WRONG_CARDS } from "@/app/wrong/data/wrong-cards";

const WrongPage = () => {
  return (
    <div className={s.page}>
      <div className={s.filterSection}>
        <div className={s.filterRow}>
          <Filter label="필터" icon="filter" />
          <Filter label="단원별" icon="chevron" />
          <Filter label="유형별" icon="chevron" />
        </div>

        <div className={s.sortRow}>
          <span className={s.wrongLabel}>
            <p className={s.wrongCount}>{WRONG_CARDS.length}개</p>
            <p>의 오답</p>
          </span>
          <Filter icon="chevron" label="최근 등록순" background="transparent" />
        </div>
      </div>

      <div className={s.cardSection}>
        {WRONG_CARDS.map((card) => (
          <WrongCard
            key={card.id}
            title={card.title}
            date={card.date}
            imageSrc={card.imageSrc}
            imageAlt={card.imageAlt}
            chips={card.chips}
            href={card.href}
          />
        ))}
      </div>
    </div>
  );
};

export default WrongPage;
