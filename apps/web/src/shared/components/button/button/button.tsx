import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import * as styles from "@/shared/components/button/button/button.css";
import Icon from "@/shared/components/icon/icon";
import type { IconProps } from "@/shared/components/icon/icon";

export type ButtonSize = "32" | "40" | "48" | "56" | "60";
export type ButtonTone =
  | "surface"
  | "default"
  | "dark"
  | "kakao"
  | "complete"
  | "none";
export type ButtonIconPosition = "left" | "right";

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  label: ReactNode;
  size?: ButtonSize;
  tone?: ButtonTone;
  fullWidth?: boolean;
  icon?: IconProps["name"];
  iconPosition?: ButtonIconPosition;
  iconSize?: number;
  labelClassName?: string;
  iconClassName?: string;
};

export const Button = ({
  label,
  size = "48",
  tone = "surface",
  fullWidth = false,
  icon,
  iconPosition = "left",
  iconSize = 2.4,
  className,
  labelClassName,
  iconClassName,
  type = "button",
  disabled,
  ...rest
}: ButtonProps) => {
  const iconNode = icon ? (
    <Icon
      name={icon}
      size={iconSize}
      className={clsx(styles.icon, iconClassName)}
    />
  ) : null;

  const toneClassName = tone === "none" ? null : styles.tone[tone];
  const disabledToneClassName =
    tone === "none" ? null : disabled && styles.tone.disabled;

  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(
        styles.button({ size, fullWidth }),
        toneClassName,
        className,
        disabledToneClassName
      )}
      {...rest}
    >
      {iconPosition === "left" ? iconNode : null}

      <span
        className={clsx(
          styles.labelBase,
          styles.labelSizeTypo({ size }),
          labelClassName
        )}
      >
        {label}
      </span>

      {iconPosition === "right" ? iconNode : null}
    </button>
  );
};
