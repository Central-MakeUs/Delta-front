import { useState } from "react";
import type { ChangeEvent } from "react";
import Chip from "@/shared/components/chip/chip";
import Divider from "@/shared/components/divider/divider";
import Icon from "@/shared/components/icon/icon";
import Checkbox from "@/shared/components/checkbox/checkbox";
import * as s from "@/app/wrong/create/components/steps/step.css";
import { StepProps } from "@/app/wrong/create/page";
import {
  MATH_SUBJECT_LABELS,
  CHECK_ITEMS,
} from "@/app/wrong/create/constants/option-labels";

type Label = (typeof MATH_SUBJECT_LABELS)[number];
type CheckItem = (typeof CHECK_ITEMS)[number];

const Step2 = ({ onNextEnabledChange }: StepProps) => {
  const [selected, setSelected] = useState<Label | null>(null);
  const [selectedItem, setSelectedItem] = useState<CheckItem | null>(null);

  const isOpen = selected !== null;

  const computeEnabled = (
    nextLabel: Label | null,
    nextItem: CheckItem | null
  ) => Boolean(nextLabel && nextItem);

  const onToggle = (label: Label) => {
    const nextLabel = selected === label ? null : label;
    setSelected(nextLabel);
    setSelectedItem(null);
    onNextEnabledChange?.(false);
  };

  const onSelectItem =
    (item: CheckItem) => (e: ChangeEvent<HTMLInputElement>) => {
      const nextItem = e.target.checked ? item : null;
      setSelectedItem(nextItem);
      onNextEnabledChange?.(computeEnabled(selected, nextItem));
    };

  return (
    <div className={s.container}>
      <div className={s.chipGrid}>
        {MATH_SUBJECT_LABELS.map((label) => (
          <Chip
            key={label}
            shape="pill"
            label={label}
            state={selected === label ? "active" : "default"}
            onClick={() => onToggle(label)}
          />
        ))}
      </div>

      <div className={s.dividerReveal({ open: isOpen })}>
        <Divider />
      </div>

      <div className={s.checkReveal({ open: isOpen })}>
        <div className={s.checkSection}>
          <div className={s.checkTitleSection}>
            <Icon name="triangle" size={2} className={s.icon} />
            <p className={s.checkTitle}>{selected ?? ""}</p>
          </div>

          <div className={s.checkList}>
            {CHECK_ITEMS.map((item) => (
              <Checkbox
                key={item}
                label={item}
                checked={selectedItem === item}
                onChange={onSelectItem(item)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
