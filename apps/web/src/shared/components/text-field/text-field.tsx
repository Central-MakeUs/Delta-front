import React from "react";
import clsx from "clsx";
import * as styles from "./text-field.css";

export type TextFieldFontSize = "body1" | "body2" | "body3";
export type TextFieldHeightSize = "lg" | "md";

export interface TextFieldProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "size" | "prefix"
> {
  placeholder?: string;
  fullWidth?: boolean;
  prefix?: React.ReactNode;
  size?: TextFieldFontSize;
  heightSize?: TextFieldHeightSize;
}

export const TextField = ({
  placeholder,
  fullWidth = false,
  disabled = false,
  prefix,
  size = "body3",
  heightSize = "md",
  ...rest
}: TextFieldProps) => {
  return (
    <div className={clsx(styles.container({ fullWidth }))}>
      <div
        className={clsx(styles.textareaWrapper({ disabled, size: heightSize }))}
      >
        {prefix && <div className={styles.prefix}>{prefix}</div>}
        <textarea
          className={clsx(
            styles.textarea({
              hasPrefix: !!prefix,
              fontSize: size,
            })
          )}
          placeholder={placeholder}
          disabled={disabled}
          {...rest}
        />
      </div>
    </div>
  );
};

export default TextField;
