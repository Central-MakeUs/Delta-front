"use client";

import Chip from "@/shared/components/chip/chip";
import Divider from "@/shared/components/divider/divider";
import Icon from "@/shared/components/icon/icon";
import Checkbox from "@/shared/components/checkbox/checkbox";
import * as s from "@/app/wrong/create/components/steps/step.css";
import type { StepProps } from "@/app/wrong/create/page";
import { CHAPTER_FILTERS } from "@/app/wrong/(list)/constants/wrong-filters";
import type { ChapterKey } from "@/app/wrong/create/utils/chapter-recommend";
import { useStep2Selection } from "@/app/wrong/create/hooks/step2/use-step-2-selection";

type Step2Props = StepProps & {
  scanId?: number | string | null;
};

const Step2 = ({ onNextEnabledChange, scanId = null }: Step2Props) => {
  const {
    viewChapterId,
    viewUnitId,
    isOpen,
    unitOptions,
    chapterLabel,
    onToggle,
    onSelectUnit,
  } = useStep2Selection({ scanId, onNextEnabledChange });

  return (
    <div className={s.container}>
      <div className={s.chipGrid}>
        {CHAPTER_FILTERS.map((chapter) => {
          const chapterId = chapter.id as ChapterKey;

          return (
            <Chip
              key={chapter.id}
              fullWidth={true}
              shape="pill"
              label={chapter.label}
              state={viewChapterId === chapterId ? "active" : "default"}
              onClick={() => onToggle(chapterId)}
            />
          );
        })}
      </div>

      <div className={s.dividerReveal({ open: isOpen })}>
        <Divider />
      </div>

      <div className={s.checkReveal({ open: isOpen })}>
        <div className={s.checkSection}>
          <div className={s.checkTitleSection}>
            <Icon name="triangle" size={2} className={s.icon} />
            <p className={s.checkTitle}>{chapterLabel}</p>
          </div>

          <div className={s.checkList}>
            {unitOptions.map((opt) => (
              <Checkbox
                key={opt.id}
                label={opt.label}
                checked={viewUnitId === opt.id}
                onChange={onSelectUnit(opt.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
