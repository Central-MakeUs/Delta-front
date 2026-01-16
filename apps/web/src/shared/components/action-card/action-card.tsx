"use client";

import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";
import { assignInlineVars } from "@vanilla-extract/dynamic";

import Icon from "@/shared/components/icon/icon";
import type { IconName } from "@/shared/constants/icons";
import { bgColor, color } from "@/shared/styles/color.css";
import { typo } from "@/shared/styles/typography.css";

import * as s from "./action-card.css";

type ActionCardProps = {
  title: string;
  iconName: IconName;
  /** 동그라미 크기 */
  circleSizeRem?: number;
  /** 아이콘 높이 (가로는 auto로) */
  iconHeightRem?: number;
  className?: string;
  ariaLabel?: string;
} & Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "disabled" | "onClick" | "type"
>;

export const ActionCard = ({
  title,
  iconName,
  circleSizeRem = 6.4,
  iconHeightRem = 3.2,
  disabled = false,
  onClick,
  type = "button",
  className,
  ariaLabel,
}: ActionCardProps) => {
  return (
    <button
      type={type}
      className={clsx(s.card, bgColor["grayscale-50"], className)}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel ?? title}
    >
      <div className={s.content}>
        <div
          className={clsx(s.iconCircle, bgColor["grayscale-0"])}
          style={assignInlineVars({
            [s.circleSizeVar]: `${circleSizeRem}rem`,
          })}
        >
          <Icon name={iconName} size={iconHeightRem} />
        </div>

        <span
          className={clsx(s.title, typo.body2.semibold, color["grayscale-900"])}
        >
          {title}
        </span>
      </div>
    </button>
  );
};

export default ActionCard;
