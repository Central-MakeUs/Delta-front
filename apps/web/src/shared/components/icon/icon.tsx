import React from "react";
import type { IconName } from "@/shared/constants/icons";
import * as styles from "@/shared/components/icon/icon.css";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number | string;
  width?: number | string;
  height?: number | string;
  /** 채움 아이콘일 때만 사용: "currentColor" */
  fill?: string;
  className?: string;
  rotate?: 90 | 180 | 270;
  ariaHidden?: boolean;
  ariaLabel?: string;
}

const Icon = ({
  name,
  size,
  width,
  height,
  fill,
  className,
  rotate,
  ariaHidden = true,
  ariaLabel,
  ...rest
}: IconProps) => {
  const computedWidth = width ?? size ?? 2.4;
  const computedHeight = height ?? size ?? 2.4;

  const rotateClass =
    rotate === 90
      ? styles.rotate90
      : rotate === 180
        ? styles.rotate180
        : rotate === 270
          ? styles.rotate270
          : "";

  const combinedClass = [styles.base, rotateClass, className]
    .filter(Boolean)
    .join(" ");

  return (
    <svg
      width={
        typeof computedWidth === "number"
          ? `${computedWidth}rem`
          : computedWidth
      }
      height={
        typeof computedHeight === "number"
          ? `${computedHeight}rem`
          : computedHeight
      }
      className={combinedClass}
      fill={fill ?? "none"}
      aria-hidden={ariaHidden}
      role={!ariaHidden ? "img" : undefined}
      aria-label={!ariaHidden && ariaLabel ? ariaLabel : undefined}
      {...rest}
    >
      {!ariaHidden && ariaLabel && <title>{ariaLabel}</title>}
      <use href={`#icon-${name}`} />
    </svg>
  );
};

export default Icon;
