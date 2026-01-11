import type { TextareaHTMLAttributes } from "react";
import clsx from "clsx";
import * as styles from "./text-area-field.css";

export type TextAreaFieldProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "children"
> & {
  fullWidth?: boolean;
  containerClassName?: string;
};

export const TextAreaField = ({
  fullWidth = false,
  disabled = false,
  className,
  containerClassName,
  ...rest
}: TextAreaFieldProps) => {
  return (
    <div className={clsx(styles.container({ fullWidth }), containerClassName)}>
      <div className={styles.textareaWrapper({ disabled })}>
        <textarea
          className={clsx(styles.textarea, className)}
          disabled={disabled}
          {...rest}
        />
      </div>
    </div>
  );
};

export default TextAreaField;
