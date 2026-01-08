"use client";

import { useState } from "react";
import Chip from "@/shared/components/chip/chip";
import Divider from "@/shared/components/divider/divider";
import Icon from "@/shared/components/icon/icon";
import Checkbox from "@/shared/components/checkbox/checkbox";
import * as s from "./step.css";

type Step2Props = {
  onNext: () => void;
};

const LABELS = [
  "공통수학1",
  "공통수학2",
  "대수",
  "미적분I",
  "확률과 통계",
  "미적분II",
  "기하",
] as const;

type Label = (typeof LABELS)[number];

const Step2 = ({ onNext }: Step2Props) => {
  const [selected, setSelected] = useState<Label | null>(null);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(false);
  const onToggle = (label: Label) => {
    setSelected((prev) => (prev === label ? null : label));
  };

  return (
    <div className={s.container}>
      <div className={s.chipGrid}>
        {LABELS.map((label) => (
          <Chip
            key={label}
            shape="pill"
            label={label}
            state={selected === label ? "active" : "default"}
            onClick={() => onToggle(label)}
          />
        ))}
      </div>
      <Divider />
      <div className={s.checkSection}>
        <div className={s.checkTitleSection}>
          <Icon name="triangle" size={2} className={s.icon} />
          <p className={s.checkTitle}>공통수학1</p>
        </div>
        <div className={s.checkList}>
          <Checkbox
            label="체크됨"
            checked={checked2}
            onChange={(e) => setChecked2(e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default Step2;
