import React, { useRef, useEffect } from "react";
import clsx from "clsx";
import * as styles from "./text-field.css";

export type TextFieldFontSize = "body1" | "body2" | "body3";
export type TextFieldHeightSize = "lg" | "md";

export interface TextFieldProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "size" | "prefix"
> {
  variant?: "default" | "plain";
  prefixPosition?: "left" | "right";
  fullWidth?: boolean;
  direction?: "row" | "column";
  prefix?: React.ReactNode;
  size?: TextFieldFontSize;
  heightSize?: TextFieldHeightSize;
  focusEffect?: boolean;
  /** false면 테두리·모서리 제거 */
  border?: boolean;
}

const MIN_TEXTAREA_HEIGHT = 24;

const adjustTextareaHeight = (el: HTMLTextAreaElement | null) => {
  if (!el || el.getAttribute("data-fixed-height") === "true") return;
  el.style.height = "auto";
  el.style.height = `${Math.max(el.scrollHeight, MIN_TEXTAREA_HEIGHT)}px`;
};

export const TextField = ({
  variant = "default",
  prefixPosition = "left",
  fullWidth = false,
  disabled = false,
  direction = "column",
  prefix,
  size = "body3",
  heightSize = "md",
  focusEffect = true,
  border = true,
  value,
  onInput,
  ...rest
}: TextFieldProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isPlain = variant === "plain";

  useEffect(() => {
    if (isPlain) return;
    adjustTextareaHeight(textareaRef.current);
  }, [value, isPlain]);

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    if (!isPlain) adjustTextareaHeight(e.currentTarget);
    onInput?.(e);
  };

  return (
    <div className={clsx(styles.container({ fullWidth, focusEffect, border }))}>
      <div
        className={clsx(
          styles.textareaWrapper({
            variant,
            disabled,
            size: isPlain ? undefined : heightSize,
            direction,
          })
        )}
      >
        {prefix && (
          <div className={styles.prefix({ position: prefixPosition })}>
            {prefix}
          </div>
        )}

        <textarea
          ref={textareaRef}
          className={clsx(
            styles.textarea({
              variant,
              fontSize: size,
              order: prefixPosition === "right" ? "first" : "second",
            })
          )}
          disabled={disabled}
          value={value}
          onInput={handleInput}
          data-fixed-height={isPlain ? "true" : undefined}
          {...rest}
        />
      </div>
    </div>
  );
};

export default TextField;
