"use client";

import clsx from "clsx";
import { useEffect, useRef } from "react";
import type { ButtonHTMLAttributes, ComponentProps } from "react";
import Icon from "@/shared/components/icon/icon";
import { bgColor, color } from "@/shared/styles/color.css";
import { typo } from "@/shared/styles/typography.css";
import * as s from "./direct-add-button.css";

type IconName = ComponentProps<typeof Icon>["name"];

type CommonProps = {
  label?: string;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
};

type ButtonModeProps = CommonProps &
  Pick<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onClick"> & {
    mode?: "button";
    iconName?: IconName;
    iconSizeRem?: number;
  };

type InputModeProps = CommonProps & {
  mode: "input";
  value: string;
  onValueChange: (next: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
};

export type DirectAddButtonProps = ButtonModeProps | InputModeProps;

const DirectAddButton = (props: DirectAddButtonProps) => {
  const label = props.label ?? "직접 추가하기";
  const ariaLabel = props.ariaLabel ?? label;

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (props.mode !== "input") return;
    inputRef.current?.focus();
  }, [props.mode]);

  if (props.mode === "input") {
    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        props.onCancel();
        return;
      }

      if (e.key === "Enter" && !e.nativeEvent.isComposing) {
        e.preventDefault();
        props.onSubmit();
      }
    };

    return (
      <div
        className={clsx(
          s.inputWrapper,
          bgColor["grayscale-0"],
          color["grayscale-400"],
          typo.body2.medium,
          props.className
        )}
        onClick={() => inputRef.current?.focus()}
      >
        {/* ✅ input 모드: 아이콘 렌더링 자체가 없음 */}
        <input
          ref={inputRef}
          className={clsx(s.input, typo.body2.medium, color["grayscale-400"])}
          value={props.value}
          onChange={(e) => props.onValueChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={props.onCancel}
          placeholder={label}
          aria-label={ariaLabel}
        />
      </div>
    );
  }

  const {
    iconName = "plus-circle",
    iconSizeRem = 2.4,
    type = "button",
    onClick,
    disabled = false,
    className,
  } = props;

  return (
    <button
      type={type}
      className={clsx(
        s.button,
        bgColor["grayscale-0"],
        color["grayscale-400"],
        typo.body2.medium,
        className
      )}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      <Icon name={iconName} size={iconSizeRem} />
      <span className={s.label}>{label}</span>
    </button>
  );
};

export default DirectAddButton;
