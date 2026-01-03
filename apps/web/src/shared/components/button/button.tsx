import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import * as styles from "./button.css";
import Icon from "../icon/icon";
import type { IconProps } from "@/shared/components/icon/icon";

export type ButtonSize = "32" | "40" | "48" | "60";
export type ButtonTone = "surface" | "muted" | "dark" | "kakao";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  label: string;
  size?: ButtonSize;
  tone?: ButtonTone;
  fullWidth?: boolean;
  icon?: IconProps["name"];
  /** rem 단위 숫자 */
  iconSize?: number;
};

export function Button({
  label,
  size = "48",
  tone = "surface",
  fullWidth = false,
  icon,
  iconSize = 2.4,
  className,
  type = "button",
  ...rest
}: Props) {
  return (
    <button
      type={type}
      className={clsx(styles.button({ size, tone, fullWidth }), className)}
      {...rest}
    >
      {icon ? (
        <span
          className={styles.iconWrap}
          style={{ [styles.iconSizeVar]: `${iconSize}rem` }}
        >
          <Icon name={icon} width="100%" height="100%" />
        </span>
      ) : null}

      <span className={styles.label({ size })}>{label}</span>
    </button>
  );
}
