import Image from "next/image";
import Chip from "@/shared/components/chip/chip";
import sampleImage from "@/shared/assets/images/wrong-sample.png";
import { COACH_MARK_PRACTICE_SAMPLE } from "@/shared/components/coach-mark/constants/coach-mark";
import * as s from "@/shared/components/coach-mark/practice-step/components/sample-problem-card.css";

/** 연습 문제 미리보기 카드. 클릭 동작 없이 보여주기만 한다. */
export const SampleProblemCard = () => {
  return (
    <div className={s.card}>
      <Image
        src={sampleImage}
        alt={COACH_MARK_PRACTICE_SAMPLE.TITLE}
        fill
        className={s.image}
        sizes="(max-width: 430px) 50vw, 215px"
        unoptimized
      />

      <span className={s.tag}>{COACH_MARK_PRACTICE_SAMPLE.TAG}</span>

      <div className={s.aboutSection}>
        <div className={s.chipRow}>
          {COACH_MARK_PRACTICE_SAMPLE.CHIPS.map((label) => (
            <Chip
              key={label}
              as="span"
              label={label}
              size="xs"
              shape="square"
              tone="surface"
            />
          ))}
        </div>
        <span className={s.title}>{COACH_MARK_PRACTICE_SAMPLE.TITLE}</span>
      </div>
    </div>
  );
};

export default SampleProblemCard;
