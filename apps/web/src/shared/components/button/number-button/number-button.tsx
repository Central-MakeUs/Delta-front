import clsx from "clsx";
import * as s from "@/shared/components/button/number-button/number-button.css";

type NumberButtonProps = {
  value: number;
  selected?: boolean;
  disabled?: boolean;
  label?: string;
  className?: string;
  onSelect?: (value: number) => void;
  ariaLabel?: string;
};

export const NumberButton = ({
  value,
  selected = false,
  disabled = false,
  label,
  className,
  onSelect,
  ariaLabel,
}: NumberButtonProps) => {
  const text = label ?? `${value}번`;

  const handleClick = () => {
    if (disabled) return;
    onSelect?.(value);
  };

  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={selected}
      aria-label={ariaLabel ?? text}
      data-state={selected ? "on" : "off"}
      className={clsx(
        s.buttonBase,
        selected ? s.active : s.inactive,
        className
      )}
      onClick={handleClick}
    >
      <span className={s.label}>{text}</span>
    </button>
  );
};
