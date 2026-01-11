import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import * as styles from "@/shared/components/button/button/button.css";
import Icon from "@/shared/components/icon/icon";
import type { IconProps } from "@/shared/components/icon/icon";

export type ButtonSize = "32" | "40" | "48" | "56" | "60";
export type ButtonTone = "surface" | "default" | "dark" | "kakao";

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  label: string;
  size?: ButtonSize;
  tone?: ButtonTone;
  fullWidth?: boolean;
  icon?: IconProps["name"];
  /** rem 단위 숫자 */
  iconSize?: number;
};

export const Button = ({
  label,
  size = "48",
  tone = "surface",
  fullWidth = false,
  icon,
  iconSize = 2.4,
  className,
  type = "button",
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(styles.button({ size, tone, fullWidth }), className)}
      {...rest}
    >
      {icon ? (
        <Icon name={icon} size={iconSize} className={styles.icon} />
      ) : null}

      <span className={styles.label({ size })}>{label}</span>
    </button>
  );
};
