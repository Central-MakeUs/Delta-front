"use client";

import { useMemo } from "react";
import clsx from "clsx";
import { NumberChoice } from "@/shared/components/number-choice/number-choice";
import * as gs from "@/shared/components/number-choice/number-choice.css";

type NumberChoiceGroupProps = {
  count?: number;
  value: number | null;
  onValueChange: (next: number) => void;
  disabled?: boolean;
  className?: string;
};

export const NumberChoiceGroup = ({
  count = 5,
  value,
  onValueChange,
  disabled = false,
  className,
}: NumberChoiceGroupProps) => {
  const numbers = useMemo(
    () => Array.from({ length: Math.max(0, count) }, (_, i) => i + 1),
    [count]
  );

  return (
    <div className={clsx(gs.root, className)}>
      {numbers.map((n) => (
        <NumberChoice
          key={n}
          value={n}
          selected={value === n}
          disabled={disabled}
          onSelect={onValueChange}
        />
      ))}
    </div>
  );
};
