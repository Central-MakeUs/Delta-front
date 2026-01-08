"use client";

import clsx from "clsx";
import * as s from "@/shared/components/divider/divider.css";
import { bgColor } from "@/shared/styles/color.css";

type ToneKey = keyof typeof bgColor;

type DividerProps = {
  /** full: 100% / hug: 사용처 className으로 width 지정할 때 */
  width?: "full" | "hug";
  height?: "base" | "hairline";
  /** bgColor 토큰 키 */
  tone?: ToneKey;
  className?: string;
  ariaHidden?: boolean;
};

export const Divider = ({
  width = "full",
  height = "base",
  tone = "grayscale-50",
  className,
  ariaHidden = true,
}: DividerProps) => {
  return (
    <div
      className={clsx(s.divider({ width, height }), bgColor[tone], className)}
      aria-hidden={ariaHidden}
    />
  );
};

export default Divider;
