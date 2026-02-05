import { useMemo } from "react";
import clsx from "clsx";
import { NumberButton } from "@/shared/components/button/number-button/number-button";
import * as gs from "@/shared/components/number-choice/number-choice.css";

type NumberChoiceProps = {
  count?: number;
  value: number | null;
  onValueChange: (next: number) => void;
  disabled?: boolean;
  className?: string;
};

export const NumberChoice = ({
  count = 5,
  value,
  onValueChange,
  disabled = false,
  className,
}: NumberChoiceProps) => {
  const numbers = useMemo(
    () => Array.from({ length: Math.max(0, count) }, (_, i) => i + 1),
    [count]
  );

  return (
    <div className={clsx(gs.root, className)}>
      {numbers.map((n) => (
        <NumberButton
          key={n}
          value={n}
          selected={value === n}
          disabled={disabled}
          onSelect={onValueChange}
          className={gs.item}
        />
      ))}
    </div>
  );
};
