import Image from "next/image";
import * as s from "./analytics-card.css";

const AnalyticsCard = () => {
  return (
    <div className={s.root}>
      <div className={s.pillRow}>
        <div className={s.pill}>
          <span className={s.pillText}>예상 성적 리포트</span>
        </div>
      </div>

      <div className={s.artwork}>
        <div className={s.bookWrap}>
          <Image
            src="/pro/05-book.svg"
            alt=""
            fill
            priority
            sizes="9.5rem"
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className={s.aiWrap}>
          <Image
            src="/pro/05-ai.svg"
            alt=""
            fill
            priority
            sizes="5.2rem"
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;
