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
  /** 아이콘 이름 (예: "check", "plus") */
  icon?: IconProps["name"];
  /** 아이콘 크기 (rem 단위 숫자, 예: 1.6) */
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
        <span className={styles.iconWrap}>
          <Icon name={icon} width={iconSize} height={iconSize} />
        </span>
      ) : null}

      <span className={styles.label({ size })}>{label}</span>
    </button>
  );
}
