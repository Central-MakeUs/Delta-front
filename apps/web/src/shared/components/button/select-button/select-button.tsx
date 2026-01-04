import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import * as styles from "@/shared/components/button/select-button/select-button.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  active?: boolean;
  fullWidth?: boolean;
};

export function SelectButton({
  label,
  active = false,
  fullWidth = false,
  className,
  type = "button",
  ...rest
}: Props) {
  return (
    <button
      type={type}
      className={clsx(styles.selectButton({ active, fullWidth }), className)}
      {...rest}
    >
      <span className={styles.label({ active })}>{label}</span>
    </button>
  );
}
