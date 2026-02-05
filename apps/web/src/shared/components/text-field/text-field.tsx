import React from "react";
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
}

export const TextField = ({
  variant = "default",
  prefixPosition = "left",
  fullWidth = false,
  disabled = false,
  direction = "column",
  prefix,
  size = "body3",
  heightSize = "md",
  ...rest
}: TextFieldProps) => {
  return (
    <div className={clsx(styles.container({ fullWidth }))}>
      <div
        className={clsx(
          styles.textareaWrapper({
            variant,
            disabled,
            size: variant === "plain" ? undefined : heightSize,
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
          className={clsx(
            styles.textarea({
              variant,
              fontSize: size,
              order: prefixPosition === "right" ? "first" : "second",
            })
          )}
          disabled={disabled}
          {...rest}
        />
      </div>
    </div>
  );
};

export default TextField;
