import React, { useRef } from "react";
import clsx from "clsx";
import Icon, { IconProps } from "@/shared/components/icon/icon";
import * as styles from "./checkbox.css";

export interface CheckboxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "type"
  > {
  icon?: IconProps["name"];
  label?: string;
  containerClassName?: string;
}

export const Checkbox = ({
  icon = "check-mark",
  label,
  containerClassName,
  disabled,
  checked,
  onChange,
  className,
  ...rest
}: CheckboxProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange?.(e);
  };

  return (
    <label className={clsx(styles.container, containerClassName)}>
      <input
        ref={inputRef}
        type="checkbox"
        className={styles.input}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        {...rest}
      />
      <span className={clsx(styles.checkbox, className)}>
          <Icon
            name={icon}
            size={1.6}
            className={styles.icon}
          />
      </span>
      {label && (
        <span className={styles.labelText()}>{label}</span>
      )}
    </label>
  );
};

export default Checkbox;

