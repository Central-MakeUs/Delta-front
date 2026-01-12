import * as s from "@/app/wrong/wrong.css";
import Filter from "@/shared/components/filter/filter";

const WrongPage = () => {
  return (
    <div className={s.page}>
      <div className={s.filterSection}>
        <div className={s.filterRow}>
          <Filter label="필터" icon="filter" />
          <Filter label="단원별" />
          <Filter label="유형별" />
        </div>
        <div className={s.sortRow}>
          <span className={s.wrongLabel}>
            <p className={s.wrongCount}>8개</p>
            <p>의 오답</p>
          </span>
          <Filter icon="chevron" label="최근 등록순" background="transparent" />
        </div>
      </div>
      <div className={s.cardSection}>{/**카드들 추가예정..!! */}</div>
    </div>
  );
};

export default WrongPage;
