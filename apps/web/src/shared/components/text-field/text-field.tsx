import React from "react";
import clsx from "clsx";
import * as styles from "./text-field.css";

export interface TextFieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "type"
  > {
  placeholder?: string;
  fullWidth?: boolean;
}

export const TextField = ({
  placeholder,
  fullWidth = false,
  disabled = false,
  ...rest
}: TextFieldProps) => {
  return (
    <div className={clsx(styles.container({ fullWidth }))}>
      <div
        className={clsx(styles.inputWrapper({ disabled }))}
      >
        <input
          type="text"
          className={clsx(styles.input())}
          placeholder={placeholder}
          disabled={disabled}
          {...rest}
        />
      </div>
    </div>
  );
};

export default TextField;

