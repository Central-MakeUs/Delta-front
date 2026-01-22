import type { ButtonHTMLAttributes } from "react";
import React from "react";
import clsx from "clsx";
import * as styles from "@/shared/components/button/button/button.css";
import Icon from "@/shared/components/icon/icon";
import type { IconProps } from "@/shared/components/icon/icon";
import { bgColor, color } from "@/shared/styles/color.css";
import { vars } from "@/shared/styles/theme.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";

export type ButtonSize = "32" | "40" | "48" | "56" | "60";
export type ButtonTone = "surface" | "default" | "dark" | "kakao" | "complete";
export type ButtonIconPosition = "left" | "right";

const TONE_BG: Record<ButtonTone, keyof typeof bgColor> = {
  surface: "grayscale-50",
  default: "grayscale-100",
  dark: "grayscale-900",
  kakao: "login-kakao",
  complete: "main-500",
};

const TONE_FG: Record<ButtonTone, keyof typeof color> = {
  surface: "grayscale-700",
  default: "grayscale-800",
  dark: "grayscale-0",
  kakao: "grayscale-900",
  complete: "grayscale-0",
};

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  label: React.ReactNode;
  size?: ButtonSize;
  tone?: ButtonTone;
  fullWidth?: boolean;

  icon?: IconProps["name"];
  /** left | right */
  iconPosition?: ButtonIconPosition;
  /** rem 단위 숫자 */
  iconSize?: number;
  /** bgColor 토큰 키로 직접 오버라이드 */
  bgColorKey?: keyof typeof bgColor;
  /** color 토큰 키로 직접 오버라이드 */
  textColorKey?: keyof typeof color;
  /** label에 적용할 typo className (예: typo.body2.semibold) */
  labelTypo?: string;
  /** rem 단위 숫자: 아이콘-텍스트 사이 갭 */
  gap?: number;
  /** rem 단위 숫자 */
  paddingX?: number;
  /** rem 단위 숫자 */
  paddingY?: number;
  /** theme radius 키로 오버라이드 (px 토큰) */
  radius?: keyof typeof vars.radius;
  classNames?: {
    icon?: string;
    label?: string;
  };
};

export const Button = ({
  label,
  size = "48",
  tone = "surface",
  fullWidth = false,
  icon,
  iconPosition = "left",
  iconSize = 2.4,
  bgColorKey,
  textColorKey,
  labelTypo,
  gap,
  paddingX,
  paddingY,
  radius,
  className,
  classNames,
  type = "button",
  disabled,
  ...rest
}: ButtonProps) => {
  const isDisabled = Boolean(disabled);

  const resolvedBgKey: keyof typeof bgColor = isDisabled
    ? "grayscale-100"
    : (bgColorKey ?? TONE_BG[tone]);

  const resolvedFgKey: keyof typeof color = isDisabled
    ? "grayscale-500"
    : (textColorKey ?? TONE_FG[tone]);

  const inlineVars = assignInlineVars({
    ...(gap != null ? { [styles.gapVar]: `${gap}rem` } : {}),
    ...(paddingX != null ? { [styles.paddingXVar]: `${paddingX}rem` } : {}),
    ...(paddingY != null ? { [styles.paddingYVar]: `${paddingY}rem` } : {}),
    ...(radius != null ? { [styles.radiusVar]: vars.radius[radius] } : {}),
  });

  const iconNode = icon ? (
    <Icon
      name={icon}
      size={iconSize}
      className={clsx(styles.icon, classNames?.icon)}
    />
  ) : null;

  return (
    <button
      type={type}
      disabled={disabled}
      style={inlineVars}
      className={clsx(
        styles.button({ size, fullWidth }),
        bgColor[resolvedBgKey],
        color[resolvedFgKey],
        className
      )}
      {...rest}
    >
      {iconPosition === "left" ? iconNode : null}

      <span
        className={clsx(
          styles.labelBase,
          labelTypo ?? styles.labelSizeTypo({ size }),
          classNames?.label
        )}
      >
        {label}
      </span>

      {iconPosition === "right" ? iconNode : null}
    </button>
  );
};
